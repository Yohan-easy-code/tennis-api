"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.StatsService = void 0;
class StatsService {
    playerRepository;
    constructor(playerRepository) {
        this.playerRepository = playerRepository;
    }
    getStats() {
        return {
            countryWithHighestWinRatio: this.getCountryWithHighestWinRatio(),
            averageBMI: this.getAverageBMI(),
            medianHeight: this.getMedianHeight(),
        };
    }
    getCountryWithHighestWinRatio() {
        const players = this.playerRepository.findAll();
        const countryStats = players.reduce((acc, player) => {
            const country = player.country.code;
            const wins = player.data.last.filter((result) => result === 1).length;
            const matches = player.data.last.length;
            if (!acc[country]) {
                acc[country] = {
                    wins: 0,
                    matches: 0,
                };
            }
            acc[country].wins += wins;
            acc[country].matches += matches;
            return acc;
        }, {});
        let bestCountry = "";
        let bestRatio = -1;
        for (const country in countryStats) {
            const ratio = countryStats[country].wins / countryStats[country].matches;
            if (ratio > bestRatio) {
                bestRatio = ratio;
                bestCountry = country;
            }
        }
        return bestCountry;
    }
    getAverageBMI() {
        const players = this.playerRepository.findAll();
        const totalBMI = players.reduce((sum, player) => {
            const weightKg = player.data.weight / 1000;
            const heightM = player.data.height / 100;
            const bmi = weightKg / (heightM * heightM);
            return sum + bmi;
        }, 0);
        const averageBMI = totalBMI / players.length;
        return Number(averageBMI.toFixed(2));
    }
    getMedianHeight() {
        const players = this.playerRepository.findAll();
        const heights = players
            .map((player) => player.data.height)
            .sort((a, b) => a - b);
        const middle = Math.floor(heights.length / 2);
        if (heights.length % 2 !== 0) {
            return heights[middle];
        }
        return (heights[middle - 1] + heights[middle]) / 2;
    }
}
exports.StatsService = StatsService;
