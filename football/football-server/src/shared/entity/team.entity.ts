import { Entity, OneToOne, PrimaryGeneratedColumn } from 'typeorm';
import { TeamInterface } from '../interface/team.interface';
import { Player } from './player.entity';
import { IsUUID } from 'class-validator';
import { OmitType } from '@nestjs/swagger';
import { TeamSpec } from './team_spec.entity';

@Entity()
export class Team implements TeamInterface {

    @IsUUID('4')
    @PrimaryGeneratedColumn('uuid')
    id?: string;

    @OneToOne(() => Player, (player) => player.team_striker)
    striker?: string;

    @OneToOne(() => Player, (player) => player.team_defender)
    defender?: string;

    @OneToOne(() => TeamSpec, (team_spec) => team_spec.formation)
    team_formation?: TeamSpec;
}

export class TeamInsert extends OmitType(
    Team, ['id', ] as const
) { }

