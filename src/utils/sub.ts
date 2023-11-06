import { SubTopic } from "@/types";
import { mqtt } from "./mqtt";

export function sub<K extends keyof SubTopic>(topic: K) {
  mqtt.subscribe(topic);
  console.log(
    `[${new Date().toLocaleTimeString()}] Sub "${topic}": Subscribed`,
  );
}

export function unsub<K extends keyof SubTopic>(topic: K) {
  mqtt.unsubscribe(topic);
  console.log(
    `[${new Date().toLocaleTimeString()}] Sub "${topic}": Unsubscribed`,
  );
}
