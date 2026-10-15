# Bradley Curtis | Game Developer Portfolio

**Live site:** https://bradleycurtisdev.github.io

**API documentation:** https://bradleycurtisdev.github.io/api-docs/index.html

## About this site

This is my personal portfolio as a game development student at UCA Farnham. It is an interactive "skill tree": you can click nodes to unlock sections about me, my experience and my games, and each node opens a side panel with details, images and links. It is built with plain HTML, CSS and JavaScript, with no frameworks.

The site is hosted on GitHub Pages. The API documentation is generated automatically from the code in `src/` and deployed with the site every time I push to `main`.

## Building the documentation locally

The docs are generated with [JSDoc](https://jsdoc.app/) from the commented code in `src/helpers.js`.

Requirements: [Node.js](https://nodejs.org/) 20 or later.

```bash
npm install
npm run docs
```

The generated docs are written to `_site/api-docs/`. Open `_site/api-docs/index.html` in a browser to view them.

You can also run JSDoc directly:

```bash
npx jsdoc -r src -d _site/api-docs
```

## Project structure

```
index.html                    the portfolio site
src/helpers.js                documented helper functions (source for the API docs)
.github/workflows/pages.yml   builds the docs and deploys to GitHub Pages
```

## Deployment

A GitHub Actions workflow builds the docs and deploys the site on every push to `main`.