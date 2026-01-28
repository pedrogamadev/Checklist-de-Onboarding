import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { taskRoutes } from "./routes/task.routes";

dotenv.config();

const app = express();
const port = Number(process.env.PORT) || 3000;

app.use(cors());
app.use(express.json());

app.use("/tasks", taskRoutes);

app.listen(port, "0.0.0.0", () => {
  console.log(`Servidor rodando em http://0.0.0.0:${port}`);
});
