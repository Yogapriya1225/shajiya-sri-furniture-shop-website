from flask import Blueprint, request, jsonify
from flask_jwt_extended import create_access_token, jwt_required, get_jwt_identity

from app.extensions import db
from app.models import Admin

auth_bp = Blueprint("auth", __name__)


@auth_bp.post("/login")
def login():
    payload = request.get_json(silent=True) or {}
    username = (payload.get("username") or "").strip()
    password = payload.get("password") or ""

    if not username or not password:
        return jsonify({"success": False, "message": "Username and password are required"}), 400

    admin = Admin.query.filter_by(username=username).first()
    if not admin or not admin.check_password(password):
        return jsonify({"success": False, "message": "Invalid username or password"}), 401

    access_token = create_access_token(identity=str(admin.id))
    return jsonify(
        {
            "success": True,
            "accessToken": access_token,
            "admin": admin.to_dict(),
        }
    )


@auth_bp.get("/me")
@jwt_required()
def me():
    admin_id = get_jwt_identity()
    admin = db.session.get(Admin, int(admin_id))
    if not admin:
        return jsonify({"success": False, "message": "Admin not found"}), 404
    return jsonify({"success": True, "data": admin.to_dict()})
