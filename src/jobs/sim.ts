import Skill from "./skill";
import { Player } from "../player/player";
import { LevelMod } from "../consts/levelmod";

export interface DamageLog {
    name: string
    damage: number
    directHit: boolean
    crit: boolean
}

export default abstract class Sim {
    player: Player;
    levelMod: LevelMod;
    printLog: boolean;
    currentTime: number;
    maxTime: number;
    damageDealt: number;
    gcdTimer: number;

    constructor(player: Player, levelMod: LevelMod, maxTime: number, printLog?: boolean) {
        this.player = player
        this.levelMod = levelMod
        this.printLog = printLog
        this.currentTime = 0
        this.maxTime = maxTime
        this.damageDealt = 0;
        this.gcdTimer = 0;
    }

    dealDamage(damage: number): void {
        this.damageDealt += damage;
    }

    jumpToNextGCD(): void {
        this.currentTime += this.gcdTimer;
        this.gcdTimer = 0;
    }

    abstract calcCritChanceFromBuffs(): number;

    abstract printDamageLogLine(damageLog: DamageLog): void;

    abstract getNextGCD(): Skill;

    abstract run(): void;
}