import { Sub } from "@/types";
import { piCol } from "@/utils";
import { ObjectId } from "mongodb";

export const server = new Sub("server", async (payload) => {
  await piCol.findOneAndUpdate(
    { piId: payload.piId },
    {
      $setOnInsert: {
        _id: new ObjectId(payload.piId),
        uid: "",
        mode: "button",
        temperature: 0,
        on: false,
      },
      $set: {
        ...payload,
      },
    },
    { upsert: true },
  );
});
