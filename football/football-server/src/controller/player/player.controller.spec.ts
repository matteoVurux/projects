import { Test, TestingModule } from '@nestjs/testing';
import { PlayerController } from './player.controller';
import { PlayerService } from '../../shared/service/player/player.service';
import { PLAYER_REPOSITORY_MOCK } from '../../shared/mock/repository/player/player.repository.mock';
import { getRepositoryTokenMock } from '../../shared/mock/get-repository-token.mock';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Player } from '../../shared/entity/player.entity';
import { TEAM_REPOSITORY_MOCK } from '../../shared/mock/repository/team/team.repository.mock';
import { Team } from '../../shared/entity/team.entity';

describe(PlayerController.name, () => {
  let controller: PlayerController = new PlayerController();

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [PlayerController],
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

    controller = app.get<PlayerController>(PlayerController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe(controller.get.name, () => {
    it('should not throw error', async () => {
      await expect(controller.get()).resolves.not.toThrow();
    });
  });

  describe(controller.getByPlayerId.name, () => {
    it('should not throw error', async () => {
      await expect(controller.getByPlayerId(PLAYER_REPOSITORY_MOCK[0].id)).resolves.not.toThrow();
    });
  });

  describe(controller.insert.name, () => {
    it('should not throw error', async () => {
      await expect(controller.insert(PLAYER_REPOSITORY_MOCK[0])).resolves.not.toThrow();
    });
  });

  describe(controller.update.name, () => {
    it('should not throw error', async () => {
      await expect(controller.update(PLAYER_REPOSITORY_MOCK[0].name, PLAYER_REPOSITORY_MOCK[1])).resolves.not.toThrow();
    });
  });

  describe(controller.delete.name, () => {
    it('should not throw error', async () => {
      await expect(controller.delete(PLAYER_REPOSITORY_MOCK[0].name)).resolves.not.toThrow();
    });
  });
});
