export interface PiDoc {
  temperature: number;
  mode: Mode;
  piId: string;
  uid: string;
  on: boolean;
}

export type Mode = "button" | "temperature";
