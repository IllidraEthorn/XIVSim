import { LevelMod } from "../consts/levelmod";
import { Player } from "../player/player";
import Skill from "./skill";
import AutoAttack from "./autoattack";
import { calcDamage, critChance, directHitChance, critDamageBonus, calcAutoAttackDamage } from "../util/damagecalc";

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
    private currentTime: number;
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
            dps: (this.damageDealt / this.currentTime).toFixed(2),
            duration: this.currentTime,
            totalActions: this.log.length
        }
    }

    getCurrentTime(): number {
        return this.currentTime
    }

    useAutoAttack(autoAttack: AutoAttack): DamageLog {
        const timeToLog = this.getCurrentTime();

        const baseDamage: number = calcAutoAttackDamage(autoAttack.potency, this.levelMod, this.player.jobMod.autoAttackStat(), this.player.stats.weaponDamage, autoAttack.autoAttackDelay, this.player.stats.mainStat, this.player.stats.det, this.player.stats.tenacity, 1, this.player.stats.skillSpeed)
        const critC: number = critChance(this.levelMod, this.player.stats.crit) / 100 + this.calcCritChanceFromBuffs();
        const dhitC: number = directHitChance(this.levelMod, this.player.stats.dhit) / 100 + this.calcDHitChanceFromBuffs();

        let damage: number = baseDamage
        let chit = false
        let dhit = false;

        if (Math.random() <= critC) {
            damage = Math.floor(damage * critDamageBonus(this.levelMod, this.player.stats.crit));
            chit = true;
        }

        if (Math.random() <= dhitC) {
            damage = Math.floor(damage * 1.25);
            dhit = true;
        }

        const damageLog: DamageLog = {
            name: "Auto Attack",
            damage: damage,
            directHit: dhit,
            crit: chit,
            timestamp: timeToLog
        }

        this.log.push(damageLog);

        return damageLog
    }

    abstract calcCritChanceFromBuffs(): number;

    abstract calcDHitChanceFromBuffs(): number;

    abstract printDamageLogLine(damageLog: DamageLog): void;

    abstract getNextGCD(): Skill;

    abstract doNextAction(): DamageLog;

    abstract run(): void;
}