import { Stats } from './stats.js';

/** Data that defines a species of pokemon */
export interface PokemonData {
  id: number;
  name: string;
  types: string[];
  baseStats: Stats;
  abilities: string[];
  learnset: LearnsetEntry[];
}

/** Defines the id of move that a Pokemon can learn and at what level they learn it */
export interface LearnsetEntry {
  moveId: number;
  level: number;
}

/** Data of available Pokemon */
export const POKEDEX: PokemonData[] = [
  {
    id: 1,
    name: 'bulbasaur',
    types: ['grass', 'poison'],
    baseStats: { hp: 45, atk: 49, def: 49, spAtk: 65, spDef: 65, speed: 45 },
    abilities: ['overgrow', 'chlorophyll'],
    learnset: [
      { moveId: 33, level: 1 },   // tackle
      { moveId: 45, level: 1 },   // growl
      { moveId: 73, level: 7 },   // leech-seed
      { moveId: 22, level: 13 },  // vine-whip
      { moveId: 77, level: 20 },  // poison-powder
      { moveId: 75, level: 27 },  // razor-leaf
      { moveId: 74, level: 34 },  // growth
      { moveId: 79, level: 41 },  // sleep-powder
      { moveId: 76, level: 48 },  // solar-beam
    ],
  },
  {
    id: 4,
    name: 'charmander',
    types: ['fire'],
    baseStats: { hp: 39, atk: 52, def: 43, spAtk: 60, spDef: 50, speed: 65 },
    abilities: ['blaze', 'solar-power'],
    learnset: [
      { moveId: 10, level: 1 },   // scratch
      { moveId: 45, level: 1 },   // growl
      { moveId: 52, level: 9 },   // ember
      { moveId: 43, level: 15 },  // leer
      { moveId: 99, level: 22 },  // rage
      { moveId: 163, level: 30 }, // slash
      { moveId: 53, level: 38 },  // flamethrower
      { moveId: 83, level: 46 },  // fire-spin
    ]
  },
  {
    id: 7,
    name: 'squirtle',
    types: ['water'],
    baseStats: { hp: 44, atk: 48, def: 65, spAtk: 50, spDef: 64, speed: 43 },
    abilities: ['torrent', 'rain-dish'],
    learnset: [
      { moveId: 33, level: 1 },   // tackle
      { moveId: 39, level: 1 },   // tail-whip
      { moveId: 145, level: 8 },  // bubble
      { moveId: 55, level: 15 },  // water-gun
      { moveId: 44, level: 22 },  // bite
      { moveId: 110, level: 28 }, // withdraw
      { moveId: 130, level: 35 }, // skull-bash
      { moveId: 56, level: 42 },  // hydro-pump
    ]
  },
  {
    id: 25,
    name: 'pikachu',
    types: ['electric'],
    baseStats: { hp: 35, atk: 55, def: 40, spAtk: 50, spDef: 50, speed: 90 },
    abilities: ['static', 'lightning-rod'],
    learnset: [
      { moveId: 84, level: 1 },   // thunder-shock
      { moveId: 45, level: 1 },   // growl
      { moveId: 86, level: 9 },   // thunder-wave
      { moveId: 98, level: 16 },  // quick-attack
      { moveId: 129, level: 26 }, // swift
      { moveId: 97, level: 33 },  // agility
      { moveId: 87, level: 43 },  // thunder
    ]
  }
];