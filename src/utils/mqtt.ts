import { connect } from "mqtt";

export const mqtt = connect(process.env.MQTT_ADDRESS!, {
  username: process.env.MQTT_USERNAME,
  password: process.env.MQTT_PASSWORD,
  clientId: process.env.MQTT_CLIENT_ID,
});
