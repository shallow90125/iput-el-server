import { z } from "zod";

export const zAlarm = z.object({
  piId: z.string(),
  hour: z.number().gte(0).lte(23),
  minute: z.number().gte(0).lte(59),
  dayOfWeek: z.array(z.number().gte(0).lte(6)).max(7),
  isEnabled: z.boolean(),
  timezone: z.string(),
});

export type Alarm = z.infer<typeof zAlarm>;
