import { PiDoc } from "@/types";
import { piCol } from "@/utils";
import { Hono } from "hono";

export const buttonGet = new Hono();

buttonGet.get("/pi/:piId/button", async (c) => {
  const { piId } = c.req.param();
  const doc = await piCol.findOne({ piId: piId });

  if (!doc) return c.notFound();

  const res: Pick<PiDoc, "on"> = {
    on: doc.on,
  };

  return c.json(res);
});
