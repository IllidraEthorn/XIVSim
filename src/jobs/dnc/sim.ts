import { LevelMod } from "../../consts/levelmod";
import { Player } from "../../player/player";
import { calcDamage, critChance, critDamageBonus, directHitChance } from "../../util/damagecalc";
import Sim, { DamageLog } from "../sim";
import Skill from "../skill";
import { dancerAutoAttack, dancerSkills } from "./dancer";

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
        const timeToLog = this.getCurrentTime();

        const baseDamage: number = calcDamage(skill.potency, this.levelMod, this.player.jobMod.mainStat(), this.player.stats.weaponDamage, this.player.stats.mainStat, this.player.stats.det, this.player.stats.tenacity, 1.2)
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
        let logLine: string = `${damageLog.timestamp.toFixed(2).padStart(5, '0')}|${damageLog.name} : ${damageLog.damage}`;

        if (damageLog.crit) {
            logLine += " (Critical Hit)"
        }
        if (damageLog.directHit) {
            logLine += " (Direct Hit)"
        }

        console.log(logLine);
    }

    //Figure out if we should do a gcd, ogcd, etc
    doNextAction(): DamageLog {
        if (this.autoAttackTimer > this.gcdTimer) {
            return this.doNextGCD()
        } else {
            return this.doAutoAttack()
        }
    }

    //Perform the next gcd
    doNextGCD(): DamageLog {
        this.jumpToNextGCD();

        const nextGCD = this.getNextGCD()

        const damageLog: DamageLog = this.useSkill(nextGCD)

        this.dealDamage(damageLog.damage);

        this.gcdTimer = nextGCD.baseRecastTime;

        return damageLog;
    }

    //Perform an auto attack
    doAutoAttack(): DamageLog {
        this.jumpToAutoAttack();

        const damageLog: DamageLog = this.useAutoAttack(dancerAutoAttack)

        this.dealDamage(damageLog.damage)

        this.autoAttackTimer = dancerAutoAttack.autoAttackDelay;

        return damageLog;
    }

    run(): void {
        let damageLog: DamageLog;
        while (this.getCurrentTime() < this.maxTime) {
            damageLog = this.doNextAction();
            this.printDamageLogLine(damageLog);
        }
    }
}