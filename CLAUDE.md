# Claude Code Instructions — XS Soil Solutions

## Project Overview

Static HTML website for **XS Soil Solutions Inc.**, an Ontario-based excess soil management consultancy. No build step — pure HTML/CSS/JS.

### File Structure
```
index.html          — Homepage
services.html       — Services detail
about.html          — About / team
contact.html        — Contact + quote form
careers.html        — Careers / job postings
who-we-help.html    — Client types
css/style.css       — Global stylesheet (all pages share one CSS file)
js/main.js          — Global JS (nav, animations, forms, counters)
assets/             — SVG logos and favicon
serve.py            — Simple Python HTTP server (port 8090)
```

### Key Design Tokens (css/style.css)
- Primary brand greens: `--color-soil-black: #1C2318`, `--color-soil-light: #97C459`
- Gold accent: `--color-gold: #BA7517`
- Font display: Playfair Display (serif), body: Inter (sans-serif)

---

## Deployment Workflow

**Always work on a feature branch and open a PR into `main`.**

1. Create a feature branch: `git checkout -b feature/description`
2. Make and test changes locally
3. Open a PR: `gh pr create --base main --title "..." --body "..."`
4. Review, then merge into `main`

Never push directly to `main`.

---

## Local Preview Setup

The Claude Preview sandbox **cannot** serve files from `~/Documents/` directly due to macOS sandboxing. Use this workaround:

### launch.json (already committed at `.claude/launch.json`)
```json
{
  "version": "0.0.1",
  "configurations": [
    {
      "name": "xs-soil",
      "runtimeExecutable": "/usr/bin/python3",
      "runtimeArgs": ["/tmp/xs_soil_server.py"],
      "port": 8090
    }
  ]
}
```

### Server script — must exist at `/tmp/xs_soil_server.py`
Create this file before calling `preview_start`:
```python
import http.server, socketserver, os
os.chdir('/tmp/xs_soil_site')
PORT = 8090
class H(http.server.SimpleHTTPRequestHandler):
    def log_message(self, *a): pass
socketserver.TCPServer.allow_reuse_address = True
with socketserver.TCPServer(("", PORT), H) as s:
    s.serve_forever()
```

### Steps every session
1. **Always delete and re-copy** site files to `/tmp` — never use `cp -r` into an existing directory or it will nest the source inside it:
   ```bash
   rm -rf /tmp/xs_soil_site && cp -r /Users/ryanfrohar/Documents/Documents/git/xs_soil /tmp/xs_soil_site
   ```
2. Write `/tmp/xs_soil_server.py` (above) using a Bash heredoc (the Write tool requires a prior Read, so use Bash)
3. Kill any process on port 8090: `lsof -ti :8090 | xargs kill -9 2>/dev/null`
4. Call `preview_start` with name `"xs-soil"`
5. Use `preview_screenshot` and `preview_inspect` to verify

**Note:** The preview sandbox snapshots files at server start time — it will NOT pick up file changes made after the server starts. For live verification of edits, use the `mcp__Claude_in_Chrome__navigate` tool pointed at `http://localhost:8090` (or whatever port Bash is serving on) instead.

### Alternative: Bash server (visible in user's own browser)
```bash
python3 /tmp/xs_soil_server.py &
# then open http://localhost:8090 in browser
```

---

## animate-on-scroll Fix

Elements with `.animate-on-scroll` start at `opacity: 0` and only become visible after getting the `.visible` class. The `IntersectionObserver` fires **asynchronously**, so elements already in the viewport on page load may not get the class immediately.

**Fix already applied in `js/main.js`:** Elements within the viewport at load time are immediately marked visible via `getBoundingClientRect()` check; the observer only handles below-the-fold elements.

If content looks blank on first load, check that `visible` classes are being added correctly.

---

## Assets & Images

- **Logo (nav + footer):** Local file `assets/XS-Soil-Logo.png` — used on all pages
- Footer logo uses CSS `filter: brightness(0) invert(1)` for white-on-dark
- The `assets/logo-dark.svg` and `assets/logo.svg` are unused fallbacks
- Background images sourced from `https://lirp.cdn-website.com/b7deef0f/...` (xssoil.ca CDN) and Unsplash

---

## Preview Panel Note

The preview panel renders at ~650px wide (mobile breakpoint). Desktop layout requires viewport ≥ 860px. Use `preview_eval` to check `window.innerWidth` when debugging layout issues.
