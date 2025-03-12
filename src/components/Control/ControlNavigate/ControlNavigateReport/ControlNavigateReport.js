import React from 'react';
import { Link } from 'react-router-dom';
import Accordion from '../../../Accordion/Accordion.js';
import reportIcon from '../../../../images/accordion/accordion-report.svg';

function ControlNavigateReport({ windowWidth }) {
  const [sectionHeight, setSectionHeight] = React.useState(0);
  const heightRef = React.createRef();
  

  React.useEffect(() => {
    setSectionHeight(heightRef.current.clientHeight);
  }, [heightRef, windowWidth]);

  return (
    <Accordion icon={reportIcon} name='Отчетность' height={sectionHeight} openInfoPopup={() => {}}> 
      <div ref={heightRef} className='control-navigate__container'>
        <div className={`control-navigate__column ${windowWidth > 833 && 'control-navigate__column_margin_right'}`}>
          <h3 className='control-navigate__column-title'>Выберите раздел:</h3>
          <ul className='control-navigate__column-list'>
            <li className='control-navigate__column-item'>
              <Link className='control-navigate__column-link' to='/control/report/group'>Тестирование по группе</Link>
            </li>
            <li className='control-navigate__column-item'>
              <Link className='control-navigate__column-link' to='/control/report/user'>Тестирование по пользователю</Link>
            </li>
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

export default ControlNavigateReport;
