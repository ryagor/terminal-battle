/** The stats a Pokemon can have */
export interface Stats {
  hp: number; atk: number; def: number;
  spAtk: number; spDef: number; speed: number;
}

/** All 25 possible natures and their multipliers */
export const NATURES: Record<string, Stats> = {
    'hardy': {hp: 1, atk: 1, def: 1, spAtk: 1, spDef: 1, speed: 1},
    'docile': {hp: 1, atk: 1, def: 1, spAtk: 1, spDef: 1, speed: 1},
    'serious': {hp: 1, atk: 1, def: 1, spAtk: 1, spDef: 1, speed: 1},
    'bashful': {hp: 1, atk: 1, def: 1, spAtk: 1, spDef: 1, speed: 1},
    'quirky': {hp: 1, atk: 1, def: 1, spAtk: 1, spDef: 1, speed: 1},
    'lonely': {hp: 1, atk: 1.1, def: 0.9, spAtk: 1, spDef: 1, speed: 1},
    'brave': {hp: 1, atk: 1.1, def: 1, spAtk: 1, spDef: 1, speed: 0.9},
    'adamant': {hp: 1, atk: 1.1, def: 1, spAtk: 0.9, spDef: 1, speed: 1},
    'naughty': {hp: 1, atk: 1.1, def: 1, spAtk: 1, spDef: 0.9, speed: 1},
    'bold': {hp: 0.9, atk: 1, def: 1.1, spAtk: 1, spDef: 1, speed: 1},
    'relaxed': {hp: 1, atk: 1, def: 1.1, spAtk: 1, spDef: 1, speed: 0.9},
    'impish': {hp: 1, atk: 1, def: 1.1, spAtk: 0.9, spDef: 1, speed: 1},
    'lax': {hp: 1, atk: 1, def: 1.1, spAtk: 1, spDef: 0.9, speed: 1},
    'timid': {hp: 1, atk: 0.9, def: 1, spAtk: 1, spDef: 1, speed: 1.1},
    'hasty': {hp: 1, atk: 1, def: 0.9, spAtk: 1, spDef: 1, speed: 1.1},
    'jolly': {hp: 1, atk: 1, def: 1, spAtk: 0.9, spDef: 1, speed: 1.1},
    'naive': {hp: 1, atk: 1, def: 1, spAtk: 1, spDef: 0.9, speed: 1.1},
    'modest': {hp: 1, atk: 0.9, def: 1, spAtk: 1.1, spDef: 1, speed: 1},
    'mild': {hp: 1, atk: 1, def: 0.9, spAtk: 1.1, spDef: 1, speed: 1},
    'quiet': {hp: 1, atk: 1, def: 1, spAtk: 1.1, spDef: 1, speed: 0.9},
    'rash': {hp: 1, atk: 1, def: 1, spAtk: 1.1, spDef: 0.9, speed: 1},
    'calm': {hp: 1, atk: 0.9, def: 1, spAtk: 1, spDef: 1.1, speed: 1},
    'gentle': {hp: 1, atk: 1, def: 0.9, spAtk: 1, spDef: 1.1, speed: 1},
    'sassy': {hp: 1, atk: 1, def: 1, spAtk: 1, spDef: 1.1, speed: 0.9},
    'careful': {hp: 1, atk: 1, def: 1, spAtk: 0.9, spDef: 1.1, speed: 1},
}
