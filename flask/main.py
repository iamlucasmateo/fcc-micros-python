from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from flask_cors import CORS
from sqlalchemy import UniqueConstraint

# THERE IS A PROBLEM WITH THIS SETTING, FROM THE TUTO
# WORKING WITH FASTAPI INSTEAD

app = Flask(__name__)
app.config["SQLALCHEMY_DATABASE_URI"] = "mysql://root:root@db/main"
CORS(app)

db = SQLAlchemy(app)

class Product(db.Model):
    # autoincrement = False to prevent differences with Django app
    id = db.Column(db.Integer, primary_key=True, autoincrement=False)
    title = db.Column(db.String(200))
    image = db.Column(db.String(200))


class ProductUser(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer)
    product_id = db.Column(db.Integer)

    UniqueConstraint("user_id", "product_id", name="user_product_unique")


@app.route("/")
def index():
    return "Hello"

if __name__ == "__main__":
    app.run(debug=True, host="0.0.0.0")