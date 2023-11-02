import { Alarm } from "@/types/Alarm";
import { Agenda } from "@hokify/agenda";
import { config } from "./config";
import { pub } from "./pub";

export const agenda = new Agenda({
  db: {
    address: config.mongo.address + config.mongo.db,
  },
});

agenda.define<Alarm>("alarm", async (job) => {
  if (!job.attrs.data.dayOfWeek.length) {
    job.attrs.data.isEnabled = false;
    job.disable();
  }

  await job.save();

  const piId = job.attrs.data.piId;
  pub("set", piId, { piId: piId, on: true });
});
