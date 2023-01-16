import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { MainModule } from '../src/main.module';
import { PLAYER_REPOSITORY_MOCK } from '../src/shared/mock/repository/player/player.repository.mock';
import { PlayerServiceInterface } from '../src/shared/service/player/player.service.interface';
import { PlayerService } from '../src/shared/service/player/player.service';

describe('Player (e2e)', () => {
  let app: INestApplication;
  let playerService: PlayerServiceInterface;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [MainModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();

    playerService = moduleFixture.get(PlayerService);
  });

  afterAll(async () => {
    await app.close();
  })

  describe('/player', () => {

    it('(GET) /', async () => {
      return request(app.getHttpServer())
        .get('/player')
        .expect(200)
    });

    it('(POST) /', async () => {
      return request(app.getHttpServer())
        .post('/player')
        .send({ name: PLAYER_REPOSITORY_MOCK[4].name })
        .expect(201)
        .then(async () => {
          await playerService.delete(PLAYER_REPOSITORY_MOCK[4].name)
        })
    });

    it('(GET) /:id', async () => {
      await playerService.insert(PLAYER_REPOSITORY_MOCK[3]);

      return request(app.getHttpServer())
        .get(`/player/${PLAYER_REPOSITORY_MOCK[3].id}`)
        .expect(200)
        .expect(JSON.stringify(await playerService.getByPlayerId(PLAYER_REPOSITORY_MOCK[3].id)))
        .then(async () => {
          await playerService.delete(PLAYER_REPOSITORY_MOCK[3].name)
        })
    });

    it('(PATCH) /:name', async () => {
      await playerService.insert(PLAYER_REPOSITORY_MOCK[3]);

      return request(app.getHttpServer())
        .patch(`/player/${PLAYER_REPOSITORY_MOCK[3].name}`)
        .send({ name: PLAYER_REPOSITORY_MOCK[4].name })
        .expect(200)
        .then(async () => {
          await playerService.delete(PLAYER_REPOSITORY_MOCK[4].name)
        })
    });

    it('(DELETE) /:name', async () => {
      await playerService.insert(PLAYER_REPOSITORY_MOCK[4]);

      return request(app.getHttpServer())
        .delete(`/player/${PLAYER_REPOSITORY_MOCK[4].name}`)
        .expect(200)
    });
  })
});
