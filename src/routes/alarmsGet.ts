import { Alarm } from "@/types";
import { agenda, piCol } from "@/utils";
import { Hono } from "hono";

export const alarmsGet = new Hono();

alarmsGet.get("/alarms/:uid", async (c) => {
  const { uid } = c.req.param();

  const doc = await piCol.findOne({ uid: uid });

  if (!doc) return c.notFound();

  const data = (
    await agenda.jobs({ name: "alarm", "data.piId": doc.piId })
  ).map((job) => job.attrs.data) as Alarm[];

  return c.json(data);
});
