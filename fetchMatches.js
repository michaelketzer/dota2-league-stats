const fs = require('fs');
const fetch = require('node-fetch');
const yargs = require('yargs');
const chalk = require('chalk');

const argv = yargs
    .command('league', 'The league you want to fetch the matches for', {
        year: {
            description: 'The league you want to fetch the matches for',
            alias: 'l',
            type: 'number',
        }
    })
    .command('all', 'Checks and loads all available league matches', {
        year: {
            description: 'Checks and loads all available league matches',
            alias: 'a',
            type: 'boolean',
        }
    })
    .command('validate', 'Validates the matches have correct JSON downloaded', {
        year: {
            description: 'Sometimes the download will skip some chars, this validates all downloads and may redownloads them',
            alias: 'v',
            type: 'boolean',
        }
    })
    .help()
    .demandOption(['league'], 'Please define a league id with -l or -league')
    .alias('league', 'l')
    .alias('values', 'v')
    .alias('all', 'a')
    .alias('help', 'h')
    .argv;

const data = fs.readFileSync('./leagues/' + argv.league + '.json');
const json = JSON.parse(data);
const games = json.map(({id}) => id);


const downloadFile = (async (matchId) => {
    console.log(chalk.blueBright('Requesting match with id', matchId));
    const res = await fetch('https://api.stratz.com/api/v1/match/' + matchId);
    if(res.ok) {
        const fileStream = fs.createWriteStream(__dirname + '/matches/' + matchId + '.json' );
        fileStream.on('error', function(err) {
            console.log(chalk.red('Error creating write stream', err));
        });

        await new Promise((resolve, reject) => {
            res.body.pipe(fileStream);
            res.body.on("error", (err) => {
                console.log(chalk.red('Failed loading match', matchId, err));
                reject(err);
            });
            fileStream.on("finish", function() {
                console.log(chalk.green('Finished loading match for', matchId));
                resolve();
            });
        });
    } else {
        console.log(chalk.red('Skipped match', matchId, 'with response code', res.statusCode));
    }
});

async function load() {
    console.log(chalk.yellowBright('Init new match fetching'));
    let i = 0;
    for(const id of games) {
        const alreadyDownloaded = fs.existsSync(__dirname + '/matches/' + id + '.json');
        if(argv.validate && alreadyDownloaded) {
            const data = fs.readFileSync(__dirname + '/matches/' + id + '.json');
            try {
                JSON.parse(data);
            } catch(error) {
                console.log(chalk.red('Match', id, 'is invalid, starting reload'));
                fs.unlinkSync(__dirname + '/matches/' + id + '.json');
                await downloadFile(id);
                i++;
            }
        } else if(!argv.validate && !alreadyDownloaded) {
            await downloadFile(id);
            i++;
        }

        if(i > 5) {
            break;
        }
    }
    console.log(chalk.yellowBright('Stopped match fetching'));
}

if(argv.all) {
    setInterval(load, 60000);
} else {
    load();
}
