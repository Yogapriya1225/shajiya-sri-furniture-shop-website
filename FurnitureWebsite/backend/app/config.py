"""
Configuration classes for the Flask app.

All secrets and environment-specific values (DB credentials, JWT
secret, allowed CORS origins) come from environment variables so
nothing sensitive or environment-specific is hard-coded. See
.env.example for the full list of variables.
"""
import os
from datetime import timedelta

from dotenv import load_dotenv

load_dotenv()


def _database_uri() -> str:
    """
    Builds the SQLAlchemy MySQL URI.

    Prefers a single DATABASE_URL if provided (common on Render),
    otherwise assembles one from discrete DB_* variables.
    """
    url = os.getenv("DATABASE_URL")
    if url:
        # Render/Heroku-style URLs sometimes use "mysql://"; SQLAlchemy
        # with PyMySQL needs the "mysql+pymysql://" dialect prefix.
        if url.startswith("mysql://"):
            url = url.replace("mysql://", "mysql+pymysql://", 1)
        return url

    user = os.getenv("DB_USER", "root")
    password = os.getenv("DB_PASSWORD", "")
    host = os.getenv("DB_HOST", "localhost")
    port = os.getenv("DB_PORT", "3306")
    name = os.getenv("DB_NAME", "shajiya_sri_furniture")
    return f"mysql+pymysql://{user}:{password}@{host}:{port}/{name}"


class BaseConfig:
    SECRET_KEY = os.getenv("SECRET_KEY", "dev-secret-key-change-me")
    SQLALCHEMY_DATABASE_URI = _database_uri()
    SQLALCHEMY_TRACK_MODIFICATIONS = False
    SQLALCHEMY_ENGINE_OPTIONS = {"pool_pre_ping": True}

    JWT_SECRET_KEY = os.getenv("JWT_SECRET_KEY", "dev-jwt-secret-change-me")
    JWT_ACCESS_TOKEN_EXPIRES = timedelta(
        hours=int(os.getenv("JWT_ACCESS_TOKEN_EXPIRES_HOURS", "12"))
    )
    JWT_TOKEN_LOCATION = ["headers"]

    CORS_ORIGINS = os.getenv("CORS_ORIGINS", "http://localhost:5173")

    MAX_CONTENT_LENGTH = 8 * 1024 * 1024  # 8 MB upload limit
    UPLOAD_FOLDER = os.getenv("UPLOAD_FOLDER", "uploads")


class DevelopmentConfig(BaseConfig):
    DEBUG = True


class ProductionConfig(BaseConfig):
    DEBUG = False


class TestingConfig(BaseConfig):
    TESTING = True
    SQLALCHEMY_DATABASE_URI = os.getenv("TEST_DATABASE_URL", "sqlite:///:memory:")


_CONFIGS = {
    "development": DevelopmentConfig,
    "production": ProductionConfig,
    "testing": TestingConfig,
}


def get_config(name: str | None = None):
    name = name or os.getenv("FLASK_ENV", "development")
    return _CONFIGS.get(name, DevelopmentConfig)
