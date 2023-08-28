import React from 'react';
import './PersonAdministration.css';
import Accordion from '../../Accordion/Accordion.js';
import PersonAdministrationInfoPopup from './PersonAdministrationInfoPopup/PersonAdministrationInfoPopup.js';
import administrationIcon from '../../../images/accordion/accordion-administration.svg';

function PersonAdministration({ windowWidth, studentData }) {

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
    <Accordion icon={administrationIcon} name='Деканат' height={sectionHeight} openInfoPopup={openInfoPopup}> 
      <div ref={heightRef} className='person-administration__container'>
        <div className='person-area__contact'>
          <div className='person-area__contact-container'>
            {
              studentData.decan.pict_url
              ?
                <img className='person-area__contact-photo' src={studentData.decan.pict_url} alt='фото'></img>
              :
                <div className='person-area__contact-photo-empty'></div>
            }
            <div className='person-area__contact-info'>
              <h3 className='person-area__contact-name'>{studentData.decan.fullname || ''}</h3>
              <ul className='data__list data__list_margin_top'>
                <li className='data__item'>
                  <p className='data__text'><span className='data__text_font_bold'>Должность:</span>Декан</p>
                </li>
                <li className='data__item'>
                  <p className='data__text'><span className='data__text_font_bold'>Телефон:</span>{studentData.decan.phone || '+7 (000) 000-00-00'}</p>
                </li>
                <li className='data__item'>
                  <p className='data__text'><span className='data__text_font_bold'>Почта:</span>{studentData.decan.email || '0000000000000@000000.ru'}</p>
                </li>
              </ul>
            </div>
          </div>
          <div className='person-area__contact-container'>
            {
              studentData.curator.pict_url
              ?
                <img className='person-area__contact-photo' src={studentData.curator.pict_url} alt='фото'></img>
              :
                <div className='person-area__contact-photo-empty'></div>
            }
            <div className='person-area__contact-info'>
              <h3 className='person-area__contact-name'>{studentData.curator.fullname || ''}</h3>
              <ul className='data__list data__list_margin_top'>
                <li className='data__item'>
                  <p className='data__text'><span className='data__text_font_bold'>Должность:</span>Куратор</p>
                </li>
                <li className='data__item'>
                  <p className='data__text'><span className='data__text_font_bold'>Телефон:</span>{studentData.curator.phone || '+7 (000) 000-00-00'}</p>
                </li>
                <li className='data__item'>
                  <p className='data__text'><span className='data__text_font_bold'>Почта:</span>{studentData.curator.email || '0000000000000@000000.ru'}</p>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>   
    </Accordion>
    {
      isOpenInfoPopup &&
      <PersonAdministrationInfoPopup
        isOpen={isOpenInfoPopup}
        onClose={closePopups}
      />
    }

    </>
  );
}

export default PersonAdministration; 