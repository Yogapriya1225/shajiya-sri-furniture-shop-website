from app.extensions import db


class Category(db.Model):
    __tablename__ = "categories"

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100), nullable=False, unique=True)
    slug = db.Column(db.String(120), nullable=False, unique=True, index=True)
    icon = db.Column(db.String(60), nullable=True)  # lucide-react icon name
    image_url = db.Column(db.String(500), nullable=True)

    products = db.relationship("Product", backref="category", lazy="dynamic")

    def to_dict(self) -> dict:
        return {
            "id": self.id,
            "name": self.name,
            "slug": self.slug,
            "icon": self.icon,
            "image": self.image_url,
        }

    def __repr__(self) -> str:
        return f"<Category {self.name}>"
