
interface PickBan {
    isPick: boolean;
    heroId: number;
    order: number;
    bannedHeroId: number;
    isRadiant: boolean;
    playerIndex: number;
    wasBannedSuccessfully: boolean;
}

export interface HeroPlayer {
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
    imp2: number
}

export interface LeagueMatch {
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
    radiantTeamId: number;
    direTeamId: number;
    seriesId: number;
    gameVersionId: number;
    regionId: number;
    sequenceNum: number;
    rank: number;
    bracket: number;
    endDateTime: number;
    analysisOutcome: number;
    predictedOutcomeWeight: number;
    pickBans: Array<PickBan>;
    players: Array<HeroPlayer>;
}