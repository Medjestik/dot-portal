import React from 'react';
import './PersonData.css';
import Accordion from '../../Accordion/Accordion.js';
import PersonDataInfoPopup from './PersonDataInfoPopup/PersonDataInfoPopup.js';
import dataIcon from '../../../images/accordion/accordion-data.svg';

function PersonData({ windowWidth, currentUser, openChangePasswordPopup }) {

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
      <div ref={heightRef} className='person-data__container'>
        <div className='person-data__column'>
          <p className='person-data__text person-data__text_weight_bold'>{currentUser.login || ''}</p>
          <p className='person-data__text person-data__text_weight_bold'>Пароль</p>
          <p className='person-data__text person-data__text_weight_bold person-data__text_type_active' onClick={openChangePasswordPopup}>Изменить пароль</p>
        </div>
        {
          windowWidth <= 833 
          ?
          <div className='person-data__column'>
            <p className='person-data__text'>{currentUser.birthDate || '00.00.0000'}</p>
            <p className='person-data__text'>{currentUser.inn || '000-000-000 00'}</p>
            <p className='person-data__text'>{currentUser.phone || '+7 (000) 000-00-00'}</p>
            <p className='person-data__text'>{currentUser.email || '0000000000000@000000.ru'}</p>
            <p className='person-data__text person-data__text_weight_bold person-data__text_type_active'>Изменить данные</p>
          </div>
          :
          <>
          <div className='person-data__column'>
            <p className='person-data__text'>{currentUser.birthDate || '00.00.0000'}</p>
            <p className='person-data__text'>{currentUser.inn || '000-000-000 00'}</p>
            <p className='person-data__text person-data__text_weight_bold person-data__text_type_active'>Изменить данные</p>
          </div>
          <div className='person-data__column'>
            <p className='person-data__text'>{currentUser.phone || '+7 (000) 000-00-00'}</p>
            <p className='person-data__text'>{currentUser.email || '0000000000000@000000.ru'}</p>
            <p className='person-data__text person-data__text_weight_bold person-data__text_type_active'>Изменить данные</p>
          </div>
          </>

        }

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