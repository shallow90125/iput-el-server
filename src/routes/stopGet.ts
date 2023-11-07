import { piCol, pub } from "@/utils";
import { Hono } from "hono";

export const stopGet = new Hono();

stopGet.get("/stop/:uid", async (c) => {
  const { uid } = c.req.param();

  const doc = await piCol.findOne({ uid: uid });

  if (!doc) return c.notFound();

  pub("set", doc.piId, { piId: doc.piId, on: false, mode: "button" });

  return c.text("ok");
});
