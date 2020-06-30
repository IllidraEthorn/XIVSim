export default interface AutoAttack {
    potency: number
    traitDamageMult: number
    autoAttackDelay: number

    onUse?<T>(state: T): T
}