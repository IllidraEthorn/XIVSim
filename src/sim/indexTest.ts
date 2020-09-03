import levelMod80 from "./consts/levelmod";
import { dancerSkills } from "./jobs/dnc/dancer";
import DNCSim from "./jobs/dnc/sim";
import { jobMods } from "./jobs/jobmods";
import Skill from "./jobs/skill";
import { Player } from "./player/player";
import movingAvg from "./util/movingaverage";

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

const dancerBIS: Player = {
    stats: {
        mainStat: 4871,
        weaponDamage: 128,
        crit: 3969,
        det: 2067,
        dhit: 2762,
        spellSpeed: 380,
        skillSpeed: 380,
        tenacity: 380
    },
    jobMod: jobMods.dancer
}

const opener: Array<Skill> = [
    dancerSkills.prePullStandard,
    dancerSkills.technicalStep,
    dancerSkills.step,
    dancerSkills.step,
    dancerSkills.step,
    dancerSkills.step,
    dancerSkills.technicalFinish,
    dancerSkills.flourish,
    dancerSkills.risingWindmill,
    dancerSkills.devilment
]

let sim: DNCSim = new DNCSim(dancerBIS, levelMod80, 150, [...opener]);

sim.run();
//sim.log.forEach((damageLog) => { sim.printDamageLogLine(damageLog) });
console.log(sim.summary(), "HEY1");

console.log(sim.createDataPointsAreaChart())

//console.log(movingAvg([10, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], 2))