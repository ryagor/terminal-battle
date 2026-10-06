import { Move, MOVES } from '../data/moves.js';
import { PokemonData, POKEDEX } from '../data/pokedex.js';
import { Stats, NATURES } from '../data/stats.js';

const MAX_LEVEL: number = 100;
const MAX_IV: number = 31;

/**
 * A Pokemon that can take part in battle.
 *
 * Stats are derived from the species' base stats, randomly generated IVs,
 * EVs, a random generated nature, and the current level.
 */
export class Pokemon {
    readonly name: string;
    readonly types: string[];
    readonly baseStats: Stats;
    level: number;
    expToLevel: number;
    EVs: Stats;
    IVs: Stats;
    nature: string;
    stats: Stats;
    currentHp: number;
    fainted: boolean;
    moveset: Move[];

    /**
     * Creates a Pokemon from species data.
     *
     * Generates random IVs and a random nature, calculates stats, and learns
     * up to 4 moves from the species' learnset that are available at its level.
     *
     * @param species - Species data from the Pokedex
     * @param level - Starting level (default to level 5 if not specified)
     */
    constructor(species: PokemonData, level: number = 5) {
        this.name = species.name;
        this.types = species.types;
        this.baseStats = species.baseStats;
        this.level = level;
        this.expToLevel = 0;
        this.EVs = {hp: 0, atk: 0, def: 0, spAtk: 0, spDef: 0, speed: 0};
        this.IVs = this.generateIVs();
        this.nature = this.generateNature();
        this.stats = this.calculateStats();
        this.currentHp = this.stats.hp;
        this.fainted = false;
        this.moveset = [];

        for (const move of species.learnset) {
            if (move.level > this.level || this.moveset.length >= 4) {
                break;
            } else {
                this.learnMove(MOVES[move.moveId]);
            }
        }
    }

    /**
     * Rolls a random IV for the Pokemon.
     * 
     * @returns A random integer between 0 and 31 inclusive
     */
    private generateIV(): number {
        return Math.floor(Math.random() * (MAX_IV + 1));
    }

    /** 
     * Generates random IVs for all of the Pokemon's stats
     * 
     * @returns An object containing all of the Pokemon's IVs
     */
    private generateIVs(): Stats {
        return {
            hp: this.generateIV(),
            atk: this.generateIV(),
            def: this.generateIV(),
            spAtk: this.generateIV(),
            spDef: this.generateIV(),
            speed: this.generateIV()
        }
    }

    /**
     * Generates a random nature for the Pokemon.
     * 
     * @returns A random nature
     */
    private generateNature(): string {
        const natures = Object.keys(NATURES);
        return natures[Math.floor(Math.random() * natures.length)];
    }

    /**
     * Calculates max HP of a Pokemon.
     * 
     * @returns The Pokemon's HP stat
     */
    private calculateHp(): number {
        return Math.floor((Math.floor(2 * this.baseStats.hp + this.IVs.hp + (this.EVs.hp / 4)) * this.level) / 100) + this.level + 10;
    }

    /**
     * Calculates a non-HP stat for the Pokemon.
     * 
     * @param base - Species' base stat
     * @param IV - Individual Value of stat
     * @param EV - Effort Value of stat
     * @param natureMultiplier - Nature modifier (0.9x, 1x, or 1.1x)
     * @returns The final stat value
     */
    private calculateStat(base: number, IV: number, EV: number, natureMultiplier: number): number {
        return Math.floor((Math.floor((Math.floor(2 * base + IV + (EV / 4)) * this.level) / 100) + 5) * natureMultiplier);
    }

    /**
     * Calculates a Pokemon's stats.
     * 
     * @returns An object containing all of the Pokemon's stats.
     */
    private calculateStats(): Stats {
        return { 
            hp: this.calculateHp(),
            atk: this.calculateStat(this.baseStats.atk, this.IVs.atk, this.EVs.atk, NATURES[this.nature].atk),
            def: this.calculateStat(this.baseStats.def, this.IVs.def, this.EVs.def, NATURES[this.nature].def),
            spAtk: this.calculateStat(this.baseStats.spAtk, this.IVs.spAtk, this.EVs.spAtk, NATURES[this.nature].spAtk),
            spDef: this.calculateStat(this.baseStats.spDef, this.IVs.spDef, this.EVs.spDef, NATURES[this.nature].spDef),
            speed: this.calculateStat(this.baseStats.speed, this.IVs.speed, this.EVs.speed, NATURES[this.nature].speed)
        }
    }

    /**
     * Raises the Pokemon's level by 1 (up to a max of 100) and recalculates stats.
     * The HP amount gained is added to current HP.
     */
    levelUp(): void {
        if (this.level >= MAX_LEVEL) {
            return;
        } else {
            const oldHp = this.stats.hp;
            this.level++;
            this.stats = this.calculateStats();
            this.currentHp += this.stats.hp - oldHp;
        }
    }

    /**
     * Adds a move to the Pokemon's moveset if there is room.
     * 
     * @param move - The move to learn
     */
    learnMove(move: Move): void {
        if (this.moveset.length < 4) {
            this.moveset.push(move);
        }
    }

    /**
     * Subtracts damage from the Pokemon's current HP.
     * Makes the Pokemon faint if HP reaches 0.
     * 
     * @param damage - The amount of damage to take
     */
    takeDamage(damage: number): void {
        this.currentHp -= damage;

        if (this.currentHp <= 0) {
            this.currentHp = 0;
            this.fainted = true;
        } 
    }

    /**
     * Formats the Pokemon's details for display.
     *
     * @returns A summary of the Pokemon
     */
    toString(): string {
        return `Level ${this.level} ${this.name}
        Nature: ${this.nature}
        Stats:
            HP:     ${this.stats.hp}
            Atk:    ${this.stats.atk}
            Def:    ${this.stats.def}
            SpAtk:  ${this.stats.spAtk}
            SpDef:  ${this.stats.spDef}
            Speed:  ${this.stats.speed}
        Exp: ${this.expToLevel}`;
    }
}

/**
 * Creates a Pokemon of the given species.
 *
 * @param id - Pokedex id of the species
 * @param level - Starting level
 * @returns A new Pokemon of the given species
 * @throws Error if no species matches the id
 */
export function createPokemon(id: number, level?: number): Pokemon {
  const data = POKEDEX.find((p) => p.id === id);

  if (!data) {
    throw new Error(`No Pokemon found with id ${id}.`);
  }

  return new Pokemon(data, level);
}
