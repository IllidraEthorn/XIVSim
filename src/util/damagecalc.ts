import levelMod80, { LevelMod } from "../consts/levelmod";

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

const tenacityMult = (levelMod: LevelMod, tenacity: number) => {
    return (Math.floor(100 * (tenacity - levelMod.sub) / levelMod.div + 1000) / 1000)
}

const speedMult = (levelMod: LevelMod, speed: number) => {
    return (Math.floor(130 * (speed - levelMod.sub) / levelMod.div + 1000) / 1000)
}

const directHitChance = (levelMod: LevelMod, dhit: number) => {
    return (Math.floor(550 * (dhit - levelMod.sub) / levelMod.div) / 10)
}

const critChance = (levelMod: LevelMod, crit: number) => {
    return (Math.floor(200 * (crit - levelMod.sub) / levelMod.div + 50) / 10)
}

const critDamageBonus = (levelMod: LevelMod, crit: number) => {
    return (Math.floor(200 * (crit - levelMod.sub) / levelMod.div + 1400) / 1000)
}

const autoAttack = (levelMod: LevelMod, jobMod: number, weaponDamage: number, weaponDelay: number) => {
    return (Math.floor(Math.floor(levelMod.main * jobMod / 1000 + weaponDamage) * (weaponDelay / 3)))
}