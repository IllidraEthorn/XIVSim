import { LevelMod } from "../../consts/levelmod";
import { Player } from "../../player/player";
import AutoAttack from "../autoattack";
import DamageLog from "../damagelog";
import Sim from "../sim";
import Skill from "../skill";
import { dancerAutoAttack, dancerProcs, dancerSkills } from "./dancer";
import DancerState from "./dancerstate";

export default class DNCSim extends Sim {

    critFromBuffs: number
    dhitFromBuffs: number
    opener: Array<Skill>
    state: DancerState

    constructor(player: Player, levelMod: LevelMod, maxTime: number, opener?: Array<Skill>, printLog?: boolean) {
        super(player, levelMod, maxTime, printLog);
        this.opener = opener
        this.critFromBuffs = 0;
        this.dhitFromBuffs = 0;
        this.state = new DancerState()
        this.registerProcs()
    }

    getDancerComment(): { feathers: number } {
        return {
            feathers: this.state.getFeathers()
        }
    }

    useSkill(skill: Skill): DamageLog {
        if (skill.onUse) {
            skill.onUse(this.state);
        }
        let log: DamageLog = super.useSkill(skill)
        log.comment = this.getDancerComment();
        return log
    }

    useAutoAttack(autoAttack: AutoAttack): DamageLog {
        let log: DamageLog = super.useAutoAttack(autoAttack)
        log.comment = this.getDancerComment();
        return log
    }

    calcCritChanceFromBuffs(): number {
        return this.critFromBuffs
    }

    calcDHitChanceFromBuffs(): number {
        return this.dhitFromBuffs
    }

    printDamageLogLine(damageLog: DamageLog): void {
        let logLine: string = `${damageLog.timestamp.toFixed(2).padStart(5, '0')}| ${damageLog.potency.toString().padStart(4, ' ')}p | Feathers: ${damageLog.comment?.feathers} | ${damageLog.damage.toString().padStart(6, ' ')} | ${damageLog.name} `;

        if (damageLog.crit) {
            logLine += "C"
        }
        if (damageLog.directHit) {
            logLine += "D"
        }

        console.log(logLine);
    }

    jumpTimeBy(time: number): void {
        this.state.procsJumpBy(time);
        super.jumpTimeBy(time)
    }

    getNextGCD(): Skill {
        if (this.opener?.length) {
            return this.opener.shift()
        }
        if (this.state.getProcByName("Flourishing Fountain")) {
            return dancerSkills.fountainFall
        }
        if (this.state.getProcByName("Flourishing Cascade")) {
            return dancerSkills.reverseCascade
        }
        if (this.comboAction == dancerSkills.cascade) {
            return dancerSkills.fountain
        }
        return dancerSkills.cascade
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
        }
    }

    registerProcs(): void {
        dancerSkills.cascade.onUse = (damageLog: DamageLog) => {
            if (Math.random() < dancerSkills.cascade.procChance) {
                this.state.addProc(dancerSkills.cascade.proc)
            }
        }

        dancerSkills.fountain.onUse = (damageLog: DamageLog) => {
            if (Math.random() < dancerSkills.fountain.procChance) {
                this.state.addProc(dancerSkills.fountain.proc)
            }
        }

        dancerSkills.reverseCascade.onUse = (damageLog: DamageLog) => {
            this.state.removeProc(dancerProcs["Flourishing Cascade"])
            this.featherProc(0.5)
        }

        dancerSkills.fountainFall.onUse = (damageLog: DamageLog) => {
            this.state.removeProc(dancerProcs["Flourishing Fountain"])
            this.featherProc(0.5)
        }
    }

    featherProc(chance: number): boolean {
        if (Math.random() < chance) {
            this.state.addFeather()
            return true
        }
        return false
    }
}