# DataPolish ⚡

**High-performance, privacy-first text utility for the AI era.**

[Live demo → datapolish.org](https://datapolish.org)

DataPolish is a minimalist single-page web app that fixes common data friction points: broken PDF layouts, messy HTML, unformatted tables, and unoptimized AI prompts. Built with a **zero-framework** philosophy for maximum speed, absolute privacy, and zero tracking.

---

## ✨ Features

- **AI Prompt Optimizer** — trims unnecessary tokens to save LLM costs and improve focus
- **Excel → Markdown** — instantly convert tabbed table data into GitHub-ready Markdown tables
- **PDF Layout Fixer** — heuristic line-joining that understands sentence structure and soft hyphens
- **HTML Stripper** — clean text extraction using native browser DOM parsing (no regex hacks)

All processing runs **100% in the browser**. No data ever leaves your device.

## 🛠 Tech Stack

- **Engine:** Vanilla JavaScript (ES6+) with `"use strict"`
- **Style:** Modern CSS with Flexbox/Grid and CSS variables
- **Fonts:** Inter + JetBrains Mono (Google Fonts)
- **Build:** None. Just ship the files.

## 🔒 Security & Privacy

- **No analytics, no tracking, no cookies, no localStorage**
- **Content Security Policy** — strict CSP with no `unsafe-inline` or `unsafe-eval`
- **Security headers** — HSTS, X-Frame-Options DENY, X-Content-Type-Options, Referrer-Policy, Permissions-Policy
- **Container hardening** — read-only filesystem, dropped Linux capabilities, no-new-privileges
- **DMARC** — domain protected against email spoofing with `p=reject`

## 🚀 Deployment

The app ships as static files served by an `nginx:alpine` container behind [Nginx Proxy Manager](https://nginxproxymanager.com) for SSL termination via Let's Encrypt.

```
Repo layout:
├── index.html          # Main page
├── 404.html            # Custom error page
├── app.js              # All logic
├── style.css           # All styles
├── docker-compose.yml  # Container definition
└── nginx/
    └── default.conf    # Nginx config (security headers, caching, gzip)
```

### Run locally

Just open `index.html` in a browser. No build step, no server needed.

### Run in production (Docker)

```bash
docker compose up -d
```

Then point a reverse proxy (NPM, Caddy, Traefik) at `datapolish:80`.

## 📄 License

MIT — see [LICENSE](LICENSE)

---

*Created by [toskomac](https://github.com/toskomac)*
