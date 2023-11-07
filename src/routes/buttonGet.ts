import { PiDoc } from "@/types/PiDoc";
import { piCol } from "@/utils";
import { Hono } from "hono";

export const buttonGet = new Hono();

buttonGet.get("/button/:uid", async (c) => {
  const { uid } = c.req.param();
  const doc = await piCol.findOne({ uid: uid });

  if (!doc) return c.notFound();

  const res: Pick<PiDoc, "on"> = {
    on: doc.on,
  };

  return c.json(res);
});
