const fs = require('fs');
const fetch = require('node-fetch');
const yargs = require('yargs');
const chalk = require('chalk');

const argv = yargs
    .command('league', 'The league you want to collect the courier stats for', {
        year: {
            description: 'The league you want to collect the courier stats for',
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

async function courierStats() {
    let kills = 0;
    for(const id of games) {
        if(fs.existsSync(__dirname + '/matches/' + id + '.json')) {
            const data = fs.readFileSync(__dirname + '/matches/' + id + '.json');

            try {
                const gamedata = JSON.parse(data);

                gamedata.playbackData.courierEvents.forEach((data) => {
                    const count = data.events.filter(({respawn_time}) => respawn_time !== 0);
                    kills = kills + count.length;
                });
            } catch(error) {
                console.log(chalk.red('Failed parsing match', id));
            }
        }
    }

    console.log(chalk.blueBright(''));
    console.log(chalk.cyan('Courier stats'));
    console.log(chalk.blueBright('-------------'));
    console.log(chalk.blueBright('Kills:'), chalk.yellow(kills));
}

module.exports = courierStats;