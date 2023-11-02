import { Sub } from "@/types";
import { PiDoc } from "@/types/PiDoc";
import { piCol, pub } from "@/utils";
import { ObjectId, WithId } from "mongodb";

export const server = new Sub("server", async (payload) => {
  let doc: WithId<PiDoc> | null = null;

  if (payload.piId) {
    doc = await piCol.findOne({ piId: payload.piId });
  }

  if (doc) {
    await piCol.updateOne({ _id: new ObjectId(doc._id) }, { on: payload.on });
    return;
  }

  const id = payload.piId;
  const newDoc: WithId<PiDoc> = {
    _id: new ObjectId(payload.piId),
    piId: payload.piId,
    on: payload.on,
  };

  await piCol.insertOne(newDoc);

  pub("set", id.toString(), newDoc);
});
