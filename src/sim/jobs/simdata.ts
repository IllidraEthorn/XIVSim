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

export interface SimDataArea {
    //An array of [time (second), damage]
    damagePoints: Array<{ name: string, damage: Array<number[]> }>
    abilityDamage: Array<AbilityDamage>

    totalTime: number
}