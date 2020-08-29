import * as chalk from 'chalk';
import { Match } from '../@types/Match';

let towers = 0;

export function parseTowerStats(game: Match): void {
    towers += game.playbackData.towerDeathEvents.length;
}

export function printTowerStats(): void {
    console.log(chalk.blueBright(''));
    console.log(chalk.cyan('Tower stats'));
    console.log(chalk.blueBright('-------------'));
    console.log(chalk.blueBright('Towers killed:'), chalk.yellow(towers));
}