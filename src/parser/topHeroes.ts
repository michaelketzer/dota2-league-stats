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
            const won = pickBan.isRadiant === game.didRadiantWin;
            hero.picks += 1;
            hero.won += (won ? 1 : 0);
        } else {
            hero.bans += 1;
        }
    })
}


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
    '126': 'void_spirit',
    '128': 'snapfire',
    '129': 'mars'
};

export function printTopHeroes(): void {
    const heroes = Object.entries(topHeroes);
    const topTotal = [...heroes].sort(([, {picks: aP, bans: aB}], [, {picks: bP, bans: bB}]) => (bB + bP) - (aP + aB));
    const topPicks = [...heroes].sort(([, {picks: a}], [, {picks: b}]) => b - a);
    const topBans = [...heroes].sort(([, {bans: a}], [, {bans: b}]) => b - a);
    const topWinRate = [...heroes].filter(([, {picks}]) => picks > 10).sort(([, {picks: aP, won: aW}], [, {picks: bP, won: bW}]) => ((bW * 100) / bP) - ((aW * 100 / aP)) || bP - aP);
    const picked = new Set([...heroes].reduce((acc, [id, {picks}]) => {
        if(picks > 0) {
            acc.push(id);
        }
        return acc;
    }, []));
    const notPicked = Object.keys(heroIdMap).filter((id) => !picked.has('' + id))
    
    console.log(chalk.blueBright(''));
    console.log(chalk.cyan('Top Hero Stats'));
    console.log(chalk.blueBright('-------------'));
    console.log(chalk.blueBright('Top Heroes:'), chalk.yellow(topTotal.slice(0, 3).map(([id]) => heroIdMap[id]).join(', ')));
    console.log(chalk.blueBright('Top Picks:'), chalk.yellow(topPicks.slice(0, 3).map(([id]) => heroIdMap[id]).join(', ')));
    console.log(chalk.blueBright('Top Bans:'), chalk.yellow(topBans.slice(0, 3).map(([id]) => heroIdMap[id]).join(', ')));
    console.log(chalk.blueBright('Top Win rate:'), chalk.yellow(topWinRate.slice(0, 3).map(([id, {won, picks}]) => `${heroIdMap[id]} ${chalk.grey(`(${won}/${picks} ${Math.round((won * 100) / picks)}%)`)}`).join(', ')));
    console.log(chalk.blueBright('Never picked:', chalk.yellow(notPicked.map((id) => heroIdMap[id]).join(', '))));
}