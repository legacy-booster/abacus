# LegacyBoost GitHub Pages

This directory contains the source files for the LegacyBoost GitHub Pages website.

## Structure

- `_config.yml` - Jekyll configuration file
- `index.md` - Home page content
- `features.md`, `pricing.md`, `about.md` - Additional pages
- `assets/css/style.scss` - Custom styling
- `_layouts/default.html` - Custom layout template
- `_includes/` - Reusable HTML snippets

## Local Development

To run this site locally:

1. Install Ruby and Bundler if you don't have them
2. Navigate to the `docs` directory
3. Run `bundle install` to install dependencies
4. Run `bundle exec jekyll serve` to start a local server
5. Visit `http://localhost:4000` in your browser

## Making Changes

- Edit the Markdown files to update page content
- Modify `_config.yml` to change site-wide settings
- Update `assets/css/style.scss` to adjust styling
- After pushing changes to GitHub, the site will automatically rebuild

## GitHub Pages Configuration

The site is configured to be built from the `/docs` folder on the `main` branch. No additional configuration is needed.
