# Drishyam Dance Troupe Website

Static, dependency-free site (HTML/CSS/JS). Directed by Debapriya Sarkar · [@drishyamddt](https://www.instagram.com/drishyamddt/)

## Run locally
```
node server.js     # → http://localhost:5173
```
Or open `index.html` directly / deploy the folder to Netlify, Vercel, GitHub Pages, etc.

## Edit content
All copy lives in **`js/content.js`**: hero, about, director bio, classes, performances, gallery, contact.
- **Photos:** add files to `assets/images/` (names listed in `assets/images/README.txt`). Missing photos show a styled placeholder.
- **Before launch:** set `showImageHints: false` to hide the "+ add photo" labels.
- **Performance videos:** set `youtubeId` on a performance to play it in a lightbox (thumbnail auto-loads if no image).
- **Classes:** all marked *Proposed*. Once a class is confirmed, set `allProposed: false` and that item's `confirmed: true`.
- **Contact:** `email`/`phone`/`location` are blank until verified. With an email set, the form opens a pre-filled email. Without one, it copies the message and links to the Instagram DM.
- **Director:** replace `bio` with an approved biography and optionally add a `quote`. Set `bioPending: false`.

Only publish verified information. No invented awards, schedules, testimonials or contact details.
