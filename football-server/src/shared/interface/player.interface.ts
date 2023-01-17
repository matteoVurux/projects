import { Team } from '../entity/team.entity';

export interface PlayerInterface {
    id?: string;
    name: string;
    team_defender?: Team;
    team_striker?: Team;
    points?:number;
}
