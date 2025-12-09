<!-- Auto-generated guidance for AI coding agents working on this repo. -->
# Portfolio AI Assistant — Copilot Instructions

This file contains focused, actionable guidance for AI coding agents to become productive quickly in this repository.

## Big picture
- **Backend:** FastAPI app in `backend/app/` (entry `backend/app/main.py`). It exposes a `/health` GET and a `/chat/` POST router implemented in `backend/app/routers/chat.py`.
- **Frontend:** Next.js (App Router) project in `frontend/` (`frontend/src/app/`), built with Tailwind and TypeScript. The main landing page is `frontend/src/app/page.tsx`.
- **Data & infra hints:** There are `services/` and `vectorstore/` folders under `backend/app/` for future or existing vector DB integrations — inspect them before changing API shapes.

## Key workflows (how to run & test locally)
- Install backend deps: `pip install -r backend/requirements.txt` (prefer a venv).
- Run backend (development):
  - From repository root (PowerShell):
    `cd backend; python -m uvicorn app.main:app --reload --port 8000`
  - Health check: `GET http://localhost:8000/health` — returns `{"status":"ok"}`.
- Run frontend (development):
  - From repository root (PowerShell):
    `cd frontend; npm install; npm run dev` (Next runs on the default port 3000).
- Quick API example (chat):
  - curl: `curl -X POST http://localhost:8000/chat/ -H "Content-Type: application/json" -d '{"message":"hello"}'`
  - Response shape: `{"reply":"..."}` (see `ChatResponse` Pydantic model in `backend/app/routers/chat.py`).

## Project-specific patterns & conventions
- **Router registration:** Routers live under `backend/app/routers` and are added in `app.include_router(...)` in `backend/app/main.py`. Add new endpoints via the same pattern.
- **Pydantic v2 models:** `backend` uses `pydantic==2.x` (check `requirements.txt`) — use new v2 patterns when modifying models.
- **CORS:** Development CORS is wildcard (`allow_origins=["*"]`) in `main.py`. Be cautious when changing this — frontend expects the backend to accept requests from `localhost` during dev.
- **Frontend App Router:** `frontend/src/app` uses the Next App Router structure. Place new pages/components in this folder and use the `fetch` API or Next server actions for integration.
- **Static assets:** `public/` hosts static images used by the frontend (e.g., `/next.svg`, `/vercel.svg`).

## Integration points & external dependencies
- Backend dependencies are in `backend/requirements.txt` (FastAPI, Uvicorn, python-dotenv, pydantic, starlette). If you change the API surface, update requirements and docs.
- Frontend dependencies are in `frontend/package.json` (Next 16, React 19, Tailwind). Upgrading major versions may require migration work.
- Look for `vectorstore/` and `services/` under `backend/app/` for any external DB or LLM integrations — these directories are where cross-component comms and persistence live.

## When you edit code
- Preserve router prefixes and Pydantic response models to avoid breaking existing frontend calls (e.g., `/chat/` expects `ChatResponse.reply`).
- If adding async endpoints, prefer Python async def for compatibility with FastAPI/uvicorn.
- Use existing file layout and module imports (the backend is a package named `app`, so imports use `from app...` when running from `backend/` root).

## Examples & quick references
- Chat router: `backend/app/routers/chat.py` — minimal example of request/response Pydantic models.
- App entry: `backend/app/main.py` — CORS, router include, `uvicorn` entrypoint.
- Frontend entry: `frontend/src/app/page.tsx` — example UI and asset usage.

## Safety checks before changes
- Run backend and verify `/health` and `/chat/` endpoints still behave as expected.
- When touching deps, run `npm run dev` and the backend `uvicorn` to verify integration.

---
If any of these sections are unclear or you'd like me to expand examples (e.g., show how the frontend should call the backend or draft a small integration test), tell me which part to expand.
