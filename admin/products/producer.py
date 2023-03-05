import json

import pika

from my_secrets import AMQP_URL


params = pika.URLParameters(AMQP_URL)
connection = pika.BlockingConnection(params)
channel = connection.channel()

FLASK_APP_ROUTE = "main"
DJANGO_APP_ROUTE = "admin"

def publish(method, body):
    properties = pika.BasicProperties(method)
    channel.basic_publish(
        exchange="",
        routing_key=FLASK_APP_ROUTE,
        body=json.dumps(body),
        properties=properties
    )