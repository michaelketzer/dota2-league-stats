import * as chalk from 'chalk';
import { Match } from '../@types/Match';

let topHeroes: {[x: string]: {picks: number; bans: number; won: number}} = {};

function requireHero(heroId): {picks: number; bans: number; won: number} {
    if(!topHeroes[heroId]) {
        topHeroes[heroId] = {
            bans: 0,
            picks: 0,
            won: 0,
        };
    }

    return topHeroes[heroId];
}

export function parseTopHeroes(game: Match): void {
    game.pickBans.forEach((pickBan) => {
        const hero = requireHero(pickBan.heroId);
        if(pickBan.isPick) {
            const won = pickBan.isRadiant && game.didRadiantWin;
            hero.picks += 1;
            hero.won += (won ? 1 : 0);
        } else {
            hero.bans += 1;
        }
    })
}

export function printTopHeroes(): void {
    const heroes = Object.entries(topHeroes);
    const topTotal = [...heroes].sort(([, {picks: aP, bans: aB}], [, {picks: bP, bans: bB}]) => (bB + bP) - (aP + aB));
    const topPicks = [...heroes].sort(([, {picks: a}], [, {picks: b}]) => b - a);
    const topBans = [...heroes].sort(([, {bans: a}], [, {bans: b}]) => b - a);
    console.log(chalk.blueBright(''));
    console.log(chalk.cyan('Top Hero Stats'));
    console.log(chalk.blueBright('-------------'));
    console.log(chalk.blueBright('Top Heroes:'), chalk.yellow(topTotal.slice(0, 3).map(([id]) => id)));
    console.log(chalk.blueBright('Top Picks:'), chalk.yellow(topPicks.slice(0, 3).map(([id]) => id)));
    console.log(chalk.blueBright('Top Bans:'), chalk.yellow(topBans.slice(0, 3).map(([id]) => id)));
}