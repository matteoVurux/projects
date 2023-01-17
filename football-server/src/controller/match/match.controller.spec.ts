import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryTokenMock } from '../../shared/mock/get-repository-token.mock';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Match } from '../../shared/entity/match.entity';
import { MATCH_REPOSITORY_MOCK } from '../../shared/mock/repository/match/match.repository.mock';
import { MatchController } from './match.controller';
import { MatchService } from '../../shared/service/match/match.service';
import { PlayerService } from '../../shared/service/player/player.service';
import { PlayerServiceMock } from '../../shared/service/player/player.service.mock';

describe(MatchController.name, () => {
    let controller: MatchController = new MatchController();

    beforeEach(async () => {
        const app: TestingModule = await Test.createTestingModule({
            controllers: [MatchController],
            providers: [
                MatchService,
                {
                    provide: PlayerService,
                    useClass: PlayerServiceMock
                },
                {
                    provide: getRepositoryToken(Match),
                    useValue: getRepositoryTokenMock(MATCH_REPOSITORY_MOCK)
                }
            ],
        }).compile();

        controller = app.get<MatchController>(MatchController);
    });

    it('should be defined', () => {
        expect(controller).toBeDefined();
    });

    describe(controller.get.name, () => {
        it('should not throw error', async () => {
            await expect(controller.get()).resolves.not.toThrow();
        });
    });

    describe(controller.insert.name, () => {
        it('should not throw error', async () => {
            await expect(controller.insert(MATCH_REPOSITORY_MOCK[0])).resolves.not.toThrow();
        });
    });

    describe(controller.update.name, () => {
        it('should not throw error', async () => {
            await expect(controller.update(MATCH_REPOSITORY_MOCK[0].slug, MATCH_REPOSITORY_MOCK[1])).resolves.not.toThrow();
        });
    });

    describe(controller.delete.name, () => {
        it('should not throw error', async () => {
            await expect(controller.delete(MATCH_REPOSITORY_MOCK[0].id)).resolves.not.toThrow();
        });
    });
});
