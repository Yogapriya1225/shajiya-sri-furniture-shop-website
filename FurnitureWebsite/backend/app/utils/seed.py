"""
Flask CLI commands for one-time database bootstrapping.

Usage (from the backend/ directory, with the venv active and .env loaded):

    flask --app run.py seed-admin
    flask --app run.py seed-demo-data

`seed-admin` is required at least once per environment (local or Render) so
there is an account that can log in to /admin. `seed-demo-data` is optional
and populates categories/products/gallery/testimonials so the homepage isn't
empty before the real showroom catalog is entered through the admin panel.
"""
import os

import click
from flask import Flask

from app.extensions import db
from app.models import Admin, Category, Product, ProductImage, GalleryImage, Testimonial


def register_cli(app: Flask) -> None:
    @app.cli.command("seed-admin")
    def seed_admin():
        """Create the first admin user from ADMIN_USERNAME / ADMIN_PASSWORD env vars."""
        username = os.getenv("ADMIN_USERNAME", "admin")
        password = os.getenv("ADMIN_PASSWORD")

        if not password:
            click.echo("Set ADMIN_PASSWORD in your environment before running this command.")
            return

        existing = Admin.query.filter_by(username=username).first()
        if existing:
            click.echo(f"Admin '{username}' already exists — skipping.")
            return

        admin = Admin(username=username)
        admin.set_password(password)
        db.session.add(admin)
        db.session.commit()
        click.echo(f"Created admin user '{username}'.")

    @app.cli.command("seed-demo-data")
    def seed_demo_data():
        """Populate categories, sample products, gallery images and testimonials."""
        if Category.query.first():
            click.echo("Demo data already present — skipping.")
            return

        categories = [
            ("Sofas", "sofas", "Sofa"),
            ("Beds", "beds", "BedDouble"),
            ("Dining Tables", "dining-tables", "UtensilsCrossed"),
            ("Wardrobes", "wardrobes", "DoorClosed"),
            ("TV Units", "tv-units", "Tv"),
            ("Office Furniture", "office-furniture", "Briefcase"),
            ("Study Tables", "study-tables", "BookOpen"),
            ("Chairs", "chairs", "Armchair"),
            ("Shoe Racks", "shoe-racks", "Footprints"),
            ("Dressing Tables", "dressing-tables", "Sparkles"),
            ("Coffee Tables", "coffee-tables", "Coffee"),
            ("Mattresses", "mattresses", "BedSingle"),
        ]
        cat_objs = {}
        for name, slug, icon in categories:
            cat = Category(name=name, slug=slug, icon=icon)
            db.session.add(cat)
            cat_objs[slug] = cat
        db.session.flush()

        sample_products = [
            ("Ashford 3-Seater Sofa", "ashford-3-seater-sofa", "sofas",
             "Plush cushioning with a solid teak wood frame.", True, False),
            ("Regal Wooden Bed", "regal-wooden-bed", "beds",
             "Handcrafted king-size bed with storage.", True, False),
            ("Windsor Dining Set (6-Seater)", "windsor-dining-set-6-seater", "dining-tables",
             "Elegant dining set for family gatherings.", True, True),
            ("Classic 3-Door Wardrobe", "classic-3-door-wardrobe", "wardrobes",
             "Spacious wardrobe with mirror panel.", False, False),
            ("Modern TV Console", "modern-tv-console", "tv-units",
             "Sleek entertainment unit with cable management.", False, True),
            ("Executive Office Desk", "executive-office-desk", "office-furniture",
             "Sturdy work desk for home and office use.", False, False),
        ]
        for name, slug, cat_slug, desc, featured, new in sample_products:
            product = Product(
                name=name,
                slug=slug,
                category_id=cat_objs[cat_slug].id,
                short_description=desc,
                is_featured=featured,
                is_new_arrival=new,
            )
            db.session.add(product)
            db.session.flush()
            db.session.add(
                ProductImage(
                    product_id=product.id,
                    image_url=f"https://source.unsplash.com/600x450/?furniture,{cat_slug}",
                    sort_order=0,
                )
            )

        for i in range(1, 9):
            db.session.add(
                GalleryImage(
                    image_url=f"https://source.unsplash.com/800x600/?furniture,showroom,{i}",
                    caption="Showroom display",
                )
            )

        db.session.add_all([
            Testimonial(
                customer_name="Verified Customer",
                rating=5,
                message="Sample testimonial — replace with a genuine review once collected.",
                is_sample=True,
            ),
            Testimonial(
                customer_name="Verified Customer",
                rating=5,
                message="Sample testimonial — replace with a genuine review once collected.",
                is_sample=True,
            ),
        ])

        db.session.commit()
        click.echo("Demo data seeded successfully.")
