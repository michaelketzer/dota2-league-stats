const fs = require('fs');
const fetch = require('node-fetch');
const yargs = require('yargs');
const chalk = require('chalk');

const argv = yargs
    .command('league', 'The league you want to collect the ward stats for', {
        year: {
            description: 'The league you want to collect the ward stats for',
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

async function wardStats() {
    let obs = 0;
    let sentry = 0;

    for(const id of games) {
        if(fs.existsSync(__dirname + '/matches/' + id + '.json')) {
            const data = fs.readFileSync(__dirname + '/matches/' + id + '.json');

            try {
                const gamedata = JSON.parse(data);

                gamedata.players.forEach((data) => {
                    const wards = data.playbackData.purchaseEvents.filter(({item}) => item === 43 || item === 42).map(({item}) => item);
                    const obW = wards.filter((id) => id === 42).length;
                    const senW = wards.filter((id) => id === 43).length;
                    obs = obs + obW;
                    sentry = sentry + senW;
                });
            } catch(error) {
                console.log(chalk.red('Failed parsing match', id));
            }
        }
    }

    console.log(chalk.cyan(''));
    console.log(chalk.cyan('Ward stats'));
    console.log(chalk.blueBright('----------'));
    console.log(chalk.blueBright('Total:'), chalk.yellow(obs + sentry));
    console.log(chalk.blueBright('Observer wards:'), chalk.yellow(obs));
    console.log(chalk.blueBright('Sentry wards:'), chalk.yellow(sentry));
}

module.exports = wardStats;