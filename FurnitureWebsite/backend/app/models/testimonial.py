from datetime import datetime, timezone

from app.extensions import db


class Testimonial(db.Model):
    __tablename__ = "testimonials"

    id = db.Column(db.Integer, primary_key=True)
    customer_name = db.Column(db.String(120), nullable=False)
    rating = db.Column(db.Integer, nullable=False, default=5)
    message = db.Column(db.Text, nullable=False)
    # Flags sample/placeholder testimonials so the frontend can
    # visibly mark them until the owner supplies genuine reviews.
    is_sample = db.Column(db.Boolean, default=True, nullable=False)
    created_at = db.Column(db.DateTime, default=lambda: datetime.now(timezone.utc))

    def to_dict(self) -> dict:
        return {
            "id": self.id,
            "customerName": self.customer_name,
            "rating": self.rating,
            "message": self.message,
            "isSample": self.is_sample,
        }
