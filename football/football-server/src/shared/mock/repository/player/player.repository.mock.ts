import { PlayerInterface } from '../../../interface/player.interface';
import { v4 as uuidv4 } from 'uuid';

export const PLAYER_REPOSITORY_MOCK: PlayerInterface[] = [
    {
        id: uuidv4(),
        name: 'Marco',
        points: 1
    },
    {
        id: uuidv4(),
        name: 'Matteo',
        points: 1
    },
    {
        id: uuidv4(),
        name: 'Luca',
        points: 1
    },
    {
        id: uuidv4(),
        name: 'Alessia',
        points: 1
    },
    {
        id: uuidv4(),
        name: 'Bruno',
        points: 1
    }
]

