# Capital / Clair

A production-ready GitHub template for a full-stack website with:

- **Frontend** — React 18 + TypeScript + Vite, served by Nginx
- **Backend** — Node.js + Express + TypeScript REST API
- **Docker** — multi-stage builds, `docker compose` orchestration
- **CI** — GitHub Actions (lint, build, Docker image build)

## Architecture

```
financial-profiler/
├── frontend/               # React + TypeScript + Vite : saisie, résultats, visualisation
│   ├── src/
│   │   ├── components/     # Layout, navigation, footer
│   │   └── pages/          # Simulateur, méthode, page 404
│   ├── Dockerfile
│   └── nginx.conf
├── backend/                # Express : futur point d’entrée API
│   └── src/routes/
├── analytics/              # Moteur Python indépendant et testable
│   ├── financial_simulator.py
│   ├── requirements.txt
│   └── README.md
├── .github/workflows/      # CI pipeline
├── docker-compose.yml      # production orchestration
├── docker-compose.dev.yml  # development overrides
└── .env.example            # environment variable template
```

## Lancer l'application

### Local development (without Docker)

```bash
# Terminal 1 — backend
cd backend && npm install && npm run dev

# Terminal 2 — frontend
cd frontend && npm install && npm run dev
```

Frontend : http://localhost:3000  
Backend : http://localhost:4000/api/health

### Moteur Python

```bash
cd analytics
python -m venv .venv && source .venv/bin/activate
pip install -r requirements.txt
python financial_simulator.py
```

## Logique de calcul

1. L'épargne mensuelle est `max(0, revenus - dépenses fixes - dépenses variables)`.
2. Le taux d'épargne est l'épargne mensuelle divisée par le revenu.
3. Pour chaque scénario, le capital est projeté avec des versements mensuels et une capitalisation mensuelle : `versement × ((1 + taux_mensuel)^mois - 1) / taux_mensuel`.
4. L'horizon et le profil déterminent l'affichage et l'allocation indicative.

Le moteur actuel est déterministe et pédagogique. La prédiction statistique (Scikit-learn) pourra être ajoutée dans `analytics/` après ingestion de données historiques, sans mélanger cette estimation avec la projection de base.

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
