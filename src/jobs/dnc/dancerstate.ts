import Proc from "../proc"

export default class DancerState {
    private esprit: number
    private feathers: number

    private maxEsprit: number
    private maxFeathers: number

    private procs: Array<Proc>

    private stepsRemaining: number
    private inStandard: boolean
    private inTechnical: boolean

    constructor() {
        this.esprit = 0
        this.feathers = 0

        this.maxEsprit = 100
        this.maxFeathers = 4

        this.procs = []

        this.stepsRemaining = 0
        this.inStandard = false
        this.inTechnical = false
    }

    getEsprit(): number {
        return this.esprit
    }

    getFeathers(): number {
        return this.feathers
    }

    //Adds give amount of esprit and returns the number of esprit added (amount - returned value = overcap)
    addEsprit(amount: number): number {
        let espritToAdd: number = Math.min(this.maxEsprit - this.esprit, amount)
        this.esprit = this.esprit + espritToAdd

        return espritToAdd
    }

    //Adds 1 feather (or given amount) and returns the number of feathers added (amount - returned value = overcap)
    addFeather(amount: number = 1): number {
        let feathersToAdd: number = Math.min(this.maxFeathers - this.feathers, amount)
        this.feathers = this.feathers + feathersToAdd

        return feathersToAdd
    }

    removeEsprit(amount: number): boolean {
        if (this.esprit < amount) {
            return false
        }
        this.esprit = (this.esprit - amount)
        return true
    }

    removeFeather(): boolean {
        if (this.feathers < 1) {
            return false
        }
        this.feathers = this.feathers - 1
        return true
    }

    getProcs(): Array<Proc> {
        return this.procs
    }

    getProcByName(name: string): Proc | any {
        return this.procs.find((proc: Proc) => {
            if (proc.name === name) {
                return true
            }
            return false
        })
    }

    removeProc(procToRemove: Proc): void {
        this.procs = this.procs.filter((proc) => proc.name !== procToRemove.name)
    }

    addProc(proc: Proc): void {
        //If the proc already exists
        if (this.getProcByName(proc.name)) {
            this.removeProc(proc)
        }

        this.procs.push({ name: proc.name, duration: proc.duration })

        this.procs.sort((p1, p2) => p1.duration - p2.duration)
    }

    //Simulates time for all procs, removing any procs that have run out
    procsJumpBy(time: number): void {

        let afterTime = this.procs.map((proc) => {
            proc.duration = proc.duration - time
            return proc
        });
        this.procs = afterTime.filter((proc) => proc.duration > 0)
    }

    getStepsRemaining(): number {
        return this.stepsRemaining;
    }

    removeStep(number: number = 1): void {
        this.stepsRemaining = Math.max(this.stepsRemaining - number, 0);
    }

    setRemainingSteps(number: number): void {
        this.stepsRemaining = number;
    }

    setInStandard(inStandard: boolean): void {
        if (inStandard) {
            this.inStandard = true
            this.setRemainingSteps(2)
        } else {
            this.inStandard = false
        }
    }

    setInTechnical(inTechnical: boolean): void {
        if (inTechnical) {
            this.inTechnical = true
            this.setRemainingSteps(4)
        } else {
            this.inTechnical = false
        }
    }

    getInStandard(): boolean {
        return this.inStandard
    }

    getInTechnical(): boolean {
        return this.inTechnical
    }

    getInDance(): boolean {
        return (this.getInStandard() || this.getInTechnical())
    }
}
