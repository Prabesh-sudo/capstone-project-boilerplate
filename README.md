# Capstone Project Boilerplate

## Workflow

1. Clone this repo and create a branch named `name-project` (replace
   `name` with your own name, e.g. `ujjwal-project`). Do all your work —
   including the milestone commits from §4 — on that branch, pushed back
   to this repo.
2. Once finished, create your own repository on your personal GitHub
   account and push your finished branch there as `main`.
3. Deploy your own repo to GitHub Pages — see `DEPLOY.md`.

---

clone this, replace the content and the API
call, and build your project on top of it.

Build a complete, responsive **multi-page website** using HTML, CSS,
JavaScript, and a UI framework of your choice (Bootstrap or Tailwind),
incorporating a live API integration.

**"Multi-page" means multiple navigable routes/views — Home, About,
Contact **

---

## 1. Choose your project (pick exactly one)

- E-commerce Landing Site
- Corporate Website
- News Portal
- Travel & Tours Website

---

## 2. Mandatory tech requirements

**UI framework:**

- Bootstrap

**File structure — keep all four:**

- `index.html` — all routes/views live here as `.page` sections
- `style.css` — your own layout/component styling on top of the framework
- `variables.css` — CSS custom properties (colors, spacing, fonts) reused
  across every route
- `script.js` — all JS logic, including the router

**JS/CSS techniques — every one of these must appear somewhere and be
identifiable in your commit history (see §4):**

- `.map()` and `.filter()` to render and filter real data into the DOM
- `fetch()` + `async`/`await` calling a **live external API**
- `try`/`catch` around that fetch, with a visible fallback/error state (not
  a silent console error)
- At least one working `<form>` with client-side validation
- **Both** CSS Grid and Flexbox, used deliberately (not just whatever the
  framework defaults to) — e.g. Grid for a card layout, Flexbox for a navbar
  or button group
- Responsive at mobile + desktop widths

---

## 3. Open-source APIs (no backend needed)

Pick one that matches your chosen project type. Most need free
registration for a key — check current terms/limits before relying on one
close to the deadline, free tiers change.

**E-commerce Landing Site**

- Fake Store API — `fakestoreapi.com` (used in this boilerplate)
- Platzi Fake Store API — `api.escuelajs.co/api/v1/products`

**Corporate Website**

- JSONPlaceholder — `jsonplaceholder.typicode.com` (posts/users as team
  members, testimonials, blog stubs)
- Random User Generator — `randomuser.me/api` (team/staff bios + photos)

**News Portal**

- Hacker News API — `hacker-news.firebaseio.com/v0` (no key required)
- NewsAPI — `newsapi.org` (free key; free tier blocks direct browser fetch
  from non-localhost, fine for local dev/demo)
- GNews — `gnews.io` (free key)

**Travel & Tours Website**

- REST Countries — `restcountries.com` (no key, country/destination data)
- OpenWeatherMap — `openweathermap.org/api` (free key, destination weather)
- OpenTripMap — `opentripmap.io` (free key, points of interest)

**Useful with any project type**

- Quotable — `api.quotable.io` (no key, testimonials/quotes)
- Picsum Photos — `picsum.photos` (no key, placeholder images)
- exchangerate.host (no key, currency conversion)

---

## 4. Git & commit guidelines (mandatory, graded)

One commit per milestone below, pushed to GitHub — **not one commit at the
end**. Commit messages should say what was built, e.g. `feat: variables.css
design tokens + page skeleton`.

1. Route skeleton (`.page` sections + router) + `variables.css` tokens
2. Framework setup (Bootstrap/Tailwind wired into layout + nav)
3. Grid/Flexbox layout for the main content
4. API integration — `fetch` + `async`/`await` + `try`/`catch`
5. Dynamic rendering with `.map()`/`.filter()`
6. Form + validation
7. Responsive polish + final push

Your git log is part of the grade — it's the evidence the site was
actually built step by step, not dropped in as one finished blob.

---

## 5. AI usage policy

You're allowed to use AI tools to help write code. Two things aren't
negotiable regardless of how the code got written:

- **Commit granularity from §4.** One AI-generated commit that satisfies
  every checkbox at once fails this requirement even if the site works —
  the history has to show the seven stages separately.
- **A short live walkthrough (~5 min) at submission.** You'll be asked to
  point at your `variables.css` and explain two of your tokens, walk
  through your `fetch`/`async`/`try`/`catch` block line by line, and
  justify one place you used Grid over Flexbox (or vice versa). If you
  can't explain a requirement, it doesn't count toward your grade — no
  exceptions for "the AI wrote that part."

Use AI to move faster. Don't use it to skip understanding what you turned
in — the walkthrough is where that gets checked, not the code itself.
