import { dancerJobMods } from './dnc/dancer'

export default interface JobMods {
    hp: number,
    mp: number,
    str: number,
    vit: number,
    dex: number,
    int: number,
    mnd: number,
    mainStat(): number,
    autoAttackStat(): number

}

const jobMods = {
    dancer: dancerJobMods
}

export { jobMods }
