import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Player } from '../entity/player.entity';
import { Match } from '../entity/match.entity';
import { PlayerService } from '../service/player/player.service';
import { Team } from '../entity/team.entity';
import { TeamSpec } from '../entity/team_spec.entity';

@Module({
    imports: [
        TypeOrmModule.forFeature([
            Player,
            Match,
            Team,
            TeamSpec
        ]),
        ConfigModule.forRoot(),
    ],
    providers: [
        PlayerService
    ],
    exports: [
        TypeOrmModule.forFeature([
            Player,
            Match,
            Team,
            TeamSpec
        ]),
        ConfigModule.forRoot(),
    ]
})
export class SharedModule { }