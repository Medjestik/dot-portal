import React from 'react';
import './Accordion.css';

function Accordion({ icon, name, height, openInfoPopup, children }) {

  const [isOpenAccordion, setIsOpenAccordion] = React.useState(false);

  function toggleAccordion() {
    setIsOpenAccordion(!isOpenAccordion);
  }

  const childrenHeight = {
    height: height,
  };

  return (
    <section
      style={Object.assign({}, isOpenAccordion && childrenHeight)} 
      className={`accordion ${isOpenAccordion ? 'accordion_state_open' : ''}`}
    >
      <div className='accordion__main'>
        <img className='accordion__img' src={icon} alt="Тематическая иконка"></img>
        <h5 className='accordion__title'>{name}</h5>
        <div className={`accordion__info ${isOpenAccordion ? 'accordion__info_state_show' : ''}`} onClick={openInfoPopup}></div>
        <div className='accordion__arrow' onClick={toggleAccordion}></div>
      </div>
      <div className='accordion__children'>
        {children}
      </div>
    </section>
  );
}

export default Accordion; 