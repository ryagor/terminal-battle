import { PokemonType } from './types.js';

/** The three categories of Pokemon moves */
export type MoveCategory = 'physical' | 'special' | 'status';

/** Models a Pokemon move */
export interface Move {
  name: string;
  type: PokemonType;
  category: MoveCategory;
  power: number | null;
  accuracy: number | null;
  pp: number;
  priority?: number;
}

/** 
 * All available moves 
 * Null accuracy means move cannot miss
 */
export const MOVES: Record<number, Move> = {
  10: { name: "scratch", type: "normal", category: "physical", power: 40, accuracy: 100, pp: 35 },
  22: { name: "vine-whip", type: "grass", category: "physical", power: 45, accuracy: 100, pp: 25 },
  33: { name: "tackle", type: "normal", category: "physical", power: 40, accuracy: 100, pp: 35 },
  39: { name: "tail-whip", type: "normal", category: "status", power: null, accuracy: 100, pp: 30 },
  44: { name: "bite", type: "dark", category: "physical", power: 60, accuracy: 100, pp: 25 },
  45: { name: "growl", type: "normal", category: "status", power: null, accuracy: 100, pp: 40 },
  43: { name: "leer", type: "normal", category: "status", power: null, accuracy: 100, pp: 30 },
  52: { name: "ember", type: "fire", category: "special", power: 40, accuracy: 100, pp: 25 },
  53: { name: "flamethrower", type: "fire", category: "special", power: 90, accuracy: 100, pp: 15 },
  55: { name: "water-gun", type: "water", category: "special", power: 40, accuracy: 100, pp: 25 },
  56: { name: "hydro-pump", type: "water", category: "special", power: 110, accuracy: 80, pp: 5 },
  73: { name: "leech-seed", type: "grass", category: "status", power: null, accuracy: 90, pp: 10 },
  74: { name: "growth", type: "normal", category: "status", power: null, accuracy: null, pp: 20 },
  75: { name: "razor-leaf", type: "grass", category: "physical", power: 55, accuracy: 95, pp: 25 },
  76: { name: "solar-beam", type: "grass", category: "special", power: 120, accuracy: 100, pp: 10 },
  77: { name: "poison-powder", type: "poison", category: "status", power: null, accuracy: 75, pp: 35 },
  79: { name: "sleep-powder", type: "grass", category: "status", power: null, accuracy: 75, pp: 15 },
  83: { name: "fire-spin", type: "fire", category: "special", power: 35, accuracy: 85, pp: 15 },
  84: { name: "thunder-shock", type: "electric", category: "special", power: 40, accuracy: 100, pp: 30 },
  86: { name: "thunder-wave", type: "electric", category: "status", power: null, accuracy: 90, pp: 20 },
  87: { name: "thunder", type: "electric", category: "special", power: 110, accuracy: 70, pp: 10 },
  97: { name: "agility", type: "psychic", category: "status", power: null, accuracy: null, pp: 30 },
  98: { name: "quick-attack", type: "normal", category: "physical", power: 40, accuracy: 100, pp: 30, priority: 1 },
  99: { name: "rage", type: "normal", category: "physical", power: 20, accuracy: 100, pp: 20 },
  110: { name: "withdraw", type: "water", category: "status", power: null, accuracy: null, pp: 40 },
  129: { name: "swift", type: "normal", category: "special", power: 60, accuracy: null, pp: 20 },
  130: { name: "skull-bash", type: "normal", category: "physical", power: 130, accuracy: 100, pp: 10 },
  145: { name: "bubble", type: "water", category: "special", power: 40, accuracy: 100, pp: 30 },
  163: { name: "slash", type: "normal", category: "physical", power: 70, accuracy: 100, pp: 20 },
  165: { name: "struggle", type: "normal", category: "physical", power: 50, accuracy: null, pp: 1 }
};