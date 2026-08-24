"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PlayerService = void 0;
const conflict_error_1 = require("../errors/conflict-error");
const not_found_error_1 = require("../errors/not-found-error");
class PlayerService {
    playerRepository;
    constructor(playerRepository) {
        this.playerRepository = playerRepository;
    }
    getPlayers() {
        return this.playerRepository
            .findAll()
            .sort((a, b) => a.data.rank - b.data.rank);
    }
    getPlayerById(id) {
        const player = this.playerRepository.findById(id);
        if (!player) {
            throw new not_found_error_1.NotFoundError("Player not found");
        }
        return player;
    }
    createPlayer(player) {
        if (this.playerRepository.existsById(player.id)) {
            throw new conflict_error_1.ConflictError("Player already exists");
        }
        return this.playerRepository.create(player);
    }
}
exports.PlayerService = PlayerService;
