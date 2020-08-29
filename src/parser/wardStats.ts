import { Match } from "../@types/Match";
import * as chalk from 'chalk';

let obs = 0;
let sentry = 0;

const observerId = 42;
const sentryId = 43;

export function parseWardStats(game: Match): void {
    game.players.forEach((data) => {
        const wards = data.playbackData.purchaseEvents.filter(({item}) => item === sentryId || item === observerId).map(({item}) => item);
        const obW = wards.filter((id) => id === observerId).length;
        const senW = wards.length - obW;
        obs = obs + obW;
        sentry = sentry + senW;
    });
}

export function printWardStats(): void {
    console.log(chalk.cyan(''));
    console.log(chalk.cyan('Ward stats'));
    console.log(chalk.blueBright('----------'));
    console.log(chalk.blueBright('Total:'), chalk.yellow(obs + sentry));
    console.log(chalk.blueBright('Observer wards:'), chalk.yellow(obs));
    console.log(chalk.blueBright('Sentry wards:'), chalk.yellow(sentry));
}