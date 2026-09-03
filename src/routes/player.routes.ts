import { Router } from "express";
import { PlayerController } from "../controllers/player.controller";
import { playerRepository } from "../config/dependencies";
import { PlayerService } from "../services/player.service";

const router = Router();

const playerService = new PlayerService(playerRepository);
const playerController = new PlayerController(playerService);

router.get("/", playerController.getPlayers);

router.get("/:id", playerController.getPlayerById);

router.post("/", playerController.createPlayer);

export default router;
