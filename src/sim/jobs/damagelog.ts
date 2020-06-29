export default interface DamageLog {
    name: string
    damage: number
    totalDamage: number
    potency: number
    directHit: boolean
    crit: boolean
    timestamp: number
    comment?: any
}