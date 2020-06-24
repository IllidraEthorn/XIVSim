import Skill from "./skill";
import { Player } from "../player/player";
import { LevelMod } from "../consts/levelmod";

abstract class Sim {
    player: Player;
    levelMod: LevelMod;
    printLog: boolean;

    constructor(printLog: boolean) {
        this.printLog = printLog
    }

    abstract getNextGCD(): Skill;


}