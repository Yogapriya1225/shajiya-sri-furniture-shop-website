"""
Extension instances, created here (uninitialized) and bound to the
app in the application factory. This avoids circular imports between
app/__init__.py and the model/route modules.
"""
from flask_sqlalchemy import SQLAlchemy
from flask_migrate import Migrate
from flask_jwt_extended import JWTManager

db = SQLAlchemy()
migrate = Migrate()
jwt = JWTManager()
