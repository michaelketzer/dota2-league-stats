import { LeagueMatch } from './LeagueMatches';

export interface Match {
    id: number;
    didRadiantWin: boolean;
    durationSeconds: number;
    startDateTime: number;
    clusterId: number;
    firstBloodTime: number;
    lobbyType: number;
    numHumanPlayers: number;
    gameMode: number;
    replaySalt: number;
    isStats: boolean;
    avgImp: number;
    parsedDateTime: number;
    statsDateTime: number;
    leagueId: number;
    league: {
        id: number;
        tier: number;
        startDateTime: number;
        endDateTime: number;
        lastMatchDateTime: number;
        prizePool: number;
        displayName: string;
        isFollowed: boolean;
    };
    radiantTeamId: number;
    radiantTeam: {
        members: [];
        id: number;
        name: string;
        tag: string;
        logo: string;
        bannerLogo: string;
        winCount: number;
        lossCount: number;
        lastMatchDateTime: number;
        isFollowed: boolean;
        countryName: string;
    };
    direTeamId: number;
    direTeam: {
        members: [];
        id: number;
        name: string;
        tag: string;
        dateCreated: number;
        isProfessional: boolean;
        isLocked: boolean;
        countryCode: string;
        url: string;
        logo: string;
        bannerLogo: string;
        winCount: number;
        lossCount: number;
        rank: number;
        lastMatchDateTime: number;
        isFollowed: boolean;
    };
    seriesId: number;
    series: {
        id: number;
        type: number;
        teamOneId: number;
        teamTwoId: number;
        leagueId: number;
        teamOneWinCount: number;
        teamTwoWinCount: number;
        winningTeamId: number;
        matches: Array<LeagueMatch>;
        lastMatchDate: number;
    };

    gameVersionId: number;
    regionId: number;
    sequenceNum: number;
    rank: number;
    bracket: number;
    endDateTime: number;
    playbackData: {
        courierEvents: Array<{
            id: number;
            owner: number;
            isRadiant: boolean;
            events: Array<{
                time: number;
                x: number;
                y: number;
                hp: number;
                is_flying: boolean;
                respawn_time: number;
                item0Id: number;
                item1Id: number;
                item2Id: number;
                item3Id: number;
                item4Id: number;
                item5Id: number
            }>;
        }>;
        runeEvents: Array<{
            id: number;
            time: number;
            x: number;
            y: number;
            fromPlayer: number;
            location: number;
            runeType: number;
            action: number
        }>;
        wardEvents: Array<{
            id: number;
            time: number;
            x: number;
            y: number;
            wardType: number;
            action: number
        }>;
        towerDeathEvents: Array<{
            time: number;
            radiant: number;
            dire: number
        }>;
        roshanEvents: Array<{
            time: number;
            hp: number;
            maxHp: number;
            x: number;
            y: number;
            itemnumber: number
        }>;
        buildingEvents: Array<{
            time: number;
            id: number;
            type: number;
            hp: number;
            maxHp: number;
            x: number;
            y: number;
            isRadiant: boolean;
            npcId: number
        }>

        radiantCaptainSteamAccountId: number;
        direCaptainSteamAccountId: number
    };
    pickBans: Array<{
        isPick: boolean;
        heroId: number;
        order: number;
        bannedHeroId: number;
        isRadiant: boolean;
        playerIndex: number;
        wasBannedSuccessfully: boolean
    }>;
    players: Array<{
        matchId: number;
        playerSlot: number;
        heroId: number;
        steamAccountId: number;
        isRadiant: boolean;
        numKills: number;
        numDeaths: number;
        numAssists: number;
        leaverStatus: number;
        numLastHits: number;
        numDenies: number;
        goldPerMinute: number;
        experiencePerMinute: number;
        level: number;
        gold: number;
        goldSpent: number;
        heroDamage: number;
        towerDamage: number;
        isRandom: boolean;
        lane: number;
        intentionalFeeding: boolean;
        role: number;
        imp: number;
        award: number;
        item0Id: number;
        item1Id: number;
        item3Id: number;
        item4Id: number;
        behavior: number;
        heroHealing: number;
        roamLane: number;
        isVictory: boolean;
        networth: number;
        neutral0Id: number;
        imp2: number;
        playbackData: {
            abilityLearnEvents: Array<{
                time: number;
                abilityId: number;
            }>;

            abilityUsedEvents: Array<{
                time: number;
                abilityId: number;
                attacker: number;
                target: number;
            }>;
            abilityActiveLists: Array<{
                time: number;
                ability0: number;
                ability1: number;
                ability2: number;
                ability5: number;
                ability6: number;
                ability7: number;
            }>;

            itemUsedEvents: Array<{
                time: number;
                itemId: number;
                attacker: number;
            }>;

            playerUpdatePositionEvents: Array<{
                time: number;
                x: number;
                y: number;
            }>;

            playerUpdateGoldEvents: Array<{
                time: number;
                gold: number;
                unreliableGold: number;
                networth: number;
                networthDifference: number;
            }>;

            playerUpdateAttributeEvents: Array<{
                time: number;
                agi: number;
                int: number;
                str: number;
            }>;

            playerUpdateLevelEvents: Array<{
                time: number;
                level: number;
            }>;

            playerUpdateHealthEvents: Array<{
                time: number;
                hp: number;
                maxHp: number;
                mp: number;
                maxMp: number;
            }>;

            playerUpdateBattleEvents: Array<{
                time: number;
                damageMinMax: number;
                damageBonus: number;
                hpRegen: number;
                mpRegen: number;
            }>;

            killEvents: Array<{
                time: number;
                attacker: number;
                isFromIllusion: boolean;
                target: number;
                gold: number;
                xp: number;
                X: number;
                Y: number;
                isSolo: boolean;
                isGank: boolean;
                isInvisible: boolean;
                isSmoke: boolean;
                isTpRecently: boolean;
                isRuneEffected: boolean
            }>;

            deathEvents: Array<{
                time: number;
                attacker: number;
                isFromIllusion: boolean;
                target: number;
                goldFed: number;
                xp: number;
                timeDead: number;
                reliableGold: number;
                unreliableGold: number;
                x: number;
                y: number;
                goldLost: number;
                isWardWalkThrough: boolean;
                isAttemptTpOut: boolean;
                isDieBack: boolean;
                isBurst: boolean;
                isEngagedOnDeath: boolean;
                hasHealAvailable: boolean;
                isTracked: boolean;
                isFeed: boolean
            }>;

            assistEvents: Array<{
                time: number;
                attacker: number;
                target: number;
                gold: number;
                xp: number;
                X: number;
                Y: number;
            }>;

            csEvents: Array<{
                time: number;
                attacker: number;
                isFromIllusion: boolean;
                npcId: number;
                gold: number;
                xp: number;
                x: number;
                Y: number;
            }>;

            goldEvents: Array<{
                time: number;
                amount: number;
                reason: number;
            }>;

            experienceEvents: Array<{
                time: number;
                amount: number;
                reason: number;
                y: number;
                x: number;
            }>;

            healEvents: Array<{
                time: number;
                attacker: number;
                target: number;
                value: number;
                abilityId: number;
                itemId: number;
            }>;

            heroDamageEvents: Array<{
                time: number;
                attacker: number;
                target: number;
                value: number;
                abilityId: number;
                itemId: number;
                damageType: number;
                fromNpc: number;
                toNpc: number;
                fromIllusion: boolean;
                toIllusion: boolean
            }>;

            towerDamageEvents: Array<{
                time: number;
                attacker: number;
                npcId: number;
                damage: number;
                abilityId: number;
                itemId: number;
            }>;
            inventoryEvent: Array<{
                time: number;
                item0: {
                    itemId: number;
                    charges: number;
                };
                item1: {
                    itemId: number;
                    charges: number;
                };
                item2: {
                    itemId: number;
                    charges: number;
                };
                item3: {
                    itemId: number;
                };
                item4: {
                    itemId: number;
                    charges: number;
                };
                item5: {
                    itemId: number;
                    charges: number;
                };
                teleport0: {
                    itemId: number;
                    charges: number;
                }
            }>;

            purchaseEvents: Array<{
                time: number;
                item: number;
            }>;

            buyBackEvents: [];
            streakEvents: [];
        };
        stats: {
            matchId: number;
            steamAccountId: number;
            impPerMinute: number[];
        };

        abilities: Array<{
            abilityId: number;
            time: number;
            level: number;
        }>
        heroAverage: Array<{
            time: number;
            matchCount: number;
            kills: number;
            deaths: number;
            assists: number;
            goldEarned: number;
            xp: number;
            cs: number;
            heroDamage: number;
            towerDamage: number;
            healingSelf: number;
            healingAllies: number;
            teamKills: number;
            kdaAverage: number;
            kcAverage: number;
        }>;

        steamAccount: {
            id: number;
            steamId: number;
            lastActiveTime: string;
            profileUri: string;
            realName: string;
            timeCreated: number;
            countryCode: string;
            cityId: number;
            communityVisibleState: number;
            name: string;
            avatar: string;
            primaryClanId: number;
            soloRank: number;
            partyRank: number;
            isDotaPlusSubscriber: boolean;
            dotaPlusOriginalStartDate: number;
            isAnonymous: boolean;
            isStratzAnonymous: boolean;
            seasonRank: number;
            seasonLeaderboardRank: number;
            seasonLeaderboardDivisionId: number;
            proSteamAccount: {
                steamId: number;
                name: string;
                fantasyRole: number;
                teamId: number;
                sponsor: string;
                isLocked: boolean;
                isPro: boolean;
                totalEarnings: number;
                tiWins: number;
                isTIWinner: boolean
            };
            smurfFlag: number;
            smurfCheckDate: number;
            lastMatchDateTime: number;
            lastMatchRegionId: number;
        };
    }>;
}