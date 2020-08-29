import * as fs from 'fs';
import * as yargs from 'yargs';
import { LeagueMatch } from '../@types/LeagueMatches';

const argv = yargs
    .command('league', 'The league you want to collect the rosh state for', {
        year: {
            description: 'The league you want to collect the rosh state for',
            alias: 'l',
            type: 'number',
        }
    })
    .command('pages', 'The amount of pages that should be merged', {
        year: {
            description: 'The amount of pages to be merged',
            alias: 'l',
            type: 'number',
        }
    })
    .help()
    .demandOption(['pages'], 'Please define a league id and the pages to be merged')
    .alias('league', 'l')
    .alias('pages', 'p')
    .alias('help', 'h')
    .argv;

const pages = Array.from(Array(argv.pages).keys());

const data = fs.readFileSync(__dirname + '/../../leagues/' + argv.league + '.json');
let total: LeagueMatch[] = JSON.parse(data as unknown as string);

for(const id of pages) {
    const data = fs.readFileSync(__dirname + '/../../leagues/' + argv.league + '_' + (id+1) + '.json');
    const pageData: LeagueMatch[] = JSON.parse(data as unknown as string);
    total = total.concat(pageData);
    fs.unlinkSync(__dirname + '/../../leagues/' + argv.league + '_' + (id+1) + '.json');
}


fs.writeFileSync(__dirname + '/../../leagues/' + argv.league + '.json', JSON.stringify(total));