import { PiDoc } from "@/types/PiDoc";
import { MongoClient } from "mongodb";
import { config } from "./config";

export const db = new MongoClient(config.mongo.address).db(config.mongo.db);

export const piCol = db.collection<PiDoc>("pi");
