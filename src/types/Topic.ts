import { AlarmDoc } from "./Alarm";

export interface PubTopic {
  temperature: AlarmDoc;
}

export interface SubTopic {
  temperature: string;
  status: boolean;
}
