import React, { Component } from "react";
import { scaleBand, scaleLinear } from "d3-scale";

import Axes from "../Axes";
import Bars from "../Bars";
import ResponsiveWrapper from "../ResponsiveWrapper";
import axios from "axios";
import * as Constants from "../../Helpers/helper";
class Chart extends Component {
  constructor() {
    super();
    this.xScale = scaleBand();
    this.yScale = scaleLinear();
    this.state = {
      showGraph: false
    };
  }
  async componentDidMount() {
    try {
      let rooturl = Constants.rooturl;
      let response = await axios.get(rooturl);
      //console.log("res", response.data);
      const margins = { top: 50, right: 20, bottom: 100, left: 60 };
      const maxValue = Math.max(...response.data[1].map(d => d.value));
      //   console.log("maxValue", maxValue);
      const svgDimensions = {
        width: Math.max(this.props.parentWidth, 1300),
        height: 500
      };

      const xScale = this.xScale
        .padding(0.5)
        .domain(response.data[1].map(d => d.date).reverse())
        .range([margins.left, svgDimensions.width - margins.right]);

      const yScale = this.yScale
        .domain([0, maxValue / 1000000000000])
        .range([svgDimensions.height - margins.bottom, margins.top]);
      this.setState({
        data: response.data[1],
        xScale: xScale,
        yScale: yScale,
        maxValue: maxValue,
        showGraph: true
      });
    } catch (error) {}
  }
  render() {
    let showAxes = null;
    let showBars = null;
    const margins = { top: 50, right: 20, bottom: 100, left: 60 };
    const svgDimensions = {
      width: Math.max(this.props.parentWidth, 1000),
      height: 500
    };

    if (this.state.showGraph === true) {
      const { xScale, yScale, maxValue, data } = this.state;
      console.log("yScale", data);
      showAxes = (
        <Axes
          scales={{ xScale, yScale }}
          margins={margins}
          svgDimensions={svgDimensions}
        />
      );
      showBars = (
        <Bars
          scales={{ xScale, yScale }}
          margins={margins}
          data={data}
          maxValue={maxValue}
          svgDimensions={svgDimensions}
        />
      );
    }
    return (
      <svg width={svgDimensions.width} height={svgDimensions.height}>
        {showAxes}
        {showBars}
        <text x="20" y="40" fontFamily="sans-serif" fontSize="8" fill="black">
          GDP (in Trillions)
        </text>
        <text x="40" y="450" fontFamily="sans-serif" fontSize="8" fill="black">
          Years
        </text>
      </svg>
    );
  }
}

export default ResponsiveWrapper(Chart);
