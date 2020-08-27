const fs = require('fs');
const fetch = require('node-fetch');
const yargs = require('yargs');
const chalk = require('chalk');

const argv = yargs
    .command('league', 'The league you want to collect the buyback stats for', {
        year: {
            description: 'The league you want to collect the buyback stats for',
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

async function buybackStats() {
    let buybacks = 0;
    let costs = 0;

    for(const id of games) {
        if(fs.existsSync(__dirname + '/matches/' + id + '.json')) {
            const data = fs.readFileSync(__dirname + '/matches/' + id + '.json');

            try {
                const gamedata = JSON.parse(data);

                gamedata.players.forEach((data) => {
                    const plaercosts = data.playbackData.buyBackEvents.reduce((acc, {cost}) => {
                        acc = acc + cost;
                        return cost;
                    }, 0)
                    buybacks = buybacks + data.playbackData.buyBackEvents.length;
                    costs = costs + plaercosts;
                });
            } catch(error) {
                console.log(chalk.red('Failed parsing match', id));
            }
        }
    }

    console.log(chalk.blueBright(''));
    console.log(chalk.cyan('Buyback stats'));
    console.log(chalk.blueBright('-------------'));
    console.log(chalk.blueBright('Total:'), chalk.yellow(buybacks));
    console.log(chalk.blueBright('Costs:'), chalk.yellow(costs));
}

module.exports = buybackStats;