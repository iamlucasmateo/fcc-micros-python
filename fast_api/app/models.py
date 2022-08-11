from sqlalchemy import Boolean, Column, ForeignKey, Integer, String, UniqueConstraint
from sqlalchemy.orm import relationship
from app.database import Base


class Product(Base):
    __tablename__ = "products"
    # autoincrement = False to prevent differences with Django app
    id = Column(Integer, primary_key=True, autoincrement=False)
    title = Column(String(200))
    image = Column(String(200))


class ProductUser(Base):
    __tablename__ = "products_user"
    id = Column(Integer, primary_key=True)
    user_id = Column(Integer)
    product_id = Column(Integer)

    UniqueConstraint("user_id", "product_id", name="user_product_unique")
