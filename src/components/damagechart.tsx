import React, { Component } from 'react'
import Chart from 'react-apexcharts'
import { Player } from '../sim/player/player';
import { jobMods } from '../sim/jobs/jobmods';
import Skill from '../sim/jobs/skill';
import { dancerSkills } from '../sim/jobs/dnc/dancer';
import DNCSim from '../sim/jobs/dnc/sim';
import levelMod80 from '../sim/consts/levelmod';
import smooth from 'array-smooth'

class DamageChart extends Component<{}, { options: {}, series: any }> {
    constructor(props) {
        super(props);

        const player: Player = {
            stats: {
                mainStat: 4867,
                weaponDamage: 172,
                crit: 528,
                det: 1915,
                dhit: 2873,
                spellSpeed: 3593,
                skillSpeed: 380,
                tenacity: 380
            },
            jobMod: jobMods.dancer
        }

        const dancerBIS: Player = {
            stats: {
                mainStat: 4871,
                weaponDamage: 128,
                crit: 3969,
                det: 2067,
                dhit: 2762,
                spellSpeed: 380,
                skillSpeed: 380,
                tenacity: 380
            },
            jobMod: jobMods.dancer
        }

        const opener: Array<Skill> = [
            dancerSkills.prePullStandard,
            dancerSkills.technicalStep,
            dancerSkills.step,
            dancerSkills.step,
            dancerSkills.step,
            dancerSkills.step,
            dancerSkills.technicalFinish,
            dancerSkills.flourish,
            dancerSkills.risingWindmill,
            dancerSkills.devilment
        ]

        let sim: DNCSim = new DNCSim(dancerBIS, levelMod80, 600, opener);

        let data: Array<number[][]> = []

        for (let i = 0; i < 1; i++) {
            sim.run()
            data.push(sim.createDataPointsPerSecondNew())
        }

        let dataAvg: number[][] = []

        data[0].forEach((val: number[], index: number) => {
            dataAvg.push([val[0], data.reduce((prev, current) => {
                return prev + current[index][1]
            }, 0) / data.length])

        })

        sim.log.forEach((damageLog) => { sim.printDamageLogLine(damageLog) });

        console.log(dataAvg)

        console.log(data)

        this.state = {
            options: {
                chart: {
                    id: 'apexchart-example'
                },
                xaxis: {
                    type: 'numeric'
                },
                stroke: {
                    curve: 'smooth'
                }
            },
            series: [
            {
                name: 'dps2',
                data: smooth(smooth(dataAvg, 30, (val)=>val[1], (val,valsmoothed)=>[val[0], Math.floor(valsmoothed)]), 5, (val)=>val[1], (val,valsmoothed)=>[val[0], Math.floor(valsmoothed)])
            }]
        }
    }
    render() {
        return (
            <Chart options={this.state.options} series={this.state.series} type="line" width={500} height={320} />
        )
    }
}


export default DamageChart