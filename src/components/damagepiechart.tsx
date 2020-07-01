import React, { Component, useMemo } from 'react';
import ReactApexChart from 'react-apexcharts';
import { AbilityDamage } from '../sim/jobs/simdata';

class DamagePieChart extends Component<any, { options: {}, series: any }> {
    constructor(props: { data: Array<AbilityDamage>, time: number }) {
        const { data, time } = props

        super(props);

        let values: { data: Array<number>, labels: Array<string> } = { data: [], labels: [] }
        data.sort((a, b) => b.damage - a.damage).forEach((value: AbilityDamage) => {
            values.data.push(Math.round(value.damage / time))
            values.labels.push(value.name)
        })

        this.state = {
            options: {
                chart: {
                    id: 'dncDemoPie',
                    toolbar: {
                        show: true,
                        offsetX: 0,
                        offsetY: 0,
                        tools: {
                            download: false,
                            selection: true,
                            zoom: true,
                            zoomin: false,
                            zoomout: false,
                            pan: false,
                            reset: true
                        },
                        autoSelected: 'zoom'
                    },
                },
                labels: values.labels,
                legend: {
                    show: false
                },
            },
            series: values.data
        }


    }
    render() {
        return (
            <ReactApexChart options={this.state.options} series={this.state.series} type="pie" height={300} />
        )
    }
}


export default DamagePieChart