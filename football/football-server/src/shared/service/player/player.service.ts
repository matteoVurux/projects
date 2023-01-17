import { Injectable, Logger } from '@nestjs/common';
import { Player, PlayerInsert, PlayerUpdate } from '../../entity/player.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { PlayerServiceInterface } from './player.service.interface';
import { Team } from '../../entity/team.entity';

@Injectable()
export class PlayerService implements PlayerServiceInterface {
  private readonly logger = new Logger(PlayerService.name);

  constructor(
    @InjectRepository(Player) private playerRepository?: Repository<Player>,
    @InjectRepository(Team) private teamRepository?: Repository<Team>

  ) { }

  public async get(): Promise<Player[]> {
    this.logger.log(this.get.name);

    return await this.playerRepository.find();
  }

  public async getByPlayerId(player_id: string): Promise<Player> {
    this.logger.log(this.getByPlayerId.name);
    this.logger.debug(this.getByPlayerId.name, player_id);

    return await this.playerRepository.findOneOrFail({
      where: { id: player_id }
    });
  }

  public async insert(data: PlayerInsert): Promise<Player> {
    this.logger.log(this.insert.name);
    this.logger.debug(this.insert.name, data);

    return await this.playerRepository.save(data);
  }

  public async update(name: string, data: PlayerUpdate): Promise<void> {
    this.logger.log(this.update.name);
    this.logger.debug(this.update.name, name, data);

    await this.playerRepository.update({ name: name }, data);
  }

  public async delete(name: string): Promise<void> {
    this.logger.log(this.delete.name);
    this.logger.debug(this.delete.name, name);

    await this.playerRepository.delete({ name: name });
  }

  public async savePoints(name: string, points: number): Promise<void> {
    this.logger.log(this.savePoints.name);
    this.logger.debug(this.savePoints.name, name, points);

    let player: Player = await this.playerRepository.findOne({
      where: { name: name }
    });

    Object.assign(player, { ...{ name: name, points: player.points + points } });
    await this.playerRepository.update({ name: name }, player);
  }

}
