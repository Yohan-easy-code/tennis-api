import cors from "cors";
import express from "express";
import helmet from "helmet";
import playerRoutes from "./routes/player.routes";
import statsRoutes from "./routes/stats.routes";
import swaggerUi from "swagger-ui-express";
import { swaggerDocument } from "./config/swagger";

const app = express();

app.use(helmet());
app.use(cors());
app.use(express.json());

app.get("/health", (_req, res) => {
  res.status(200).json({
    status: "ok",
  });
});

import { errorMiddleware } from "./middlewares/error.middleware";

app.use("/api/players", playerRoutes);
app.use("/api/stats", statsRoutes);
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.use(errorMiddleware);
export default app;
