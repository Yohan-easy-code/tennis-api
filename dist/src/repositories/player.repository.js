"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PlayerRepository = void 0;
const headtohead_json_1 = __importDefault(require("../data/headtohead.json"));
const dataset = headtohead_json_1.default;
class PlayerRepository {
    players = [...dataset.players];
    findAll() {
        return [...this.players];
    }
    findById(id) {
        return this.players.find((player) => player.id === id);
    }
    create(player) {
        this.players.push(player);
        return player;
    }
    existsById(id) {
        return this.players.some((player) => player.id === id);
    }
}
exports.PlayerRepository = PlayerRepository;
