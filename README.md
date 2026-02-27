# Wedding Invitation Website

A static, elegant wedding invitation site based on your design—ready to deploy on **GitHub Pages** for free.

## What’s included

- **Single-page invitation** (`index.html`) – Save the date, couple names, date & location, “More Details” button, and a media gallery (video + image).
- **Single page:** hero carousel (multiple photos, fade transitions), Save the date, More Details scrolls to Details, media gallery, Details section (venue, timings, map), Back to top. `details.html` redirects to `index.html#details`.
- **Placeholders** for your images and video; add your files and the layout stays the same.

## Adding your content

### 1. Images

Put your files in the `images/` folder:

| File            | Used for                          |
|-----------------|------------------------------------|
| `hero.jpg`        | Hero carousel photo 1              |
| `gallery-1.jpg`   | Hero carousel photo 2 + gallery    |
| `gallery-2.jpg`   | Hero carousel photo 3              |
| `gallery-3.jpg`   | Hero carousel photo 4              |
| `video-thumb.jpg`| Thumbnail for the video block      |
| `venue.jpg`      | Venue photo in the Details section |

You can use `.png` or `.webp`; if you do, update the `src` in `index.html` and `details.html` to match (e.g. `images/hero.png`).

### 2. Video

- **Option A:** Add a file like `images/video-thumb.jpg` as the thumbnail. In `js/main.js`, change the play button click handler to open your video (e.g. YouTube/Vimeo link in a new tab or in a modal).
- **Option B:** Embed a YouTube/Vimeo iframe in `index.html` inside the video block and style it as needed.

### 3. Map

In the Details section (same page), replace the map placeholder:

1. Open [Google Maps](https://www.google.com/maps), find your venue.
2. Click **Share** → **Embed a map** and copy the iframe code.
3. In `index.html`, in the Details section, replace the entire `<div class="map-placeholder">...</div>` inside `.map-wrap` with that iframe.

### 4. Names, date, venue, timings

Edit the text directly in:

- `index.html` – names, date, location, “Save the Date”.
- All text is in `index.html` (names, date, venue, address, timings). Add more hero photos by duplicating a `<div class="hero-slide">` block.

## Your repo

**Repo:** [github.com/kvarun314/wedding-invitation-repo](https://github.com/kvarun314/wedding-invitation-repo)  
**Live site (after enabling Pages):** https://kvarun314.github.io/wedding-invitation-repo/

## Deploying on GitHub Pages

1. **Create or use the repo**  
   Use [wedding-invitation-repo](https://github.com/kvarun314/wedding-invitation-repo) (or create a new repo on GitHub).

2. **Use this folder as the repo root**  
   Copy everything inside `wedding-invitation/` (including `index.html`, `details.html`, `css/`, `js/`, `images/`) into the root of that repo. The site must be served from the repo root so that `index.html` is at the root.

3. **Push your code**  
   If you use the existing “Invitation Repo” folder:
   - Create a new repo on GitHub.
   - In your terminal, from the `wedding-invitation` folder:
     ```bash
     cd "/Users/varunk/Documents/Invitation Repo/wedding-invitation"
     git init
     git add .
     git commit -m "Wedding invitation site"
     git branch -M main
     git remote add origin https://github.com/kvarun314/wedding-invitation-repo.git
     git push -u origin main
     ```

4. **Turn on GitHub Pages**  
   - Repo → **Settings** → **Pages**.  
   - Under “Build and deployment”, **Source** = “Deploy from a branch”.  
   - **Branch** = `main` (or `master`), folder = **/ (root)**.  
   - Save.

5. **View the site**  
   After a minute or two, it will be at:  
   **https://kvarun314.github.io/wedding-invitation-repo/**

## Running locally

Open `index.html` in a browser, or use a simple server:

```bash
cd wedding-invitation
python3 -m http.server 8000
```

Then visit `http://localhost:8000`.

## Structure

```
wedding-invitation/
├── index.html      # Single page (Save the Date + Details)
├── details.html    # Redirects to index.html#details
├── css/
│   └── style.css
├── js/
│   └── main.js
├── images/         # Your photos go here
│   └── .gitkeep
└── README.md
```

No build step required—plain HTML, CSS, and JS, so GitHub Pages can serve it as-is.
