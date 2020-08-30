import * as fs from 'fs';
import * as yargs from 'yargs';
import * as chalk from 'chalk';
import { Match } from './@types/Match';
import { printRoshStats, parseRoshStats } from './parser/roshanStats';
import { parseWardStats, printWardStats } from './parser/wardStats';
import { parseCourierStats, printCourierStats } from './parser/courierStats';
import { printTopStats, parseTopStats } from './parser/topStats';
import { parseTotalStats, printTotalStats } from './parser/totalStats';
import { parseTopHeroes, printTopHeroes } from './parser/topHeroes';
import { LeagueMatch } from './@types/LeagueMatches';
import { boolean } from 'yargs';

const americasRegionIds = new Set([10, 14, 15, 1, 2]);
const asiaRegionIds = new Set([17, 13, 5]);

const argv = yargs
    .command('league', 'The league you want to collect the rosh state for', {
        year: {
            description: 'The league you want to collect the rosh state for',
            alias: 'l',
            type: 'number',
        }
    })
    .command('americas', 'Checks games only in region americas', {
        year: {
            description: 'Checks games only in region americas',
            type: 'boolean',
        }
    })
    .command('asia', 'Checks games only in region americas', {
        year: {
            description: 'Checks games only in region americas',
            type: 'boolean',
        }
    })
    .help()
    .demandOption(['league'], 'Please define a league id with -l or -league')
    .alias('league', 'l')
    .alias('help', 'h')
    .argv;

function filterMatchByRegions({regionId}: LeagueMatch): boolean {
    if(argv.asia) {
        return asiaRegionIds.has(regionId);
    }
    if(argv.americas) {
        return americasRegionIds.has(regionId);
    }

    return true;
}

const data = fs.readFileSync(__dirname + '/../leagues/' + argv.league + '.json');
const json: LeagueMatch[] = JSON.parse(data as unknown as string);
const fullGames: LeagueMatch[] = json.filter(filterMatchByRegions);
const games = fullGames.map(({id}) => id);
const allRegions = json.reduce((acc, match) => acc.add(match.regionId), new Set());

console.log(chalk.red('Collecting league stats for ', argv.league));
console.log(chalk.red('------------------------------------------'));
console.log(chalk.blueBright('Regions played:'), chalk.yellow([...allRegions.values()].join(', ')));
console.log(chalk.blueBright('Games:'), chalk.yellow(games.length));
const radiantWins = fullGames.filter(({didRadiantWin}) => didRadiantWin).length;
console.log(chalk.blueBright('Radiant wins:'), chalk.yellow(radiantWins), chalk.grey('(' + Math.round((radiantWins*100)/games.length) + '%)'));
console.log(chalk.blueBright('Dire wins:'), chalk.yellow(games.length - radiantWins), chalk.grey('(' + Math.round(((games.length - radiantWins)*100)/games.length) + '%)'));
const sorted = fullGames.sort((a,b) => b.durationSeconds - a.durationSeconds);
const maxGame = sorted[0];
const maxGameLength = Math.floor(maxGame.durationSeconds / 3600) + ':' + Math.floor((maxGame.durationSeconds % 3600) / 60) + ':' + Math.floor(maxGame.durationSeconds % 60);
const minGame = sorted[games.length - 1];
const minGameLength = Math.floor(minGame.durationSeconds / 60) + ':' + Math.floor(minGame.durationSeconds % 60);
const totalPlaytime = fullGames.reduce((acc, {durationSeconds}) => acc + durationSeconds, 0);
console.log(chalk.blueBright('Longest game:'), chalk.yellow(maxGame.id), chalk.grey('(' + maxGameLength + ')'));
console.log(chalk.blueBright('Shortest game:'), chalk.yellow(minGame.id), chalk.grey('(' + minGameLength + ')'));
console.log(chalk.blueBright('Total play time:'), chalk.yellow(totalPlaytime + ' seconds'));

console.log('');

for(const id of games) {
    if(fs.existsSync(__dirname + '/../matches/' + id + '.json')) {
        const data = fs.readFileSync(__dirname + '/../matches/' + id + '.json');

        try {
            const gamedata: Match = JSON.parse(data as unknown as string);
            parseTopStats(gamedata);
            parseTotalStats(gamedata);
            parseRoshStats(gamedata);
            parseWardStats(gamedata);
            parseCourierStats(gamedata);
            parseTopHeroes(gamedata);
            //parseBuybackStats(gamedata);
        } catch(error) {
            console.log(chalk.red('Failed parsing match', id));
        }
    }
}

printTopStats();
printTotalStats();
printRoshStats();
printWardStats();
printCourierStats();
printTopHeroes();
//printBuybackStats();