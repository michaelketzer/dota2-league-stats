import * as fs from 'fs';
import * as yargs from 'yargs';
import { LeagueMatch } from '../@types/LeagueMatches';

const argv = yargs
    .command('league', 'The league you want to filter games for only downloaded', {
        year: {
            description: 'The league you want to filter games for only downloaded',
            alias: 'l',
            type: 'number',
        }
    })
    .help()
    .alias('league', 'l')
    .alias('help', 'h')
    .argv;

const data = fs.readFileSync(__dirname + '/../../leagues/' + argv.league + '.json');
const allGames: LeagueMatch[] = JSON.parse(data as unknown as string);
const filteredGamesByDownloads = allGames.filter(({ id }) => fs.existsSync(__dirname + '/../../matches/' + id + '.json'))

fs.writeFileSync(__dirname + '/../../leagues/' + argv.league + '.json', JSON.stringify(filteredGamesByDownloads));