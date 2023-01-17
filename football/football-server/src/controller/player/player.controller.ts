import { Body, Controller, Delete, Get, Logger, Param, Patch, Post } from '@nestjs/common';
import { PlayerService } from '../../shared/service/player/player.service';
import { Player, PlayerInsert, PlayerUpdate } from '../../shared/entity/player.entity';
import { ApiOperation, ApiParam, ApiTags } from '@nestjs/swagger';
import { PlayerControllerInterface } from './player.controller.interface';
import { PLAYER_REPOSITORY_MOCK } from '../../shared/mock/repository/player/player.repository.mock';

@ApiTags('player')
@Controller('player')
export class PlayerController implements PlayerControllerInterface {
  private readonly logger = new Logger(PlayerController.name);

  constructor(private readonly playerService?: PlayerService) { }

  @Get('')
  @ApiOperation({
    summary: 'Return all player'
  })
  public async get(): Promise<Player[]> {
    return await this.playerService.get();
  }

  @Get(':id')
  @ApiOperation({
    summary: 'Return a player by id'
  })
  @ApiParam({
    name: 'id',
    description: 'player id',
    example: PLAYER_REPOSITORY_MOCK[0].id,
    required: true
  })
  public async getByPlayerId(
    @Param('id') id: string,
  ): Promise<Player> {
    return await this.playerService.getByPlayerId(id);
  }

  @Post('')
  @ApiOperation({
    summary: 'Insert a new player'
  })
  public async insert(
    @Body() data: PlayerInsert
  ): Promise<Player> {

    return await this.playerService.insert(data);
  }

  @Patch(':name')
  @ApiOperation({
    summary: 'Update an existing player'
  })
  @ApiParam({
    name: 'name',
    description: 'player name',
    example: PLAYER_REPOSITORY_MOCK[1].name,
    required: true
  })
  public async update(
    @Param('name') name: string,
    @Body() data: PlayerUpdate
  ): Promise<void> {
    this.logger.log(this.update.name);
    this.logger.debug(this.update.name, name, data);

    await this.playerService.update(name, data);
  }

  @Delete(':name')
  @ApiOperation({
    summary: 'Delete an existing player'
  })
  @ApiParam({
    name: 'name',
    description: 'player name',
    example: PLAYER_REPOSITORY_MOCK[0].name,
    required: true
  })
  public async delete(
    @Param('name') name: string,
  ): Promise<void> {
    this.logger.log(this.delete.name);
    this.logger.debug(this.delete.name, name);

    await this.playerService.delete(name);
  }

}
