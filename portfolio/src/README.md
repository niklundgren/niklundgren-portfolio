# Source Organization

This directory contains the React source for the portfolio site.
The app is organized around a small set of route-level pages, with reusable UI elements and static data split into their own folders.

## Layout

- `main.jsx`: application entry point. Mounts React and wraps the app in `BrowserRouter`.
- `App.jsx`: top-level app shell and route definitions.
- `index.css`: global base styles applied across the site. currently blue/white theme
- `App.css`: shared layout styles for the routed app container.

## Folders

- `components/`: reusable UI pieces shared across pages, such as navigation, section dividers, the CV link, the STL viewer, and the justified image gallery.
- `pages/`: top-level route components and their page-specific styles.
  `Home.jsx`, `Projects.jsx`, `Skills.jsx`, and `Contact.jsx` define the main sections of the site.
- `pages/projects/`: nested project detail pages for content that lives under `/projects/...`, including the phonon viewer, CAD designs, and teaching resources.
- `data/`: static structured content used by the app, currently only includes `scholar.json` for publication and citation-related data. possibly to be removed if no other "data" needs storage.

## Conventions

- Most React components live alongside a matching CSS file with the same base name.
- Static media and downloadable files are kept in `../public/` and referenced by absolute paths at runtime.
- Route content stays in `pages/`, while generally reusable presentation logic belongs in `components/`.
