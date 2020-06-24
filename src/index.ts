import levelMod80 from "./consts/levelmod";
import { Player } from "./player/player";
import { printSkillDamageRanges } from "./util/printDamageRanges";
import { jobMods } from "./jobs/jobmods";
import { dancerSkills } from "./jobs/dnc/dancer";

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

printSkillDamageRanges(dancerSkills.cascade, levelMod80, dancer)