import { z } from "zod";

export interface Alarm {
  piId: string;
  hour: number;
  minute: number;
  dayOfWeek: number[];
  isEnabled: boolean;
  timezone: string;
}

export const zAlarm = z.object({
  piId: z.string(),
  hour: z.number().gte(0).lte(23),
  minute: z.number().gte(0).lte(59),
  dayOfWeek: z.array(z.number().gte(0).lte(6)).max(7),
  isEnabled: z.boolean(),
  timezone: z.string(),
});
