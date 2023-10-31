import * as routes from "@/routes";
import * as subs from "@/subs";
import { config, mqtt } from "@/utils";
import { serve } from "@hono/node-server";
import { Hono } from "hono";
import { logger } from "hono/logger";

const app = new Hono();

app.use("*", logger());
app.onError((error, c) => {
  console.error(error);
  return c.text(error.message, 500);
});

(Object.keys(routes) as (keyof typeof routes)[]).map((key) =>
  app.route("/", routes[key]),
);

mqtt.on("message", (topic, payload) => {
  (Object.keys(subs) as (keyof typeof subs)[]).map((key) => {
    if (topic === key) subs[key].callback(payload);
  });
});

serve(
  { ...app, hostname: config.host.address, port: config.host.port },
  (info) => {
    console.log(`http://${info.address}:${info.port}`);
  },
);
