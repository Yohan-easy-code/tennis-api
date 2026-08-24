"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.StatsController = void 0;
class StatsController {
    statsService;
    constructor(statsService) {
        this.statsService = statsService;
    }
    getStats = (_req, res) => {
        const stats = this.statsService.getStats();
        res.status(200).json({
            data: stats,
        });
    };
}
exports.StatsController = StatsController;
