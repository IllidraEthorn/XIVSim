import { Button, CardActions } from '@material-ui/core';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import { makeStyles } from '@material-ui/core/styles';
import ApexCharts from 'apexcharts';
import smooth from 'array-smooth';
import React from 'react';
import levelMod80 from '../../sim/consts/levelmod';
import { dancerSkills } from '../../sim/jobs/dnc/dancer';
import DNCSim from '../../sim/jobs/dnc/sim';
import { jobMods } from '../../sim/jobs/jobmods';
import Skill from '../../sim/jobs/skill';
import { Player } from '../../sim/player/player';
import DamageChart from '../damagechart';

const useStyles = makeStyles({
  root: {
    minWidth: 275,
  },
  bullet: {
    display: 'inline-block',
    margin: '0 2px',
    transform: 'scale(0.8)',
  },
  title: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },
});

let Welcome = () => {
  const classes = useStyles();

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

  let data: number[][][] = []

  sim.run()
  data.push(sim.createDataPointsPerSecondNew())

  let dataAvg: number[][] = sim.createDataPointsPerSecondNew()

  const recalc = () => {
    dataAvg = []

    sim = new DNCSim(dancerBIS, levelMod80, 600, opener);

    sim.run()
    data.push(sim.createDataPointsPerSecondNew())

    let temp: number[] = [0, 0]

    for (let i = 0; i < data[0].length; i++) {
      temp[0] = i
      for (let j = 0; j < data.length; j++) {
        temp[1] += data[j][i][1]
      }

      dataAvg.push([temp[0], temp[1] / data.length])
      temp = [0, 0]
    }

    ApexCharts.exec('dncDemo', 'updateSeries', [{
      data: smoothData(dataAvg)
    }])
  }

  const smoothData = (dataAvg) => {
    return smooth(smooth(dataAvg, 10, (val) => val[1], (val, valsmoothed) => [val[0], Math.floor(valsmoothed)]), 5, (val) => val[1], (val, valsmoothed) => [val[0], Math.floor(valsmoothed)])
  }

  return (
    <>
      <Card>
        <CardContent>
          <DamageChart data={data} dataAvg={smoothData(dataAvg)} />
        </CardContent>
        <CardActions>
          <Button onClick={recalc}>This</Button>
        </CardActions>
      </Card>
    </>
  );
}

export default Welcome;