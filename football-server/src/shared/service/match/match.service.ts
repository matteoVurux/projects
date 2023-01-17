import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Match, MatchInsert, MatchUpdate } from '../../entity/match.entity';
import { Player } from '../../entity/player.entity';
import { PlayerService } from '../player/player.service';
import { MatchServiceInterface } from './match.service.interface';

@Injectable()
export class MatchService implements MatchServiceInterface {
    private readonly logger = new Logger(MatchService.name);

    constructor(
        @InjectRepository(Match) private matchRepository?: Repository<Match>,
        private readonly playerService?: PlayerService
    ) { }

    public async get(): Promise<Match[]> {
        this.logger.log(this.get.name);

        return await this.matchRepository.find();
    }

    public async insert(data: MatchInsert): Promise<Match> {
        this.logger.log(this.insert.name);
        this.logger.debug(this.insert.name, data);

        let red_striker: any;
        let blue_striker: any;

        red_striker = data.red.formation.striker;
        blue_striker = data.blue.formation.striker;

        await this.playerService.savePoints(
            red_striker,
            data.red.score
        )

        await this.playerService.savePoints(
            blue_striker,
            data.blue.score
        )

        return await this.matchRepository.save(data);
    }

    public async update(slug: string, data: MatchUpdate): Promise<void> {
        this.logger.log(this.update.name);
        this.logger.debug(this.update.name, slug, data);

        await this.matchRepository.update({ slug: slug }, data);
    }

    public async delete(slug: string): Promise<void> {
        this.logger.log(this.delete.name);
        this.logger.debug(this.delete.name, slug);

        await this.matchRepository.delete({ slug: slug });
    }
}
