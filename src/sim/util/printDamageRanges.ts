import { LevelMod } from "../consts/levelmod";
import Skill from "../jobs/skill";
import { Player } from "../player/player";
import { calcDamage, critDamageBonus } from "./damagecalc";

const printSkillDamageRanges = (skill: Skill, levelMod: LevelMod, player: Player): void => {
    console.log(skill.name, ":");
    printDamageRanges(skill.potency, levelMod, player, skill.traitDamageMult)
}

const printDamageRanges = (potency: number, levelMod: LevelMod, player: Player, traitMult: number): void => {
    const min = calcDamage(potency, levelMod, player.jobMod.mainStat(), player.stats.weaponDamage, player.stats.mainStat, player.stats.det, player.stats.tenacity, traitMult, 0.95);
    const max = calcDamage(potency, levelMod, player.jobMod.mainStat(), player.stats.weaponDamage, player.stats.mainStat, player.stats.det, player.stats.tenacity, traitMult, 1.05);

    const damageRanges = {
        normal: {
            min: min,
            max: max
        },
        direct: {
            min: Math.floor(min * 1.25),
            max: Math.floor(max * 1.25)
        },
        crit: {
            min: Math.floor(min * critDamageBonus(levelMod, player.stats.crit)),
            max: Math.floor(max * critDamageBonus(levelMod, player.stats.crit))
        },
        directCrit: {
            min: Math.floor(min * 1.25 * critDamageBonus(levelMod, player.stats.crit)),
            max: Math.floor(max * 1.25 * critDamageBonus(levelMod, player.stats.crit))
        }
    }

    console.log(damageRanges)
}

export { printDamageRanges, printSkillDamageRanges };

