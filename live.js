import express from "express";
import fs from "fs";
import { fileURLToPath } from "url";
import { dirname, join as JoinPath } from "path";
import generate from "./generate.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();

const pages = await generate((index) => {
	return `?p=${index}`;
  }, JSON.parse(fs.readFileSync("dump.json")));

app.get("/", (req, res) => {
  return res.send("<!DOCTYPE html>\n" + pages[req.query.p ? parseInt(req.query.p) : 0]);
});

app.get("/styles.css", (req, res) => {
  console.log("styles");
  return res.sendFile(JoinPath(__dirname, "/styles.css"));
});

app.listen(3000, () => {
  console.log("server started");
});
