#!/usr/bin/env python3
"""Scrape Google Scholar author metrics and publications.

This script follows the same HTML selectors shown in ScrapingDog's
"Scrape Google Scholar using Python" article, but wraps them in a small CLI
that can scrape an author's profile URL or `user` id and paginate through
publications.
"""

from __future__ import annotations

import argparse
import json
import sys
import time
from dataclasses import dataclass
from typing import Any
from urllib.parse import parse_qs, urlparse

import requests
from bs4 import BeautifulSoup


BASE_URL = "https://scholar.google.com/citations"
USER_AGENT = (
    "Mozilla/5.0 (Windows NT 10.0; Win64; x64) "
    "AppleWebKit/537.36 (KHTML, like Gecko) "
    "Chrome/123.0.0.0 Safari/537.36"
)


@dataclass(frozen=True)
class ScholarProfileRef:
    user_id: str
    language: str


def parse_args() -> argparse.Namespace:
    parser = argparse.ArgumentParser(
        description=(
            "Scrape citations, h-index, i10-index, and publications from a "
            "Google Scholar author profile."
        )
    )
    parser.add_argument(
        "profile",
        help="Google Scholar profile URL or author user id (the `user=` value).",
    )
    parser.add_argument(
        "--pagesize",
        type=int,
        default=100,
        help="Number of publications to request per page. Default: 100.",
    )
    parser.add_argument(
        "--max-publications",
        type=int,
        default=None,
        help="Stop after this many publications.",
    )
    parser.add_argument(
        "--delay",
        type=float,
        default=1.0,
        help="Delay in seconds between paginated requests. Default: 1.0.",
    )
    parser.add_argument(
        "--language",
        default="en",
        help="Scholar language code. Default: en.",
    )
    parser.add_argument(
        "--timeout",
        type=float,
        default=30.0,
        help="Request timeout in seconds. Default: 30.",
    )
    parser.add_argument(
        "--pretty",
        action="store_true",
        help="Pretty-print JSON output.",
    )
    return parser.parse_args()


def extract_profile_ref(profile: str, language: str) -> ScholarProfileRef:
    if profile.startswith("http://") or profile.startswith("https://"):
        parsed = urlparse(profile)
        query = parse_qs(parsed.query)
        user_ids = query.get("user")
        if not user_ids or not user_ids[0]:
            raise ValueError("Profile URL is missing a `user=` query parameter.")
        lang = query.get("hl", [language])[0]
        return ScholarProfileRef(user_id=user_ids[0], language=lang)

    return ScholarProfileRef(user_id=profile, language=language)


def build_profile_url(profile_ref: ScholarProfileRef, start: int, pagesize: int) -> str:
    return (
        f"{BASE_URL}?hl={profile_ref.language}&user={profile_ref.user_id}"
        f"&cstart={start}&pagesize={pagesize}"
    )


def fetch_page(
    session: requests.Session,
    profile_ref: ScholarProfileRef,
    start: int,
    pagesize: int,
    timeout: float,
) -> BeautifulSoup:
    response = session.get(
        build_profile_url(profile_ref, start, pagesize),
        timeout=timeout,
    )
    response.raise_for_status()
    return BeautifulSoup(response.text, "html.parser")


def clean_text(value: str | None) -> str | None:
    if value is None:
        return None
    cleaned = " ".join(value.split())
    return cleaned or None


def safe_select_text(node: BeautifulSoup | Any, selector: str) -> str | None:
    selected = node.select_one(selector)
    if selected is None:
        return None
    return clean_text(selected.get_text(" ", strip=True))


def extract_profile_details(soup: BeautifulSoup) -> dict[str, Any]:
    profile = {
        "name": safe_select_text(soup, "#gsc_prf_in"),
        "affiliation": safe_select_text(soup, "#gsc_prf_i .gsc_prf_il"),
        "email": safe_select_text(soup, "#gsc_prf_ivh"),
        "interests": [
            clean_text(tag.get_text(" ", strip=True))
            for tag in soup.select("#gsc_prf_int a")
            if clean_text(tag.get_text(" ", strip=True))
        ],
        "coauthors": [],
    }

    for tag in soup.select("#gsc_rsb_co .gsc_rsb_a_desc"):
        name = safe_select_text(tag, ".gsc_rsb_a_desc a")
        subtitle = safe_select_text(tag, ".gsc_rsb_a_ext")
        if name:
            profile["coauthors"].append(
                {
                    "name": name,
                    "subtitle": subtitle,
                }
            )

    metric_header = [
        clean_text(cell.get_text(" ", strip=True))
        for cell in soup.select("#gsc_rsb_st thead th")
    ]
    recent_label = metric_header[2].lower().replace(" ", "_") if len(metric_header) >= 3 else "recent"
    metric_rows = soup.select("#gsc_rsb_st tbody tr")
    metrics: dict[str, dict[str, int | None]] = {}
    for row in metric_rows:
        cells = row.select("td")
        if len(cells) < 3:
            continue
        label = clean_text(cells[0].get_text(" ", strip=True))
        if not label:
            continue
        key = label.lower().replace("-", "_").replace(" ", "_")
        metrics[key] = {
            "all": parse_int(clean_text(cells[1].get_text(" ", strip=True))),
            recent_label: parse_int(clean_text(cells[2].get_text(" ", strip=True))),
        }

    profile["metrics"] = metrics
    return profile


def parse_int(value: str | None) -> int | None:
    if not value:
        return None
    digits = "".join(ch for ch in value if ch.isdigit())
    return int(digits) if digits else None


def extract_publications(soup: BeautifulSoup) -> list[dict[str, Any]]:
    publications: list[dict[str, Any]] = []
    for row in soup.select("#gsc_a_b tr.gsc_a_tr"):
        title_link = row.select_one(".gsc_a_at")
        title = clean_text(title_link.get_text(" ", strip=True)) if title_link else None
        link = None
        if title_link and title_link.has_attr("href"):
            link = f"https://scholar.google.com{title_link['href']}"

        authors = safe_select_text(row, ".gs_gray")
        publication = safe_select_text(row, ".gs_gray + .gs_gray")
        cited_by = safe_select_text(row, ".gsc_a_c a")
        year = safe_select_text(row, ".gsc_a_y")

        if title:
            publications.append(
                {
                    "title": title,
                    "link": link,
                    "authors": authors,
                    "publication": publication,
                    "cited_by": parse_int(cited_by),
                    "year": parse_int(year),
                }
            )

    return publications


def scrape_profile(args: argparse.Namespace) -> dict[str, Any]:
    profile_ref = extract_profile_ref(args.profile, args.language)
    session = requests.Session()
    session.headers.update({"User-Agent": USER_AGENT})

    first_page = fetch_page(
        session=session,
        profile_ref=profile_ref,
        start=0,
        pagesize=args.pagesize,
        timeout=args.timeout,
    )

    if first_page.select_one("#gsc_prf_in") is None:
        raise ValueError(
            "Google Scholar did not return a profile page. "
            "The request may have been blocked or the profile id may be invalid."
        )

    profile = extract_profile_details(first_page)
    publications = extract_publications(first_page)
    start = len(publications)

    while True:
        if args.max_publications is not None and len(publications) >= args.max_publications:
            publications = publications[: args.max_publications]
            break

        if start == 0 or start % args.pagesize != 0:
            break

        time.sleep(args.delay)
        page = fetch_page(
            session=session,
            profile_ref=profile_ref,
            start=start,
            pagesize=args.pagesize,
            timeout=args.timeout,
        )
        page_publications = extract_publications(page)
        if not page_publications:
            break

        publications.extend(page_publications)
        start += len(page_publications)

    return {
        "profile_url": build_profile_url(profile_ref, start=0, pagesize=args.pagesize),
        "user_id": profile_ref.user_id,
        "profile": profile,
        "publication_count": len(publications),
        "publications": publications,
    }


def main() -> int:
    args = parse_args()
    try:
        result = scrape_profile(args)
    except requests.HTTPError as exc:
        print(f"HTTP error while scraping Google Scholar: {exc}", file=sys.stderr)
        return 1
    except requests.RequestException as exc:
        print(f"Network error while scraping Google Scholar: {exc}", file=sys.stderr)
        return 1
    except ValueError as exc:
        print(str(exc), file=sys.stderr)
        return 2

    indent = 2 if args.pretty else None
    print(json.dumps(result, indent=indent, ensure_ascii=True))
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
