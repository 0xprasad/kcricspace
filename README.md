# Cricket Tournament Management Platform

A production-ready monorepo for managing cricket tournaments, teams, live scoring, payments, and analytics.

## Workspaces
- `backend`: Express REST API with JWT auth, MySQL integration, Razorpay hooks, and normalized schema.
- `frontend`: React + Vite + Tailwind application with public, organizer, scorer, and admin experiences.

## Quick Start
1. Install dependencies: `npm install`
2. Copy environment files:
   - `cp backend/.env.example backend/.env`
   - `cp frontend/.env.example frontend/.env`
3. Create the database and run `backend/sql/schema.sql`.
4. Start development: `npm run dev`

## Deliverables
See:
- `backend/docs/architecture.md`
- `backend/sql/schema.sql`
- source folders under `backend/src` and `frontend/src`
