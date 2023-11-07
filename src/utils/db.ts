import { PiDoc } from "@/types/PiDoc";
import { MongoClient } from "mongodb";
import { config } from "./config";

export const db = new MongoClient(config.mongo.url, {
  auth: { username: config.mongo.username, password: config.mongo.password },
}).db(config.mongo.db);

export const piCol = db.collection<PiDoc>("pi");
