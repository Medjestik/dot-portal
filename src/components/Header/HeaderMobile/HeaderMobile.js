import React from 'react';
import './HeaderMobile.css';

function HeaderMobile() {

  return (
    <div className='header-mobile'>
      <button className='header-mobile__btn header-mobile__btn_type_menu' type='button'></button>
      <h2 className='header-mobile__title'>Личный кабинет</h2>
      <button className='header-mobile__btn header-mobile__btn_type_home' type='button'></button>
    </div>
  );
}

export default HeaderMobile;