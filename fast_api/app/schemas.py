from pydantic import BaseModel


class ProductSchema(BaseModel):
    id: str
    title: str
    image: str

    class Config:
        orm_mode = True