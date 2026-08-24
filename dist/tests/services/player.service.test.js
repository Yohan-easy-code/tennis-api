"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const player_repository_1 = require("../../src/repositories/player.repository");
const player_service_1 = require("../../src/services/player.service");
const conflict_error_1 = require("../../src/errors/conflict-error");
describe("PlayerService", () => {
    let repository;
    let service;
    beforeEach(() => {
        repository = new player_repository_1.PlayerRepository();
        service = new player_service_1.PlayerService(repository);
    });
    it("should return players sorted by rank", () => {
        const players = service.getPlayers();
        expect(players.map((player) => player.data.rank)).toEqual([
            1, 2, 10, 21, 52,
        ]);
    });
    it("should create a new player", () => {
        const player = {
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
        const player = {
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
        expect(() => service.createPlayer(player)).toThrow(conflict_error_1.ConflictError);
    });
});
