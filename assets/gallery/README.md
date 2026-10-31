# Adding photographs to the gallery

1. Copy the photo (JPG, PNG or WebP) into this folder (`assets/gallery/`).
   - Keep the file under about 400 KB: resize to roughly 1600 px on the long side and save as JPG at 80% quality.
   - Use simple file names with no spaces, e.g. `kunming-workshop-2010.jpg`.
2. Open `gallery.json` (in the site's main folder) and add an entry to the `photos` list:

       {"file": "kunming-workshop-2010.jpg", "caption": "Live-operative workshop, Kunming, China", "date": "2010-06-15"}

   - `file`: the file name in this folder.
   - `caption`: a short, factual description (place, event, year). It is also used as the picture's text for screen readers.
   - `date`: YYYY-MM-DD (or YYYY-MM or YYYY). Newest photos are shown first.
   - Separate entries with commas, and keep the file valid JSON (no comma after the last entry).
3. Upload the folder to the website. No other change is needed.

Guidelines: no patient photographs or anything that identifies a patient, no photographs of patients in procedures, no advertising captions, and only photographs of people who have agreed to be shown.
Testing locally: run `python3 -m http.server` in the site folder and open http://localhost:8000/gallery.html (the gallery will not load when the page is opened directly as a file).
