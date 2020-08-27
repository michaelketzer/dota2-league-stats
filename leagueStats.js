const fs = require('fs');
const yargs = require('yargs');
const chalk = require('chalk');
const roshStats = require('./roshanStats');
const wardStats = require('./wardStats');
const courierStats = require('./courierStats');
const buybackStats = require('./buybackStats');

const argv = yargs
    .command('league', 'The league you want to collect the rosh state for', {
        year: {
            description: 'The league you want to collect the rosh state for',
            alias: 'l',
            type: 'number',
        }
    })
    .help()
    .demandOption(['league'], 'Please define a league id with -l or -league')
    .alias('league', 'l')
    .alias('help', 'h')
    .argv;

const data = fs.readFileSync('./leagues/' + argv.league + '.json');
const json = JSON.parse(data);
const games = json.map(({id}) => id);

console.log(chalk.red('Collecting league stats for ', argv.league));
console.log(chalk.red('------------------------------------------'));
console.log(chalk.blueBright('Games:'), chalk.yellow(games.length));
const radiantWins = json.filter(({didRadiantWin}) => didRadiantWin).length;
console.log(chalk.blueBright('Radiant wins:'), chalk.yellow(radiantWins), chalk.grey('(' + Math.round((radiantWins*100)/games.length) + '%)'));
console.log(chalk.blueBright('Dire wins:'), chalk.yellow(games.length - radiantWins), chalk.grey('(' + Math.round(((games.length - radiantWins)*100)/games.length) + '%)'));
const sorted = json.sort((a,b) => b.durationSeconds - a.durationSeconds);
const maxGame = sorted[0];
const maxGameLength = Math.floor(maxGame.durationSeconds / 3600) + ':' + Math.floor((maxGame.durationSeconds % 3600) / 60) + ':' + Math.floor(maxGame.durationSeconds % 60);
const minGame = sorted[games.length - 1];
const minGameLength = Math.floor(minGame.durationSeconds / 60) + ':' + Math.floor(minGame.durationSeconds % 60);
console.log(chalk.blueBright('Longest game:'), chalk.yellow(maxGame.id), chalk.grey('(' + maxGameLength + ')'));
console.log(chalk.blueBright('Shortest game:'), chalk.yellow(minGame.id), chalk.grey('(' + minGameLength + ')'));

roshStats();
wardStats();
courierStats();
buybackStats();