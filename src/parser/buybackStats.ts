import * as chalk from 'chalk';
import { Match } from '../@types/Match';

let buybacks = 0;
let cost = 0;

export function parseBuybackStats(game: Match): void {
    game.players.forEach((data) => {
        const plaercosts = data.playbackData.buyBackEvents.reduce((acc, {cost}) => {
            acc = acc + cost;
            return cost;
        }, 0)
        buybacks = buybacks + data.playbackData.buyBackEvents.length;
        cost = cost + plaercosts;
    });
}

export function printBuybackStats(): void {
    console.log(chalk.blueBright(''));
    console.log(chalk.cyan('Buyback stats'));
    console.log(chalk.blueBright('-------------'));
    console.log(chalk.blueBright('Total:'), chalk.yellow(buybacks));
    console.log(chalk.blueBright('Costs:'), chalk.yellow(-1*cost));
}