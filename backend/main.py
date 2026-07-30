from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from api.router import api_router
from core.config import settings
from core.logging import logger

app = FastAPI(
    title=settings.APP_NAME,
    version=settings.APP_VERSION,
    description="AI-powered Job Market Intelligence Platform",
)

# -------------------------
# CORS Configuration
# -------------------------
app.add_middleware(
    CORSMiddleware,
    allow_origins=[settings.BACKEND_CORS_ORIGINS],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# -------------------------
# Startup Event
# -------------------------
@app.on_event("startup")
async def startup_event():
    logger.info("Application started successfully.")

# -------------------------
# Shutdown Event
# -------------------------
@app.on_event("shutdown")
async def shutdown_event():
    logger.info("Application stopped.")

# -------------------------
# Root Endpoint
# -------------------------
@app.get("/", tags=["Root"])
def root():
    return {
        "message": settings.APP_NAME,
        "version": settings.APP_VERSION,
    }

# -------------------------
# API Routes
# -------------------------
app.include_router(
    api_router,
    prefix=settings.API_V1_PREFIX,
)