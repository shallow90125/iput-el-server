import { PiDoc } from "./PiDoc";

export interface PubTopic {
  set: Pick<PiDoc, "piId" | "on" | "mode">;
}

export interface SubTopic {
  server: Partial<PiDoc> & Pick<PiDoc, "piId">;
}
