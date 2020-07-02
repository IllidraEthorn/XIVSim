import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
});

function createData(name: string, damagePercent: number, damage: number) {
  return { name, damagePercent, damage };
}

export default function DamageTable(props: { data: { name: string, totalDamage: number, damage: Array<number[]> }[][] }) {

  const classes = useStyles();

  const [data, setData] = useState<{ name: string, damagePercent: number, damage: number }[]>([])

  useEffect(() => {
    let newData: { name: string, damagePercent: number, damage: number }[] = []
    let found: { name: string, damagePercent: number, damage: number }
    let totalDamage: number = 0

    props.data.forEach((val) => {
      val.forEach((inst) => {
        totalDamage += inst.totalDamage
        found = newData.find((f) => f.name === inst.name)
        if (found) {
          found.damage = found.damage + inst.totalDamage

          found = { name: inst.name, damagePercent: 0, damage: found.damage + inst.totalDamage }
        } else {
          newData.push({ name: inst.name, damagePercent: 0, damage: inst.totalDamage })
          found = newData.find((f) => f.name === inst.name)
        }
      })
    })

    newData.forEach((val) => {
      val.damagePercent = val.damage / totalDamage
    })
    setData(newData)
  }, [props.data])

  return (
    <TableContainer component={Paper}>
      <Table className={classes.table} size='small' aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell align="left">Name</TableCell>
            <TableCell align="right">Damage(%)</TableCell>
            <TableCell align="right">Damage</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map((row) => (
            <TableRow key={row.name}>
              <TableCell component="th" scope="row">
                {row.name}
              </TableCell>
              <TableCell align="right">{(row.damagePercent*100).toFixed(2)}%</TableCell>
              <TableCell align="right">{row.damage}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
