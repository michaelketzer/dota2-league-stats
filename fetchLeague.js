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
    .help()
    .demandOption(['league'], 'Please define a league id with -l or -league')
    .alias('league', 'l')
    .alias('help', 'h')
    .argv;

const downloadFile = (async (leagueId) => {
    console.log(chalk.blueBright('Requesting league matches for', leagueId));
    const res = await fetch(`https://api.stratz.com/api/v1/league/${leagueId}/matches?take=250&include=PLAYER,TEAM`);
    if(res.ok) {
        const fileStream = fs.createWriteStream(__dirname + '/leagues/' + leagueId + '.json' );
        fileStream.on('error', function(err) {
            console.log(chalk.red('Error creating write stream', err));
        });

        await new Promise((resolve, reject) => {
            res.body.pipe(fileStream);
            res.body.on("error", (err) => {
                console.log(chalk.red('Failed loading league matches', err));
                reject(err);
            });
            fileStream.on("finish", function() {
                console.log(chalk.green('Finished loading league matches for', leagueId));
                resolve();
            });
        });
    } else {
        console.log(chalk.red('Skipped league', leagueId, 'with response code', res.statusCode));
    }
});

downloadFile(argv.league);