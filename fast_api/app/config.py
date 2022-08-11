from configparser import ConfigParser

config = ConfigParser()
config.read("mysql.env")
# print(config.__dict__)
print(config.sections())
# mysql_config = config["mysql-dev"].sections()