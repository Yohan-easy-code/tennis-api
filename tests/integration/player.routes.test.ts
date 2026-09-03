import request from "supertest";
import app from "../../src/app";
import { playerRepository } from "../../src/config/dependencies";

describe("Player routes", () => {
  beforeEach(() => {
    playerRepository.reset();
  });
  it("should return all players sorted by rank", async () => {
    const response = await request(app).get("/api/players").expect(200);

    expect(response.body.data).toHaveLength(5);

    expect(
      response.body.data.map(
        (player: { data: { rank: number } }) => player.data.rank,
      ),
    ).toEqual([1, 2, 10, 21, 52]);
  });

  it("should return a player by id", async () => {
    const response = await request(app).get("/api/players/52").expect(200);

    expect(response.body.data.id).toBe(52);
    expect(response.body.data.firstname).toBe("Novak");
    expect(response.body.data.lastname).toBe("Djokovic");
  });

  it("should return 404 when player does not exist", async () => {
    const response = await request(app).get("/api/players/999").expect(404);

    expect(response.body.error.message).toBe("Player not found");
  });

  it("should create a new player", async () => {
    const newPlayer = {
      id: 1200,
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

    const response = await request(app)
      .post("/api/players")
      .send(newPlayer)
      .expect(201);

    expect(response.body.data.id).toBe(1200);
    expect(response.body.data.firstname).toBe("Roger");
  });

  it("should return 409 when player id already exists", async () => {
    const existingPlayer = {
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

    const response = await request(app)
      .post("/api/players")
      .send(existingPlayer)
      .expect(409);

    expect(response.body.error.message).toBe("Player already exists");
  });

  it("should include a newly created player in stats", async () => {
    const newPlayer = {
      id: 1300,
      firstname: "Test",
      lastname: "Player",
      shortname: "T.PLA",
      sex: "M",
      country: {
        picture: "https://example.com/srb.png",
        code: "SRB",
      },
      picture: "https://example.com/player.png",
      data: {
        rank: 100,
        points: 100,
        weight: 100000,
        height: 200,
        age: 30,
        last: [0, 0, 0, 0, 0],
      },
    };

    await request(app).post("/api/players").send(newPlayer).expect(201);

    const response = await request(app).get("/api/stats").expect(200);

    expect(response.body.data.countryWithHighestWinRatio).toBe("SUI");
  });
});
