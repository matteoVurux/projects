import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { MainModule } from '../src/main.module';
import { PLAYER_REPOSITORY_MOCK } from '../src/shared/mock/repository/player/player.repository.mock';
import { PlayerServiceInterface } from '../src/shared/service/player/player.service.interface';
import { PlayerService } from '../src/shared/service/player/player.service';
import { MatchServiceInterface } from '../src/shared/service/match/match.service.interface';
import { MatchService } from '../src/shared/service/match/match.service';
import { MATCH_REPOSITORY_MOCK } from '../src/shared/mock/repository/match/match.repository.mock';

describe('Match (e2e)', () => {
    let app: INestApplication;
    let matchService: MatchServiceInterface;
    let playerService: PlayerServiceInterface;

    beforeEach(async () => {
        const moduleFixture: TestingModule = await Test.createTestingModule({
            imports: [MainModule],
        }).compile();

        app = moduleFixture.createNestApplication();
        await app.init();

        matchService = moduleFixture.get(MatchService);
        playerService = moduleFixture.get(PlayerService);
    });

    afterAll(async () => {
        await app.close();
    })

    describe('/match', () => {
        it('(GET) /', async () => {
            return request(app.getHttpServer())
                .get('/match')
                .expect(200)
        });

        it('(POST) /', async () => {
            await playerService.insert(PLAYER_REPOSITORY_MOCK[0]);
            await playerService.insert(PLAYER_REPOSITORY_MOCK[1]);

            return request(app.getHttpServer())
                .post('/match')
                .send(MATCH_REPOSITORY_MOCK[0])
                .expect(201)
                .then(async () => {
                    await matchService.delete(MATCH_REPOSITORY_MOCK[0].slug);

                    await playerService.delete(PLAYER_REPOSITORY_MOCK[0].name);
                    await playerService.delete(PLAYER_REPOSITORY_MOCK[1].name)
                })
        });

        it('(PATCH) /:slug', async () => {
            await playerService.insert(PLAYER_REPOSITORY_MOCK[0]);
            await playerService.insert(PLAYER_REPOSITORY_MOCK[1]);

            await matchService.insert(MATCH_REPOSITORY_MOCK[0]);

            return request(app.getHttpServer())
                .patch(`/match/${MATCH_REPOSITORY_MOCK[0].slug}`)
                .send(MATCH_REPOSITORY_MOCK[1])
                .expect(200)
                .then(async () => {
                    await matchService.delete(MATCH_REPOSITORY_MOCK[1].slug);

                    await playerService.delete(PLAYER_REPOSITORY_MOCK[0].name);
                    await playerService.delete(PLAYER_REPOSITORY_MOCK[1].name);
                })
        });

        it('(DELETE) /:slug', async () => {
            await playerService.insert(PLAYER_REPOSITORY_MOCK[0]);
            await playerService.insert(PLAYER_REPOSITORY_MOCK[1]);

            await matchService.insert(MATCH_REPOSITORY_MOCK[0]);

            return request(app.getHttpServer())
                .delete(`/match/${MATCH_REPOSITORY_MOCK[0].slug}`)
                .expect(200)
                .then(async () => {
                    await playerService.delete(PLAYER_REPOSITORY_MOCK[0].name);
                    await playerService.delete(PLAYER_REPOSITORY_MOCK[1].name);
                })
        });

    })
});
