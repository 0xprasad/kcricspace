# Architecture Overview

## 1. Project folder structure

```text
kcricspace/
├── backend/
│   ├── docs/architecture.md
│   ├── sql/schema.sql
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
│   ├── src/
│   │   ├── api/
│   │   ├── components/
│   │   ├── context/
│   │   ├── hooks/
│   │   ├── lib/
│   │   ├── pages/
│   │   └── router/
└── README.md
```

## 2. API notes
- MVC separation with thin controllers and service-layer business logic.
- Validation via `express-validator`.
- JWT auth middleware and role-based authorization.
- Payment verification uses Razorpay order signature validation and signed webhooks.
- Live scoring stores ball-by-ball events and innings snapshots for eventual scorecard generation.

## 3. Frontend notes
- React Router based navigation.
- Axios client with auth token injection.
- Tailwind-based design system using reusable layout cards, stat tiles, and tables.
- Page modules for landing, tournaments, teams, player profile, scoring, and admin operations.
