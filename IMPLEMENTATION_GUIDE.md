# Cricket Tournament Management Platform

## 1. Project folder structure

```text
kcricspace/
├── backend/
│   ├── docs/
│   │   └── architecture.md
│   ├── sql/
│   │   └── schema.sql
│   ├── package.json
│   └── src/
│       ├── app.js
│       ├── server.js
│       ├── config/
│       ├── controllers/
│       ├── middleware/
│       ├── routes/
│       ├── services/
│       ├── utils/
│       └── validators/
├── frontend/
│   ├── package.json
│   ├── tailwind.config.js
│   ├── vite.config.js
│   └── src/
│       ├── api/
│       ├── components/
│       ├── context/
│       ├── lib/
│       ├── pages/
│       ├── router/
│       └── styles/
├── README.md
└── IMPLEMENTATION_GUIDE.md
```

## 2. Database schema (SQL)
- Normalized MySQL schema is implemented in `backend/sql/schema.sql`.
- Core tables included: `roles`, `users`, `teams`, `players`, `tournaments`, `tournament_teams`, `matches`, `innings`, `balls`, `scorecards`, `player_stats`, `team_stats`, and `payments`.
- Foreign keys and targeted indexes support scalable querying for registrations, fixtures, live scoring, leaderboards, and payment history.

## 3. Backend implementation (step-by-step files)
1. `backend/src/config/env.js` and `backend/src/config/db.js` establish environment, MySQL pooling, and transaction helpers.
2. `backend/src/utils/*` centralizes auth token, error, and API response utilities.
3. `backend/src/middleware/*` adds JWT auth, RBAC, validation, rate limiting, and error handling.
4. `backend/src/validators/*` enforces request validation for auth, players, teams, tournaments, matches, and payments.
5. `backend/src/services/*` contains domain logic for auth, player/team CRUD, tournament registration, live scoring, admin KPIs, and Razorpay verification.
6. `backend/src/controllers/*` keeps HTTP handlers thin.
7. `backend/src/routes/*` wires REST endpoints for public, authenticated, and admin use cases.
8. `backend/src/app.js` and `backend/src/server.js` provide the production-ready server bootstrap.

### Example endpoints
- `POST /auth/register`
- `POST /auth/login`
- `GET /players`
- `POST /players`
- `GET /teams`
- `GET /tournaments/:id`
- `POST /tournaments/:id/register`
- `GET /matches/:id`
- `POST /matches/:id/score`
- `GET /matches/leaderboard`
- `GET /admin/overview`
- `POST /payments/create-order`
- `POST /payments/verify`

## 4. Frontend implementation (components/pages)
- `frontend/src/components/layout/AppShell.jsx` provides the shared navigation shell.
- `frontend/src/components/common/*` contains reusable `Button` and `StatCard` components.
- `frontend/src/components/dashboard/TournamentCard.jsx` renders reusable tournament cards.
- `frontend/src/components/match/ScoreEventForm.jsx` provides the live-scoring operator UI scaffold.
- Pages delivered:
  - Landing page
  - Login page
  - Tournament listing
  - Team page
  - Player profile
  - Live match scoring UI
  - Admin dashboard
  - Setup guide with API catalog
- `frontend/src/context/AuthContext.jsx` stores auth state and token persistence.
- `frontend/src/api/client.js` configures Axios with bearer token injection.

## 5. API integration examples

### Register user
```bash
curl -X POST http://localhost:5000/auth/register \
  -H 'Content-Type: application/json' \
  -d '{
    "name":"Aarav Shah",
    "email":"aarav@example.com",
    "password":"Password123",
    "role":"user"
  }'
```

### Create player profile
```bash
curl -X POST http://localhost:5000/players \
  -H 'Authorization: Bearer <JWT>' \
  -H 'Content-Type: application/json' \
  -d '{
    "fullName":"Arjun Mehta",
    "role":"all_rounder",
    "battingHand":"right",
    "teamId":1
  }'
```

### Register a team in a tournament
```bash
curl -X POST http://localhost:5000/tournaments/1/register \
  -H 'Authorization: Bearer <JWT>' \
  -H 'Content-Type: application/json' \
  -d '{
    "teamId":3
  }'
```

### Record live score event
```bash
curl -X POST http://localhost:5000/matches/12/score \
  -H 'Authorization: Bearer <JWT>' \
  -H 'Content-Type: application/json' \
  -d '{
    "inningsNumber":1,
    "overNumber":18,
    "ballInOver":5,
    "runsBat":4,
    "extrasType":"none",
    "extrasRuns":0,
    "isWicket":false,
    "strikerId":17,
    "nonStrikerId":18,
    "bowlerId":22
  }'
```

## 6. Setup & run instructions
1. At repo root, run `npm install`.
2. Copy `backend/.env.example` to `backend/.env` and `frontend/.env.example` to `frontend/.env`.
3. Provision MySQL and execute `backend/sql/schema.sql`.
4. Start local development with `npm run dev`.
5. For production verification, run `npm run build`.
6. Configure a reverse proxy, managed MySQL instance, secure secrets storage, and Razorpay webhook URL before deployment.
