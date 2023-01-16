import { Team } from '../entity/team.entity';
import { TeamSpec } from '../entity/team_spec.entity';
import { StatusEnum } from '../enum/status.enum';

export interface MatchInterface {
    id?: string;
    slug: string,
    status: StatusEnum;
    red: TeamSpec;
    blue: TeamSpec;
    formation?: Team;
}
