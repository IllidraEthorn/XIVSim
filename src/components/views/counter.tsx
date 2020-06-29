import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Divider from '@material-ui/core/Divider';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import React from 'react';
import { connect } from 'react-redux';
import { Action } from '../../store/actions';

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

const mapStateToProps = (state: { counter: number }) => {
    return {
        counter: state.counter
    }
}

let Counter = (props: { counter?: number, dispatch: Function }) => {
    const classes = useStyles();

    return (
        <Card className={classes.root}>
            <CardContent>
                <Typography className={classes.title} color="textSecondary" gutterBottom>
                    Count: {props.counter}
                </Typography>

            </CardContent>
            <CardActions>
                <Button variant="outlined" color="secondary" onClick={() => { props.dispatch({ type: Action.DECREMENT }) }}>Decrement</Button>
                <Divider orientation="vertical" />
                <Button variant="outlined" color="primary" onClick={() => { props.dispatch({ type: Action.INCREMENT }) }}>Increment</Button>
            </CardActions>
        </Card>
    );
}

export default connect(mapStateToProps)(Counter);
