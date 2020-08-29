import { Match } from "../@types/Match";
import * as chalk from 'chalk';

let kills = 0;

export function parseCourierStats(game: Match): void {
    game.playbackData.courierEvents.forEach((data) => {
        const count = data.events.filter(({respawn_time}) => respawn_time !== 0);
        kills = kills + count.length;
    });
}

export function printCourierStats(): void {
    console.log(chalk.blueBright(''));
    console.log(chalk.cyan('Courier stats'));
    console.log(chalk.blueBright('-------------'));
    console.log(chalk.blueBright('Kills:'), chalk.yellow(kills));
}