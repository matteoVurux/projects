import { Injectable } from '@nestjs/common';
import { PlayerServiceInterface } from './player.service.interface';
import { Player, PlayerInsert, PlayerUpdate } from '../../entity/player.entity';

@Injectable()
export class PlayerServiceMock implements PlayerServiceInterface {
    async get(): Promise<Player[]> {
        return;
    }
    async getByPlayerId(player_id: string): Promise<Player> {
        return;
    }
    async insert(data: PlayerInsert): Promise<Player> {
        return;
    }
    async update(name: string, data: PlayerUpdate): Promise<void> {
        return;
    }
    async delete(name: string): Promise<void> {
        return;
    }
    async savePoints(name: string, points: number): Promise<void> {
        return;
    }

    

}
