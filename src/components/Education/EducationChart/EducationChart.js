import React from 'react';
import './EducationChart.css';
import { PieChart } from 'react-minimal-pie-chart';

function EducationChart({ totalValue, value, label, color }) {

  return (
    <>
    <div className='education-chart'>
      <PieChart
        data={[{ value: Number(value), color: color }]}
        totalValue={totalValue}
        lineWidth={18}
        paddingAngle={2}
        rounded
        background='#F1F3F5'
        label={({ dataEntry }) => label}
        labelStyle={{
          fontSize: '24px',
          fontFamily: 'Roboto',
          fontWeight: 'bold',
          fill: color,
        }}
        labelPosition={0}
      />
    </div>
    </>           
  )
}

export default EducationChart;