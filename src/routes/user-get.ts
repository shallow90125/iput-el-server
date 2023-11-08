import { Alarm, PiDoc } from "@/types";
import { agenda } from "@/utils";
import { piCol } from "@/utils/db";
import { Hono } from "hono";

export const userGet = new Hono();

userGet.get("/user/:uid", async (c) => {
  const { uid } = c.req.param();

  const doc = await piCol.findOne({ uid: uid });

  if (!doc) return c.notFound();

  const data = (
    await agenda.jobs({ name: "alarm", "data.piId": doc.piId })
  ).map((job) => job.attrs.data) as Alarm[];

  const res: PiDoc & { alarms: Alarm[] } = { ...doc, alarms: data };

  return c.json(res);
});
