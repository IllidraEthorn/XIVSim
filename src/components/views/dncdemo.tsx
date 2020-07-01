import { Button, ButtonGroup, Card, CardActions, CardContent, Divider, Grid, Slider, Typography } from '@material-ui/core';
import { Add, Delete } from '@material-ui/icons';
import ApexCharts from 'apexcharts';
import React, { Component } from 'react';
import { dancerBIS } from '../../consts';
import levelMod80 from '../../sim/consts/levelmod';
import { dancerSkills } from '../../sim/jobs/dnc/dancer';
import DNCSim from '../../sim/jobs/dnc/sim';
import SimData, { SimDataArea } from '../../sim/jobs/simdata';
import Skill from '../../sim/jobs/skill';
import movingAvg from '../../sim/util/movingaverage';
import DamageChart from '../damagechart';
import DamagePieChart from '../damagepiechart';
import DamageAreaChart from '../damageareachart';


class DNCDemo extends Component<{}, { pass1: number | string | Array<number | string>, pass2: number | string | Array<number | string>, data: { name: string, damage: Array<number[]> }[][], dataArea: { name: string, damage: Array<number[]> }[] }>  {
  constructor(props) {

    super(props);

    this.state = {
      pass1: 5,
      pass2: 15,
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
    let data: { name: string, damage: Array<number[]> }[][] = [...this.state.data]

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

    data.push(simData.damagePoints)

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

    this.setState({ data: data, dataArea: dataArea }, () => {

    })
  }

  async reset() {
    this.setState({
      data: [],
      dataArea: []
    }, this.recalc)
  }

  smoothData(dataAvg, amount) {
    return movingAvg(dataAvg, amount, (val) => val[1], (val, valsmoothed) => [val[0], Math.floor(valsmoothed)])
  }

  render() {
    return (
      <Card>
        <CardContent>
          <Grid container xs={12} spacing={2}>
            <Grid item sm xs={12}><DamageAreaChart data={this.state.dataArea} /></Grid>
          </Grid>
        </CardContent>
        <CardActions>
          <ButtonGroup>
            <Button variant="outlined" onClick={this.recalc} startIcon={<Add />}>Add</Button>
            <Button variant="outlined" onClick={this.reset} startIcon={<Delete />}>Reset</Button>
          </ButtonGroup>
        </CardActions>
        {/*(false && <CardActions>
          <Grid container spacing={2}>
            <Grid container item spacing={2}>
              <Grid item>
                <Typography>Smoothness Pass 1:</Typography>
              </Grid>
              <Grid item xs={true}>
                <Slider
                  min={0}
                  max={100}
                  defaultValue={30}
                  value={typeof this.state.pass1 === 'number' ? this.state.pass1 : 0}
                  aria-labelledby="discrete-slider-custom"
                  step={1}
                  valueLabelDisplay="auto"
                  onChange={(event: any, newValue: number | number[]) => {
                    this.setState({ pass1: newValue })
                    this.updateLine();
                  }}
                />
              </Grid>
            </Grid>
            <Grid container item spacing={2}>
              <Grid item>
                <Typography>Smoothness Pass 2:</Typography>
              </Grid>
              <Grid item xs={true}>
                <Slider
                  min={0}
                  max={100}
                  defaultValue={30}
                  value={typeof this.state.pass2 === 'number' ? this.state.pass2 : 0}
                  aria-labelledby="discrete-slider-custom"
                  step={1}
                  valueLabelDisplay="auto"
                  onChange={(event: any, newValue: number | number[]) => {
                    this.setState({ pass2: newValue })
                    this.updateLine();
                  }}
                />
              </Grid>
            </Grid>
          </Grid>
                </CardActions >)*/}
      </Card >
    )
  }
}


export default DNCDemo