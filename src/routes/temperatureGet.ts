import { PiDoc } from "@/types/PiDoc";
import { piCol } from "@/utils";
import { Hono } from "hono";

export const temperatureGet = new Hono();

temperatureGet.get("/temperature/:uid", async (c) => {
  const { uid } = c.req.param();
  const doc = await piCol.findOne({ uid: uid });

  if (!doc) return c.notFound();

  const res: Pick<PiDoc, "on" | "temperature"> = {
    on: doc.on,
    temperature: doc.temperature,
  };

  return c.json(res);
});
