import { v4 as uuidv4 } from 'uuid';

import { TeamInterface } from '../../../interface/team.interface';
import { PLAYER_REPOSITORY_MOCK } from '../player/player.repository.mock';

export const TEAM_REPOSITORY_MOCK: TeamInterface[] = [
    {
        id: uuidv4(),
        striker: PLAYER_REPOSITORY_MOCK[1].name,
        defender: PLAYER_REPOSITORY_MOCK[1].name
    },
    {
        id: uuidv4(),
        striker:PLAYER_REPOSITORY_MOCK[2].name,
        defender: PLAYER_REPOSITORY_MOCK[3].name
    }
]

