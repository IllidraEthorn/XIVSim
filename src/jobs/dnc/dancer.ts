import AutoAttack from "../autoattack";
import JobMods from "../jobmods";
import Skill from "../skill";

const jobMods: JobMods = {
    hp: 105,
    mp: 79,
    str: 90,
    vit: 100,
    dex: 115,
    int: 85,
    mnd: 80,
    mainStat: () => {
        return jobMods.dex
    },
    autoAttackStat: () => {
        return jobMods.dex
    }
}

const globalTraitMult: number = 1.2
const globalAnimLock: number = 0.75

//Not sure how to type this
const procs = {
    "Flourishing Cascade": { name: "Flourishing Cascade", duration: 20 },
    "Flourishing Fountain": { name: "Flourishing Fountain", duration: 20 }
}

const autoAttack: AutoAttack = {
    potency: 110,
    traitDamageMult: 1.0,
    autoAttackDelay: 3.12
}

const cascade: Skill = {
    name: "Cascade",
    baseCastTime: 0,
    baseRecastTime: 2.5,
    potency: 250,
    traitDamageMult: globalTraitMult,
    isGCD: true,
    comboInteraction: true,
    proc: procs["Flourishing Cascade"],
    procChance: 0.5,
    animationLock: globalAnimLock
}

const fountain: Skill = {
    name: "Fountain",
    baseCastTime: 0,
    baseRecastTime: 2.5,
    potency: 100,
    comboPotency: 300,
    comboActions: [cascade],
    traitDamageMult: globalTraitMult,
    isGCD: true,
    comboInteraction: true,
    proc: procs["Flourishing Fountain"],
    procChance: 0.5,
    animationLock: globalAnimLock
}

const reverseCascade: Skill = {
    name: "Reverse Cascade",
    baseCastTime: 0,
    baseRecastTime: 2.5,
    potency: 300,
    traitDamageMult: globalTraitMult,
    isGCD: true,
    animationLock: globalAnimLock
}

const fountainFall: Skill = {
    name: "Fountainfall",
    baseCastTime: 0,
    baseRecastTime: 2.5,
    potency: 350,
    traitDamageMult: globalTraitMult,
    isGCD: true,
    animationLock: globalAnimLock
}

const flourish: Skill = {
    name: "Flourish",
    baseCastTime: 0,
    baseRecastTime: 60,
    traitDamageMult: 0,
    isGCD: false,
    animationLock: globalAnimLock
}

const skills = {
    cascade,
    reverseCascade,
    fountain,
    fountainFall,
    flourish
}

export { jobMods as dancerJobMods };
export { skills as dancerSkills };
export { autoAttack as dancerAutoAttack };
export { procs as dancerProcs };

