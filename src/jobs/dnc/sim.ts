import Sim, { DamageLog } from "../sim";
import Skill from "../skill";
import { dancerSkills } from "./dancer";
import { Player } from "../../player/player";
import { LevelMod } from "../../consts/levelmod";
import { calcDamage, critChance, directHitChance, critDamageBonus } from "../../util/damagecalc";

export default class DNCSim extends Sim {

    critFromBuffs: number
    dhitFromBuffs: number

    constructor(player: Player, levelMod: LevelMod, maxTime: number, printLog?: boolean) {
        super(player, levelMod, maxTime, printLog);
        this.critFromBuffs = 0;
        this.dhitFromBuffs = 0;
    }

    test(): void {
        this.maxTime
    }

    getNextGCD(): Skill {
        return dancerSkills.cascade
    }

    useSkill(skill: Skill): DamageLog {
        this.jumpToNextGCD();
        this.gcdTimer = skill.baseRecastTime

        const baseDamage: number = calcDamage(skill.potency, this.levelMod, this.player.jobMod.mainStat(), this.player.stats.weaponDamage, this.player.stats.mainStat, this.player.stats.det, this.player.stats.tenacity, 1.2)
        const critC: number = critChance(this.levelMod, this.player.stats.crit) / 100 + this.calcCritChanceFromBuffs();
        const dhitC: number = directHitChance(this.levelMod, this.player.stats.dhit) / 100 + this.calcDHitChanceFromBuffs();

        let damage: number = baseDamage
        let chit = false
        let dhit = false;

        if (Math.random() <= critC) {
            damage *= critDamageBonus(this.levelMod, this.player.stats.crit);
            chit = true;
        }

        if (Math.random() <= dhitC) {
            damage *= 1.25;
            dhit = false;
        }

        return {
            name: skill.name,
            damage: damage,
            directHit: dhit,
            crit: chit
        }

    }

    calcCritChanceFromBuffs(): number {
        return this.critFromBuffs
    }

    calcDHitChanceFromBuffs(): number {
        return this.dhitFromBuffs
    }

    printDamageLogLine(damageLog: DamageLog): void {
        let logLine: string = `${damageLog.name} : ${damageLog.damage}`;

        if (damageLog.crit) {
            logLine += " (Critical Hit)"
        }
        if (damageLog.directHit) {
            logLine += " (Direct Hit)"
        }

        console.log(logLine);
    }

    doNextGCD(): DamageLog {
        const damageLog: DamageLog = this.useSkill(this.getNextGCD())

        this.dealDamage(damageLog.damage);

        return damageLog;
    }

    run(): void {
        while (this.currentTime <= 10) {
            console.log("Time: ", this.currentTime)
            this.printDamageLogLine(this.doNextGCD());
        }
    }
}