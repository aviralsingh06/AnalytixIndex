from contextlib import asynccontextmanager

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from api.router import api_router
from core.config import settings
from core.logging import logger
from db.init_db import init_db
from utils.skills import TECHNICAL_SKILLS


@asynccontextmanager
async def lifespan(app: FastAPI):
    """
    Application startup and shutdown lifecycle.
    """

    # -------------------------
    # Startup
    # -------------------------
    try:
        init_db()

        logger.info(
            "Database initialized successfully."
        )

        logger.info(
            f"TOTAL SKILLS LOADED: {len(TECHNICAL_SKILLS)}"
        )

        logger.info("Application started successfully.")

    except Exception:
        logger.exception("Application startup failed.")
        raise

    yield

    # -------------------------
    # Shutdown
    # -------------------------
    logger.info("Application stopped.")


app = FastAPI(
    title=settings.APP_NAME,
    version=settings.APP_VERSION,
    description="AI-powered Job Market Intelligence Platform",
    lifespan=lifespan,
)


# -------------------------
# CORS Configuration
# -------------------------

app.add_middleware(
    CORSMiddleware,
    allow_origins=settings.cors_origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


# -------------------------
# Root Endpoint
# -------------------------

@app.get("/", tags=["Root"])
def root():
    return {
        "message": settings.APP_NAME,
        "version": settings.APP_VERSION,
        "status": "running",
    }


# -------------------------
# Health Check
# -------------------------

@app.get("/health", tags=["Health"])
def health_check():
    return {
        "status": "healthy",
        "service": settings.APP_NAME,
        "version": settings.APP_VERSION,
    }


# -------------------------
# API Routes
# -------------------------

app.include_router(
    api_router,
    prefix=settings.API_V1_PREFIX,
)