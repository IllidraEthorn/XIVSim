import { List, ListItem, ListItemText, Paper, withStyles } from "@material-ui/core";
import React, { Component } from "react";
import { ListChildComponentProps } from "react-window";
import DamageLog from "../sim/jobs/damagelog";
import { Summary } from "../sim/jobs/simdata";

const useStyles = () => ({
    displayBox: {
        overflow: 'auto',
        maxHeight: 400,

    },
});

class LogViewer extends Component<any, { selection: number, logs: { logs: DamageLog[], summary: Summary }[] }> {
    constructor(props: { selection: number, logs: { logs: DamageLog[], summary: Summary }[] }) {
        super(props);

        this.state = {
            selection: props.selection,
            logs: props.logs
        };

        this.handleChange = this.handleChange.bind(this)
        this.renderRow = this.renderRow.bind(this)
    }

    componentDidUpdate(oldProps) {
        if (oldProps.logs !== this.props.logs) {
            this.setState({ logs: this.props.logs })
        }

        if (oldProps.selection !== this.props.selection) {
            this.setState({ selection: this.props.selection })
        }
    }

    handleChange(event: React.ChangeEvent<{ value: number }>) {
        console.log(event)
        this.setState({ selection: event.target.value });
    }

    renderRow(props: ListChildComponentProps) {
        const { index, style } = props;

        const item = this.state.logs[this.state.selection].logs[index]

        const timestamp = msToTime(item.timestamp)

        let name = item.name

        if (item.damage > 0) {
            let dmgAmount: string = item.damage.toString()
            if (item.crit) {
                dmgAmount = `*${dmgAmount}*`
            }
            if (item.directHit) {
                dmgAmount = `${dmgAmount} (Direct Hit)`
            }
            name += ' ' + dmgAmount
        }


        return (
            <ListItem style={style} key={index}>
                <ListItemText>[{timestamp}] {name}</ListItemText>
            </ListItem>
        );
    }

    renderRowAll(item: DamageLog, index: number) {

        const timestamp = msToTime(item.timestamp)

        let name = item.name

        if (item.damage > 0) {
            let dmgAmount: string = item.damage.toString()
            if (item.crit) {
                dmgAmount = `*${dmgAmount}*`
            }
            if (item.directHit) {
                dmgAmount = `${dmgAmount} (Direct Hit)`
            }
            name += ' ' + dmgAmount
        }


        return (
            <ListItem key={index}>
                <ListItemText>[{timestamp}] {name}</ListItemText>
            </ListItem>
        );
    }

    render() {
        const { classes } = this.props;
        return (
            <>
                <Paper className={classes.displayBox}>
                    {/*<FixedSizeList height={400} width='auto' itemSize={30} itemCount={this.state.logs[this.state.selection].logs.length}>
                        {this.renderRow}
        </FixedSizeList>*/}
                    <List dense>
                        {this.state.logs[this.state.selection].logs.map((item, index) => (this.renderRowAll(item, index))
                        )}
                    </List>
                </Paper>
            </>
        );
    }
}

function msToTime(s): string {

    // Pad to 2 or 3 digits, default is 2
    function pad(n, z = 2) {
        return ('00' + n).slice(-z);
    }

    var ms = s % 100;
    s = (s - ms) / 100;
    var secs = s % 60;
    s = (s - secs) / 60;
    var mins = s % 60;
    var hrs = (s - mins) / 60;

    return pad(hrs) + ':' + pad(mins) + ':' + pad(secs) + '.' + pad(ms);
}

export default withStyles(useStyles)(LogViewer)