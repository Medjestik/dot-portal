import React from 'react';
import './HomePage.css';
import Login from '../Login/Login.js';

function HomePage({ onLogin, requestError, onHideRequestError, isLoadingRequest }) {

  return (
    <div className='home-page'>
      <div className='home-page__background'></div>
      <div className='home-page__overlay'></div>

      <Login 
        onLogin={onLogin} 
        requestError={requestError} 
        onHideRequestError={onHideRequestError} 
        isLoadingRequest={isLoadingRequest} 
      />

      <a className='home-page__link' href='https://emiit.ru/' target='_blank' rel='noreferrer'>Узнать больше</a>

      <div className='home-page__info'>
        <div className='home-page__info-column'>
          <h4 className='home-page__info-title'>Техническая поддержка:</h4>
          <p className='home-page__info-email'>ief07@bk.ru</p>
          <p className='home-page__info-phone'>+7 (499) 653-55-16</p>
        </div>
        <div className='home-page__info-column'>
          <p className='home-page__info-copy'>2023, Российский университет транспорта</p>
        </div>
        

      </div>

    </div>
  );
}

export default HomePage;