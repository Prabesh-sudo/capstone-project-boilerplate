# Deploying to GitHub Pages

Your capstone is static HTML/CSS/JS, so GitHub Pages needs no build step —
it serves the files in your repo directly.

## 1. Move your branch into your own repo

You built your project on a branch of the class boilerplate repo, named
`name-project`. Deploying means moving that branch's code into a repo
under your own GitHub account:

1. On GitHub, create a new empty repository under your own account.
2. In your local clone, check out your branch:
   ```
   git checkout name-project
   ```
3. Point that clone at your new repo instead of the class one, and push
   your branch there as `main`:
   ```
   git remote set-url origin https://github.com/<your-username>/<your-repo>.git
   git push -u origin name-project:main
   ```

## 2. Turn on Pages

1. Open your repo on GitHub → **Settings** → **Pages** (left sidebar).
2. Under **Build and deployment** → **Source**, choose **Deploy from a
   branch**.
3. Under **Branch**, choose **main** and folder **/ (root)** → **Save**.
4. Wait ~1–2 minutes. Refresh the Pages settings page — it'll show your
   live URL:
   `https://<your-username>.github.io/<your-repo>/`

Every time you push new commits to `main`, Pages rebuilds automatically —
no redeploy step needed.

## 3. Two things that break on Pages but not on your machine

**Relative paths.** Locally `index.html` sits at the root, so
`href="style.css"` and `src="script.js"` just work. On Pages your project
lives at `/<your-repo>/`, not `/`. Any path starting with a leading slash
(`/style.css`) will 404 — keep paths relative (`style.css`,
`variables.css`, `script.js`) like the boilerplate already does.

**Mixed content.** Pages serves over HTTPS. If your API call in `script.js`
uses `http://` instead of `https://`, the browser silently blocks the
request. Double-check the API URL from README §3 uses `https://`.

## 4. Why hash routing matters here

This boilerplate's nav uses `#home` / `#about` / `#contact` and JS shows one
`.page` section at a time — it never asks the server for a different file.
That's deliberate: GitHub Pages has no server-side routing, so a router
that relies on real URL paths (`/about`, `/contact`) will 404 on refresh
once deployed. Hash routing (or an all-in-one `index.html`) sidesteps that
entirely. If you build your own router, keep it hash-based unless you also
add a `404.html` redirect trick — not required for this project.

## 5. Verify it actually works

Open the live URL, click through Home/About/Contact, and refresh the page
on `#about` or `#contact` — it should land on that section, not blank or
404. If your API call fails only on the deployed version (not locally),
it's almost always the mixed-content or relative-path issue above.
