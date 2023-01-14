import logging

from fastapi import APIRouter

from api.config import settings


prefix = "/api/v1"
logging.debug(f"Route prefix: {prefix}")

router = APIRouter(
    prefix=settings.ROUTE_PREFIX,
    responses={
        404: {"error": "Not found"},
        500: {"server_error": "Internal server error"}
    }
)

