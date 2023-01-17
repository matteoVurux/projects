import { Player } from '../entity/player.entity';
import { MatchInterface } from './match.interface';

export interface TeamInterface {
    id?: string;
    striker?: string;
    defender?: string;
    team_formation?
}

export interface TeamSpecInterface {
    id?: string;
    score: number;
}