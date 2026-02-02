import fs from "fs";
import path from "path";
import db from "./db.js";

export function runMigrations() {
  const migration = fs.readFileSync(
    path.resolve("src/database/migrations/init.sql"),
    "utf-8"
  );

  db.exec(migration);
  console.log("Banco criado / verificado com sucesso");
}