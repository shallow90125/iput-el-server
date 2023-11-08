import { PiDoc } from "@/types";
import { piCol } from "@/utils";
import { Hono } from "hono";

export const temperatureGet = new Hono();

temperatureGet.get("/pi/:piId/temperature", async (c) => {
  const { piId } = c.req.param();
  const doc = await piCol.findOne({ piId: piId });

  if (!doc) return c.notFound();

  const res: Pick<PiDoc, "on" | "temperature"> = {
    on: doc.on,
    temperature: doc.temperature,
  };

  return c.json(res);
});
