from flask import Blueprint, request, jsonify
from flask_jwt_extended import jwt_required

from app.extensions import db
from app.models import ContactMessage

contact_bp = Blueprint("contact", __name__)


@contact_bp.post("")
def submit_contact_message():
    payload = request.get_json(silent=True) or {}
    name = (payload.get("name") or "").strip()
    phone = (payload.get("phone") or "").strip()
    message = (payload.get("message") or "").strip()

    if not name or not phone or not message:
        return (
            jsonify({"success": False, "message": "name, phone and message are required"}),
            400,
        )

    contact_message = ContactMessage(
        name=name,
        phone=phone,
        email=(payload.get("email") or "").strip() or None,
        message=message,
    )
    db.session.add(contact_message)
    db.session.commit()
    return (
        jsonify(
            {
                "success": True,
                "message": "Thank you! We'll get back to you shortly.",
                "data": contact_message.to_dict(),
            }
        ),
        201,
    )


@contact_bp.get("")
@jwt_required()
def list_contact_messages():
    messages = ContactMessage.query.order_by(ContactMessage.created_at.desc()).all()
    return jsonify({"success": True, "data": [m.to_dict() for m in messages]})


@contact_bp.patch("/<int:message_id>/read")
@jwt_required()
def mark_message_read(message_id: int):
    message = db.session.get(ContactMessage, message_id)
    if not message:
        return jsonify({"success": False, "message": "Message not found"}), 404

    message.is_read = True
    db.session.commit()
    return jsonify({"success": True, "data": message.to_dict()})


@contact_bp.delete("/<int:message_id>")
@jwt_required()
def delete_contact_message(message_id: int):
    message = db.session.get(ContactMessage, message_id)
    if not message:
        return jsonify({"success": False, "message": "Message not found"}), 404

    db.session.delete(message)
    db.session.commit()
    return jsonify({"success": True, "message": "Message deleted"})
