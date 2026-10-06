import chalk from 'chalk';

import { Battle } from '../game/battle.js';
import { toTitleCase } from '../utils/format.js';

const SHORT_DELAY: number = 600;
const MEDIUM_DELAY: number = 900;
const LONG_DELAY: number = 1200;
const HP_BAR_LENGTH: number = 20;
const HP_BAR_COLUMN_WIDTH: number = 40;

/** Draws battle state and combat messages to the terminal */
export class Renderer {
    battle: Battle;
    
    /**
     * Creates a new renderer that can display battle information to the terminal.
     * 
     * @param battle - The battle to render
     */
    constructor(battle: Battle) {
        this.battle = battle;
    }

    /** Clears the screen and draws the turn number and HP bars */
    renderBattle(): void {
        console.clear();
        console.log(`Turn ${this.battle.turn}`); 
        this.displayHpBars();
    }

    /** Redraws the battle, then prints the combat log with delays between lines */
    async renderEvent(): Promise<void> {
        this.renderBattle();

        for (const message of this.battle.combatLog) {
            console.log(this.formatMessage(message));
            await this.sleep(this.calculateDelay(message));
        }

        await this.sleep(SHORT_DELAY);
    }

    /**
     * Title-cases names and colors a combat message based on its content.
     *
     * @param message - A raw combat log message
     * @returns The formatted message
     */
    private formatMessage(message: string): string {
        let output = message;

        // Title-case both Pokémon names
        for (const pokemon of [this.battle.player, this.battle.opponent]) {
            output = output.replaceAll(pokemon.name, toTitleCase(pokemon.name));
        }

        // Title-case moves
        for (const move of [...this.battle.player.moveset, ...this.battle.opponent.moveset]) {
            output = output.replaceAll(move.name, toTitleCase(move.name));
        }

        if (message.includes('super effective')) return chalk.green(output);
        if (message.includes('not very effective')) return chalk.red(output);
        if (message.includes('fainted')) return chalk.red.bold(output);
        if (message.includes('damage')) return chalk.gray(output);
        return output;
    }

    /**
     * Picks how long to pause after a message.
     *
     * @param line - The combat log message
     * @returns Delay in milliseconds
     */
    private calculateDelay(line: string): number {
        if (line.includes('fainted')) return LONG_DELAY;
        if (line.includes('effective')) return SHORT_DELAY;
        return MEDIUM_DELAY;
    }

    /**
     * Waits for the given time.
     *
     * @param ms - Milliseconds to wait
     */
    private sleep(ms: number): Promise<void> {
        return new Promise((resolve) => setTimeout(resolve, ms));
    }

    /**
     * Builds a colored HP bar (green above 50%, yellow above 20%, red below).
     *
     * @param hp - Current HP
     * @param maxHp - Max HP
     * @param width - Bar width in characters
     * @returns The bar as a colored string
     */
    private getHpBar(hp: number, maxHp: number, width: number = HP_BAR_LENGTH): string {
        const filled = Math.round((hp / maxHp) * width);
        const empty = width - filled;
        const colour = hp / maxHp > 0.5 ? chalk.green : hp / maxHp > 0.2 ? chalk.yellow : chalk.red;
        return colour('█'.repeat(filled)) + chalk.gray('░'.repeat(empty));
    }
    
    /**
     * Prints both Pokemon's names, levels, and HP bars side by side.
     *
     * @param player - The player's Pokemon
     * @param opponent - The opponent's Pokemon
     */
    private displayHpBars(): void {
        const colWidth = HP_BAR_COLUMN_WIDTH;

        const pad = (str: string, width: number) => {
            // strip ANSI codes when measuring length so padding stays correct
            const visibleLength = str.replace(/\x1b\[[0-9;]*m/g, '').length;
            return str + ' '.repeat(Math.max(0, width - visibleLength));
        };
        const playerLines = [
            chalk.bold(`${toTitleCase(this.battle.player.name)} Lv.${this.battle.player.level}`),
            `HP: ${this.getHpBar(this.battle.player.currentHp, this.battle.player.stats.hp)} ${this.battle.player.currentHp}/${this.battle.player.stats.hp}`,
        ];

        const opponentLines = [
            chalk.bold(`${toTitleCase(this.battle.opponent.name)} Lv.${this.battle.opponent.level}`),
            `HP: ${this.getHpBar(this.battle.opponent.currentHp, this.battle.opponent.stats.hp)} ${this.battle.opponent.currentHp}/${this.battle.opponent.stats.hp}`,
        ];

        console.log();

        for (let i = 0; i < Math.max(playerLines.length, opponentLines.length); i++) {
            const left = pad(playerLines[i] ?? '', colWidth);
            const right = opponentLines[i] ?? '';
            console.log(`${left}  ${right}`);
        }

        console.log();
    }
}