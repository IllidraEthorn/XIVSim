import levelMod80 from "./consts/levelmod";
import { Player } from "./player/player";
import { printSkillDamageRanges } from "./util/printDamageRanges";
import { jobMods } from "./jobs/jobmods";
import { dancerSkills } from "./jobs/dnc/dancer";
import { critChance, directHitChance } from "./util/damagecalc";
import DNCSim from "./jobs/dnc/sim";

const dancer: Player = {
    stats: {
        mainStat: 4442,
        weaponDamage: 124,
        crit: 2982,
        det: 1781,
        dhit: 3339,
        spellSpeed: 380,
        skillSpeed: 380,
        tenacity: 380
    },
    jobMod: jobMods.dancer
}

const player: Player = {
    stats: {
        mainStat: 4867,
        weaponDamage: 172,
        crit: 528,
        det: 1915,
        dhit: 2873,
        spellSpeed: 3593,
        skillSpeed: 380,
        tenacity: 380
    },
    jobMod: jobMods.dancer
}
/*
let critC = critChance(levelMod80, player.stats.crit)
let dhitC = directHitChance(levelMod80, player.stats.dhit)

printSkillDamageRanges(dancerSkills.cascade, levelMod80, dancer)

console.log("Crit chance: ", critC/100)
console.log("DHit chance: ", dhitC/100)*/

let sim: DNCSim = new DNCSim(dancer, levelMod80, 10, true);

sim.run();