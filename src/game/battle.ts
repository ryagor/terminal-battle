import { Pokemon } from './pokemon.js';
import { Move, MOVES } from '../data/moves.js';
import { TYPE_CHART } from '../data/types.js';

/** An action that can be queued during a turn */
type BattleAction = { type: 'move'; user: Pokemon; target: Pokemon; move: Move };

/**
 * A battle between a player's Pokemon and a computer-controlled opponent.
 * Each turn, actions are queued, sorted by priority and speed, then run one at a time.
 */
export class Battle {
    player: Pokemon;
    opponent: Pokemon;
    turn: number;
    inProgress: boolean;
    combatLog: string[];
    battleQueue: BattleAction[];

    /**
     * Starts a battle.
     *
     * @param player - The player's Pokemon
     * @param opponent - The opponent's Pokemon
     */
    constructor(player: Pokemon, opponent: Pokemon) {
        this.player = player;
        this.opponent = opponent;
        this.turn = 1;
        this.combatLog = [];
        this.battleQueue = [];
        this.inProgress = true;
    }

    /**
     * Checks whether any actions are left in the queue.
     *
     * @returns True if there are queued actions
     */
    hasEvents(): boolean {
        return this.battleQueue.length > 0;
    }

    /** Marks the battle as finished */
    private endBattle(): void {
        this.inProgress = false;
    }

    /**
     * Queues the player's move and a random opponent move, then orders them by priority.
     *
     * @param playerAction - The move the player chose
     */
    createTurn(playerAction: Move): void {
        this.battleQueue.push({
            type: 'move',
            user: this.player,
            target: this.opponent,
            move: playerAction,
        });

        this.battleQueue.push({
            type: 'move',
            user: this.opponent,
            target: this.player,
            move: this.getRandomMove(this.opponent),
        });

        this.sortQueue();

        this.turn++;
    }

    /**
     * Gets the priority of a battle action.
     *
     * @param action - The action to check
     * @returns The action's priority (higher goes first)
     */
    private getActionPriority(action: BattleAction): number {
        if (action.type === 'move') {
            return action.move.priority ?? 0;
        }

        // Non-move actions will have priority
        return 1;
    }

    /** Sort the battle queue by priority, then pokemon speed, with speed ties decided randomly */
    private sortQueue(): void {
        this.battleQueue.sort((a, b) =>
            this.getActionPriority(b) - this.getActionPriority(a) ||
            b.user.stats.speed - a.user.stats.speed ||
            Math.random() - 0.5 // Randomly choose if speed tie 
        );
    }

    /**
     * Runs the next queued action: logs the move, applies damage, and ends
     * the battle if the target faints. Does nothing if the queue is empty.
     */
    runNextEvent(): void {
        // Clear previous event's combat log
        this.combatLog = [];

        // Return first event in queue and remove it from the queue
        const event = this.battleQueue.shift();

        // if an event exists
        if (event) {
            this.combatLog.push(`${event.user.name} used ${event.move.name}`);
            
            if (event.move.category != 'status') {
                // Get type effectiveness of move used
                const effectiveness = this.getEffectiveness(event.move, event.target);

                // Add relevant effectiveness text to combat log
                if (effectiveness > 1) {
                    this.combatLog.push("It's super effective!");
                } else if (effectiveness < 1) {
                    this.combatLog.push("It's not very effective...");
                } else if (effectiveness === 0) {
                    this.combatLog.push(`It doesn't affect ${event.target.name}...`);
                }

                // Calculate and apply damage
                const damage = this.calculateDamage(event.user, event.target, event.move, effectiveness);
                event.target.takeDamage(damage);
                this.combatLog.push(`${event.target.name} took ${damage} damage`);
            }

            // Check if target fainted
            if (event.target.fainted) {
                this.combatLog.push(`${event.target.name} fainted.`)
                this.endBattle();
                this.battleQueue = []; // empty battle queue
            }

        }
    }

    /**
     * Calculates the type effectiveness multiplier of a move against a defender.
     *
     * @param move - The move being used
     * @param defender - The Pokemon being hit
     * @returns The effectiveness multiplier (0, 0.25, 0.5, 1, 2, or 4)
     */
    private getEffectiveness(move: Move, defender: Pokemon): number {  
        let effectiveness = 1;

        // Check for supereffective
        for (const defenderType of defender.types) {
            effectiveness *= TYPE_CHART[move.type][defenderType] ?? 1;
        }

        return effectiveness;
    }

    /**
     * Calculates the damage a move deals, including STAB and type effectiveness.
     *
     * @param attacker - The Pokemon using the move
     * @param defender - The Pokemon being hit
     * @param move - The move used
     * @param effectiveness - Type type effectiveness multiplier (default 1)
     * @returns The damage dealt, or 0 for status moves
     */
    calculateDamage(attacker: Pokemon, defender: Pokemon, move: Move, effectiveness: number = 1): number {
        // Handle status moves
        if (move.power === null) return 0;

        let damageMultiplier = 1;

        // Check for STAB
        if (attacker.types.includes(move.type)) {
            damageMultiplier *= 1.5;
        }

        if (effectiveness) {
            damageMultiplier *= effectiveness;
        }

        if (move.category === 'physical') {
            return Math.floor((Math.floor(((Math.floor(2 * attacker.level / 5) + 2) * move.power * attacker.stats.atk / defender.stats.def) / 50) + 2) * damageMultiplier);
        } else if (move.category === 'special') {
            return Math.floor((Math.floor(((Math.floor(2 * attacker.level / 5) + 2) * move.power * attacker.stats.spAtk / defender.stats.spDef) / 50) + 2) * damageMultiplier);
        } else {
            return 0;
        }
    }

    /**
     * Picks a random move from a Pokemon's moveset.
     *
     * @param pokemon - The Pokemon choosing a move
     * @returns A random move
     */
    private getRandomMove(pokemon: Pokemon): Move {
        // Use struggle if no moves
        if (pokemon.moveset.length === 0) {
            return MOVES[165];
        }

        return pokemon.moveset[Math.floor(Math.random() * pokemon.moveset.length)];
    }
}
