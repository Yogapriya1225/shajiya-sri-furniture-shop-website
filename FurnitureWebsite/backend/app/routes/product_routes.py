from flask import Blueprint, request, jsonify
from flask_jwt_extended import jwt_required

from app.extensions import db
from app.models import Product, ProductImage, Category

product_bp = Blueprint("products", __name__)


@product_bp.get("")
def list_products():
    """
    Supports optional query params:
      - category: filter by category slug
      - featured: "true" to only return featured products
      - new: "true" to only return new arrivals
      - search: case-insensitive match against product name
      - page, pageSize: pagination (defaults 1 / 12)
    """
    query = Product.query.join(Category)

    category_slug = request.args.get("category")
    if category_slug:
        query = query.filter(Category.slug == category_slug)

    if request.args.get("featured") == "true":
        query = query.filter(Product.is_featured.is_(True))

    if request.args.get("new") == "true":
        query = query.filter(Product.is_new_arrival.is_(True))

    search = request.args.get("search")
    if search:
        query = query.filter(Product.name.ilike(f"%{search}%"))

    page = max(int(request.args.get("page", 1)), 1)
    page_size = min(max(int(request.args.get("pageSize", 12)), 1), 100)

    total = query.count()
    products = (
        query.order_by(Product.created_at.desc())
        .offset((page - 1) * page_size)
        .limit(page_size)
        .all()
    )

    return jsonify(
        {
            "success": True,
            "data": [p.to_dict() for p in products],
            "total": total,
            "page": page,
            "pageSize": page_size,
        }
    )


@product_bp.get("/<string:slug>")
def get_product(slug: str):
    product = Product.query.filter_by(slug=slug).first()
    if not product:
        return jsonify({"success": False, "message": "Product not found"}), 404
    return jsonify({"success": True, "data": product.to_dict()})


@product_bp.post("")
@jwt_required()
def create_product():
    payload = request.get_json(silent=True) or {}

    required = ["name", "slug", "categoryId", "shortDescription"]
    missing = [field for field in required if not payload.get(field)]
    if missing:
        return (
            jsonify({"success": False, "message": f"Missing fields: {', '.join(missing)}"}),
            400,
        )

    product = Product(
        name=payload["name"],
        slug=payload["slug"],
        category_id=payload["categoryId"],
        short_description=payload["shortDescription"],
        description=payload.get("description"),
        materials=",".join(payload.get("materials", [])) or None,
        dimensions=payload.get("dimensions"),
        is_featured=bool(payload.get("isFeatured", False)),
        is_new_arrival=bool(payload.get("isNewArrival", False)),
    )
    db.session.add(product)
    db.session.flush()  # get product.id before adding images

    for index, image_url in enumerate(payload.get("images", [])):
        db.session.add(ProductImage(product_id=product.id, image_url=image_url, sort_order=index))

    db.session.commit()
    return jsonify({"success": True, "data": product.to_dict()}), 201


@product_bp.put("/<int:product_id>")
@jwt_required()
def update_product(product_id: int):
    product = db.session.get(Product, product_id)
    if not product:
        return jsonify({"success": False, "message": "Product not found"}), 404

    payload = request.get_json(silent=True) or {}
    product.name = payload.get("name", product.name)
    product.slug = payload.get("slug", product.slug)
    product.category_id = payload.get("categoryId", product.category_id)
    product.short_description = payload.get("shortDescription", product.short_description)
    product.description = payload.get("description", product.description)
    if "materials" in payload:
        product.materials = ",".join(payload["materials"]) or None
    product.dimensions = payload.get("dimensions", product.dimensions)
    product.is_featured = bool(payload.get("isFeatured", product.is_featured))
    product.is_new_arrival = bool(payload.get("isNewArrival", product.is_new_arrival))

    if "images" in payload:
        ProductImage.query.filter_by(product_id=product.id).delete()
        for index, image_url in enumerate(payload["images"]):
            db.session.add(
                ProductImage(product_id=product.id, image_url=image_url, sort_order=index)
            )

    db.session.commit()
    return jsonify({"success": True, "data": product.to_dict()})


@product_bp.delete("/<int:product_id>")
@jwt_required()
def delete_product(product_id: int):
    product = db.session.get(Product, product_id)
    if not product:
        return jsonify({"success": False, "message": "Product not found"}), 404

    db.session.delete(product)
    db.session.commit()
    return jsonify({"success": True, "message": "Product deleted"})
