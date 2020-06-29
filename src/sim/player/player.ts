import JobMods from "../jobs/jobmods";

export interface Player {
    stats: {
        mainStat: number,
        weaponDamage: number,
        crit: number,
        det: number,
        dhit: number,
        spellSpeed: number,
        skillSpeed: number,
        tenacity: number
    },
    jobMod: JobMods
}