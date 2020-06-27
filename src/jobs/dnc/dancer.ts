import AutoAttack from "../autoattack";
import JobMods from "../jobmods";
import Skill from "../skill";
import Proc from "../proc";

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


const flourishingCascade: Proc = { name: "Flourishing Cascade", duration: 20 }
const flourishingFountain: Proc = { name: "Flourishing Fountain", duration: 20 }

const flourishingFanDance: Proc = { name: "Flourishing Fan Dance", duration: 20 }

const procs = {
    flourishingCascade,
    flourishingFountain,

    flourishingFanDance
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
    proc: procs.flourishingCascade,
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
    proc: procs.flourishingFountain,
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
    cooldown: 60,
    traitDamageMult: 0,
    isGCD: false,
    animationLock: globalAnimLock
}

const standardStep: Skill = {
    name: "Standard Step",
    baseCastTime: 0,
    baseRecastTime: 1.5,
    cooldown: 30,
    traitDamageMult: 0,
    isGCD: true,
    animationLock: 1.5
}

const step: Skill = {
    name: "Step",
    baseCastTime: 0,
    baseRecastTime: 1,
    traitDamageMult: 0,
    isGCD: true,
    animationLock: 1
}

const standardFinish: Skill = {
    name: "Standard Finish",
    baseCastTime: 0,
    baseRecastTime: 1.5,
    potency: 1000,
    traitDamageMult: globalTraitMult,
    isGCD: true,
    animationLock: globalAnimLock
}

const fanDance: Skill = {
    name: "Fan Dance",
    baseCastTime: 0,
    baseRecastTime: 1.00,
    potency: 150,
    cooldown: 1.00,
    traitDamageMult: globalTraitMult,
    isGCD: false,
    animationLock: globalAnimLock,
    proc: procs.flourishingFanDance,
    procChance: 0.5
}

const skills = {
    cascade,
    reverseCascade,
    fountain,
    fountainFall,
    flourish,
    standardStep,
    step,
    standardFinish,
    fanDance
}

export { jobMods as dancerJobMods };
export { skills as dancerSkills };
export { autoAttack as dancerAutoAttack };
export { procs as dancerProcs };

