
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.routers import chat
from app.services.ingest import ingest
from app.config import VECTORSTORE_DIR

app = FastAPI(
    title="Portfolio AI Assistant Backend",
    version="0.1.0",
)

# ----------------------------
# Startup hook (CRITICAL)
# ----------------------------
@app.on_event("startup")
async def startup_event():
    print("🔄 Running ingestion...")
    ingest()

# ----------------------------
# CORS
# ----------------------------
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # OK for portfolio
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# ----------------------------
# Routers
# ----------------------------
app.include_router(chat.router)

# ----------------------------
# Health Check
# ----------------------------
@app.get("/health")
async def health():
    return {"status": "ok"}
