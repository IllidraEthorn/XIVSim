export interface AbilityDamage {
    name: string
    damage: number
}

export default interface SimData {
    //An array of [time (second), damage]
    damagePoints: Array<number[]>
    abilityDamage: Array<AbilityDamage>

    totalTime: number
}

export interface DamagePoint {
    name: string
    totalDamage: number
    damage: number[][]
    crit: number
    dhit: number
    critdhit: number
    hits: number
}

export interface SimDataArea {
    //An array of [time (second), damage]
    damagePoints: DamagePoint[]
    abilityDamage: Array<AbilityDamage>

    totalTime: number
}