import { Request, Response } from "express";
import { PlayerService } from "../services/player.service";
import { playerSchema } from "../validators/player.validator";

export class PlayerController {
  constructor(private readonly playerService: PlayerService) {}

  getPlayers = (_req: Request, res: Response): void => {
    const players = this.playerService.getPlayers();

    res.status(200).json({
      data: players,
    });
  };

  getPlayerById = (req: Request, res: Response): void => {
    const id = Number(req.params.id);

    const player = this.playerService.getPlayerById(id);

    res.status(200).json({
      data: player,
    });
  };

  createPlayer = (req: Request, res: Response) => {
    playerSchema.parse(req.body);

    const player = this.playerService.createPlayer(req.body);

    res.status(201).json({
      data: player,
    });
  };
}
