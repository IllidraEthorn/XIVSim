import { LevelMod } from "../../consts/levelmod";
import { Player } from "../../player/player";
import AutoAttack from "../autoattack";
import DamageLog from "../damagelog";
import Sim from "../sim";
import Skill from "../skill";
import { dancerAutoAttack, dancerBuffs, dancerProcs, dancerSkills } from "./dancer";
import DancerState from "./dancerstate";

export default class DNCSim extends Sim {

    opener: Array<Skill>
    state: DancerState

    constructor(player: Player, levelMod: LevelMod, maxTime: number, opener?: Array<Skill>, printLog?: boolean) {
        super(player, levelMod, maxTime, printLog);
        this.opener = opener
        this.state = new DancerState()
        this.registerProcs()
        this.registerCooldowns()
    }

    getDancerComment(): { feathers: number, esprit: number, procs: string, buffs: string } {
        return {
            feathers: this.state.getFeathers(),
            esprit: this.state.getEsprit(),
            procs: this.state.getProcs().reduce((acc: string, proc) => {
                return acc + `${proc.name}(${proc.duration.toFixed(2)}) `
            }, ""),
            buffs: this.getBuffs().reduce((acc: string, buff) => {
                return acc + `${buff.name}(${buff.duration.toFixed(2)}) `
            }, "")
        }
    }

    useSkill(skill: Skill): DamageLog {
        let log: DamageLog = super.useSkill(skill)
        if (skill.onUse) {
            skill.onUse(this.state);
        }
        log.comment = this.getDancerComment();
        return log
    }

    useOGCD(skill: Skill): DamageLog {
        let log: any = super.useOGCD(skill)
        if (skill.onUse) {
            skill.onUse(this.state);
        }
        log.comment = this.getDancerComment();
        if (!log.name) {
            return {
                name: skill.name,
                damage: 0,
                potency: 0,
                directHit: false,
                crit: false,
                timestamp: log.timestamp,
                comment: log.comment
            }
        }
        return log
    }

    useAutoAttack(autoAttack: AutoAttack): DamageLog {
        let log: DamageLog = super.useAutoAttack(autoAttack)
        log.comment = this.getDancerComment();
        return log
    }

    calcDamageMultFromBuffs(): number {
        let mult: number = 1
        this.getBuffs().forEach((buff) => {
            switch (buff.name) {
                case dancerBuffs.standardFinishBuff.name:
                    mult = mult * 1.05
                    break
                case dancerBuffs.technicalFinishBuff.name:
                    mult = mult * 1.05
                    break
                default:
                    break
            }
        })
        return mult
    }

    calcCritChanceFromBuffs(): number {
        let mult: number = 0
        this.getBuffs().forEach((buff) => {
            switch (buff.name) {
                case dancerBuffs.devilmentBuff.name:
                    mult = mult + 0.2
                    break
                default:
                    break
            }
        })
        return mult
    }

    calcDHitChanceFromBuffs(): number {
        let mult: number = 0
        this.getBuffs().forEach((buff) => {
            switch (buff.name) {
                case dancerBuffs.devilmentBuff.name:
                    mult = mult + 0.2
                    break
                default:
                    break
            }
        })
        return mult
    }

    printDamageLogLine(damageLog: DamageLog): void {
        let logLine: string = `${damageLog.timestamp.toFixed(2).padStart(6, ' ')}| ${damageLog.potency.toString().padStart(4, ' ')}p | Feathers: ${damageLog.comment?.feathers} Esprit: ${damageLog.comment?.esprit.toString().padStart(3, ' ')} | ${damageLog.damage.toString().padStart(6, ' ')} | ${damageLog.name} `;

        if (damageLog.crit) {
            logLine += "C"
        }
        if (damageLog.directHit) {
            logLine += "D"
        }

        //logLine = logLine + ` | Buffs: ${damageLog.comment?.buffs}`

        console.log(logLine);
    }

    jumpTimeBy(time: number): void {
        this.state.procsJumpBy(time);
        super.jumpTimeBy(time)
    }

    getNextGCD(): Skill {
        /*
        if (this.opener?.length) {
            return this.opener.shift()
        }*/
        if (this.state.getInDance()) {
            if (this.state.getStepsRemaining() > 0) {
                return dancerSkills.step
            }
            if (this.state.getStepsRemaining() === 0) {
                if (this.state.getInStandard()) {
                    return dancerSkills.standardFinish
                }
                if (this.state.getInTechnical()) {
                    return dancerSkills.technicalFinish
                }
            }
        }
        if (!this.getCooldown(dancerSkills.standardStep.name)) {
            return dancerSkills.standardStep
        }
        if (!this.getCooldown(dancerSkills.technicalStep.name)) {
            return dancerSkills.technicalStep
        }
        if (this.state.getEsprit() >= 50 && this.shouldUseSaberDance()) {
            return dancerSkills.saberDance
        }
        if (this.state.getProcByName(dancerProcs.flourishingFountain.name)) {
            return dancerSkills.fountainFall
        }
        if (this.state.getProcByName(dancerProcs.flourishingCascade.name)) {
            return dancerSkills.reverseCascade
        }
        if (this.comboAction == dancerSkills.cascade) {
            return dancerSkills.fountain
        }
        return dancerSkills.cascade
    }

    //Figure out if we should do a gcd, ogcd, auto attack, wait etc
    doNextAction(): DamageLog {
        if (this.autoAttackTimer > this.animLock) {
            this.jumpAnimationLock()
        }
        if (this.autoAttackTimer < this.gcdTimer && this.autoAttackTimer < this.animLock) {
            return this.doAutoAttack();
        }
        if (this.opener?.length) {
            let nextSkill: Skill = this.opener.shift()
            if (nextSkill.isGCD) {
                return this.doNextGCD(nextSkill)
            } else {
                return this.doNextOGCD(nextSkill)
            }
        }
        let nextOGCD: Skill = this.getNextOGCD()
        if (nextOGCD) {
            return this.doNextOGCD()
        }
        if (this.autoAttackTimer > this.gcdTimer) {
            return this.doNextGCD()
        }
        else {
            return this.doAutoAttack()
        }
    }

    getNextOGCD(): Skill {
        if (this.animLock > 0) {
            return null
        }
        if (!this.getCooldown(dancerSkills.devilment.name) && dancerSkills.devilment.animationLock <= this.gcdTimer && this.shouldUseDevilment()) {
            return dancerSkills.devilment
        }
        if (!this.getCooldown(dancerSkills.flourish.name) && dancerSkills.flourish.animationLock <= this.gcdTimer && this.shouldUseFlourish()) {
            return dancerSkills.flourish
        }
        if (!this.getCooldown(dancerSkills.fanDance3.name) && dancerSkills.fanDance3.animationLock <= this.gcdTimer && this.state.getProcByName(dancerProcs.flourishingFanDance.name)) {
            return dancerSkills.fanDance3
        }
        if (!(this.getCooldown(dancerSkills.fanDance.name)) && dancerSkills.fanDance.animationLock <= this.gcdTimer && this.shouldUseFanDance()) {
            return dancerSkills.fanDance
        }
        return null
    }

    doNextOGCD(skill?: Skill): DamageLog {
        if (!skill) {
            skill = this.getNextOGCD()
        }

        let damageLog: DamageLog;

        damageLog = this.useSkill(skill)
        if (damageLog.damage > 0) {
            this.dealDamage(damageLog.damage)
        }

        return damageLog;
    }

    //Perform the next gcd
    doNextGCD(skill?: Skill): DamageLog {
        this.jumpToNextGCD();

        if (!skill)
            skill = this.getNextGCD()

        const damageLog: DamageLog = this.useSkill(skill)

        this.dealDamage(damageLog.damage);

        this.gcdTimer = skill.baseRecastTime;

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
            this.log.push(damageLog)
            //this.printDamageLogLine(damageLog)
        }
    }

    registerProcs(): void {
        dancerSkills.cascade.onUse = (damageLog: DamageLog) => {
            this.generateEsprit()
            if (Math.random() < dancerSkills.cascade.procChance) {
                this.state.addProc(dancerSkills.cascade.proc)
            }
        }

        dancerSkills.fountain.onUse = (damageLog: DamageLog) => {
            this.generateEsprit()
            if (Math.random() < dancerSkills.fountain.procChance) {
                this.state.addProc(dancerSkills.fountain.proc)
            }
        }

        dancerSkills.fanDance.onUse = (damageLog: DamageLog) => {
            if (Math.random() < dancerSkills.fanDance.procChance) {
                this.state.addProc(dancerSkills.fanDance.proc)
            }
            this.addCooldown({ name: dancerSkills.fanDance.name, duration: dancerSkills.fanDance.cooldown })
            this.state.removeFeather()
        }

        dancerSkills.fanDance3.onUse = (damageLog: DamageLog) => {
            this.state.removeProc(dancerProcs.flourishingFanDance)
            this.addCooldown({ name: dancerSkills.fanDance3.name, duration: dancerSkills.fanDance3.cooldown })
        }

        dancerSkills.reverseCascade.onUse = (damageLog: DamageLog) => {
            this.generateEsprit()
            this.state.removeProc(dancerProcs.flourishingCascade)
            this.featherProc(0.5)
        }

        dancerSkills.fountainFall.onUse = (damageLog: DamageLog) => {
            this.generateEsprit()
            this.state.removeProc(dancerProcs.flourishingFountain)
            this.featherProc(0.5)
        }

        dancerSkills.saberDance.onUse = (damageLog: DamageLog) => {
            this.state.removeEsprit(50)
        }
    }

    registerCooldowns(): void {
        dancerSkills.flourish.onUse = (damageLog: DamageLog) => {
            this.addCooldown({ name: dancerSkills.flourish.name, duration: dancerSkills.flourish.cooldown })
            this.state.addProc(dancerProcs.flourishingCascade)
            this.state.addProc(dancerProcs.flourishingFountain)
            this.state.addProc(dancerProcs.flourishingFanDance)
        }

        dancerSkills.devilment.onUse = (damageLog: DamageLog) => {
            this.addCooldown({ name: dancerSkills.devilment.name, duration: dancerSkills.devilment.cooldown })
            this.addBuff({ name: dancerBuffs.devilmentBuff.name, duration: dancerBuffs.devilmentBuff.duration })
        }

        dancerSkills.standardStep.onUse = (damageLog: DamageLog) => {
            this.addCooldown({ name: dancerSkills.standardStep.name, duration: dancerSkills.standardStep.cooldown })
            this.triggerGCD(1.5)
            this.state.setRemainingSteps(2)
            this.state.setInStandard(true)
        }

        dancerSkills.technicalStep.onUse = (damageLog: DamageLog) => {
            this.addCooldown({ name: dancerSkills.technicalStep.name, duration: dancerSkills.technicalStep.cooldown })
            this.triggerGCD(1.5)
            this.state.setRemainingSteps(4)
            this.state.setInTechnical(true)
        }

        dancerSkills.step.onUse = (damageLog: DamageLog) => {
            this.triggerGCD(1.0)
            this.state.removeStep()
        }

        dancerSkills.standardFinish.onUse = (damageLog: DamageLog) => {
            this.triggerGCD(1.5)
            this.state.setInStandard(false)
            this.addBuff({ name: dancerBuffs.standardFinishBuff.name, duration: dancerBuffs.standardFinishBuff.duration })
        }

        dancerSkills.prePullStandard.onUse = (damageLog: DamageLog) => {
            this.triggerGCD(1.5)
            this.state.setInStandard(false)
            this.addBuff({ name: dancerBuffs.standardFinishBuff.name, duration: dancerBuffs.standardFinishBuff.duration })
            this.addCooldown({ name: dancerSkills.standardStep.name, duration: dancerSkills.standardStep.cooldown - 15 })
        }

        dancerSkills.technicalFinish.onUse = (damageLog: DamageLog) => {
            this.triggerGCD(1.5)
            this.state.setInTechnical(false)
            this.addBuff({ name: dancerBuffs.technicalFinishBuff.name, duration: dancerBuffs.technicalFinishBuff.duration })
        }
    }

    featherProc(chance: number): boolean {
        if (Math.random() < chance) {
            this.state.addFeather()
            return true
        }
        return false
    }

    shouldUseFlourish(): boolean {
        if (this.state.getProcByName(dancerProcs.flourishingCascade.name) || this.state.getProcByName(dancerProcs.flourishingFountain.name) || this.state.getProcByName(dancerProcs.flourishingFanDance.name)) {
            return false
        }
        return true
    }

    shouldUseFanDance(): boolean {
        if (!this.isBursting() && (this.state.getProcByName(dancerProcs.flourishingFanDance.name) || (this.state.getFeathers() < 4))) {
            return false
        } else if (this.state.getFeathers() > 0) {
            return true
        }
        return false
    }

    generateEsprit(chance: number = 0.3): void {
        if (Math.random() < chance) {
            this.state.addEsprit(10)
        }
    }

    shouldUseDevilment(): boolean {
        if (this.getBuff(dancerBuffs.technicalFinishBuff.name)) {
            return true
        }
        return false
    }

    shouldUseSaberDance(): boolean {
        if (this.state.getEsprit() > 80 || this.isBursting()) {
            return true
        }
        return false
    }

    isBursting(): boolean {
        if (this.getBuff(dancerBuffs.technicalFinishBuff.name)) {
            return true
        }
        return false
    }
}