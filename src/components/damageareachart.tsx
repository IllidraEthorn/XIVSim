import ReactApexChart from "react-apexcharts";
import { Component } from "react";
import React from "react";
import movingAvg from "../sim/util/movingaverage";

class DamageAreaChart extends Component<any, { series: any[], options: {} }> {
    constructor(props: { data: Array<{ name: string, damage: Array<number[]> }> }) {
        super(props);

        const { data } = props

        this.state = {
            series: this.dataToSeries(data),
            options: {
                chart: {
                    id: 'dncDemoArea',
                    type: 'area',
                    height: 350,
                    stacked: true
                },
                dataLabels: {
                    enabled: false
                },
                stroke: {
                    curve: 'smooth',
                    width: '2'
                },
                legend: {
                    position: 'bottom',
                    horizontalAlign: 'left'
                },
                xaxis: {
                    type: 'numeric'
                },
            },
        };
    }

    dataToSeries(data: Array<{ name: string, damage: Array<number[]> }>): { name: string, data: number[][] }[] {
        let series: { name: string, data: number[][] }[] = []

        data.forEach((val) => {
            series.push({ name: val.name, data: val.damage })
        })

        series.forEach((val) => {
            let arr = this.smoothData(val.data, 10)
            val.data = arr
        })

        return series
    }

    smoothData(dataAvg, amount) {
        return movingAvg(dataAvg, amount, (val) => val[1], (val, valsmoothed) => [val[0], Math.floor(valsmoothed)])
    }

    componentDidUpdate(oldProps) {
        if (oldProps.data !== this.props.data)
            this.setState({ series: this.dataToSeries(this.props.data) })
    }

    render() {
        return (
            <div id="chart">
                <ReactApexChart options={this.state.options} series={this.state.series} type="area" height={310} />
            </div>
        );
    }
}

export default DamageAreaChart