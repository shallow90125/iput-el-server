import * as routes from "@/routes";
import * as subs from "@/subs";
import { agenda, config, mqtt } from "@/utils";
import { serve } from "@hono/node-server";
import { Hono } from "hono";
import { logger } from "hono/logger";

(async () => {
  await agenda.start();

  const app = new Hono();

  app.use("*", logger());
  app.onError((error, c) => {
    console.error(error);
    return c.text(error.message, 500);
  });

  (Object.keys(routes) as (keyof typeof routes)[]).map((key) =>
    app.route("/", routes[key]),
  );

  (Object.keys(subs) as (keyof typeof subs)[]).map((key) =>
    mqtt.subscribe(key),
  );

  mqtt.on("connect", () => {
    console.log();
  });

  mqtt.on("message", (topic, payload) => {
    (Object.keys(subs) as (keyof typeof subs)[]).map((key) => {
      if (topic === key) {
        console.log(
          `[${new Date().toLocaleTimeString()}] Sub "${topic}": Received`,
        );
        return subs[key].callback(payload);
      }
    });
  });

  serve(
    { ...app, hostname: config.host.address, port: config.host.port },
    (info) => {
      console.log(
        `[${new Date().toLocaleTimeString()}] http://${info.address}:${
          info.port
        }/`,
      );
    },
  );
})();
