import 'dotenv/config';
import app from './app.js';
import { runMigrations } from "./database/runMigrations.js";

runMigrations();

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});