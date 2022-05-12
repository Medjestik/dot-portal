import React from 'react';
import './HomePage.css';
import Login from '../Login/Login.js';

function HomePage({ onLogin }) {

  return (
    <div className='home-page'>
      <div className='home-page__background'></div>
      <div className='home-page__overlay'></div>

      <Login onLogin={onLogin} />

      <a className='home-page__link' href='https://emiit.ru/' target='_blank' rel='noreferrer'>Узнать больше</a>

    </div>
  );
}

export default HomePage;