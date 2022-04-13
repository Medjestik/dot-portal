import React from 'react';
import './Month.css';

function Month() {

  return (
    <div className='month'>
      <p className='month__text'>Февраль 2022</p>
      <div className='month__arrow-container'>
        <div className='month__arrow-prev'></div>
      </div>
      <div className='month__arrow-container'>
        <div className='month__arrow-next'></div> 
      </div>
    </div>
  );
}

export default Month; 


