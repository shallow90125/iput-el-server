import { pub } from "@/utils";
import { Hono } from "hono";

export const stopPost = new Hono();

stopPost.get("/pi/:piId/stop", async (c) => {
  const { piId } = c.req.param();

  pub("set", piId, { piId: piId, on: false, mode: "button" });

  return c.text("ok");
});
