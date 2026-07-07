from flask import Blueprint, request, jsonify
from flask_jwt_extended import jwt_required

from app.extensions import db
from app.models import Category

category_bp = Blueprint("categories", __name__)


@category_bp.get("")
def list_categories():
    categories = Category.query.order_by(Category.name.asc()).all()
    return jsonify({"success": True, "data": [c.to_dict() for c in categories]})


@category_bp.post("")
@jwt_required()
def create_category():
    payload = request.get_json(silent=True) or {}
    name = (payload.get("name") or "").strip()
    slug = (payload.get("slug") or "").strip().lower()

    if not name or not slug:
        return jsonify({"success": False, "message": "name and slug are required"}), 400

    category = Category(
        name=name,
        slug=slug,
        icon=payload.get("icon"),
        image_url=payload.get("image"),
    )
    db.session.add(category)
    db.session.commit()
    return jsonify({"success": True, "data": category.to_dict()}), 201


@category_bp.put("/<int:category_id>")
@jwt_required()
def update_category(category_id: int):
    category = db.session.get(Category, category_id)
    if not category:
        return jsonify({"success": False, "message": "Category not found"}), 404

    payload = request.get_json(silent=True) or {}
    category.name = payload.get("name", category.name)
    category.slug = payload.get("slug", category.slug)
    category.icon = payload.get("icon", category.icon)
    category.image_url = payload.get("image", category.image_url)
    db.session.commit()
    return jsonify({"success": True, "data": category.to_dict()})


@category_bp.delete("/<int:category_id>")
@jwt_required()
def delete_category(category_id: int):
    category = db.session.get(Category, category_id)
    if not category:
        return jsonify({"success": False, "message": "Category not found"}), 404

    db.session.delete(category)
    db.session.commit()
    return jsonify({"success": True, "message": "Category deleted"})
