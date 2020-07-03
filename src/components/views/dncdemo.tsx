import { Button, ButtonGroup, Card, CardActions, CardContent, Grid } from '@material-ui/core';
import { Add, Delete } from '@material-ui/icons';
import React, { Component } from 'react';
import { dancerBIS } from '../../consts';
import levelMod80 from '../../sim/consts/levelmod';
import DamageLog from '../../sim/jobs/damagelog';
import { dancerSkills } from '../../sim/jobs/dnc/dancer';
import DNCSim from '../../sim/jobs/dnc/sim';
import { DamagePoint, SimDataArea, Summary } from '../../sim/jobs/simdata';
import Skill from '../../sim/jobs/skill';
import DamageAreaChart from '../damageareachart';
import DamageTable from '../damagetable';


class DNCDemo extends Component<{}, { pass1: number | string | Array<number | string>, pass2: number | string | Array<number | string>, totalTime: number, logs: Array<{ logs: DamageLog[], summary: Summary }>, data: DamagePoint[][], dataArea: { name: string, damage: Array<number[]> }[] }>  {
  constructor(props) {

    super(props);

    this.state = {
      pass1: 5,
      pass2: 15,
      totalTime: 0,
      logs: [],
      data: [],
      dataArea: []
    }

    this.recalc = this.recalc.bind(this)
    this.reset = this.reset.bind(this)
    this.componentDidMount = this.componentDidMount.bind(this)
  }

  componentDidMount() {
    this.recalc()
  }

  recalc() {
    let data: DamagePoint[][] = [...this.state.data]
    let logs: { logs: DamageLog[], summary: Summary }[] = [...this.state.logs]
    let totalTime: number = this.state.totalTime

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

    let sim: DNCSim = new DNCSim(dancerBIS, levelMod80, 400, opener)

    sim.run()

    let simData: SimDataArea = sim.createDataPointsAreaChart()

    logs.push(simData.log)

    data.push(simData.damagePoints)

    //console.log(logs)

    totalTime = totalTime + simData.totalTime

    let dataArea = data.reduce((prev: { name: string, damage: number[][] }[], current: { name: string, damage: number[][] }[]) => {

      current.forEach((cur) => {
        let found = prev.find((val) => val.name === cur.name)

        if (found) {
          found.damage.forEach((elem, index) => { elem[1] = elem[1] + cur.damage[index][1] })
        } else {
          prev.push(cur)
        }

      })
      return prev
    }, [])

    dataArea.forEach((val) => {
      val.damage.forEach((dmg) => {
        dmg[1] = dmg[1] / data.length
      })
    })

    this.setState({ data: data, totalTime: totalTime, logs: logs, dataArea: dataArea })
  }

  async reset() {
    let dataArea = [...this.state.dataArea]
    dataArea.forEach((val) => {
      val.damage.forEach((dmg) => {
        dmg[1] = 0
      })
    })

    this.setState({
      totalTime: 0,
      logs: [],
      data: [],
      dataArea: dataArea
    }, this.recalc)
  }

  render() {
    return (
      <Card>
        <CardContent>
          <Grid container spacing={2}>
            <Grid item sm xs={12}><DamageAreaChart data={this.state.dataArea} /></Grid>
          </Grid>
          <Grid container spacing={2}>
            <CardActions>
              <ButtonGroup>
                <Button variant="outlined" onClick={this.recalc} startIcon={<Add />}>Add</Button>
                <Button variant="outlined" onClick={this.reset} startIcon={<Delete />}>Reset</Button>
              </ButtonGroup>
            </CardActions>
          </Grid>
          <Grid container spacing={2}>
            <Grid item xs><DamageTable data={this.state.data} totalTime={this.state.totalTime} /></Grid>
          </Grid>
        </CardContent>
      </Card >
    )
  }
}


export default DNCDemo