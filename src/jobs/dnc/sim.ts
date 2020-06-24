import Sim from "../sim";
import Skill from "../skill";
import { dancerSkills } from "./dancer";
import { Player } from "../../player/player";
import { LevelMod } from "../../consts/levelmod";
import { calcDamage } from "../../util/damagecalc";

export default class DNCSim extends Sim {

    constructor(player: Player, levelMod: LevelMod, maxTime: number, printLog?: boolean) {
        super(player, levelMod, maxTime, printLog);
    }

    test(): void {
        this.maxTime
    }

    getNextGCD(): Skill {
        return dancerSkills.cascade
    }

    useSkill(skill: Skill): number {
        this.jumpToNextGCD();
        this.gcdTimer = skill.baseRecastTime

        return calcDamage(skill.potency, this.levelMod, this.player.jobMod.mainStat(), this.player.stats.weaponDamage, this.player.stats.mainStat, this.player.stats.det, this.player.stats.tenacity, 1.2)
    }

    doNextGCD(): void {
        this.useSkill(this.getNextGCD())
    }
}