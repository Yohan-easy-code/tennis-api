import { PlayerRepository } from "../../src/repositories/player.repository";
import { StatsService } from "../../src/services/stats.service";

describe("StatsService", () => {
  let repository: PlayerRepository;
  let service: StatsService;

  beforeEach(() => {
    repository = new PlayerRepository();
    service = new StatsService(repository);
  });

  it("should return the country with the highest win ratio", () => {
    const stats = service.getStats();

    expect(stats.countryWithHighestWinRatio).toBe("SRB");
  });

  it("should calculate the average BMI", () => {
    const stats = service.getStats();

    expect(stats.averageBMI).toBeCloseTo(23.36, 2);
  });

  it("should calculate the median height", () => {
    const stats = service.getStats();

    expect(stats.medianHeight).toBe(185);
  });
});
