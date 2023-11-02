import { PubTopic } from "@/types";
import { mqtt } from "./mqtt";

export function pub<K extends keyof PubTopic>(
  topic: K,
  piId: string,
  payload: PubTopic[K],
) {
  mqtt.publish(`${topic}/${piId}`, JSON.stringify(payload), (error) => {
    if (error) {
      console.log(
        `[${new Date().toLocaleTimeString()}] Pub "${topic}/${piId}": Failed`,
      );
    } else {
      console.log(
        `[${new Date().toLocaleTimeString()}] Pub "${topic}/${piId}": Succeeded`,
      );
    }
  });
}
