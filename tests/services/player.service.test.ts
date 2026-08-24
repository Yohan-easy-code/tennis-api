import { PlayerRepository } from "../../src/repositories/player.repository";
import { PlayerService } from "../../src/services/player.service";
import { Player } from "../../src/models/player.model";
import { ConflictError } from "../../src/errors/conflict-error";

describe("PlayerService", () => {
  let repository: PlayerRepository;
  let service: PlayerService;

  beforeEach(() => {
    repository = new PlayerRepository();
    service = new PlayerService(repository);
  });

  it("should return players sorted by rank", () => {
    const players = service.getPlayers();

    expect(players.map((player) => player.data.rank)).toEqual([
      1, 2, 10, 21, 52,
    ]);
  });

  it("should create a new player", () => {
    const player: Player = {
      id: 999,
      firstname: "Roger",
      lastname: "Federer",
      shortname: "R.FED",
      sex: "M",
      country: {
        picture: "https://example.com/sui.png",
        code: "SUI",
      },
      picture: "https://example.com/federer.png",
      data: {
        rank: 3,
        points: 3500,
        weight: 85000,
        height: 185,
        age: 41,
        last: [1, 1, 1, 0, 1],
      },
    };

    const createdPlayer = service.createPlayer(player);

    expect(createdPlayer.id).toBe(999);
    expect(createdPlayer.firstname).toBe("Roger");
  });

  it("should throw ConflictError when player id already exists", () => {
    const player: Player = {
      id: 52,

      firstname: "Roger",

      lastname: "Federer",

      shortname: "R.FED",

      sex: "M",

      country: {
        picture: "https://example.com/sui.png",

        code: "SUI",
      },

      picture: "https://example.com/federer.png",

      data: {
        rank: 3,

        points: 3500,

        weight: 85000,

        height: 185,

        age: 41,

        last: [1, 1, 1, 0, 1],
      },
    };

    expect(() => service.createPlayer(player)).toThrow(ConflictError);
  });
});
