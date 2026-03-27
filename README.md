# homepage
Professional Homepage for Nicholas W. Lundgren (UC Davis- Chemistry). Built in React

# Structure of the site

Here's how the actual site is built.

## portfolio
### src
  JSX + CSS files to build the site
  
  - components - site-wide reusable JS like the Nav bar
  - data - collection of scraped data (e.g. citation count) to update site
  - pages - actual pages of the app. Most of the writing on the site lives here.
  
### public 
  Non-JS files to be loaded into the site 
  
  - cad - STL files to showoff
  - logos - external logos and icons (GPUMD, LAMMPS, etc.)
  - figures - scientific figures to be displayed on skills page
  - phonon-viewer - html files output by kALDo (formatted by a python script)

## scripts
  Scripts I need handy, written in my beloved Python <3
  
  - normalize_phonon_viewer_html.py - stylize kALDo output
  - google_scholar_profile_scraper.py - updates the scholar.json file in portfolio/data to get recent citation count

# Packages

- KaTeX: for math rendering

- eslint: for linting

- vite: runs a development server with real-time changes

- Babel: compiling JS
