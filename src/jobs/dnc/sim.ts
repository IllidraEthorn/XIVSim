import { LevelMod } from "../../consts/levelmod";
import { Player } from "../../player/player";
import AutoAttack from "../autoattack";
import Proc from "../proc";
import Sim, { DamageLog } from "../sim";
import Skill from "../skill";
import { dancerAutoAttack, dancerProcs, dancerSkills } from "./dancer";

export class DancerState {
    private esprit: number
    private feathers: number

    private maxEsprit: number
    private maxFeathers: number

    private procs: Array<Proc>

    constructor() {
        this.esprit = 0
        this.feathers = 0

        this.maxEsprit = 100
        this.maxFeathers = 4

        this.procs = []
    }

    getEsprit(): number {
        return this.esprit
    }

    getFeathers(): number {
        return this.feathers
    }

    //Adds give amount of esprit and returns the number of esprit added (amount - returned value = overcap)
    addEsprit(amount: number): number {
        let espritToAdd: number = Math.min(this.maxEsprit - this.esprit, amount)
        this.esprit = this.esprit + espritToAdd

        return espritToAdd
    }

    //Adds 1 feather (or given amount) and returns the number of feathers added (amount - returned value = overcap)
    addFeather(amount: number = 1): number {
        let feathersToAdd: number = Math.min(this.maxFeathers - this.feathers, amount)
        this.feathers = this.feathers + feathersToAdd

        return feathersToAdd
    }

    removeEsprit(amount: number): boolean {
        if (this.esprit < amount) {
            return false
        }
        this.esprit = (this.esprit - amount)
        return true
    }

    removeFeather(): boolean {
        if (this.feathers < 1) {
            return false
        }
        this.feathers = this.feathers - 1
        return true
    }

    getProcs(): Array<Proc> {
        return this.procs
    }

    getProcByName(name: string): Proc | any {
        return this.procs.find((proc: Proc) => {
            if (proc.name === name) {
                return true
            }
            return false
        })
    }

    removeProc(procToRemove: Proc): void {
        this.procs = this.procs.filter((proc) => proc.name !== procToRemove.name)
    }

    addProc(proc: Proc): void {
        //If the proc already exists
        if (this.getProcByName(proc.name)) {
            this.removeProc(proc)
        }

        this.procs.push(proc)

        this.procs.sort((p1, p2) => p1.duration - p2.duration)
    }

    //Simulates time for all procs, removing any procs that have run out
    procsJumpBy(time: number): void {

        let afterTime = this.procs.map((proc) => {
            proc.duration = proc.duration - time
            return proc
        });
        this.procs = afterTime.filter((proc) => proc.duration > 0)
    }
}

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