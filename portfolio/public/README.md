# Public Assets

This directory contains static files served directly by Vite at the site root. Assets here are referenced with absolute paths such as `/headshot.svg` or `/figures/si-xls-rmse.png`.

## Files and Folders

- `Nicholas_Lundgren_CV.pdf`: downloadable CV used by the site navigation and CV link component. This is the exported resume PDF served directly to visitors.
- `headshot.svg`: portrait illustration used on the home page hero section. It is stored as an SVG so it stays crisp at different display sizes.
- `figures/`: scientific figure images used on the Skills page gallery and writing previews.
  These are all PNG files. For site performance, they are compressed with [compresspng.com](https://compresspng.com/) and reduced to fewer than 100 unique colors when possible so the pages stay lightweight without losing the visual content needed for the figures.
- `cad/`: STL files used by the CAD Designs project page. These are the 3D model exports loaded into the browser viewer.
- `logos/`: software and tool logos used on the Skills page. These are small branding assets collected as local copies so the site does not depend on third-party hotlinking.
- `icons/`: favicon and app icon files for browser tabs, bookmarks, and device home-screen shortcuts.
  This folder includes SVG, PNG, and ICO variants to cover different browser requirements. 
- `phonon-viewer/`: pre-generated HTML visualizations for the Phonon Viewer project page.
  Each material subdirectory contains `mode_*.html` files representing exported phonon mode views. These files are direct output from kALDo and are then post-processed by `scripts/normalize_phonon_viewer_html.py` before being embedded by the React route.
