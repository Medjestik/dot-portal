import React from 'react';
import './TestChart.css';
import { PieChart } from 'react-minimal-pie-chart';

function TestChart({ test }) {

  return (
    <>
    <div className='test-chart'>
      <PieChart
        data={[{ value: Number(test.percent), color: test.state_name === 'Пройден' ? '#1153FC' : '#D9D9D9' }]}
        totalValue={100}
        lineWidth={18}
        paddingAngle={2}
        rounded
        background='#F1F3F5'
        label={({ dataEntry }) => dataEntry.value + '%'}
        labelStyle={{
          fontSize: '24px',
          fontFamily: 'Roboto',
          fontWeight: 'bold',
          fill: test.state_name === 'Пройден' ? '#1153FC' : '#D9D9D9',
        }}
        labelPosition={0}
      />
    </div>
    </>           
  )
}

export default TestChart;