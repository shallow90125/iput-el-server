import { Alarm } from "@/types";
import { agenda } from "@/utils";
import { Hono } from "hono";

export const alarmsGet = new Hono();

alarmsGet.get("/alarms/:piId", async (c) => {
  const { piId } = c.req.param();

  const data = (await agenda.jobs({ name: "alarm", "data.piId": piId })).map(
    (job) => job.attrs.data,
  ) as Alarm[];

  return c.json(data);
});
