import pika

from my_secrets import AMQP_URL


params = pika.URLParameters(AMQP_URL)
connection = pika.BlockingConnection(params)
channel = connection.channel()

FLASK_APP_ROUTE = "main"
DJANGO_APP_ROUTE = "admin"

def publish():
    channel.basic_publish(
        exchange="",
        routing_key=FLASK_APP_ROUTE,
        body="hello from flask"
    )