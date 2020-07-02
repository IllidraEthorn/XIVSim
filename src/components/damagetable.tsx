import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import TableFooter from '@material-ui/core/TableFooter';
import { DamagePoint } from '../sim/jobs/simdata';

const useStyles = makeStyles({
  table: {
    minWidth: 480,
  },
});

interface Row {
  name: string
  damage: number
  crit: number
  dhit: number
  critdhit: number
  amount: number
  damagePercent: number
  dps: number
}


function createData(name: string, damagePercent: number, damage: number, dps: number) {
  return { name, damage, damagePercent, dps };
}

export default function DamageTable(props: { data: DamagePoint[][], totalTime: number }) {

  const classes = useStyles();

  const [data, setData] = useState<Row[]>([])
  const [totalDPS, setTotalDPS] = useState<number>(0)

  useEffect(() => {
    let newData: Row[] = []
    let found: Row
    let totalDamage: number = 0
    let totalDPS: number = 0

    props.data.forEach((val) => {
      val.forEach((inst) => {
        totalDamage += inst.totalDamage
        found = newData.find((f) => f.name === inst.name)

        if (found) {
          found.damage = found.damage + inst.totalDamage

          found.crit = found.crit + inst.crit
          found.dhit = found.dhit + inst.dhit
          found.critdhit = found.crit + inst.critdhit
        } else {
          newData.push({ name: inst.name, damage: inst.totalDamage, crit: inst.crit, dhit: inst.dhit, critdhit: inst.critdhit, amount: inst.hits, damagePercent: 0, dps: 0 })
          found = newData.find((f) => f.name === inst.name)
        }
      })
    })

    newData.forEach((val) => {
      val.damagePercent = val.damage / totalDamage
      val.dps = val.damage / props.totalTime
      totalDPS = totalDPS + val.dps
      val.damage = val.damage / props.data.length
      val.crit = val.crit / props.data.length
      val.dhit = val.dhit / props.data.length
      val.critdhit = val.critdhit / props.data.length
    })

    console.log(props.data)

    setData(newData.sort((a, b) => b.damage - a.damage))
    setTotalDPS(totalDPS)
  }, [props.data])

  return (
    <TableContainer component={Paper}>
      <Table className={classes.table} size='small' aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell align="left">Name</TableCell>
            <TableCell align="right">Damage %</TableCell>
            <TableCell align="right">Damage</TableCell>
            <TableCell align="right">Hits</TableCell>
            <TableCell align="right">Crit %</TableCell>
            <TableCell align="right">DHit %</TableCell>
            <TableCell align="right">CDH %</TableCell>
            <TableCell align="right">DPS</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map((row) => (
            <TableRow key={row.name}>
              <TableCell>{row.name}</TableCell>
              <TableCell align="right">{(row.damagePercent * 100).toFixed(2)}%</TableCell>
              <TableCell align="right">{row.damage.toFixed(2)}</TableCell>
              <TableCell align="right">{row.amount}</TableCell>
              <TableCell align="right">{(row.crit * 100 / row.amount).toFixed(1)}%</TableCell>
              <TableCell align="right">{(row.dhit * 100 / row.amount).toFixed(1)}%</TableCell>
              <TableCell align="right">{(row.critdhit * 100 / row.amount).toFixed(1)}%</TableCell>
              <TableCell align="right">{(row.dps).toFixed(1)}</TableCell>
            </TableRow>
          ))}
        </TableBody>
        <TableFooter>
          <TableRow>
            <TableCell size='medium' align="left">Total</TableCell>
            <TableCell variant='body' size='medium' colSpan={7} align="right">{totalDPS.toFixed(1)}</TableCell>
          </TableRow>
        </TableFooter>
      </Table>
    </TableContainer>
  );
}
