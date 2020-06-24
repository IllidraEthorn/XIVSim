import { LevelMod } from "../../consts/levelmod";
import { Player } from "../../player/player";
import { calcDamage, critChance, critDamageBonus, directHitChance } from "../../util/damagecalc";
import Sim, { DamageLog } from "../sim";
import Skill from "../skill";
import { dancerSkills } from "./dancer";

export default class DNCSim extends Sim {

    critFromBuffs: number
    dhitFromBuffs: number

    constructor(player: Player, levelMod: LevelMod, maxTime: number, printLog?: boolean) {
        super(player, levelMod, maxTime, printLog);
        this.critFromBuffs = 0;
        this.dhitFromBuffs = 0;
    }

    getNextGCD(): Skill {
        return dancerSkills.cascade
    }

    useSkill(skill: Skill): DamageLog {
        const timeToLog = this.currentTime;
        if (skill.isGCD) {
            this.jumpToNextGCD();
            this.gcdTimer = skill.baseRecastTime;
        }

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
            dhit = true;
        }

        const damageLog: DamageLog = {
            name: skill.name,
            damage: damage,
            directHit: dhit,
            crit: chit,
            timestamp: timeToLog
        }

        this.log.push(damageLog);

        return damageLog
    }

    calcCritChanceFromBuffs(): number {
        return this.critFromBuffs
    }

    calcDHitChanceFromBuffs(): number {
        return this.dhitFromBuffs
    }

    printDamageLogLine(damageLog: DamageLog): void {
        let logLine: string = `${damageLog.timestamp.toFixed(1).padStart(4, '0')}|${damageLog.name} : ${damageLog.damage}`;

        if (damageLog.crit) {
            logLine += " (Critical Hit)"
        }
        if (damageLog.directHit) {
            logLine += " (Direct Hit)"
        }

        console.log(logLine);
    }

    //Figure out if we should do a gcd, ogcd, etc
    getNextAction(): Skill {
        return dancerSkills.cascade
    }

    //Perform the next gcd
    doNextGCD(): DamageLog {
        const damageLog: DamageLog = this.useSkill(this.getNextGCD())

        this.dealDamage(damageLog.damage);

        return damageLog;
    }

    //Perform an auto attack
    doAutoAttack(): DamageLog {

    }

    run(): void {
        let damageLog: DamageLog;
        while (this.currentTime < this.maxTime) {
            damageLog = this.doNextGCD();
            this.printDamageLogLine(damageLog);
        }
    }
}