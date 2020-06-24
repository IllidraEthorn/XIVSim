import JobMods from "../jobmods";
import Skill from "../skill";
import AutoAttack from "../autoattack";

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

const autoAttack: AutoAttack = {
    potency: 110,
    traitDamageMult: globalTraitMult,
    autoAttackDelay: 3.12
}

const cascade: Skill = {
    name: "Cascade",
    baseCastTime: 0,
    baseRecastTime: 2.5,
    potency: 250,
    traitDamageMult: globalTraitMult,
    isGCD: true,
    comboInteraction: true
}

const skills = {
    autoAttack,
    cascade
}

export { jobMods as dancerJobMods }
export { skills as dancerSkills }
export { autoAttack as dancerAutoAttack }