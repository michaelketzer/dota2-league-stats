import * as chalk from 'chalk';
import { Match } from '../@types/Match';

let totalStats = {
    kills: 0,
    deaths: 0,
    assists: 0,
    gold: 0,
    goldSpent: 0,
    xp: 0,
    net: 0,
    cs: 0,
    cd: 0,
    towers: 0,
}

export function parseTotalStats(game: Match): void {
    game.players.forEach((player) => {
        totalStats.kills += player.numKills;
        totalStats.deaths += player.numDeaths;
        totalStats.assists += player.numAssists;
        totalStats.gold += player.gold;
        totalStats.goldSpent += player.goldSpent;
        totalStats.xp += player.experiencePerMinute * (game.durationSeconds / 60);
        totalStats.net += player.networth;
        totalStats.cs += player.numLastHits;
        totalStats.cd += player.numDenies;
    });
    totalStats.towers += game.playbackData.towerDeathEvents.length;
}

export function printTotalStats(): void {
    console.log(chalk.blueBright(''));
    console.log(chalk.cyan('Total Player Stats'));
    console.log(chalk.blueBright('-------------'));
    console.log(chalk.blueBright('Total Kills:'), chalk.yellow(totalStats.kills));
    console.log(chalk.blueBright('Total Deaths:'), chalk.yellow(totalStats.deaths));
    console.log(chalk.blueBright('Total Assists:'), chalk.yellow(totalStats.assists));
    console.log(chalk.blueBright('Total CS:'), chalk.yellow(totalStats.cs));
    console.log(chalk.blueBright('Total CD:'), chalk.yellow(totalStats.cd));
    console.log(chalk.blueBright('Total Towers:'), chalk.yellow(totalStats.towers));
    console.log(chalk.blueBright('Total Gold:'), chalk.yellow(totalStats.gold));
    console.log(chalk.blueBright('Total Gold spent:'), chalk.yellow(totalStats.goldSpent));
    console.log(chalk.blueBright('Total xp:'), chalk.yellow(Math.floor(totalStats.xp)));
    console.log(chalk.blueBright('Total net:'), chalk.yellow(totalStats.net));
}