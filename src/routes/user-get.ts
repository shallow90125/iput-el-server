import { piCol } from "@/utils/db";
import { Hono } from "hono";

export const userGet = new Hono();

userGet.get("/user/:uid", async (c) => {
  const { uid } = c.req.param();

  const doc = await piCol.findOne({ uid: uid });

  if (!doc) return c.notFound();

  return c.json(doc);
});
