import { select, isCancel } from '@clack/prompts';
import { Pokemon, createPokemon } from '../game/pokemon.js';
import { Move } from '../data/moves.js';
import { toTitleCase } from '../utils/format.js';

const STARTER_LEVEL: number = 15;

/** Starter Pokemon choices, formatted as clack select options */
const STARTER_OPTIONS = [
  { value: 1, label: 'Bulbasaur' },
  { value: 4, label: 'Charmander' },
  { value: 7, label: 'Squirtle' },
  { value: 25, label: 'Pikachu' },
];

/**
 * Prompts the user to pick a starter Pokemon.
 * Exits the program if the prompt is cancelled.
 *
 * @param prompt - The message to show
 * @returns A new Pokemon at the starter level
 */
export async function getStarter(prompt: string): Promise<Pokemon> {
  const id = await select({ message: prompt, options: STARTER_OPTIONS });

  if (isCancel(id)) {
    console.log('Exiting...');
    process.exit(0);
  }

  return createPokemon(id, STARTER_LEVEL);
}

/**
 * Prompts the user to pick one of a Pokemon's moves.
 * Exits the program if the prompt is cancelled.
 *
 * @param pokemon - The Pokemon whose moves are shown
 * @returns The selected move
 */
export async function getMoveChoice(pokemon: Pokemon): Promise<Move> {
  const move = await select({
    message: `What will ${toTitleCase(pokemon.name)} do?`,
    options: pokemon.moveset.map((move) => ({
      value: move,
      label: toTitleCase(move.name),
    })),
  });

  if (isCancel(move)) {
    console.log('Exiting...');
    process.exit(0);
  }

  return move;
}
