import { LevelMod } from "../../consts/levelmod";
import { Player } from "../../player/player";
import Sim, { DamageLog } from "../sim";
import Skill from "../skill";
import { dancerAutoAttack, dancerSkills } from "./dancer";
import { OPENSSL_VERSION_NUMBER } from "constants";

export default class DNCSim extends Sim {

    critFromBuffs: number
    dhitFromBuffs: number
    opener: Array<Skill>

    constructor(player: Player, levelMod: LevelMod, maxTime: number, opener?: Array<Skill>, printLog?: boolean) {
        super(player, levelMod, maxTime, printLog);
        this.opener = opener
        this.critFromBuffs = 0;
        this.dhitFromBuffs = 0;
    }

    getNextGCD(): Skill {
        if(this.opener?.length){
            return this.opener.shift()
        }
        if (this.comboAction == dancerSkills.cascade) {
            return dancerSkills.fountain
        }
        return dancerSkills.cascade
    }

    calcCritChanceFromBuffs(): number {
        return this.critFromBuffs
    }

    calcDHitChanceFromBuffs(): number {
        return this.dhitFromBuffs
    }

    printDamageLogLine(damageLog: DamageLog): void {
        let logLine: string = `${damageLog.timestamp.toFixed(2).padStart(5, '0')}| ${damageLog.potency}p |${damageLog.name} : ${damageLog.damage} `;

        if (damageLog.crit) {
            logLine += "C"
        }
        if (damageLog.directHit) {
            logLine += "D"
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
        }
    }
}