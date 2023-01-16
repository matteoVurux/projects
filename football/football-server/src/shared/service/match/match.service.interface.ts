import { Match, MatchInsert, MatchUpdate } from '../../entity/match.entity';

export interface MatchServiceInterface {

    /**
     * Get all player available 
     * @returns array of match 
     */
    get(): Promise<Match[]>;

    /**
     * Insert a new player
     * @param data match to insert
     * @returns match just inserted
     */
    insert(data: MatchInsert): Promise<Match>;

    /**
     * Update a player
     * @param slug match slug
     * @param data match data to update
     */
    update(slug: string, data: MatchUpdate): Promise<void>;

    /**
     * Delete a match
     * @param slug match slug
     */
    delete(slug: string): Promise<void>;
}