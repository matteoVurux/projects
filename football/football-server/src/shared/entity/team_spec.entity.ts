import { Entity, Column, OneToOne, PrimaryGeneratedColumn } from 'typeorm';
import { IsDefined, IsNumber, IsUUID } from 'class-validator';
import { Team } from './team.entity';

@Entity()
export class TeamSpec {

    @IsUUID('4')
    @PrimaryGeneratedColumn('uuid')
    id?: string;

    @IsDefined()
    @IsNumber()
    @Column()
    score: number;

    @Column('simple-json', { default: '{}' })
    @OneToOne(() => Team, (team) => team.team_formation)
    formation?: Team;
}