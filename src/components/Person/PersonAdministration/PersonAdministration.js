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
          <div className='person-area__contact-info'>
            {
              studentData.curator.pict_url
              ?
                <img className='person-area__contact-photo' src={studentData.curator.pict_url} alt='фотография куратора'></img>
              :
                <div className='person-area__contact-photo-empty'></div>
            }
            <div className='person-area__contact-info-container'>
              <h3 className='person-area__contact-name'>{studentData.curator.fullname || ''}</h3>
              <p className='person-area__contact-caption'>Куратор</p>
              <p className='person-area__contact-phone'>{studentData.curator.phone || '+7 (000) 000-00-00'}</p>
              <p className='person-area__contact-mail'>{studentData.curator.email || '0000000000000@000000.ru'}</p>
            </div>
          </div>
          <div className='person-area__contact-info'>
            {
              studentData.decan.pict_url
              ?
                <img className='person-area__contact-photo' src={studentData.decan.pict_url} alt='фотография декана'></img>
              :
                <div className='person-area__contact-photo-empty'></div>
            }
            <div className='person-area__contact-info-container'>
              <h3 className='person-area__contact-name'>{studentData.decan.fullname || ''}</h3>
              <p className='person-area__contact-caption'>Декан</p>
              <p className='person-area__contact-phone'>{studentData.decan.phone || '+7 (000) 000-00-00'}</p>
              <p className='person-area__contact-mail'>{studentData.decan.email || '0000000000000@000000.ru'}</p>
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