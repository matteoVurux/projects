import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { getRepositoryTokenMock } from '../../mock/get-repository-token.mock';
import { Match } from '../../entity/match.entity';
import { MATCH_REPOSITORY_MOCK } from '../../mock/repository/match/match.repository.mock';
import { MatchService } from './match.service';
import { PlayerService } from '../player/player.service';
import { Player } from '../../entity/player.entity';
import { PLAYER_REPOSITORY_MOCK } from '../../mock/repository/player/player.repository.mock';
import { PlayerServiceMock } from '../player/player.service.mock';

describe(MatchService.name, () => {
    let service: MatchService = new MatchService();

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            imports: [
            ],
            providers: [
                MatchService,
                {
                    provide: PlayerService,
                    useClass: PlayerServiceMock
                },
                {
                    provide: getRepositoryToken(Match),
                    useValue: getRepositoryTokenMock(MATCH_REPOSITORY_MOCK)
                },
                {
                    provide: getRepositoryToken(Player),
                    useValue: getRepositoryTokenMock(PLAYER_REPOSITORY_MOCK)
                }
            ],
        }).compile();

        service = module.get<MatchService>(MatchService);
    });

    it('should be defined', () => {
        expect(service).toBeDefined();
    });

    describe(service.get.name, () => {
        it('should not throw error', async () => {
            await expect(service.get()).resolves.not.toThrow();
        })
    });

    describe(service.insert.name, () => {
        it('should not throw error', async () => {
            await expect(service.insert(MATCH_REPOSITORY_MOCK[0])).resolves.not.toThrow();
        })
    });

    describe(service.update.name, () => {
        it('should not throw error', async () => {
            await expect(service.update(MATCH_REPOSITORY_MOCK[0].id, MATCH_REPOSITORY_MOCK[0])).resolves.not.toThrow();
        })
    });

    describe(service.delete.name, () => {
        it('should not throw error', async () => {
            await expect(service.delete(MATCH_REPOSITORY_MOCK[0].slug)).resolves.not.toThrow();
        })
    });

});
