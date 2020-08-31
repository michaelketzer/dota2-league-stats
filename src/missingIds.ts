import * as fs from 'fs';
import { LeagueMatch } from './@types/LeagueMatches';
const stratz = fs.readFileSync(__dirname + '/../leagues/12229.json');
const games: LeagueMatch[] = JSON.parse(stratz as unknown as string);
const stratzIds = games.map(({id}) => +id);

const dotabuff = JSON.parse(fs.readFileSync(__dirname + '/../leagues/12229_dotabuff.json') as unknown as string);

const stratzSet = new Set(stratzIds);

console.log(dotabuff.filter((id) => !stratzSet.has(id)));