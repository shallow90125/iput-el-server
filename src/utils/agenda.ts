import { Alarm } from "@/types/Alarm";
import { Mode } from "@/types/Mode";
import { Agenda } from "@hokify/agenda";
import { piCol } from "./db";
import { zEnv } from "./env";
import { pub } from "./pub";

export const agenda = new Agenda({
  db: {
    address: `${zEnv.MONGO_PRIVATE_URL}/${zEnv.MONGO_DB}`,
    options: {
      authSource: "admin",
    },
  },
});

agenda.define<Alarm>("alarm", async (job) => {
  if (!job.attrs.data.dayOfWeek.length) {
    job.attrs.data.isEnabled = false;
    job.disable();
  }

  await job.save();

  const piId = job.attrs.data.piId;

  const rand = Math.floor(Math.random() * 2);

  let mode: Mode;

  switch (rand) {
    case 0:
      mode = "button";
      break;

    case 1:
      mode = "temperature";
      break;

    default:
      mode = "button";
      break;
  }

  pub("set", piId, { piId: piId, on: true, mode: mode });
  piCol.findOneAndUpdate({ piId: piId }, { $set: { on: true } });
});
