from typing import List

from fastapi import Depends, FastAPI, HTTPException, status
from sqlalchemy.orm import Session

from app import crud, models, schemas
from app.database import SessionLocal, engine

models.Base.metadata.create_all(bind=engine)

app = FastAPI()


# Dependency
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

app = FastAPI()

@app.get("/")
def check():
    return {"check": "ok"}

@app.get("/product/{id}")
def get_product(id: int):
    db_product = crud.get_product(id)
    if not db_product:
        raise HTTPException(status_code=404, detail="Product not found")
    return db_product

@app.post("/product/", response_model=schemas.ProductSchema, status_code=status.HTTP_201_CREATED)
def create_product(product: schemas.ProductSchema, db: Session = Depends(get_db)):
    return crud.create_product(db, product)
