import { Router } from "express";
import { StatsController } from "../controllers/stats.controller";
import { playerRepository } from "../config/dependencies";
import { StatsService } from "../services/stats.service";

const router = Router();

const statsService = new StatsService(playerRepository);
const statsController = new StatsController(statsService);

router.get("/", statsController.getStats);

export default router;
