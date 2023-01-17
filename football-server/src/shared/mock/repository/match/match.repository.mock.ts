import { v4 as uuidv4 } from 'uuid';
import { StatusEnum } from '../../../enum/status.enum';
import { MatchInterface } from '../../../interface/match.interface';
import { PLAYER_REPOSITORY_MOCK } from '../player/player.repository.mock';

export const MATCH_REPOSITORY_MOCK: MatchInterface[] = [
    {
        id: uuidv4(),
        slug: 'match_one',
        status: StatusEnum.Ended,
        red: {
            id: uuidv4(),
            score: 5,
            formation: {
                striker: PLAYER_REPOSITORY_MOCK[0].name,
                defender: PLAYER_REPOSITORY_MOCK[1].name
            }
            
        },
        blue: {
            id: uuidv4(),
            score: 4,
            formation: {
                striker:PLAYER_REPOSITORY_MOCK[0].name,
                defender: PLAYER_REPOSITORY_MOCK[1].name
            }
        }
    },
    {
        id: uuidv4(),
        slug: 'match_two',
        status: StatusEnum.OnGoing,
        red: {
            id: uuidv4(),
            score: 3,
            formation: {
                striker: PLAYER_REPOSITORY_MOCK[1].name,
                defender: PLAYER_REPOSITORY_MOCK[3].name
            }
        },
        blue: {
            id: uuidv4(),
            score: 2,
            formation: {
                striker: PLAYER_REPOSITORY_MOCK[1].name,
                defender: PLAYER_REPOSITORY_MOCK[3].name,
            }
        }
    },
    {
        slug: 'primo',
        status: StatusEnum.OnGoing,
        red: {
            score: 3,
            formation: {
                striker: 'marco',
                defender: 'luca'
            }
        },
        blue: {
            score: 2,
            formation: {
                striker: 'matteo',
                defender: 'alex'
            }
        }
    }
]

