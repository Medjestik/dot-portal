import React from 'react';
import './PersonAnnouncement.css';
import Accordion from '../../Accordion/Accordion.js';
import PersonAnnouncementInfoPopup from './PersonAnnouncementInfoPopup/PersonAnnouncementInfoPopup.js';
import announcementIcon from '../../../images/accordion/accordion-announcement.svg';

function PersonAnnouncement({ windowWidth, userAnnouncement, onOpen }) {

  const [isOpenInfoPopup, setIsOpenInfoPopup] = React.useState(false);

  const [sectionHeight, setSectionHeight] = React.useState(0);
  const heightRef = React.createRef();

  const [numberStep, setNumberStep] = React.useState(3);

  function openInfoPopup() {
    setIsOpenInfoPopup(true);
  }

  function closePopups() {
    setIsOpenInfoPopup(false);
  }

  function showNotifications() {
    setNumberStep(numberStep + 3);
  }

  React.useEffect(() => {
    setSectionHeight(heightRef.current.clientHeight);
  }, [heightRef, windowWidth]);
  
  React.useEffect(() => {
    setIsOpenInfoPopup(false);
    setNumberStep(3);
    return(() => {
    })
  },[]);

  return (
    <>
    <Accordion icon={announcementIcon} name='Объявления' height={sectionHeight} openInfoPopup={openInfoPopup} addInfo={{}}>
      <div ref={heightRef} className='person-announcement__container'>
      {
        userAnnouncement.length > 0 ?
        <>
        <ul className='popup__list'>
          {
            userAnnouncement.slice(0, numberStep).map((elem, i) => (
              <li key={i} className='popup__item popup__item_type_column'>
                <div className='popup__author'>
                  {
                  elem.authorImg
                  ?
                  <img className='popup__author-img popup__author-img_size_small' src={elem.authorImg} alt='аватар'></img>
                  :
                  <div className='popup__author-img popup__author-img_size_small'></div>
                  }
                  <div className='popup__author-info'>
                    <h4 className='popup__author-title popup__author-title_type_active' onClick={() => onOpen(elem)}>{elem.title}</h4>
                    {
                      windowWidth > 833
                      ?
                      <p className='popup__author-text'>
                        <span className='popup__author-text_weight_bold'>Дата: </span> 
                        {elem.date} 
                        <span className='popup__author-text_weight_bold popup__author-text_margin-left_12'>Автор: </span> 
                        {elem.author}
                      </p>
                      :
                      <>
                      <p className='popup__author-text'>
                        <span className='popup__author-text_weight_bold'>Дата: </span> 
                        {elem.date} 
                      </p>
                      <p className='popup__author-text'>
                        <span className='popup__author-text_weight_bold popup__author-text_margin-left_12'>Автор: </span> 
                        {elem.author}
                      </p>
                      </>
                    }

                  </div>
                </div>
                <p className='popup__author-text'>{elem.text}</p>
              </li>
            ))
          }
        </ul>
        {
          (userAnnouncement.length > numberStep) &&
          <button className='btn-more btn-more_margin_left btn-more_type_show' onClick={showNotifications}>Показать больше</button>
        }
        </>
        :
        <p className='table__text table__text_type_empty table__text_margin_left'>Объявления не найдены.</p>
      }

      </div>   
    </Accordion>
    {
      isOpenInfoPopup &&
      <PersonAnnouncementInfoPopup
        isOpen={isOpenInfoPopup}
        onClose={closePopups}
      />
    }
    </>
  );
}

export default PersonAnnouncement;  