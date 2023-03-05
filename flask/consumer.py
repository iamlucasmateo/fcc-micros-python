import pika

from my_secrets import AMQP_URL


params = pika.URLParameters(AMQP_URL)
connection = pika.BlockingConnection(params)
channel = connection.channel()

channel.queue_declare(queue="main")


def callback(channel, method, properties, body):
    print("Received")
    print(body)

channel.basic_consume(queue="main", on_message_callback=callback)
print("Start consumings")
channel.start_consuming()
channel.close()