import fs from "fs";
import path from "path";
import { fileURLToPath } from 'url';
import db from "./db.js";

// Configuração para uso de caminhos em ES Modules (__dirname).
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Lê e executa o script SQL inicial para criar ou verificar as tabelas do banco.
export async function runMigrations() {
  const migrationPath = path.resolve(__dirname, "migrations", "init.sql");

  console.log(`📂 Lendo arquivo de migração em: ${migrationPath}`);

  try {
    const migration = fs.readFileSync(migrationPath, "utf-8");

    // Executa as instruções SQL e aguarda a conclusão antes de prosseguir
    await db.exec(migration);
    
    console.log("✅ Banco de dados criado/verificado com sucesso!");
  } catch (error) {
    console.error("❌ Erro ao executar migração:", error);
    throw error; // Propaga o erro para impedir a inicialização do servidor
  }
}