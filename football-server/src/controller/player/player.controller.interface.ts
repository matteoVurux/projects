import { Player, PlayerInsert, PlayerUpdate } from '../../shared/entity/player.entity';

export interface PlayerControllerInterface {

    /**
     * Get all player available 
     * @returns array of player 
     */
    get(): Promise<Player[]>;

    /**
     * Get a single player by its id
     * @param player_id identifier of player
     * @returns single player
     */
    getByPlayerId(player_id: string): Promise<Player>

    /**
     * Add a new player
     * @param data body of request
     * @returns player just added
     */
    insert(data: PlayerInsert): Promise<Player>

    /**
     * Update an existing player
     * @param name player name 
     * @param data player data
     */
    update(name: string, data: PlayerUpdate): Promise<void>

    /**
     * Delete an existing player
     * @param name player name
     */
    delete(name: string): Promise<void>
}