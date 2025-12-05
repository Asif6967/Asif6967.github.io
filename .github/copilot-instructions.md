# Repo guidance for AI coding agents — Real Asif Universe

Quick summary
- **App server:** `app.py` — a small Flask app exposing `/api/ai` (POST) and `/api/news` (GET). Run with `python app.py` (debug mode, port 5000).
- **Client UI:** `templete.html` (served as a static/template file) plus `js/app.js` and `js/voice.js` for UI, chat, voice and news features.

Important patterns & architecture (what to know)
- Client-heavy static site: most behavior is in `js/app.js` and `js/voice.js` (UI animations, speech synthesis/recognition, news polling).
- Server is intentionally minimal: basic AI-response logic lives in `app.py` (no external LLM integration). News fetching uses the GNews API via an embedded API key.
- Dataflow: UI -> fetch() -> server endpoint -> JSON reply -> `addMessage()` shows responses in `chatBox`.

Project-specific gotchas (be explicit)
- Filename mismatch: `app.py` calls `render_template('index.html')` but repo contains `templete.html`. Confirm whether the template should be renamed to `templates/index.html` (Flask default) or the Flask call should be updated. Search/resolve before editing templates.
- Endpoint mismatch: `js/app.js` posts to `http://127.0.0.1:5000/chat` but `app.py` exposes `/api/ai`. When changing client or server, keep these in sync. Example client fix:

```js
// in js/app.js replace the fetch to match server route
const res = await fetch('/api/ai', {
  method: 'POST', headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ message })
});
```

- Embedded secrets: the GNews API key appears in `app.py` and `js/app.js`. Treat this as sensitive: move keys to environment variables (server) or a secrets service (client should not expose keys). Agents should not commit secrets back into the repo.

Developer workflows (how to run & debug)
- Install runtime deps (no requirements file present). For local dev:

```
python -m venv venv
venv\\Scripts\\activate   # Windows (cmd)

pip install flask flask-cors requests
python app.py
```

- Open `templete.html` in a browser (or run via Flask after fixing template location). Client expects server at `http://127.0.0.1:5000` for APIs.
- Quick API test (curl):

```
curl -X POST http://127.0.0.1:5000/api/ai -H "Content-Type: application/json" -d "{\"message\":\"hello\"}"
```

Conventions & editing notes for agents
- Prefer small, focused edits: when changing endpoints, update both `app.py` and `js/app.js` together and verify with a browser. Show examples in PRs.
- When adding server templates, use a `templates/` folder (Flask default) and update `render_template('index.html')` accordingly. If keeping a plain static file, document how it is served.
- Do not leave API keys in new commits. If you must add examples, use clearly fake placeholders like `GNEWS_API_KEY=REPLACE_ME`.

Files to inspect first (high value)
- `app.py` — server routes, GNews usage, run instructions.
- `templete.html` — main UI structure and chat markup.
- `js/app.js` — client-side API calls, UI behaviour, endpoint URLs.
- `js/voice.js` — voice recognition/response logic (duplicate code blocks exist; prefer the more complete/robust implementation).

Testing & validation pointers for agents
- After changing endpoints or template paths: run `python app.py` and open the page; use browser console to watch network requests. Fix CORS by editing `app.py` CORS setup if needed (currently `CORS(app)` is enabled).
- Replace hard-coded keys with `os.environ.get('GNEWS_API_KEY')` in `app.py` and add a small README note or `.env` sample (do not commit real keys).

When in doubt, ask the maintainer about desired behavior for the server vs static-site approach (should Flask serve templates, or is the HTML intended to be served statically?).

— end of instructions —
