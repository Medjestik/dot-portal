import React from 'react';
import { useNavigate } from 'react-router-dom';
import Accordion from '../../../Accordion/Accordion.js';
import webinarIcon from '../../../../images/accordion/accordion-diploma.svg';

function ControlNavigateDiploma({ windowWidth }) {

  const navigate = useNavigate();

  const [sectionHeight, setSectionHeight] = React.useState(0);
  const heightRef = React.createRef();
  

  React.useEffect(() => {
    setSectionHeight(heightRef.current.clientHeight);
  }, [heightRef, windowWidth]);

  return (
    <Accordion icon={webinarIcon} name='Выпускные работы' height={sectionHeight} openInfoPopup={() => {}}> 
      <div ref={heightRef} className='control-navigate__container'>
        <div className={`control-navigate__column ${windowWidth > 833 && 'control-navigate__column_margin_right'}`}>
          <h3 className='control-navigate__column-title'>Выберите раздел:</h3>
          <ul className='control-navigate__column-list'>
            <li className='control-navigate__column-item' onClick={() => navigate('/control/diploma/check')}>Проверка на антиплагиат</li>
          </ul>
        </div>
        {
          windowWidth > 833 &&
          <div className='control-navigate__column'>
          </div>
        }
      </div>   
    </Accordion>
  );
}

export default ControlNavigateDiploma;
