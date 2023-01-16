import { Test, TestingModule } from '@nestjs/testing';
import { PlayerService } from './player.service';
import { Player } from '../../entity/player.entity';
import { getRepositoryToken } from '@nestjs/typeorm';
import { getRepositoryTokenMock } from '../../mock/get-repository-token.mock';
import { PLAYER_REPOSITORY_MOCK } from '../../mock/repository/player/player.repository.mock';
import { TEAM_REPOSITORY_MOCK } from '../../mock/repository/team/team.repository.mock';
import { Team } from '../../entity/team.entity';

describe(PlayerService.name, () => {
  let service: PlayerService = new PlayerService();

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
      ],
      providers: [
        PlayerService,
        {
          provide: getRepositoryToken(Player),
          useValue: getRepositoryTokenMock(PLAYER_REPOSITORY_MOCK)
        },
        {
          provide: getRepositoryToken(Team),
          useValue: getRepositoryTokenMock(TEAM_REPOSITORY_MOCK)
        }
      ],
    }).compile();

    service = module.get<PlayerService>(PlayerService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe(service.get.name, () => {
    it('should not throw error', async () => {
      await expect(service.get()).resolves.not.toThrow();
    })
  });

  describe(service.getByPlayerId.name, () => {
    it('should not throw error', async () => {
      await expect(service.getByPlayerId(PLAYER_REPOSITORY_MOCK[0].id)).resolves.not.toThrow();
    })
  });

  describe(service.insert.name, () => {
    it('should not throw error', async () => {
      await expect(service.insert(PLAYER_REPOSITORY_MOCK[0])).resolves.not.toThrow();
    })
  });

  describe(service.update.name, () => {
    it('should not throw error', async () => {
      await expect(service.update(PLAYER_REPOSITORY_MOCK[0].name, PLAYER_REPOSITORY_MOCK[0])).resolves.not.toThrow();
    })
  });

  describe(service.delete.name, () => {
    it('should not throw error', async () => {
      await expect(service.delete(PLAYER_REPOSITORY_MOCK[0].name)).resolves.not.toThrow();
    })
  });

  describe(service.savePoints.name, () => {
    it('should not throw error', async () => {
      await expect(service.savePoints(PLAYER_REPOSITORY_MOCK[0].name, PLAYER_REPOSITORY_MOCK[1].points)).resolves.not.toThrow();
    })
  });

});
