import { Mode } from "./Mode";

export interface PiDoc {
  temperature: number;
  mode: Mode;
  piId: string;
  uid: string;
  on: boolean;
}
