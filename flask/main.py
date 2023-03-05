import requests

from dataclasses import dataclass
from flask import Flask, jsonify
from flask_sqlalchemy import SQLAlchemy
from flask_cors import CORS
from flask_migrate import Migrate
from sqlalchemy import UniqueConstraint

# THERE IS A PROBLEM WITH THIS SETTING, FROM THE TUTO
# WORKING WITH FASTAPI INSTEAD

app = Flask(__name__)
app.config["SQLALCHEMY_DATABASE_URI"] = "mysql://root:root@db/flask"
CORS(app)

db = SQLAlchemy(app)
migrate = Migrate(app, db)

@dataclass
class Product(db.Model):
    id: int
    title: str
    image: str
    # autoincrement = False to prevent differences with Django app
    id = db.Column(db.Integer, primary_key=True, autoincrement=False)
    title = db.Column(db.String(200))
    image = db.Column(db.String(200))

@dataclass
class ProductUser(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer)
    product_id = db.Column(db.Integer)

    UniqueConstraint("user_id", "product_id", name="user_product_unique")


@app.route("/api/products")
def index():
    return jsonify(Product.query.all())


def admin_app_url(id) -> str:
    # This was also added to ALLOWED_HOSTS in Django settings
    # There are other ways to do this
    DOCKER_INTERNAL_HOST = "172.17.0.1"
    url = f"http://{DOCKER_INTERNAL_HOST}:8000/api/products"
    if id is not None:
        url += f"/{id}"
    
    print("URL", url)
    
    return url


@app.route("/api/products", methods=["POST"])
def like(id):
    admin_app_url(id)
    # requests.put()
    # print(type(product), product)

    # return product

@app.route("/api/test_products/<int:id>", methods=["GET"])
def like_test(id):
    url = admin_app_url(id)
    response = requests.get(url)

    return response.json()


if __name__ == "__main__":
    app.run(debug=True, host="0.0.0.0")