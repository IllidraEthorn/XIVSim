import { LevelMod } from "../consts/levelmod";
import randomRange from "./randomRange";

//All functions were made using information taken from http://allaganstudies.akhmorning.com/
const potencyMult = (ptc: number) => {
    return ptc / 100;
}

const weaponDamageMult = (levelMod: LevelMod, jobMod: number, weaponDamage: number) => {
    return Math.floor((levelMod.main * jobMod / 1000) + weaponDamage);
}

const attackPowerMult = (attackPower: number) => {
    return (Math.floor((165 * (attackPower - 340) / 340) + 100) / 100)
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

const calcDamage = (potency: number, levelMod: LevelMod, jobMod: number, weaponDamage: number, attackPower: number, determination: number, tenacity: number, traitMult: number, range?: number) => {
    range = range ? range : randomRange(0.95, 1.05)
    return (Math.floor(Math.floor(potencyMult(potency) * weaponDamageMult(levelMod, jobMod, weaponDamage) * attackPowerMult(attackPower) * detMult(levelMod, determination) * tenacityMult(levelMod, tenacity) * traitMult) * range))
}

const calcDamageRange = (potency: number, levelMod: LevelMod, jobMod: number, weaponDamage: number, attackPower: number, determination: number, tenacity: number, traitMult: number) => {
    return `${calcDamage(potency, levelMod, jobMod, weaponDamage, attackPower, determination, tenacity, traitMult, 0.95)} - ${calcDamage(potency, levelMod, jobMod, weaponDamage, attackPower, determination, tenacity, traitMult, 1.05)}`
}

export { directHitChance, critChance, critDamageBonus, calcDamage };
