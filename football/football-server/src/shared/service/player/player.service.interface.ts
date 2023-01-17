import { Player, PlayerInsert, PlayerUpdate } from '../../entity/player.entity';

export interface PlayerServiceInterface {

    /**
     * Get all player available 
     * @returns array of player 
     */
    get(): Promise<Player[]>;

    /**
     * Get a single player by its id
     * @param player_id identifier of player
     */
    getByPlayerId(player_id: string): Promise<Player>

    /**
     * Insert a new player
     * @param data player to insert
     * @returns player just inserted
     */
    insert(data: PlayerInsert): Promise<Player>;

    /**
     * Update a player
     * @param name player name
     * @param data player data to update
     */
    update(name: string, data: PlayerUpdate): Promise<void>;

    /**
     * Delete a player
     * @param name player name
     */
    delete(name: string): Promise<void>;

    /**
     * Add a player to team defender
     * @param name player name
     * @param points player points
     */
    savePoints(name: string, points: number): Promise<void>

}