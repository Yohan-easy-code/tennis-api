"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PlayerController = void 0;
const player_validator_1 = require("../validators/player.validator");
class PlayerController {
    playerService;
    constructor(playerService) {
        this.playerService = playerService;
    }
    getPlayers = (_req, res) => {
        const players = this.playerService.getPlayers();
        res.status(200).json({
            data: players,
        });
    };
    getPlayerById = (req, res) => {
        const id = Number(req.params.id);
        const player = this.playerService.getPlayerById(id);
        res.status(200).json({
            data: player,
        });
    };
    createPlayer = (req, res) => {
        player_validator_1.playerSchema.parse(req.body);
        const player = this.playerService.createPlayer(req.body);
        res.status(201).json({
            data: player,
        });
    };
}
exports.PlayerController = PlayerController;
