import json
import os

import django
import pika

# makes Django work from outside the folders
os.environ.setdefault("DJANGO_SETTINGS_MODULE", "admin.settings")
django.setup()

from my_secrets import AMQP_URL
from products.models import Product


params = pika.URLParameters(AMQP_URL)
connection = pika.BlockingConnection(params)
channel = connection.channel()

channel.queue_declare(queue="admin")


def callback(channel, method, properties, body):
    print("Received in admin")
    id = json.loads(body)
    print(id)
    product = Product.objects.get(id=id)
    product.likes = product.likes + 1
    product.save()
    print("Products likes increased")

channel.basic_consume(queue="admin", on_message_callback=callback, auto_ack=True)
print("Start consuming")
channel.start_consuming()
channel.close()