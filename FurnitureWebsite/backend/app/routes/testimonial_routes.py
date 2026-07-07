from flask import Blueprint, request, jsonify
from flask_jwt_extended import jwt_required

from app.extensions import db
from app.models import Testimonial

testimonial_bp = Blueprint("testimonials", __name__)


@testimonial_bp.get("")
def list_testimonials():
    testimonials = Testimonial.query.order_by(Testimonial.created_at.desc()).all()
    return jsonify({"success": True, "data": [t.to_dict() for t in testimonials]})


@testimonial_bp.post("")
@jwt_required()
def create_testimonial():
    payload = request.get_json(silent=True) or {}
    customer_name = payload.get("customerName")
    message = payload.get("message")
    if not customer_name or not message:
        return (
            jsonify({"success": False, "message": "customerName and message are required"}),
            400,
        )

    testimonial = Testimonial(
        customer_name=customer_name,
        rating=int(payload.get("rating", 5)),
        message=message,
        is_sample=bool(payload.get("isSample", False)),
    )
    db.session.add(testimonial)
    db.session.commit()
    return jsonify({"success": True, "data": testimonial.to_dict()}), 201


@testimonial_bp.delete("/<int:testimonial_id>")
@jwt_required()
def delete_testimonial(testimonial_id: int):
    testimonial = db.session.get(Testimonial, testimonial_id)
    if not testimonial:
        return jsonify({"success": False, "message": "Testimonial not found"}), 404

    db.session.delete(testimonial)
    db.session.commit()
    return jsonify({"success": True, "message": "Testimonial deleted"})
