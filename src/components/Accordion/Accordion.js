import React from 'react';
import './Accordion.css';
import { infoIcon } from './AccordionIcons/AccordionIcons.js';

function Accordion({ icon, name, height, openInfoPopup, addInfo, children }) {

  const [isOpenAccordion, setIsOpenAccordion] = React.useState(false);

  function toggleAccordion() {
    setIsOpenAccordion(!isOpenAccordion);
  }

  const childrenHeight = {
    height: height + 80 + 24, // + mainHeight + marginTop
  };

  return (
    <section
      style={Object.assign({}, isOpenAccordion && childrenHeight)}
      className={`accordion ${isOpenAccordion ? 'accordion_state_open' : ''}`}
    >
      <div className='accordion__main'>
        <img className='accordion__icon' src={icon} alt='иконка'></img>
        {
          (name === 'Уведомления') && (addInfo.count > 0) &&
          <div className='accordion__icon-count'>{addInfo.count}</div>
        }
        <h5 className='accordion__title'>{name}</h5>
        <div className={`accordion__info ${isOpenAccordion ? 'accordion__info_state_show' : ''}`} onClick={openInfoPopup}>
          { infoIcon }
        </div>
        <div className='accordion__arrow' onClick={toggleAccordion}></div>
      </div>
      <div className='accordion__children'>
        {children}
      </div>
    </section>
  );
}

export default Accordion; 