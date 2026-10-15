# Setup: Documentation and Deployment
 
How the portfolio site and its generated documentation are built and published.
 
- **Live site:** https://bradleycurtisdev.github.io/
- **API documentation:** https://bradleycurtisdev.github.io/api-docs/
## How the GitHub Actions workflow works
 
The workflow is `.github/workflows/pages.yml`. It runs on every push to `main`, and can also be started manually from the **Actions** tab.
 
It has two jobs.
 
**1. Build**
 
1. Checks out the repository.
2. Sets up Node 20, with npm caching.
3. Runs `npm ci`, which installs JSDoc exactly as recorded in `package-lock.json`.
4. Runs `npm run docs`, which makes JSDoc read the code in `src/` and write HTML documentation to `_site/api-docs`.
5. Copies `index.html` and the `src/` folder into `_site`. `src/` is needed because the page loads `src/helpers.js`.
6. Uploads the `_site` folder as a Pages artifact.
**2. Deploy**
 
Once the build succeeds, the deploy job publishes the artifact to GitHub Pages.
 
The workflow is only given the permissions it needs: read access to the repo, and write access to Pages. If two pushes happen close together, the older run is cancelled so only the newest one deploys.
 
## How GitHub Pages is enabled
 
1. In the repository, open **Settings → Pages**.
2. Under **Build and deployment**, set **Source** to **GitHub Actions**.
3. Push to `main`. The workflow builds and deploys the site.
The repository is named `BradleyCurtisDev.github.io`, so GitHub serves it at the root of `https://bradleycurtisdev.github.io/`.
 
## Where the generated docs appear
 
The docs are generated into `_site/api-docs`, which is served at `/api-docs/` on the live site:
 
https://bradleycurtisdev.github.io/api-docs/
 
They are built from the commented functions in `src/helpers.js` (`hash`, `wrapLabel` and `branchPath`). The portfolio links to them from the footer ("API docs"). The `_site` folder is created during the build and is not committed (it is in `.gitignore`).
 
## Building the docs locally
 
```bash
npm install
npm run docs
```
 
Then open `_site/api-docs/index.html` in a browser.