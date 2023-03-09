import json

import pika

from my_secrets import AMQP_URL
from main import Product, db

DJANGO_ADMIN_APP_CHANNEL = "main"


params = pika.URLParameters(AMQP_URL)
connection = pika.BlockingConnection(params)
channel = connection.channel()

channel.queue_declare(queue=DJANGO_ADMIN_APP_CHANNEL)


def callback(channel, method, properties, body):
    print(f"Received message: {properties.content_type}")
    data = json.loads(body)
    
    if properties.content_type == "product_created":
        product = Product(id=data["id"], title=data["title"], image=data["image"])
        db.session.add(product)
        db.session.commit()
    
    elif properties.content_type == "product_updated":
        product = Product.query.get(data["id"])
        product.title = data["title"]
        product.image = data["image"]
        db.session.commit()
    
    elif properties.content_type == "product_deleted":
        product = Product.query.get(data)
        db.session.delete(product)
        db.session.commit()

# auto_ack = auto acknowledge (consume messages)
channel.basic_consume(queue=DJANGO_ADMIN_APP_CHANNEL, on_message_callback=callback, auto_ack=True)
print("Start consuming")
channel.start_consuming()
channel.close()