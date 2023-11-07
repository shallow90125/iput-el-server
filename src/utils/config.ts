import "dotenv/config";

export const config = {
  host: {
    address: process.env.ADDRESS!,
    port: Number(process.env.PORT!),
  },
  mqtt: {
    address: process.env.MQTT_ADDRESS!,
    username: process.env.MQTT_USERNAME!,
    password: process.env.MQTT_PASSWORD!,
    clientId: process.env.MQTT_CLIENT_ID!,
  },
  mongo: {
    address: process.env.MONGO_PRIVATE_URL!,
    db: process.env.MONGO_DB!,
  },
};
