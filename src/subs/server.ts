import { Sub } from "@/types";
import { piCol } from "@/utils";
import { ObjectId } from "mongodb";

export const server = new Sub("server", async (payload) => {
  await piCol.findOneAndUpdate(
    { piId: payload.piId },
    {
      $set: {
        ...payload,
      },
      $setOnInsert: {
        _id: new ObjectId(payload.piId),
        piId: payload.piId,
        uid: "",
        mode: "button",
        temperature: 0,
        on: false,
      },
    },
    { upsert: true },
  );
});
