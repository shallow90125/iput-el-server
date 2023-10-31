import { Agenda } from "@hokify/agenda";
import { config } from "./config";

export const agenda = new Agenda({
  db: {
    address: config.mongo.address + config.mongo.db,
  },
});
