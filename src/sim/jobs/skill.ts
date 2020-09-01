import Proc from "./proc";

export default interface Skill {
    name: string
    baseCastTime: number
    baseRecastTime: number
    potency?: number
    traitDamageMult: number
    cooldown?: number

    iconPath?: string

    //Does this skill trigger the gcd?
    isGCD: boolean
    //Combo Stuff
    comboPotency?: number
    //Use an array because some jobs have multiple combo actions
    comboActions?: Array<Skill>
    //Set to true if this skill interacts with your combo (Is a combo action or can break your combo)
    //True for Cascade, but False for Reverse Cascade and Bloodspiller
    comboInteraction?: boolean

    //Is there a proc that this skill can trigger on use?
    proc?: Proc
    //Chance of the proc occurring 
    procChance?: number

    //Does this skill have an animation lock? (Can't do an action for x duration) 0.75?? for most things
    animationLock?: number

    onUse?(state: any): any
}