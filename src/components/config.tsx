import { Grid, TextField, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import React from 'react';
import { ConfigOption } from '../interfaces/configoption';

const useStyles = makeStyles({
  table: {
    minWidth: 480,
  },
});

export default function Config(props: { config: ConfigOption[] }) {

  const classes = useStyles();

  return (
    <Grid container spacing={1}>
      {props.config.map((item) => (
        <Grid item xs={12} sm={6}>
          <TextField
            id={item.name}
            label={item.name}
            variant="outlined"
            defaultValue={item.value}
            type={item.type}
            fullWidth
            onChange={(event) => item.value = event.target.value}
          />
        </Grid>
      ))}
    </Grid>
  );
}
