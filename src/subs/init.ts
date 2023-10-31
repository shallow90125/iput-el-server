import { Sub } from "@/types";
import { PiDoc } from "@/types/PiDoc";
import { piCol, pub } from "@/utils";
import { ObjectId, WithId } from "mongodb";

export const init = new Sub("init", async (payload) => {
  let doc: WithId<PiDoc> | null = null;

  if (payload.piId) {
    doc = await piCol.findOne({ piId: payload.piId });
  }

  if (doc) {
    pub("set", doc.piId, doc);
    return;
  }

  const id = new ObjectId();
  const newDoc: WithId<PiDoc> = { _id: id, piId: id.toString(), on: false };

  await piCol.insertOne(newDoc);

  pub("set", id.toString(), newDoc);
});
