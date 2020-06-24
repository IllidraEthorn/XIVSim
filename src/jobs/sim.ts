import { LevelMod } from "../consts/levelmod";
import { Player } from "../player/player";
import Skill from "./skill";

export interface DamageLog {
    name: string
    damage: number
    directHit: boolean
    crit: boolean
    timestamp: number
}

export default abstract class Sim {
    player: Player;
    levelMod: LevelMod;
    printLog: boolean;
    currentTime: number;
    maxTime: number;
    damageDealt: number;
    gcdTimer: number;
    autoAttackTimer: number;
    log: Array<DamageLog>;

    constructor(player: Player, levelMod: LevelMod, maxTime: number, printLog?: boolean) {
        this.player = player
        this.levelMod = levelMod
        this.printLog = printLog
        this.currentTime = 0
        this.maxTime = maxTime
        this.damageDealt = 0
        this.gcdTimer = 0
        this.autoAttackTimer = 0
        this.log = []
    }

    dealDamage(damage: number): void {
        this.damageDealt += damage;
    }

    jumpToNextGCD(): void {
        this.jumpTimeBy(this.gcdTimer);
    }

    jumpToAutoAttack(): void {
        this.jumpTimeBy(this.autoAttackTimer);
    }

    //Jumps forward in time, updating the auto attack timer and gcd timer
    jumpTimeBy(time: number): void {
        this.currentTime += time
        this.gcdTimer = Math.max(this.gcdTimer - time, 0)
        this.autoAttackTimer = Math.max(this.autoAttackTimer - time, 0)
    }

    summary(): any {
        return {
            totalDamage: this.damageDealt,
            dps: this.damageDealt / this.currentTime,
            duration: this.currentTime,
            totalActions: this.log.length
        }
    }

    abstract calcCritChanceFromBuffs(): number;

    abstract printDamageLogLine(damageLog: DamageLog): void;

    abstract getNextGCD(): Skill;

    abstract getNextAction(): Skill;

    abstract run(): void;
}