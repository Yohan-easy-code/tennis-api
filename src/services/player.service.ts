import { ConflictError } from "../errors/conflict-error";
import { NotFoundError } from "../errors/not-found-error";
import { Player } from "../models/player.model";
import { PlayerRepository } from "../repositories/player.repository";

export class PlayerService {
  constructor(private readonly playerRepository: PlayerRepository) {}

  getPlayers(): Player[] {
    return this.playerRepository
      .findAll()
      .sort((a, b) => a.data.rank - b.data.rank);
  }

  getPlayerById(id: number) {
    const player = this.playerRepository.findById(id);

    if (!player) {
      throw new NotFoundError("Player not found");
    }

    return player;
  }

  createPlayer(player: Player): Player {
    if (this.playerRepository.existsById(player.id)) {
      throw new ConflictError("Player already exists");
    }

    return this.playerRepository.create(player);
  }
}
