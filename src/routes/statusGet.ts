import { piCol } from "@/utils";
import { Hono } from "hono";

export const statusGet = new Hono();

statusGet.get("/status/:piId", async (c) => {
  const { piId } = c.req.param();

  const doc = await piCol.findOne({ piId: piId });

  if (!doc) return c.notFound();

  return c.json(doc);
});
