# Website Template

A production-ready GitHub template for a full-stack website with:

- **Frontend** — React 18 + TypeScript + Vite, served by Nginx
- **Backend** — Node.js + Express + TypeScript REST API
- **Docker** — multi-stage builds, `docker compose` orchestration
- **CI** — GitHub Actions (lint, build, Docker image build)

## Project structure

```
website_template/
├── frontend/               # React app
│   ├── src/
│   │   ├── components/     # Layout, Header, Footer
│   │   └── pages/          # Home, About, NotFound
│   ├── Dockerfile          # multi-stage: node build → nginx serve
│   └── nginx.conf          # SPA fallback + API proxy
├── backend/                # Express REST API
│   ├── src/
│   │   └── routes/
│   └── Dockerfile          # multi-stage: build → slim production image
├── .github/workflows/      # CI pipeline
├── docker-compose.yml      # production orchestration
├── docker-compose.dev.yml  # development overrides
└── .env.example            # environment variable template
```

## Quick start

### Local development (without Docker)

```bash
# Terminal 1 — backend
cd backend && npm install && npm run dev

# Terminal 2 — frontend
cd frontend && npm install && npm run dev
```

Frontend: http://localhost:3000  
Backend: http://localhost:4000/api/health

### Docker (production)

```bash
cp .env.example .env          # fill in secrets
docker compose up --build
```

App served at http://localhost

### Docker (development with hot-reload)

```bash
docker compose -f docker-compose.yml -f docker-compose.dev.yml up --build
```

## API routes

| Method | Path          | Description  |
|--------|---------------|--------------|
| GET    | /api/health   | Health check |
| GET    | /api/hello    | Hello world  |

## Using this template

Click **Use this template** on GitHub to create a new repository from this template, then:

1. Replace `MyApp` with your project name in `frontend/src/components/Header.tsx` and `index.html`.
2. Add your own pages under `frontend/src/pages/`.
3. Add your own API routes under `backend/src/routes/`.
4. Set environment variables in `.env`.

## License

MIT
