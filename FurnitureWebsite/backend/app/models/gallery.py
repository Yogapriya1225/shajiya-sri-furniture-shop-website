from datetime import datetime, timezone

from app.extensions import db


class GalleryImage(db.Model):
    __tablename__ = "gallery_images"

    id = db.Column(db.Integer, primary_key=True)
    image_url = db.Column(db.String(500), nullable=False)
    caption = db.Column(db.String(200), nullable=True)
    category = db.Column(db.String(100), nullable=True)  # e.g. "Showroom", "Living Room"
    sort_order = db.Column(db.Integer, default=0, nullable=False)
    created_at = db.Column(db.DateTime, default=lambda: datetime.now(timezone.utc))

    def to_dict(self) -> dict:
        return {
            "id": self.id,
            "imageUrl": self.image_url,
            "caption": self.caption,
            "category": self.category,
        }
