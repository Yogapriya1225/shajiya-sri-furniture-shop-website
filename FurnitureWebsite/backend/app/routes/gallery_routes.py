from flask import Blueprint, request, jsonify
from flask_jwt_extended import jwt_required

from app.extensions import db
from app.models import GalleryImage

gallery_bp = Blueprint("gallery", __name__)


@gallery_bp.get("")
def list_gallery():
    category = request.args.get("category")
    query = GalleryImage.query
    if category:
        query = query.filter_by(category=category)
    images = query.order_by(GalleryImage.sort_order.asc()).all()
    return jsonify({"success": True, "data": [img.to_dict() for img in images]})


@gallery_bp.post("")
@jwt_required()
def create_gallery_image():
    payload = request.get_json(silent=True) or {}
    image_url = payload.get("imageUrl")
    if not image_url:
        return jsonify({"success": False, "message": "imageUrl is required"}), 400

    image = GalleryImage(
        image_url=image_url,
        caption=payload.get("caption"),
        category=payload.get("category"),
        sort_order=payload.get("sortOrder", 0),
    )
    db.session.add(image)
    db.session.commit()
    return jsonify({"success": True, "data": image.to_dict()}), 201


@gallery_bp.delete("/<int:image_id>")
@jwt_required()
def delete_gallery_image(image_id: int):
    image = db.session.get(GalleryImage, image_id)
    if not image:
        return jsonify({"success": False, "message": "Image not found"}), 404

    db.session.delete(image)
    db.session.commit()
    return jsonify({"success": True, "message": "Image deleted"})
