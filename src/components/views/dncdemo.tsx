import { Button, ButtonGroup, Card, CardActions, CardContent, Divider, Grid, Slider, Typography } from '@material-ui/core';
import { Add, Delete } from '@material-ui/icons';
import smooth from 'array-smooth';
import React, { Component } from 'react';
import { dancerBIS } from '../../consts';
import levelMod80 from '../../sim/consts/levelmod';
import { dancerSkills } from '../../sim/jobs/dnc/dancer';
import DNCSim from '../../sim/jobs/dnc/sim';
import SimData from '../../sim/jobs/simdata';
import Skill from '../../sim/jobs/skill';
import DamageChart from '../damagechart';
import DamagePieChart from '../damagepiechart';
import ApexCharts from 'apexcharts'

class DNCDemo extends Component<{}, { pass1: number | string | Array<number | string>, pass2: number | string | Array<number | string>, data: number[][][], dataAvg: number[][], dataPie: SimData }>  {
  constructor(props) {

    super(props);

    this.state = {
      pass1: 30,
      pass2: 5,
      data: [],
      dataAvg: [],
      dataPie: null
    }

    this.recalc = this.recalc.bind(this)
    this.reset = this.reset.bind(this)
    this.componentDidMount = this.componentDidMount.bind(this)
  }

  componentDidMount() {
    this.recalc()
  }

  async recalc() {
    let dataAvg = []
    let data: number[][][] = [...this.state.data]

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

    let sim: DNCSim = new DNCSim(dancerBIS, levelMod80, 600, opener)

    sim.run()

    data.push(sim.createDataPointsPerSecondNew().damagePoints)

    let temp: number[] = [0, 0]

    for (let i = 0; i < data[0].length; i++) {
      temp[0] = i
      for (let j = 0; j < data.length; j++) {
        temp[1] += data[j][i][1]
      }

      dataAvg.push([temp[0], temp[1] / data.length])
      temp = [0, 0]
    }

    await this.setState({ data: data, dataAvg: dataAvg, dataPie: sim.createDataPointsPerSecondNew() })

    this.update()
  }

  async reset() {
    this.setState(state => ({ data: [], dataAvg: [] }), this.recalc)
  }

  update() {
    ApexCharts.exec('dncDemoLine', 'updateSeries', [{
      data: this.smoothData(this.smoothData(this.state.dataAvg, this.state.pass1), this.state.pass2)
    }])
  }

  smoothData(dataAvg, amount) {
    return smooth(dataAvg, amount, (val) => val[1], (val, valsmoothed) => [val[0], Math.floor(valsmoothed)])
  }

  render() {
    return (
      <>
        <Card>
          <CardContent>
            <Grid container xs={12} spacing={2}>
              <Grid item sm xs={12}><DamageChart data={this.state.data} dataAvg={this.smoothData(this.smoothData(this.state.dataAvg, this.state.pass1), this.state.pass2)} /></Grid>
              {this.state.dataPie && (<Grid item sm={4} xs={12}><DamagePieChart data={this.state.dataPie.abilityDamage} time={this.state.dataPie.totalTime} /></Grid>)}
            </Grid>
          </CardContent>
          <CardActions>
            <ButtonGroup>
              <Button variant="outlined" onClick={this.recalc} startIcon={<Add />}>Add</Button>
              <Button variant="outlined" onClick={this.reset} startIcon={<Delete />}>Reset</Button>
            </ButtonGroup>
          </CardActions>
          <CardActions>
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
                      this.update();
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
                      this.update();
                    }}
                  />
                </Grid>
              </Grid>
            </Grid>
          </CardActions >
          <Divider />
        </Card >
      </>
    )
  }
}


export default DNCDemo