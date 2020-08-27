const fs = require('fs');
const yargs = require('yargs');
const chalk = require('chalk');

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

const roshanNpcId = 133;
const aegisItemId = 117;

async function roshStats() {
    let i = 0;
    let radiant = 0;
    let dire = 0;
    let radSnatch = 0;
    let dirSnatch = 0;
    for(const id of games) {
        if(fs.existsSync(__dirname + '/matches/' + id + '.json')) {
            const data = fs.readFileSync(__dirname + '/matches/' + id + '.json');
            try {
                const gamedata = JSON.parse(data);

                const deathsThisMatch = gamedata.playbackData.roshanEvents.reduce((acc, data) => {
                    if(data?.hp === 0) {
                        acc++;
                    }
                    return acc;
                }, 0);
                i = i +deathsThisMatch;

                if(deathsThisMatch > 0) {
                    let tRad = 0;
                    let tDir = 0;
                    let aRad = 0;
                    let aDir = 0;
                    gamedata.players.forEach((player) => {
                        const roshKills = player.playbackData.csEvents.filter(({npcId}) => npcId === roshanNpcId);
                        const aegisEvents = player.playbackData.inventoryEvent.filter((evt, idx, obj) => {
                            const hasAegis = Object.entries(evt).find(([, item]) => item?.itemId === aegisItemId);
                            if(hasAegis) {
                                const priorState = obj[idx - 1];
                                return priorState[hasAegis[0]]?.itemId !== aegisItemId;
                            }
                            return false;
                        });
                        if(roshKills.length > 0) {
                            if(player.isRadiant) {
                                tRad = tRad + roshKills.length;   
                            } else {
                                tDir = tDir + roshKills.length;   
                            }
                        }

                        if(aegisEvents.length > 0) {
                            if(player.isRadiant) {
                                aRad = aRad + aegisEvents.length;   
                            } else {
                                aDir = aDir + aegisEvents.length;   
                            }
                        }
                    });

                    radiant = radiant + tRad;
                    dire = dire + tDir;

                    if(tRad !== aRad || tDir != aDir) {
                        const radiantSnatches = tDir - aDir;
                        if(radiantSnatches > 0) {
                            radSnatch  = radSnatch + radiantSnatches;
                        }
                        const direSnatches = tRad - aRad;
                        if(direSnatches > 0) {
                            dirSnatch  = dirSnatch + direSnatches;
                        }
                    }
                }
            } catch(error) {
                console.log(chalk.red('Failed parsing match', id));
            }
        }
    }

    console.log(chalk.blueBright(''));
    console.log(chalk.cyan('Roshan Stats'));
    console.log(chalk.blueBright('------------'));
    console.log(chalk.blueBright('Deaths:'), chalk.yellow(i));
    console.log(chalk.blueBright('Radiant kills:'), chalk.yellow(radiant));
    console.log(chalk.blueBright('Dire kills:'), chalk.yellow(dire));
    console.log(chalk.blueBright('Radiant Aegis snatches:'), chalk.yellow(radSnatch));
    console.log(chalk.blueBright('Dire Aegis snatches:'), chalk.yellow(dirSnatch));
}

module.exports = roshStats;