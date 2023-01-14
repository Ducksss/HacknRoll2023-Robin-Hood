from fastapi import FastAPI
import uvicorn
import logging

from fastapi.middleware.cors import CORSMiddleware

from api.config import settings
from api.routes import router

if settings.OPENAI_API_KEY is None:
    raise ValueError(
        "OPENAI_API_KEY cannot be found from the environment variable."
        "Please read the detailed instructions at README.md"
    )


def create_app() -> FastAPI:

    app = FastAPI(
        title=settings.APP_TITLE,
        description=settings.APP_DESCRIPTION,
        version=settings.APP_VERSION,
    )

    app.include_router(router)

    logging.debug(f"App Title: {app.title}")
    logging.debug(f"App Description: {app.description}")
    logging.debug(f"App Version: {app.version}")

    return app


logging.info("Creating FastAPI app.")
app = create_app()


if settings.BACKEND_CORS_ORIGINS:
    logging.info("Adding app middleware")
    logging.debug(
        f"Origins: {[str(origin) for origin in settings.BACKEND_CORS_ORIGINS]}"
    )
    app.add_middleware(
        CORSMiddleware,
        allow_origins=[
            str(origin) for origin in settings.BACKEND_CORS_ORIGINS
        ],
        allow_credentials=True,
        allow_methods=["*"],
        allow_headers=["*"],
    )


@app.get("/")
async def root():
    logging.debug("Root / reached")
    return {"message": "Hello world!"}


if __name__ == "__main__":
    uvicorn.run(
        "main:app", port=settings.APP_PORT, host=settings.APP_HOST, reload=True
    )
