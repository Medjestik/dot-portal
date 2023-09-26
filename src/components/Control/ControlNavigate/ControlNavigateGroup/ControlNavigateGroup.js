import React from 'react';
import { useNavigate } from 'react-router-dom';
import Accordion from '../../../Accordion/Accordion.js';
import groupIcon from '../../../../images/accordion/accordion-group.svg';

function ControlNavigateGroup({ windowWidth }) {

  const navigate = useNavigate();

  const [sectionHeight, setSectionHeight] = React.useState(0);
  const heightRef = React.createRef();
  
  React.useEffect(() => {
    setSectionHeight(heightRef.current.clientHeight);
  }, [heightRef, windowWidth]);

  return (
    <Accordion icon={groupIcon} name='Группы' height={sectionHeight} openInfoPopup={() => {}}> 
      <div ref={heightRef} className='control-navigate__container'>
        <div className={`control-navigate__column ${windowWidth > 833 && 'control-navigate__column_margin_right'}`}>
          <h3 className='control-navigate__column-title'>Выберите раздел:</h3>
          <ul className='control-navigate__column-list'>
            <li className='control-navigate__column-item' onClick={() => navigate('/control/group/active/bac')}>Текущие группы</li>
            <li className='control-navigate__column-item' onClick={() => navigate('/control/group/completed/bac')}>Завершили обучение</li>
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

export default ControlNavigateGroup;