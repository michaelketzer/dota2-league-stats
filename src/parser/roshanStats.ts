import { Match } from "../@types/Match";
import * as chalk from 'chalk';

const roshanNpcId = 133;
const aegisItemId = 117;

let total = 0;
let radiantKills = 0;
let direKills = 0;
let radiantSnatches = 0;
let direSnatches = 0;


export function parseRoshStats(game: Match): void {
    const deathsThisMatch = game.playbackData.roshanEvents.reduce((acc, data) => {
        if(data?.hp === 0) {
            acc++;
        }
        return acc;
    }, 0);

    total = total + deathsThisMatch;

    if(deathsThisMatch > 0) {
        let tRad = 0;
        let tDir = 0;
        let aRad = 0;
        let aDir = 0;
        game.players.forEach((player) => {
            const roshKills = player.playbackData.csEvents.filter(({npcId}) => npcId === roshanNpcId);
            const aegisEvents = player.playbackData.inventoryEvent.filter((evt, idx, obj) => {
                const hasAegis = Object.entries(evt).find(([, item]) => item && typeof item === 'object' && item?.itemId === aegisItemId);
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

        radiantKills = radiantKills + tRad;
        direKills = direKills + tDir;

        if(tRad !== aRad || tDir != aDir) {
            const rSnatches = tDir - aDir;
            if(rSnatches > 0) {
                radiantSnatches  = radiantSnatches + rSnatches;
            }
            const dSnatches = tRad - aRad;
            if(dSnatches > 0) {
                direSnatches  = direSnatches + dSnatches;
            }
        }
    }
}

export function printRoshStats(): void {
    console.log(chalk.blueBright(''));
    console.log(chalk.cyan('Roshan Stats'));
    console.log(chalk.blueBright('------------'));
    console.log(chalk.blueBright('Deaths:'), chalk.yellow(total));
    console.log(chalk.blueBright('Radiant kills:'), chalk.yellow(radiantKills));
    console.log(chalk.blueBright('Dire kills:'), chalk.yellow(direKills));
    console.log(chalk.blueBright('Radiant Aegis snatches:'), chalk.yellow(radiantSnatches));
    console.log(chalk.blueBright('Dire Aegis snatches:'), chalk.yellow(direSnatches));
}