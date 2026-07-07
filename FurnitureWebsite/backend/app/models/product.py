from datetime import datetime, timezone

from app.extensions import db


class Product(db.Model):
    __tablename__ = "products"

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(150), nullable=False)
    slug = db.Column(db.String(180), nullable=False, unique=True, index=True)
    category_id = db.Column(db.Integer, db.ForeignKey("categories.id"), nullable=False)

    short_description = db.Column(db.String(300), nullable=False)
    description = db.Column(db.Text, nullable=True)
    materials = db.Column(db.String(300), nullable=True)  # comma-separated
    dimensions = db.Column(db.String(150), nullable=True)

    is_featured = db.Column(db.Boolean, default=False, nullable=False)
    is_new_arrival = db.Column(db.Boolean, default=False, nullable=False)

    created_at = db.Column(db.DateTime, default=lambda: datetime.now(timezone.utc))
    updated_at = db.Column(
        db.DateTime,
        default=lambda: datetime.now(timezone.utc),
        onupdate=lambda: datetime.now(timezone.utc),
    )

    images = db.relationship(
        "ProductImage", backref="product", cascade="all, delete-orphan", lazy="joined",
        order_by="ProductImage.sort_order",
    )

    def to_dict(self) -> dict:
        return {
            "id": self.id,
            "name": self.name,
            "slug": self.slug,
            "categoryId": self.category_id,
            "categoryName": self.category.name if self.category else None,
            "shortDescription": self.short_description,
            "description": self.description,
            "images": [img.image_url for img in self.images],
            "isFeatured": self.is_featured,
            "isNewArrival": self.is_new_arrival,
            "materials": self.materials.split(",") if self.materials else [],
            "dimensions": self.dimensions,
            "createdAt": self.created_at.isoformat() if self.created_at else None,
        }

    def __repr__(self) -> str:
        return f"<Product {self.name}>"


class ProductImage(db.Model):
    __tablename__ = "product_images"

    id = db.Column(db.Integer, primary_key=True)
    product_id = db.Column(db.Integer, db.ForeignKey("products.id"), nullable=False)
    image_url = db.Column(db.String(500), nullable=False)
    sort_order = db.Column(db.Integer, default=0, nullable=False)
