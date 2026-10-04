# QuickNote

A lightweight, browser-based note-taking app for capturing thoughts the moment they strike. QuickNote lets you jot down short notes, tag them by category, and find them again instantly with live search — all without a backend, a build step, or a single dependency. Notes are saved to `localStorage`, so they survive page refreshes and browser restarts.

## Features

- **Quick capture** — add a note with a single text input and an "Add Note" button
- **Four categories** — Personal, Work, Study and Other each with its own colour-coded left border (teal, dark red, and blue respectively)
- **Persistent storage** — notes are automatically saved to `localStorage` and reloaded when the page opens
- **Live search** — filter notes as you type, with word-based, case-insensitive matching
- **Delete individual notes** — each card has its own Delete button that removes only that note
- **Input validation** — prevents empty notes and enforces a 200-character limit, with clear inline error messages
- **Accurate note count** — displays "You have no notes yet.", "You have 1 note.", or "You have N notes."
- **Empty states** — distinct messages for "no notes at all" versus "no search matches"
- **Responsive layout** — the form stacks vertically on screens 600px or narrower
- **Accessible markup** — semantic HTML, labelled inputs, `aria-live` error region, and descriptive button labels

## How to Run Locally

No installation, no build tools, no dependencies — it's a single HTML file.

1. **Clone the repository** (or download the ZIP):
   ```bash
   git clone https://github.com/Dasi202/quicknotes-app.git