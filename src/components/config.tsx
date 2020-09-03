import { Button, Divider, Grid, IconButton, List, ListItem, ListItemIcon, ListItemSecondaryAction, ListItemText, TextField } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { Add, Delete } from '@material-ui/icons';
import DragHandleIcon from "@material-ui/icons/DragHandle";
import arrayMove from "array-move";
import React, { useState } from 'react';
import { Container, Draggable } from "react-smooth-dnd";
import { ConfigOption } from '../interfaces/configoption';
import Skill from '../sim/jobs/skill';

const useStyles = makeStyles({
  table: {
    minWidth: 480,
  },
  unselectable: {
    userSelect: 'none',
  },
});

function useForceUpdate() {
  const [value, setValue] = useState(0); // integer state
  return () => setValue(value => ++value); // update the state to force render
}

export default function Config(props: { config: ConfigOption[], opener: Skill[] }) {

  const classes = useStyles();

  const forceUpdate = useForceUpdate()

  const onDrop = ({ removedIndex, addedIndex }) => {
    arrayMove.mutate(props.opener, removedIndex, addedIndex)
    forceUpdate()
  };

  return (
    <>
      <Grid container spacing={1}>
        {props.config.map((item, index) => (
          <Grid item xs={12} sm={6} key={index}>
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

        <Grid item xs={12} sm={12}>
          <List>
            <Divider />
            <Container dragHandleSelector=".drag-handle" lockAxis="y" onDrop={onDrop}>
              {props.opener.map((item, index) => (
                <Draggable key={index}>
                  <ListItem className={classes.unselectable} >
                    {item.iconPath && (<ListItemIcon><img src={item.iconPath}></img></ListItemIcon>)}
                    <ListItemText primary={item.name} />
                    <ListItemSecondaryAction>
                      <ListItemIcon className="drag-handle">
                        <DragHandleIcon />
                      </ListItemIcon>
                      <ListItemIcon>
                        <IconButton onClick={() => {
                          props.opener.splice(index, 1)
                          forceUpdate()
                        }}>
                          <Delete color="secondary" />
                        </IconButton>
                      </ListItemIcon>
                    </ListItemSecondaryAction>
                  </ListItem>
                </Draggable>
              ))}
            </Container>
            <ListItem>
              <Button fullWidth color="primary" variant="outlined">
                <Add />
              </Button>
            </ListItem>
          </List>
        </Grid>
      </Grid>
    </>
  );
}
