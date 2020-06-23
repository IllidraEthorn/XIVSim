import { LevelMod } from "../consts/levelmod";

//All functions were made using information taken from http://allaganstudies.akhmorning.com/
const potencyMult = (ptc: number) => {
    return ptc / 100;
}

const weaponDamageMult = (levelMod: LevelMod, jobMod: number, weaponDamage: number) => {
    return Math.floor((levelMod.main * jobMod / 1000) + weaponDamage);
}

const attackPowerMult = (attackPower: number) => {
    return (Math.floor((125 * (attackPower - 292) / 292) + 100) / 100)
}

const detMult = (levelMod: LevelMod, determination: number) => {
    return (Math.floor(130 * (determination - levelMod.main) / levelMod.div + 1000) / 1000)
}