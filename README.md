# Kodex Studio · Iker Argüelles

Two pages that share one design and one repository:

- **Kodex Studio** (the home page): what the studio builds, how it works, the plans with
  fixed prices and how to get in touch.
- **About Iker** (`/iker/`): the projects Iker Argüelles has built, his photography, his
  competition results and his CV.

**Live site:** https://ikeruuu.github.io/kodex_studio/
**About Iker:** https://ikeruuu.github.io/kodex_studio/iker/

![Preview of the site](assets/og.png)

## What is on each page

### Kodex Studio

| Section | What it shows |
|---|---|
| Hero | What the studio does and its three promises, over a 3D terrain at night |
| Services | Five small demos you can touch: a website, a booking app, a shop, a database you can ask questions and a before/after of an edited photo |
| Under the hood | A request followed step by step through browser, server, database, AI, payments and email, plus the tools used in each layer |
| How we work | The five steps from the first call to the support after delivery |
| Plans and prices | Three closed plans, the monthly maintenance, fixed-price extras and custom quotes |
| Questions | Payment, ownership and changes after delivery |
| Contact | Email and LinkedIn, next to the Kodex "K" in 3D |

### About Iker

| Section | What it shows |
|---|---|
| Hero | Name and role over the same terrain in daylight |
| About | A card that flips between a photo and a profile written as code |
| Things I've built | Project cards with filters (AI, data, web and apps, hardware, product) |
| Results | Timeline of competitions and academic results that fills in as you scroll |
| Behind the camera | A film strip of photos and clips; click a frame to open it full size |
| CV | A one-page CV that can be saved as PDF from the browser |
| Contact | Email, LinkedIn, GitHub and Instagram |

Both pages are available in English and Spanish; the switch is in the top bar and the
choice is remembered on the device. Moving from one page to the other plays a
full-screen wipe.

## How it is built

- Plain HTML, CSS and JavaScript. There is no build step and no framework.
- [three.js r128](https://threejs.org/) from cdnjs draws the terrain and the K. If WebGL
  or the library is not available, the pages fall back to a flat background and
  everything else keeps working.
- Fonts come from Google Fonts: Bricolage Grotesque (headings), Instrument Sans (text)
  and JetBrains Mono (code).
- A loading screen with the K turning in 3D stays until the page is ready. It is built
  with CSS only.
- Motion is tied to scrolling and is switched off for visitors who ask their system to
  reduce motion.
- On phones the bar becomes a menu, the film strip scrolls sideways with the finger and
  the 3D K is placed inside the layout so it never covers the text.

## Files

```
index.html            Kodex Studio page: markup and fixed texts (EN and ES)
iker/index.html       About Iker page: markup, fixed texts and the CV
css/studio.css        Styles of the Kodex Studio page (dark)
css/site.css          Styles of the About Iker page (light)
js/studio-data.js     Studio content: plans, prices, steps, questions, demos, request tracer
js/studio.js          Studio behaviour: loading screen, demos, tracer, plans, scroll effects
js/data.js            Iker's content: projects, filters, photos, moving rows
js/site.js            Iker's page behaviour: grid, film strip, viewer, reveals, scroll effects
js/scene.js           The 3D background, shared by both pages
js/switch.js          The wipe between the two pages
assets/               Logo, portrait, link-preview image
assets/photos/        Photos and clips
docs/GUIA.md          Step-by-step guide to edit and publish the site (in Spanish)
```

## Run it locally

Any static server works. With Python:

```bash
python -m http.server 8000
# then open http://localhost:8000
```

Use a server rather than opening the files directly: the switch between the two pages,
the clips and the 3D scene need one.

## Change the content

- **Plans, prices, delivery times, steps and questions:** `js/studio-data.js`.
- **Projects and photos of Iker's page:** `js/data.js`.
- **CV and fixed texts:** the two `index.html` files. Each text appears twice, once
  inside `class="en"` and once inside `class="es"`.

`docs/GUIA.md` walks through each case with examples.

## Publish

The site is served by GitHub Pages from the `main` branch, root folder. Every push to
`main` updates the live site after a minute or two.

To turn Pages on in a fresh copy of the repository: **Settings → Pages → Build and
deployment → Source: Deploy from a branch → Branch: `main`, folder `/ (root)` → Save**.

To use your own domain, add it under **Settings → Pages → Custom domain** and create the
DNS record GitHub asks for. Then update the three absolute addresses at the top of both
`index.html` files (`canonical`, `og:url`, `og:image`).

## Rights

© Iker Argüelles. The photographs, clips, texts and the Kodex Studio logo are not
licensed for reuse. Ask first: arguellesiker@gmail.com
