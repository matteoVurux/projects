import { Body, Controller, Delete, Get, Logger, Param, Patch, Post } from '@nestjs/common';
import { ApiBody, ApiOperation, ApiParam, ApiTags } from '@nestjs/swagger';
import { MatchService } from '../../shared/service/match/match.service';
import { Match, MatchInsert, MatchUpdate } from '../../shared/entity/match.entity';
import { MatchControllerInterface } from './match.controller.interface';
import { MATCH_REPOSITORY_MOCK } from '../../shared/mock/repository/match/match.repository.mock';

@ApiTags('match')
@Controller('match')
export class MatchController implements MatchControllerInterface {
    private readonly logger = new Logger(MatchController.name);

    constructor(private readonly matchService?: MatchService) { }

    @Get('')
    @ApiOperation({
        summary: 'Return all match'
    })
    public async get(): Promise<Match[]> {
        return await this.matchService.get();
    }

    @Post('')
    @ApiOperation({
        summary: 'Insert a new match'
    })
    public async insert(
        @Body() data: MatchInsert
    ): Promise<Match> {

        return await this.matchService.insert(data);
    }

    @Patch(':slug')
    @ApiOperation({
        summary: 'Update an existing match'
    })
    @ApiParam({
        name: 'slug',
        description: 'match slug',
        example: MATCH_REPOSITORY_MOCK[0].slug,
        required: true
    })
    public async update(
        @Param('slug') slug: string,
        @Body() data: MatchUpdate
    ): Promise<void> {
        this.logger.log(this.update.name);
        this.logger.debug(this.update.name, slug, data);

        await this.matchService.update(slug, data);
    }

    @Delete(':slug')
    @ApiOperation({
        summary: 'Delete an existing match'
    })
    @ApiParam({
        name: 'slug',
        description: 'match slug',
        example: MATCH_REPOSITORY_MOCK[0].slug,
        required: true
    })
    public async delete(
        @Param('slug') slug: string,
    ): Promise<void> {
        this.logger.log(this.delete.name);
        this.logger.debug(this.delete.name, slug);

        await this.matchService.delete(slug);
    }
}
