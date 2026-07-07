"""
Application factory for Shajiya Sri Furniture Mart backend.

Uses the standard Flask "create_app" pattern so the app can be
imported cleanly by both the WSGI server (Render/Gunicorn) and
by test suites / Flask-Migrate's CLI.
"""
import os

from flask import Flask, jsonify
from flask_cors import CORS

from app.config import get_config
from app.extensions import db, migrate, jwt


def create_app(config_name: str | None = None) -> Flask:
    app = Flask(__name__)
    app.config.from_object(get_config(config_name))

    # ---- Extensions ----------------------------------------------------
    db.init_app(app)
    migrate.init_app(app, db)
    jwt.init_app(app)

    allowed_origins = _parse_origins(app.config.get("CORS_ORIGINS", ""))
    CORS(
        app,
        resources={r"/api/*": {"origins": allowed_origins}},
        supports_credentials=True,
    )

    # ---- Blueprints ------------------------------------------------------
    from app.routes.auth_routes import auth_bp
    from app.routes.category_routes import category_bp
    from app.routes.product_routes import product_bp
    from app.routes.gallery_routes import gallery_bp
    from app.routes.testimonial_routes import testimonial_bp
    from app.routes.contact_routes import contact_bp

    app.register_blueprint(auth_bp, url_prefix="/api/auth")
    app.register_blueprint(category_bp, url_prefix="/api/categories")
    app.register_blueprint(product_bp, url_prefix="/api/products")
    app.register_blueprint(gallery_bp, url_prefix="/api/gallery")
    app.register_blueprint(testimonial_bp, url_prefix="/api/testimonials")
    app.register_blueprint(contact_bp, url_prefix="/api/contact")

    @app.get("/api/health")
    def health_check():
        return jsonify({"success": True, "message": "Shajiya Sri Furniture Mart API is running"})

    @app.errorhandler(404)
    def not_found(_error):
        return jsonify({"success": False, "message": "Resource not found"}), 404

    @app.errorhandler(500)
    def server_error(_error):
        return jsonify({"success": False, "message": "Internal server error"}), 500

    from app.utils.seed import register_cli

    register_cli(app)

    return app


def _parse_origins(raw: str) -> list[str]:
    """Turns a comma-separated CORS_ORIGINS env value into a clean list."""
    if not raw:
        return []
    return [origin.strip() for origin in raw.split(",") if origin.strip()]
