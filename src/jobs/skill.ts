export default interface Skill {
    name: string
    baseCastTime: number
    baseRecastTime: number
    potency: number
    traitDamageMult: number

    //Does this skill trigger the gcd?
    isGCD: boolean
    //Combo Stuff
    comboPotency?: number
    //Use an array because some jobs have multiple combo actions
    comboActions?: Array<Skill>
    //Set to true if this skill interacts with your combo (Is a combo action or can break your combo)
    //True for Cascade, but False for Reverse Cascade and Bloodspiller
    comboInteraction?: boolean
}