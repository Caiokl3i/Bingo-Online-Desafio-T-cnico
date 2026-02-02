import sqlite3 from "sqlite3";
import { open } from "sqlite";
import path from "path";

const db = await open({
  filename: path.resolve("./src/database/bingoDB.db"),
  driver: sqlite3.Database,
});

export default db;