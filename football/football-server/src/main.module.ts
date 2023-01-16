import { Module } from '@nestjs/common';
import { PlayerController } from './controller/player/player.controller';
import { PlayerService } from './shared/service/player/player.service';
import { Match } from './shared/entity/match.entity';
import { Player } from './shared/entity/player.entity';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DataSourceOptions } from 'typeorm';
import { SharedModule } from './shared/module/shared.module';
import { MatchController } from './controller/match/match.controller';
import { MatchService } from './shared/service/match/match.service';
import { Team } from './shared/entity/team.entity';
import { TeamSpec } from './shared/entity/team_spec.entity';

@Module({
  imports: [
    SharedModule,
    ConfigModule.forRoot({
      isGlobal: true
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        type: 'mariadb',
        host: process.env.MARIADB_HOST,
        port: Number(process.env.MARIADB_PORT),
        username: process.env.MARIADB_USER,
        password: process.env.MARIADB_PASS,
        database: process.env.MARIADB_NAME,
        entities: [
          Team,
          Player,
          Match,
          TeamSpec
        ],
        synchronize: true,
      } as DataSourceOptions),
      inject: [ConfigService],
    }),
  ],
  controllers: [
    PlayerController,
    MatchController
  ],
  providers: [
    PlayerService,
    MatchService
  ],
})
export class MainModule { }
