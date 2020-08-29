import * as chalk from 'chalk';
import { Match } from '../@types/Match';

let topStats = {
    kills: {count: 0, matchId: 0, playerId: 0},
    deaths: {count: 0, matchId: 0, playerId: 0},
    assists: {count: 0, matchId: 0, playerId: 0},
    gpm: {count: 0, matchId: 0, playerId: 0},
    xpm: {count: 0, matchId: 0, playerId: 0},
    net: {count: 0, matchId: 0, playerId: 0},
    cs: {count: 0, matchId: 0, playerId: 0},
    cd: {count: 0, matchId: 0, playerId: 0},
}

export function parseTopStats(game: Match): void {
    game.players.forEach((player) => {
        if(player.numKills > topStats.kills.count) {
            topStats.kills = {
                count: player.numKills,
                matchId: game.id,
                playerId: player.steamAccountId,
            }
        }
        if(player.numDeaths > topStats.deaths.count) {
            topStats.deaths = {
                count: player.numDeaths,
                matchId: game.id,
                playerId: player.steamAccountId,
            }
        }
        if(player.numAssists > topStats.assists.count) {
            topStats.assists = {
                count: player.numAssists,
                matchId: game.id,
                playerId: player.steamAccountId,
            }
        }
        if(player.goldPerMinute > topStats.gpm.count) {
            topStats.gpm = {
                count: player.goldPerMinute,
                matchId: game.id,
                playerId: player.steamAccountId,
            }
        }
        if(player.experiencePerMinute > topStats.xpm.count) {
            topStats.xpm = {
                count: player.experiencePerMinute,
                matchId: game.id,
                playerId: player.steamAccountId,
            }
        }
        if(player.networth > topStats.net.count) {
            topStats.net = {
                count: player.networth,
                matchId: game.id,
                playerId: player.steamAccountId,
            }
        }
        if(player.numLastHits > topStats.cs.count) {
            topStats.cs = {
                count: player.numLastHits,
                matchId: game.id,
                playerId: player.steamAccountId,
            }
        }
        if(player.numDenies > topStats.cd.count) {
            topStats.cd = {
                count: player.numDenies,
                matchId: game.id,
                playerId: player.steamAccountId,
            }
        }
    });
}

export function printTopStats(): void {
    console.log(chalk.blueBright(''));
    console.log(chalk.cyan('Top Player Stats', chalk.magenta('Match id'), chalk.greenBright('Player id')));
    console.log(chalk.blueBright('-------------'));
    console.log(chalk.blueBright('Top Kills:'), chalk.yellow(topStats.kills.count), chalk.magenta(topStats.kills.matchId), chalk.greenBright(topStats.kills.playerId));
    console.log(chalk.blueBright('Top Deaths:'), chalk.yellow(topStats.deaths.count), chalk.magenta(topStats.deaths.matchId), chalk.greenBright(topStats.deaths.playerId));
    console.log(chalk.blueBright('Top Assists:'), chalk.yellow(topStats.assists.count), chalk.magenta(topStats.assists.matchId), chalk.greenBright(topStats.assists.playerId));
    console.log(chalk.blueBright('Top CS:'), chalk.yellow(topStats.cs.count), chalk.magenta(topStats.cs.matchId), chalk.greenBright(topStats.cs.playerId));
    console.log(chalk.blueBright('Top CD:'), chalk.yellow(topStats.cd.count), chalk.magenta(topStats.cd.matchId), chalk.greenBright(topStats.cd.playerId));
    console.log(chalk.blueBright('Top GPM:'), chalk.yellow(topStats.gpm.count), chalk.magenta(topStats.gpm.matchId), chalk.greenBright(topStats.gpm.playerId));
    console.log(chalk.blueBright('Top XPM:'), chalk.yellow(topStats.xpm.count), chalk.magenta(topStats.xpm.matchId), chalk.greenBright(topStats.xpm.playerId));
    console.log(chalk.blueBright('Top Net:'), chalk.yellow(topStats.net.count), chalk.magenta(topStats.net.matchId), chalk.greenBright(topStats.net.playerId));
}