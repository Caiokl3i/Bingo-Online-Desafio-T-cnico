import 'dotenv/config';
import app from './app.js';
import { runMigrations } from "./database/runMigrations.js";

const PORT = process.env.PORT || 3000;

// Função de inicialização do servidor.
const startServer = async () => {
  try {
    console.log("🔄 Iniciando migrações...");

    // Garante que o banco esteja pronto antes de receber requisições
    await runMigrations();

    app.listen(PORT, () => {
      console.log(`🚀 Server is running on http://localhost:${PORT}`);
    });

  } catch (error) {
    console.error("❌ Erro fatal na inicialização:", error);
    process.exit(1); // Encerra o processo para reiniciar o container
  }
};

startServer();