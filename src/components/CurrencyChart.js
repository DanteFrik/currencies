import React from 'react';
import { Line } from 'react-chartjs-2';

const CurrencyChart = ({ chartData }) => {
  return (
    <div>
      <h2>График изменения курса:</h2>
      <Line data={chartData} />
    </div>
  );
};

export default CurrencyChart;
