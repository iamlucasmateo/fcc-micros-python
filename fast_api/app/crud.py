from sqlalchemy.orm import Session
from app import models, schemas

def get_product(db: Session, product_id: id):
    return db.query(models.Product).filter(models.Product.id == product_id).first()

def get_products(db: Session, skip: int = 0, limit: int = 100):
    return db.query(models.Item).offset(skip).limit(limit).all()

def create_product(db: Session, product: schemas.ProductSchema):
    db_product = models.Product(id=product.id, title=product.title, image=product.image)
    db.add(db_product)
    db.commit()
    db.refresh(db_product)
    return db_product