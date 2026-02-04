import sqlite3 from "sqlite3";
import { open } from "sqlite";
import path from "path";
import { fileURLToPath } from 'url';

// Configuração de caminhos para ES Modules (necessário para localizar o arquivo .db corretamente).
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Inicializa a conexão com o banco SQLite, garantindo que o arquivo seja salvo na mesma pasta deste script.
const db = await open({
  filename: path.resolve(__dirname, "bingoDB.db"),
  driver: sqlite3.Database,
});

export default db;