import headToHeadData from "../data/headtohead.json";
import { Player, PlayersDataset } from "../models/player.model";

const dataset = headToHeadData as PlayersDataset;

export class PlayerRepository {
  private readonly players: Player[] = [...dataset.players];

  findAll(): Player[] {
    return [...this.players];
  }

  findById(id: number): Player | undefined {
    return this.players.find((player) => player.id === id);
  }

  create(player: Player): Player {
    this.players.push(player);

    return player;
  }

  existsById(id: number): boolean {
    return this.players.some((player) => player.id === id);
  }
}
