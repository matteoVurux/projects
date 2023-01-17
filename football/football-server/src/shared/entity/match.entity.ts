import { Entity, Column, OneToMany, OneToOne, PrimaryGeneratedColumn } from 'typeorm';
import { StatusEnum } from '../enum/status.enum';
import { IsDefined, IsString, IsEnum, IsUUID } from 'class-validator';
import { MatchInterface } from '../interface/match.interface';
import { OmitType, ApiProperty } from '@nestjs/swagger';
import { MATCH_REPOSITORY_MOCK } from '../mock/repository/match/match.repository.mock';
import { TeamSpec } from './team_spec.entity';

@Entity()
export class Match implements MatchInterface {

    @IsUUID('4')
    @PrimaryGeneratedColumn('uuid')
    id?: string;

    @IsDefined()
    @IsString()
    @ApiProperty({
        example: MATCH_REPOSITORY_MOCK[0].slug,
        description: 'match slug'
    })
    @Column({ unique: true })
    slug: string;

    @IsDefined()
    @IsEnum(StatusEnum)
    @ApiProperty({
        example: MATCH_REPOSITORY_MOCK[0].status,
        description: 'match status'
    })
    @Column({ type: 'enum', enum: StatusEnum })
    status: StatusEnum;

    @IsDefined()
    @ApiProperty({
        description: 'Match red team',
        type: Object,
        example: MATCH_REPOSITORY_MOCK[0].red,
    })
    @Column('simple-json', { default: '{}' })
    red: TeamSpec

    @IsDefined()
    @ApiProperty({
        description: 'Match blue team',
        type: Object,
        example: MATCH_REPOSITORY_MOCK[0].blue,
    })
    @Column('simple-json', { default: '{}' })
    blue: TeamSpec
}
 
export class MatchInsert extends OmitType(
    Match, ['id'] as const
) { }

export class MatchUpdate extends OmitType(
    Match, ['id', 'slug'] as const
) { }

