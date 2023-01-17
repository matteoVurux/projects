import { Match, MatchInsert, MatchUpdate } from '../../shared/entity/Match.entity';

export interface MatchControllerInterface {

    /**
     * Get all Match available 
     * @returns array of Match 
     */
    get(): Promise<Match[]>;

    /**
     * Add a new Match
     * @param data body of request
     * @returns Match just added
     */
    insert(data: MatchInsert): Promise<Match>

    /**
     * Update an existing Match
     * @param slug Match slug 
     * @param data Match data
     */
    update(slug: string, data: MatchUpdate): Promise<void>

    /**
     * Delete an existing Match
     * @param slug Match slug
     */
    delete(slug: string): Promise<void>

}