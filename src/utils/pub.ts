import { PubTopic } from "@/types";
import { mqtt } from "./mqtt";

export function pub<K extends keyof PubTopic>(topic: K, payload: PubTopic[K]) {
  mqtt.publish("topic", JSON.stringify(payload));
}
