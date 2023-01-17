import { IsDefined, IsString, IsUUID, IsNumber } from 'class-validator';
import { Column, Entity, PrimaryGeneratedColumn, OneToOne } from 'typeorm';
import { PlayerInterface } from '../interface/player.interface';
import { ApiProperty, OmitType } from '@nestjs/swagger';
import { PLAYER_REPOSITORY_MOCK } from '../mock/repository/player/player.repository.mock';
import { Team } from './team.entity';

@Entity()
export class Player implements PlayerInterface {

    @IsUUID('4')
    @IsString()
    @PrimaryGeneratedColumn('uuid')
    id?: string;

    @IsDefined()
    @IsString()
    @ApiProperty({
        example: PLAYER_REPOSITORY_MOCK[0].name,
        description: 'player name'
    })
    @Column()
    name: string;

    @IsDefined()
    @IsNumber()
    @Column({ default: 0 })
    points?: number;

    @OneToOne(() => Team, (team) => team.defender)
    team_defender?: Team

    @OneToOne(() => Team, (team) => team.striker)
    team_striker?: Team
}

export class PlayerInsert extends OmitType(
    Player, ['id', 'team_defender', 'team_striker', 'points'] as const
) { }

export class PlayerUpdate extends OmitType(
    Player, ['team_defender', 'team_striker'] as const
) { }