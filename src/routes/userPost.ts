import { piCol } from "@/utils/db";
import { zValidator } from "@hono/zod-validator";
import { Hono } from "hono";
import { z } from "zod";

export const userPost = new Hono();

userPost.post(
  "/user/:uid",
  zValidator(
    "json",
    z.object({
      piId: z.string(),
    }),
  ),
  async (c) => {
    const uid = c.req.param("uid");
    const { piId } = c.req.valid("json");
    console.log("piId");
    console.log(piId);

    const doc = await piCol.findOneAndUpdate(
      { piId: piId },
      { $set: { uid: uid } },
    );

    if (!doc) return c.notFound();

    return c.text("ok");
  },
);
