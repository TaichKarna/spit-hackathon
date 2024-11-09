from influxdb_client import InfluxDBClient
from src.config import Config

# Initialize InfluxDB client
client = InfluxDBClient(
    url=Config.INFLUXDB_URL,
    token=Config.INFLUXDB_TOKEN,
    org=Config.INFLUXDB_ORG
)

bucket = Config.INFLUXDB_BUCKET

def get_write_api():
    return client.write_api()

def get_query_api():
    return client.query_api()
