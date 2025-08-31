import "dotenv/config";
import express from "express";
import cors from "cors";
import{ connectDB }from "./config/db.js";
import taskRoutes from "./routes/taskRoutes.js";
import startScheduler from "./utils/scheduler.js";

const app = express();

app.use(cors());
app.use(express.json());

// API routes
app.use("/api/tasks", taskRoutes);

// Optionally serve frontend (uncomment if deploying both together)
// import path from "path";
// import { fileURLToPath } from "url";
// const __filename = fileURLToPath(import.meta.url);
// const __dirname = path.dirname(__filename);
// app.use(express.static(path.join(__dirname, "../frontend")));
// app.get("*", (_req, res) => res.sendFile(path.join(__dirname, "../frontend/index.html")));

const PORT = process.env.PORT || 5000;

async function bootstrap() {
  await connectDB();
  startScheduler();
  app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
}

bootstrap();
