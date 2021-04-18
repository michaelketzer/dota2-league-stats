import * as fs from 'fs';
import * as yargs from 'yargs';
import * as chalk from 'chalk';
import { LeagueMatch } from './@types/LeagueMatches';

const argv = yargs
    .command('league', 'The league you want to collect the data for', {
        year: {
            description: 'The league you want to collect the data for',
            alias: 'l',
            type: 'number',
        }
    })
    .command('team', 'The team you want to collect the data for', {
        year: {
            description: 'The team you want to collect the data for',
            alias: 't',
            type: 'number',
        }
    })
    .help()
    .demandOption(['league', 'team'], 'Please define a league id and a team id')
    .alias('league', 'l')
    .alias('team', 't')
    .alias('help', 'h')
    .argv;


const teamId = +argv.team;

const data = fs.readFileSync(__dirname + '/../leagues/' + argv.league + '.json');
const games: LeagueMatch[] = JSON.parse(data as unknown as string);
const teamRelevantMatches = games.filter(({radiantTeamId, direTeamId}) => radiantTeamId === teamId || direTeamId === teamId);

let radiantGames = 0;
let direGames = 0;
let radiantWins = 0;
let direWins = 0;

teamRelevantMatches.forEach((match) => {
    const wasRadiant = match.radiantTeamId === teamId;

    if(wasRadiant) {
        radiantGames += 1;
        if(wasRadiant && match.didRadiantWin) {
            radiantWins += 1;
        }
    } else {
        direGames += 1;
        if(!wasRadiant && !match.didRadiantWin) {
            direWins += 1;
        }
    }
})

const heroIdMap = {
    '1': 'antimage',
    '2': 'axe',
    '3': 'bane',
    '4': 'bloodseeker',
    '5': 'crystal_maiden',
    '6': 'drow_ranger',
    '7': 'earthshaker',
    '8': 'juggernaut',
    '9': 'mirana',
    '10': 'morphling',
    '11': 'nevermore',
    '12': 'phantom_lancer',
    '13': 'puck',
    '14': 'pudge',
    '15': 'razor',
    '16': 'sand_king',
    '17': 'storm_spirit',
    '18': 'sven',
    '19': 'tiny',
    '20': 'vengefulspirit',
    '21': 'windrunner',
    '22': 'zuus',
    '23': 'kunkka',
    '25': 'lina',
    '26': 'lion',
    '27': 'shadow_shaman',
    '28': 'slardar',
    '29': 'tidehunter',
    '30': 'witch_doctor',
    '31': 'lich',
    '32': 'riki',
    '33': 'enigma',
    '34': 'tinker',
    '35': 'sniper',
    '36': 'necrolyte',
    '37': 'warlock',
    '38': 'beastmaster',
    '39': 'queenofpain',
    '40': 'venomancer',
    '41': 'faceless_void',
    '42': 'skeleton_king',
    '43': 'death_prophet',
    '44': 'phantom_assassin',
    '45': 'pugna',
    '46': 'templar_assassin',
    '47': 'viper',
    '48': 'luna',
    '49': 'dragon_knight',
    '50': 'dazzle',
    '51': 'rattletrap',
    '52': 'leshrac',
    '53': 'furion',
    '54': 'life_stealer',
    '55': 'dark_seer',
    '56': 'clinkz',
    '57': 'omniknight',
    '58': 'enchantress',
    '59': 'huskar',
    '60': 'night_stalker',
    '61': 'broodmother',
    '62': 'bounty_hunter',
    '63': 'weaver',
    '64': 'jakiro',
    '65': 'batrider',
    '66': 'chen',
    '67': 'spectre',
    '68': 'ancient_apparition',
    '69': 'doom_bringer',
    '70': 'ursa',
    '71': 'spirit_breaker',
    '72': 'gyrocopter',
    '73': 'alchemist',
    '74': 'invoker',
    '75': 'silencer',
    '76': 'obsidian_destroyer',
    '77': 'lycan',
    '78': 'brewmaster',
    '79': 'shadow_demon',
    '80': 'lone_druid',
    '81': 'chaos_knight',
    '82': 'meepo',
    '83': 'treant',
    '84': 'ogre_magi',
    '85': 'undying',
    '86': 'rubick',
    '87': 'disruptor',
    '88': 'nyx_assassin',
    '89': 'naga_siren',
    '90': 'keeper_of_the_light',
    '91': 'wisp',
    '92': 'visage',
    '93': 'slark',
    '94': 'medusa',
    '95': 'troll_warlord',
    '96': 'centaur',
    '97': 'magnataur',
    '98': 'shredder',
    '99': 'bristleback',
    '100': 'tusk',
    '101': 'skywrath_mage',
    '102': 'abaddon',
    '103': 'elder_titan',
    '104': 'legion_commander',
    '105': 'techies',
    '106': 'ember_spirit',
    '107': 'earth_spirit',
    '108': 'abyssal_underlord',
    '109': 'terrorblade',
    '110': 'phoenix',
    '111': 'oracle',
    '112': 'winter_wyvern',
    '113': 'arc_warden',
    '114': 'monkey_king',
    '119': 'dark_willow',
    '120': 'pangolier',
    '121': 'grimstroke',
    '123': 'hoodwink',
    '126': 'void_spirit',
    '128': 'snapfire',
    '129': 'mars'
};

interface HeroStats {
    games: number;
    won: number;
    phase1: number;
    phase2: number;
    phase3: number;
}


export function requireHeroStats(heroId: number, acc: {[x: string]: HeroStats}): HeroStats {
    if(!acc[heroId]) {
        acc[heroId] = {
            games: 0,
            won: 0,
            phase1: 0,
            phase2: 0,
            phase3: 0,
        };
    }

    return acc[heroId];
}

export function getPhase(order: number, gameVersion: number): number {
    if(gameVersion <= 131) {
        return order < 12 ? 1 : (order < 18 ? 2 : 3);
    }
    return order < 8 ? 1 : (order < 18 ? 2 : 3);
}


const pickStats = teamRelevantMatches.reduce<{[x: string]: HeroStats}>((acc, match) => {
    const {pickBans, radiantTeamId, didRadiantWin} = match;
    const wasRadiant = teamId === radiantTeamId;
    const won = didRadiantWin === wasRadiant;;

    pickBans.forEach(({order, isPick, heroId, isRadiant}) => {
        if(isPick && wasRadiant === isRadiant) {
            const stats = requireHeroStats(heroId, acc);
            stats.games = stats.games + 1;
            stats.won = stats.won + (won ? 1 : 0);
            const phase = getPhase(order, match.gameVersionId);
            if(phase === 1) {
                stats.phase1 = stats.phase1 + 1;
            } else if(phase === 2) {
                stats.phase2 = stats.phase2 + 1;
            } else {
                stats.phase3 = stats.phase3 + 1;
            }
        }
    });
    return acc;
}, {});

const topPicks = Object.entries(pickStats).sort(([, {games: a}], [, {games: b}]) => b - a).slice(0, 15).map(([id, data]) => ({id, ...data}));
const topWinRate = Object.entries(pickStats).sort(
        ([, {games: gA, won: wA}], [, {games: gB, won: wB}]) => (gB > 3 && gA > 3 ? wB/gB - wA/gA : gB - gA) || gB - gA)
    .slice(0, 10).map(([id, data]) => ({id, ...data}));
const topPicksFirstPhase = Object.entries(pickStats).sort(([, {phase1: a, games: gA}], [, {phase1: b, games: gB}]) => b - a || gB - gA).slice(0, 5).map(([id, data]) => ({id, ...data}));
const topPicksSecondPhase = Object.entries(pickStats).sort(([, {phase2: a, games: gA}], [, {phase2: b, games: gB}]) => b - a || gB - gA).slice(0, 5).map(([id, data]) => ({id, ...data}));
const topPicksThirdPhase = Object.entries(pickStats).sort(([, {phase3: a, games: gA}], [, {phase3: b, games: gB}]) => b - a || gB - gA).slice(0, 5).map(([id, data]) => ({id, ...data})); 

const banStats = teamRelevantMatches.reduce<{[x: string]: HeroStats}>((acc, match) => {
    const {pickBans, radiantTeamId, didRadiantWin} = match;
    const wasRadiant = argv.team === radiantTeamId;

    pickBans.forEach(({order, isPick, heroId, isRadiant}) => {
        if(!isPick && isRadiant !== wasRadiant) {
            const stats = requireHeroStats(heroId, acc);
            stats.games = stats.games + 1;
            const phase = getPhase(order, match.gameVersionId);
            if(phase === 1) {
                stats.phase1 = stats.phase1 + 1;
            } else if(phase === 2) {
                stats.phase2 = stats.phase2 + 1;
            } else {
                stats.phase3 = stats.phase3 + 1;
            }
        }
    });
    return acc;
}, {});

console.log(chalk.red('Collecting team stats for league', argv.league, 'and team', argv.team));
console.log(chalk.red('------------------------------------------------------------'));
console.log('');
console.log(chalk.red('Total Team Stats'))
console.log(chalk.red('----------------'))
console.log(chalk.yellow('Total games:'), chalk.yellow(radiantGames + direGames))
console.log(chalk.yellow('Radiant games:'), chalk.yellow(radiantGames), chalk.grey('(' + Math.round((radiantWins * 100) / radiantGames) + '%)'))
console.log(chalk.yellow('Dire games:'), chalk.yellow(direGames), chalk.grey('(' + Math.round((direWins * 100) / direGames) + '%)'))

console.log('')

console.log(chalk.red('Pick stats'))
console.log(chalk.red('----------'))

console.log('')

console.log(chalk.blueBright('Top total picks:'));
topPicks.forEach((hero, idx) => console.log(chalk.yellow(idx + 1 + '.'), chalk.greenBright(heroIdMap[hero.id]), chalk.blueBright(hero.won + '/' + hero.games), chalk.grey(Math.floor((hero.won * 100) / hero.games) + '%')));

console.log('');
console.log(chalk.blueBright('Top performance:'));
topWinRate.forEach((hero, idx) => console.log(chalk.yellow(idx + 1 + '.'), chalk.greenBright(heroIdMap[hero.id]), chalk.blueBright(hero.won + '/' + hero.games), chalk.grey(Math.floor((hero.won * 100) / hero.games) + '%')));

console.log('');
console.log(chalk.blueBright('Top picks 1st phase:'));
topPicksFirstPhase.forEach((hero, idx) => console.log(chalk.yellow(idx + 1 + '.'), chalk.greenBright(heroIdMap[hero.id]), chalk.blueBright(hero.phase1 + '/' + hero.games)));

console.log('');
console.log(chalk.blueBright('Top picks 2nd phase:'));
topPicksSecondPhase.forEach((hero, idx) => console.log(chalk.yellow(idx + 1 + '.'), chalk.greenBright(heroIdMap[hero.id]), chalk.blueBright(hero.phase2 + '/' + hero.games)));

console.log('');
console.log(chalk.blueBright('Top picks 3rd phase:'));
topPicksThirdPhase.forEach((hero, idx) => console.log(chalk.yellow(idx + 1 + '.'), chalk.greenBright(heroIdMap[hero.id]), chalk.blueBright(hero.phase3 + '/' + hero.games)));

const topBans = Object.entries(banStats).sort(([, {games: a}], [, {games: b}]) => b - a).slice(0, 15).map(([id, data]) => ({id, ...data}));
const topBansFirstPhase = Object.entries(banStats).sort(([, {phase1: a, games: gA}], [, {phase1: b, games: gB}]) => b - a || gB - gA).slice(0, 5).map(([id, data]) => ({id, ...data}));
const topBansSecondPhase = Object.entries(banStats).sort(([, {phase2: a, games: gA}], [, {phase2: b, games: gB}]) => b - a || gB - gA).slice(0, 5).map(([id, data]) => ({id, ...data}));
const topBansThirdPhase = Object.entries(banStats).sort(([, {phase3: a, games: gA}], [, {phase3: b, games: gB}]) => b - a || gB - gA).slice(0, 5).map(([id, data]) => ({id, ...data}));

console.log('')

console.log(chalk.red('Ban stats'))
console.log(chalk.red('----------'))

console.log('')

console.log(chalk.blueBright('Top bans against this team:'));
topBans.forEach((hero, idx) => console.log(chalk.yellow(idx + 1 + '.'), chalk.greenBright(heroIdMap[hero.id]), chalk.blueBright(hero.games)));

console.log('');
console.log(chalk.blueBright('Top bans 1st phase:'));
topBansFirstPhase.forEach((hero, idx) => console.log(chalk.yellow(idx + 1 + '.'), chalk.greenBright(heroIdMap[hero.id]), chalk.blueBright(hero.phase1 + '/' + hero.games)));

console.log('');
console.log(chalk.blueBright('Top bans 2nd phase:'));
topBansSecondPhase.forEach((hero, idx) => console.log(chalk.yellow(idx + 1 + '.'), chalk.greenBright(heroIdMap[hero.id]), chalk.blueBright(hero.phase2 + '/' + hero.games)));

console.log('');
console.log(chalk.blueBright('Top bans 3rd phase:'));
topBansThirdPhase.forEach((hero, idx) => console.log(chalk.yellow(idx + 1 + '.'), chalk.greenBright(heroIdMap[hero.id]), chalk.blueBright(hero.phase3 + '/' + hero.games)));

function getPlayerTopHeroes(playerId: number): Array<{id: string; games: number; won: number}> {
    const games = teamRelevantMatches.reduce((acc, match) => {
        const performance = match.players.find(({steamAccountId}) => steamAccountId === playerId);
        if(performance) {
            acc.push(performance);
        }
        return acc;
    }, []);

    const heroMap = games.reduce<{[x: string]: {games: number; won: number}}>((acc, hero) => {
        if(!acc[hero.heroId]) {
            acc[hero.heroId] = {
                games: 0,
                won: 0,
            };
        }

        acc[hero.heroId].games = acc[hero.heroId].games + 1;
        acc[hero.heroId].won = acc[hero.heroId].won + (hero.isVictory ? 1 : 0);

        return acc;
    }, {});

    return Object.entries(heroMap).sort(([, {games: a, won: aW}], [, {games: b, won: bW}]) => b - a || bW - aW).slice(0, 5).map(([id, stats]) => ({id, ...stats}));
}

const teamPlayers = teamRelevantMatches.reduce<Set<number>>((acc, match) => {
    const isRadiantTeam = match.radiantTeamId === teamId;
    match.players.forEach((player) => {
        if(player.isRadiant === isRadiantTeam) {
            acc.add(player.steamAccountId);
        }
    });
    return acc;
}, new Set());

console.log('')
console.log('')
console.log(chalk.red('Top heroes for players'))
console.log(chalk.red('----------------------'))
console.log('');

teamPlayers.forEach((id) => {
    const topHeroes = getPlayerTopHeroes(id);
    console.log(chalk.cyanBright(id));
    topHeroes.forEach((hero, idx) => console.log(chalk.yellow(idx + 1 + '.'), chalk.greenBright(heroIdMap[hero.id]), chalk.blueBright(hero.won + '/' + hero.games), chalk.grey(Math.floor((hero.won * 100) / hero.games) + '%')));
    console.log('');
});
