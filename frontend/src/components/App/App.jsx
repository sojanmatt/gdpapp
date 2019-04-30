import React from "react";

import "./App.css";
import Chart from "../Chart";
import Footer from "../Footer";

export default () => (
  <div className="App">
    <div className="App-header">
      <h1>GDP growth of U.S.A for the past 60 years</h1>
    </div>

    <div className="App-chart-container">
      <Chart />
    </div>

    <Footer />
  </div>
);
