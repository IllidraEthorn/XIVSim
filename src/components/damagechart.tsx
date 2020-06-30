import React, { Component } from 'react';
import ReactApexChart from 'react-apexcharts';

class DamageChart extends Component<any, { options: {}, series: any }> {
    constructor(props: { data: any, dataAvg: any }) {
        const { data, dataAvg } = props

        super(props);

        this.state = {
            options: {
                chart: {
                    id: 'dncDemoLine',
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
                xaxis: {
                    type: 'numeric'
                },
                stroke: {
                    curve: 'smooth'
                }
            },
            series: [
                {
                    name: 'dps',
                    data: dataAvg
                }]
        }


    }
    render() {
        return (
            <ReactApexChart options={this.state.options} series={this.state.series} type="line" height={320} />
        )
    }
}


export default DamageChart