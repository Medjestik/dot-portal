import React from 'react';
import './PersonData.css';
import Accordion from '../../Accordion/Accordion.js';
import PersonDataInfoPopup from './PersonDataInfoPopup/PersonDataInfoPopup.js';
import dataIcon from '../../../images/accordion/accordion-data.svg';

function PersonData({ windowWidth, currentUser, studentData, openChangePasswordPopup, openDataPopup }) {

  function convertDate(date) {
    return new Date(date).toLocaleString('ru', { month: 'numeric', day: 'numeric', }) + '.' + new Date(date).toLocaleString('sv', { year: 'numeric', });
  }

  const [isOpenInfoPopup, setIsOpenInfoPopup] = React.useState(false);
  
  const [sectionHeight, setSectionHeight] = React.useState(0);
  const heightRef = React.createRef();

  function openInfoPopup() {
    setIsOpenInfoPopup(true);
  }

  function closePopups() {
    setIsOpenInfoPopup(false);
  }
  
  React.useEffect(() => {
    setIsOpenInfoPopup(false);
    return(() => {
    })
  },[]);

  React.useEffect(() => {
    setSectionHeight(heightRef.current.clientHeight);
  }, [heightRef, windowWidth]);

  return (
    <>
    <Accordion icon={dataIcon} name='Данные' height={sectionHeight} openInfoPopup={openInfoPopup}> 
      <div ref={heightRef} className='person-area__data'>  
        <ul className='person-area__data-list person-area__data-list_margin_top'>
          <li className='person-area__data-item'>
            <p className='person-area__data-text'><span className='person-area__data-text_font_bold'>Статус:</span>{studentData.qualification || ''}</p>
          </li>
          <li className='person-area__data-item'>
            <p className='person-area__data-text'><span className='person-area__data-text_font_bold'>Логин:</span>{currentUser.login || ''}</p>
          </li>
          <li className='person-area__data-item'>
            <p className='person-area__data-text'><span className='person-area__data-text_font_bold'>Дата рождения:</span>{currentUser.birthDate ? convertDate(currentUser.birthDate) : '00.00.0000' }</p>
          </li>
          <li className='person-area__data-item'>
            <p className='person-area__data-text'><span className='person-area__data-text_font_bold'>СНИЛС:</span>{currentUser.snils || '000-000-000 00'}</p>
          </li>
          <li className='person-area__data-item'>
            <p className='person-area__data-text'><span className='person-area__data-text_font_bold'>Телефон:</span>{currentUser.phone || '+7 (000) 000-00-00'}</p>
          </li>
          <li className='person-area__data-item'>
            <p className='person-area__data-text'><span className='person-area__data-text_font_bold'>Почта:</span>{currentUser.email || '0000000000000@000000.ru'}</p>
          </li>
        </ul>

        <div className='person-area__data-control'>
          <p className='person-area__data-control-text' onClick={openDataPopup}>Изменить данные</p>
          <p className='person-area__data-control-text' onClick={openChangePasswordPopup}>Изменить пароль</p>
        </div>
      </div>
    </Accordion>
    {
      isOpenInfoPopup &&
      <PersonDataInfoPopup
        isOpen={isOpenInfoPopup}
        onClose={closePopups}
      />
    }

    </>
  );
}

export default PersonData; 