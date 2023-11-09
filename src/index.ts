import * as routes from "@/routes";
import * as subs from "@/subs";
import { agenda, mqtt, zEnv } from "@/utils";
import { serve } from "@hono/node-server";
import { Hono } from "hono";
import { logger } from "hono/logger";
import { RegExpRouter } from "hono/router/reg-exp-router";
import { sub } from "./utils/sub";

(async () => {
  await agenda.start();

  const app = new Hono({ router: new RegExpRouter() });

  app.use("*", logger());
  // app.use("*", bearerAuth({ token: zEnv.TOKEN }));
  // app.use("*", cors({ origin: [zEnv.APP_URL] }));
  app.onError((error, c) => {
    console.error(error);
    return c.text(error.message, 500);
  });

  (Object.keys(routes) as (keyof typeof routes)[]).map((key) =>
    app.route("/", routes[key]),
  );

  (Object.keys(subs) as (keyof typeof subs)[]).map((key) => sub(key));

  mqtt.on("connect", () => {
    console.log(`[${new Date().toLocaleTimeString()}] ${zEnv.MQTT_URL}`);
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

  serve({ ...app, hostname: zEnv.ADDRESS, port: Number(zEnv.PORT) }, (info) => {
    console.log(
      `[${new Date().toLocaleTimeString()}] http://${info.address}:${
        info.port
      }`,
    );
  });
})();
