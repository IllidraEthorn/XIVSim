import { LevelMod } from "../consts/levelmod";
import { Player } from "../player/player";
import { calcAutoAttackDamage, calcDamage, critChance, critDamageBonus, directHitChance } from "../util/damagecalc";
import AutoAttack from "./autoattack";
import Buff from "./buff";
import CommentLog from "./commentlog";
import Cooldown from "./cooldown";
import DamageLog from "./damagelog";
import { AbilityDamage, DamagePoint, SimDataArea, Summary } from "./simdata";
import Skill from "./skill";

export default abstract class Sim {
    player: Player;
    levelMod: LevelMod;
    printLog: boolean;
    private currentTime: number;
    maxTime: number;
    damageDealt: number;
    gcdTimer: number;
    autoAttackTimer: number;
    comboTimer: number;
    comboAction: Skill;
    log: Array<DamageLog>;
    cooldowns: Array<Cooldown>;
    animLock: number;
    buffs: Array<Buff>

    constructor(player: Player, levelMod: LevelMod, maxTime: number, printLog?: boolean) {
        this.player = player
        this.levelMod = levelMod
        this.printLog = printLog
        this.currentTime = 0
        this.maxTime = maxTime * 100
        this.damageDealt = 0
        this.gcdTimer = 0
        this.comboTimer = 0
        this.autoAttackTimer = 0
        this.log = []
        this.cooldowns = []
        this.animLock = 0
        this.buffs = []
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

    //Ends the animation lock
    jumpAnimationLock(): void {
        this.jumpTimeBy(this.animLock)
    }

    //Jumps forward in time, updating the auto attack timer and gcd timer
    jumpTimeBy(time: number): void {
        this.currentTime += time
        this.gcdTimer = Math.max(this.gcdTimer - time, 0)
        this.autoAttackTimer = Math.max(this.autoAttackTimer - time, 0)
        this.comboTimer = Math.max(this.comboTimer - time, 0)
        this.animLock = Math.max(this.animLock - time, 0)
        this.cooldownsJumpBy(time)
        this.buffsJumpBy(time)
    }

    summary(): Summary {
        return {
            totalDamage: this.damageDealt,
            dps: (this.damageDealt * 100 / this.currentTime),
            duration: this.currentTime / 100,
            totalActions: this.log.length
        }
    }

    getCurrentTime(): number {
        return this.currentTime
    }

    useSkill(skill: Skill): DamageLog {
        const timeToLog = this.getCurrentTime();

        let potency = skill.potency ? skill.potency : 0;
        if (skill.comboPotency && this.comboTimer > 0 && skill.comboActions?.includes(this.comboAction)) {
            potency = skill.comboPotency
            this.comboTimer = 0
        }

        let chit = false
        let dhit = false;
        let damage: number = 0

        if (potency > 0) {
            const baseDamage: number = calcDamage(potency, this.levelMod, this.player.jobMod.mainStat(), this.player.stats.weaponDamage, this.player.stats.mainStat, this.player.stats.det, this.player.stats.tenacity, 1.2)
            const critC: number = critChance(this.levelMod, this.player.stats.crit) / 100 + this.calcCritChanceFromBuffs();
            const dhitC: number = directHitChance(this.levelMod, this.player.stats.dhit) / 100 + this.calcDHitChanceFromBuffs();

            damage = Math.floor(baseDamage * this.calcDamageMultFromBuffs())

            if (Math.random() <= critC) {
                damage = Math.floor(damage * critDamageBonus(this.levelMod, this.player.stats.crit));
                chit = true;
            }

            if (Math.random() <= dhitC) {
                damage = Math.floor(damage * 1.25);
                dhit = true;
            }
        } else {
            damage = 0
        }

        const damageLog: DamageLog = {
            name: skill.name,
            damage: damage,
            totalDamage: this.damageDealt,
            potency: potency,
            directHit: dhit,
            crit: chit,
            timestamp: timeToLog
        }

        if (skill.comboInteraction) {
            this.comboAction = skill;
            this.comboTimer = 10 * 100;
        }

        if (skill.animationLock) {
            this.animLock = skill.animationLock * 100
        }

        return damageLog
    }

    useOGCD(skill: Skill): DamageLog | CommentLog {

        if (skill.potency) {
            return this.useSkill(skill)
        }

        if (skill.animationLock) {
            this.animLock = skill.animationLock
        }

        return { timestamp: this.getCurrentTime(), comment: `Used ${skill.name}` }
    }

    useAutoAttack(autoAttack: AutoAttack): DamageLog {
        const timeToLog = this.getCurrentTime();

        const baseDamage: number = calcAutoAttackDamage(autoAttack.potency, this.levelMod, this.player.jobMod.autoAttackStat(), this.player.stats.weaponDamage, autoAttack.autoAttackDelay, this.player.stats.mainStat, this.player.stats.det, this.player.stats.tenacity, autoAttack.traitDamageMult, this.player.stats.skillSpeed)
        const critC: number = critChance(this.levelMod, this.player.stats.crit) / 100 + this.calcCritChanceFromBuffs();
        const dhitC: number = directHitChance(this.levelMod, this.player.stats.dhit) / 100 + this.calcDHitChanceFromBuffs();

        let damage: number = Math.floor(baseDamage * this.calcDamageMultFromBuffs())

        //console.log("Mult", this.calcDamageMultFromBuffs())
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
            totalDamage: this.damageDealt,
            potency: autoAttack.potency,
            directHit: dhit,
            crit: chit,
            timestamp: timeToLog
        }

        return damageLog
    }

    getCooldown(name: string): Cooldown {
        return this.cooldowns.find((cooldown: Cooldown) => {
            if (cooldown.name === name) {
                return true
            }
            return false
        })
    }

    removeCooldown(cooldownToRemove: Cooldown): void {
        this.cooldowns = this.cooldowns.filter((cooldown) => cooldown.name !== cooldownToRemove.name)
    }

    addCooldown(cooldown: Cooldown): void {
        //If the cooldown already exists
        if (this.getCooldown(cooldown.name)) {
            this.removeCooldown(cooldown)
        }

        this.cooldowns.push({ name: cooldown.name, duration: cooldown.duration * 100 })

        this.cooldowns.sort((p1, p2) => p1.duration - p2.duration)
    }

    //Simulates time for all cooldowns, removing any cooldowns that have run out
    cooldownsJumpBy(time: number): void {

        let afterTime = this.cooldowns.map((cooldown) => {
            cooldown.duration = cooldown.duration - time
            return cooldown
        });
        this.cooldowns = afterTime.filter((cooldown) => cooldown.duration > 0.001)
    }

    getBuff(name: string): Buff {
        return this.buffs.find((buff: Buff) => {
            if (buff.name === name) {
                return true
            }
            return false
        })
    }

    getBuffs(): Array<Buff> {
        return this.buffs
    }

    removeBuff(buffToRemove: Buff): void {
        this.buffs = this.buffs.filter((buff) => buff.name !== buffToRemove.name)
    }

    addBuff(buff: Buff): void {
        //If the buff already exists
        if (this.getBuff(buff.name)) {
            this.removeBuff(buff)
        }

        this.buffs.push({ name: buff.name, duration: buff.duration * 100 })

        this.buffs.sort((p1, p2) => p1.duration - p2.duration)
    }

    //Simulates time for all buffs, removing any buffs that have run out
    buffsJumpBy(time: number): void {

        let afterTime = this.buffs.map((buff) => {
            buff.duration = buff.duration - time
            return buff
        });
        this.buffs = afterTime.filter((buff) => buff.duration > 0.001)
    }

    triggerGCD(time: number): void {
        this.gcdTimer = time
    }

    calcDamageMultFromBuffs(): number {
        return 1
    }

    calcCritChanceFromBuffs(): number {
        return 0
    }

    calcDHitChanceFromBuffs(): number {
        return 0
    }

    createDataPointsAreaChart(): SimDataArea {
        let damagePoints: DamagePoint[] = []
        let found: DamagePoint


        let abilityDamage: Array<AbilityDamage> = []
        let ability: AbilityDamage

        let tempArr: number[][]

        this.log.forEach((damageLog) => {
            if (damageLog.damage > 0) {
                found = damagePoints.find((val) => val.name === damageLog.name)
                if (!found) {
                    tempArr = new Array<number[]>(Math.ceil(this.log[this.log.length - 1].timestamp / 100) + 1).fill([0, 0]).map((val, index) => [index, 0])
                    damagePoints.push({ name: damageLog.name, totalDamage: 0, crit: 0, dhit: 0, critdhit: 0, hits: 0, damage: tempArr })
                    found = damagePoints.find((val) => val.name === damageLog.name)
                    found.damage.forEach((val, index) => {
                        found.damage[index][0] = index
                    })

                }
                if (damageLog.crit && !damageLog.directHit) {
                    found.crit++
                } else if (!damageLog.crit && damageLog.directHit) {
                    found.dhit++
                } else if (damageLog.crit && damageLog.directHit) {
                    found.critdhit++
                }

                found.hits++

                found.damage.find((val) => Math.ceil(damageLog.timestamp / 100) === val[0])[1] += damageLog.damage
                found.totalDamage += damageLog.damage
            }


            if (damageLog.damage > 0) {
                ability = abilityDamage.find((val) => val.name === damageLog.name)
                if (ability) {
                    ability.damage += damageLog.damage
                } else {
                    abilityDamage.push({ name: damageLog.name, damage: damageLog.damage })
                }
            }
        })
        return { damagePoints: damagePoints, abilityDamage: abilityDamage, log: { logs: this.getLog(), summary: this.summary() }, totalTime: this.currentTime / 100 }
    }

    getLog(): DamageLog[] {
        return this.log
    }

    abstract printDamageLogLine(damageLog: DamageLog): void;

    abstract getNextGCD(): Skill;

    abstract doNextAction(): DamageLog;

    abstract run(): void;
}