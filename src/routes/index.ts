import { Hono } from "hono";

export const root = new Hono();

root.get("/", (c) => c.text("/"));
