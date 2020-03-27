
import React, { Component } from 'react'
import Chart from "chart.js";
let barChart;

export default class BarGraph extends Component {
  chartRef = React.createRef();

  componentDidMount() {
    this.buildChart();
  }

  componentDidUpdate() {
    this.buildChart();
  }

  buildChart = () => {
    const myChartRef = this.chartRef.current.getContext("2d");
    const { label, data, labels, backgroundColors, borderColors, axisLabels } = this.props;

    if (typeof barChart !== "undefined") barChart.destroy();

    barChart = new Chart(myChartRef, {
      type: "bar",
      data: {
        //Bring in data
        labels: labels,
        datasets: [
          {
            borderWidth: 1,
            label: label,
            data: data,
            fill: false,
            backgroundColor: backgroundColors,
            borderColor: borderColors
          }
        ]
      },
      options: {
        legend: {
          display: false
        },
        responsive: true,
        maintainAspectRatio: false,
        aspectRatio: 1,
        scales: {
          xAxes: [{
            scaleLabel: {
              display: true,
              labelString: axisLabels.x
            }
          }],
          yAxes: [{
            scaleLabel: {
              display: true,
              labelString: axisLabels.y
            }
          }]
        }
        //Customize chart options
      }
    });
  }

  render() {
    return (
      <div>
        <canvas
          id="myChart"
          ref={this.chartRef}
        />
      </div>
    )
  }
}