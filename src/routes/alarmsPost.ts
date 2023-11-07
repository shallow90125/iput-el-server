import { Alarm, zAlarm } from "@/types";
import { agenda, piCol } from "@/utils";
import { zValidator } from "@hono/zod-validator";
import { Hono } from "hono";
import { z } from "zod";

export const alarmsPost = new Hono();

alarmsPost.post(
  "/alarms/:uid",
  zValidator("json", z.array(zAlarm)),
  async (c) => {
    const { uid } = c.req.param();
    const alarms: Alarm[] = c.req.valid("json");

    const doc = await piCol.findOne({ uid: uid });

    if (!doc) return c.notFound();

    await agenda.cancel({ "data.piId": doc.piId });

    alarms.forEach(async (alarm) => {
      const job = agenda.create<Alarm>("alarm", alarm);

      const cron = [];
      cron.push(String(alarm.minute));
      cron.push(String(alarm.hour));
      cron.push("*");
      cron.push("*");
      cron.push(alarm.dayOfWeek.length ? alarm.dayOfWeek.join(",") : "*");

      job.repeatEvery(cron.join(" "), { timezone: alarm.timezone });
      if (!alarm.isEnabled) job.disable();

      await job.save();
    });

    return c.text("ok");
  },
);
