import { Router } from "express";
import { StatsController } from "../controllers/stats.controller";
import { PlayerRepository } from "../repositories/player.repository";
import { StatsService } from "../services/stats.service";

const router = Router();

const playerRepository = new PlayerRepository();
const statsService = new StatsService(playerRepository);
const statsController = new StatsController(statsService);

router.get("/", statsController.getStats);

export default router;
