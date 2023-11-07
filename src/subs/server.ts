import { Sub } from "@/types";
import { piCol } from "@/utils";
import { ObjectId } from "mongodb";

export const server = new Sub("server", async (payload) => {
  const doc = await piCol.findOne({ piId: payload.piId });

  if (doc) {
    await piCol.updateOne(
      { piId: payload.piId },
      {
        $set: {
          ...payload,
        },
      },
    );
    return;
  }

  await piCol.insertOne({
    _id: new ObjectId(payload.piId),
    piId: payload.piId,
    uid: "",
    on: false,
    mode: "button",
    temperature: 0,
  });
});
