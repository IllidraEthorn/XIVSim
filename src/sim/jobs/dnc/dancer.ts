import AutoAttack from "../autoattack";
import Buff from "../buff";
import JobMods from "../jobmods";
import Proc from "../proc";
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
const flourishingCascade: Proc = { name: "Flourishing Cascade", duration: 20 }
const flourishingFountain: Proc = { name: "Flourishing Fountain", duration: 20 }
const flourishingWindmill: Proc = { name: "Flourishing Windmill", duration: 20 }
const flourishingShower: Proc = { name: "Flourishing Shower", duration: 20 }

const flourishingFanDance: Proc = { name: "Flourishing Fan Dance", duration: 20 }

const procs = {
    flourishingCascade,
    flourishingFountain,
    flourishingWindmill,
    flourishingShower,

    flourishingFanDance
}

const standardFinishBuff: Buff = { name: "Standard Finish", duration: 60 }
const technicalFinishBuff: Buff = { name: "Technical Finish", duration: 20 }
const devilmentBuff: Buff = { name: "Devilment", duration: 20 }

const buffs = {
    standardFinishBuff,
    technicalFinishBuff,
    devilmentBuff
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

const risingWindmill: Skill = {
    name: "Rising Windmill",
    iconPath: "https://xivapi.com/i/003000/003463.png",
    baseCastTime: 0,
    baseRecastTime: 2.5,
    potency: 300,
    traitDamageMult: globalTraitMult,
    isGCD: true,
    animationLock: globalAnimLock
}

const bloodshower: Skill = {
    name: "Bloodshower",
    baseCastTime: 0,
    baseRecastTime: 2.5,
    potency: 350,
    traitDamageMult: globalTraitMult,
    isGCD: true,
    animationLock: globalAnimLock
}

const saberDance: Skill = {
    name: "Saber Dance",
    baseCastTime: 0,
    baseRecastTime: 2.5,
    potency: 600,
    traitDamageMult: globalTraitMult,
    isGCD: true,
    animationLock: globalAnimLock
}

const flourish: Skill = {
    name: "Flourish",
    iconPath: "https://xivapi.com/i/003000/003475.png",
    baseCastTime: 0,
    baseRecastTime: 60,
    cooldown: 60,
    traitDamageMult: 0,
    isGCD: false,
    animationLock: globalAnimLock
}

const standardStep: Skill = {
    name: "Standard Step",
    iconPath: "https://xivapi.com/i/003000/003454.png",
    baseCastTime: 0,
    baseRecastTime: 1.5,
    cooldown: 30,
    traitDamageMult: 0,
    isGCD: true,
    animationLock: 1.5
}

const prePullStandard: Skill = {
    name: "Standard Finish",
    iconPath: "https://xivapi.com/i/003000/003459.png",
    baseCastTime: 0,
    baseRecastTime: 1.5,
    potency: 1000,
    traitDamageMult: globalTraitMult,
    isGCD: true,
    animationLock: globalAnimLock
}

const technicalStep: Skill = {
    name: "Technical Step",
    iconPath: "https://xivapi.com/i/003000/003473.png",
    baseCastTime: 0,
    baseRecastTime: 1.5,
    cooldown: 120,
    traitDamageMult: 0,
    isGCD: true,
    animationLock: 1.5
}

const step: Skill = {
    name: "Step",
    iconPath: "https://xivapi.com/i/003000/003455.png",
    baseCastTime: 0,
    baseRecastTime: 1,
    traitDamageMult: 0,
    isGCD: true,
    animationLock: 1
}

const standardFinish: Skill = {
    name: "Standard Finish",
    iconPath: "https://xivapi.com/i/003000/003459.png",
    baseCastTime: 0,
    baseRecastTime: 1.5,
    potency: 1000,
    traitDamageMult: globalTraitMult,
    isGCD: true,
    animationLock: globalAnimLock
}

const technicalFinish: Skill = {
    name: "Technical Finish",
    iconPath: "http://xivapi.com/i/003000/003474.png",
    baseCastTime: 0,
    baseRecastTime: 1.5,
    potency: 1500,
    traitDamageMult: globalTraitMult,
    isGCD: true,
    animationLock: globalAnimLock
}

const devilment: Skill = {
    name: "Devilment",
    iconPath: "https://xivapi.com/i/003000/003471.png",
    baseCastTime: 0,
    baseRecastTime: 120,
    cooldown: 120,
    traitDamageMult: 0,
    isGCD: false,
    animationLock: globalAnimLock
}

const fanDance: Skill = {
    name: "Fan Dance",
    baseCastTime: 0,
    baseRecastTime: 0.75,
    potency: 150,
    cooldown: 1.01,
    traitDamageMult: globalTraitMult,
    isGCD: false,
    animationLock: globalAnimLock,
    proc: procs.flourishingFanDance,
    procChance: 0.5
}

const fanDance3: Skill = {
    name: "Fan Dance III",
    baseCastTime: 0,
    baseRecastTime: 1.00,
    potency: 200,
    cooldown: 1.00,
    traitDamageMult: globalTraitMult,
    isGCD: false,
    animationLock: globalAnimLock
}

const skills = {
    cascade,
    reverseCascade,
    fountain,
    fountainFall,
    risingWindmill,
    bloodshower,
    saberDance,
    flourish,
    standardStep,
    technicalStep,
    step,
    standardFinish,
    prePullStandard,
    technicalFinish,
    fanDance,
    fanDance3,
    devilment
}

export { jobMods as dancerJobMods };
export { skills as dancerSkills };
export { autoAttack as dancerAutoAttack };
export { procs as dancerProcs };
export { buffs as dancerBuffs };

