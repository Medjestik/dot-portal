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
        <ul className='data__list data__list_margin_top'>
          <li className='data__item'>
            <p className='data__text'><span className='data__text_font_bold'>Статус:</span>Студент</p>
          </li>
          <li className='data__item'>
            <p className='data__text'><span className='data__text_font_bold'>Логин:</span>{currentUser.login || ''}</p>
          </li>
          <li className='data__item'>
            <p className='data__text'><span className='data__text_font_bold'>Дата рождения:</span>{currentUser.birthDate ? convertDate(currentUser.birthDate) : '00.00.0000' }</p>
          </li>
          <li className='data__item'>
            <p className='data__text'><span className='data__text_font_bold'>СНИЛС:</span>{currentUser.snils || '000-000-000 00'}</p>
          </li>
          <li className='data__item'>
            <p className='data__text'><span className='data__text_font_bold'>Телефон:</span>{currentUser.phone || '+7 (000) 000-00-00'}</p>
          </li>
          <li className='data__item'>
            <p className='data__text'><span className='data__text_font_bold'>Почта:</span>{currentUser.email || '0000000000000@000000.ru'}</p>
          </li>
        </ul>

        <div className='data__control'>
          <p className='data__control-text' onClick={openDataPopup}>Изменить данные</p>
          <p className='data__control-text' onClick={openChangePasswordPopup}>Изменить пароль</p>
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