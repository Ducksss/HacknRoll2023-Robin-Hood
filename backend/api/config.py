from typing import Union, List
from pydantic import BaseSettings, AnyHttpUrl

class Settings(BaseSettings):
    BACKEND_CORS_ORIGINS: list[Union[str, AnyHttpUrl]] = ["http://localhost:8080"]
    TEST: str = "This was set in config.py"
    
    # Prefix for endpoints, i.e. example.com/api/v1/endpoint
    ROUTE_PREFIX: str = "/api/v1"
    APP_TITLE: str = "CMIYC-Backend"
    APP_DESCRIPTION: str = "Backend for catch me if you can."
    APP_VERSION: str = "0.0"
    APP_HOST: str = "0.0.0.0"
    APP_PORT: int = 8080

    # Injected from .env file
    OPENAI_API_KEY: str = None
    BACKEND_CORS_ORIGINS: List[AnyHttpUrl] = None 

    class Config:
        env_file = ".env"
        env_file_encoding = "utf-8"
        case_sensitive = True

settings = Settings()
