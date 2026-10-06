#!/usr/bin/env node

import { Battle } from './game/battle.js';
import { Renderer } from './ui/renderer.js';
import { getStarter, getMoveChoice } from './ui/menus.js';

/**
 * Prompts the user pick both Pokemon, then runs the battle loop until one faints.
 */
async function main() {
  // Get user's Pokemon choice
  const player = await getStarter('Choose your Pokemon:');

  // Get opponent Pokemon choice from user
  const opponent = await getStarter('Choose opponent\'s Pokemon:');

  // Create a new battle
  const battle = new Battle(player, opponent);
  const r = new Renderer(battle);

  // Start battle loop
  while (battle.inProgress) {
    r.renderBattle();

    // Get player's move choice
    const playerAction = await getMoveChoice(battle.player);

    // Create a new turn with player and opponent actions
    battle.createTurn(playerAction);

    // Run all events in battle queue and render their outputs
    while (battle.hasEvents()) {
      battle.runNextEvent();
      await r.renderEvent();
    }
  }

  // Display the results of the battle
  r.renderBattle();
  console.log(battle.player.fainted ? "You lost!" : "You won!");
}

main().catch((err: Error) => {
  console.error(err);
  process.exit(1);
});
