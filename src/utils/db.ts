import { PiDoc } from "@/types";
import { MongoClient } from "mongodb";
import { zEnv } from "./env";

export const db = new MongoClient(zEnv.MONGO_PRIVATE_URL, {
  authSource: "admin",
}).db(zEnv.MONGO_DB);

export const piCol = db.collection<PiDoc>("pi");
