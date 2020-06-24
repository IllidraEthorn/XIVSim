import Skill from "./skill";
import { Player } from "../player/player";
import { LevelMod } from "../consts/levelmod";

export default abstract class Sim {
    player: Player;
    levelMod: LevelMod;
    printLog: boolean;
    currentTime: number;
    maxTime: number;
    damageDealt: number;
    gcdTimer: number

    constructor(player: Player, levelMod: LevelMod, maxTime: number, printLog?: boolean) {
        this.player = player
        this.levelMod = levelMod
        this.printLog = printLog
        this.currentTime = 0
        this.maxTime = maxTime
        this.damageDealt = 0;
    }

    dealDamage(damage: number): void {
        this.damageDealt += damage;
    }

    jumpToNextGCD(): void {
        this.currentTime += this.gcdTimer;
        this.gcdTimer = 0;
    }

    abstract getNextGCD(): Skill;
}