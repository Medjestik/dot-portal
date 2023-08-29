import React from 'react';
import './PersonNotification.css';
import Accordion from '../../Accordion/Accordion.js';
import PersonNotificationInfoPopup from './PersonNotificationInfoPopup/PersonNotificationInfoPopup.js';
import notificationIcon from '../../../images/accordion/accordion-notification.svg';

function PersonNotification({ windowWidth, userNotifications, onOpen, currentNotification, countNewNotification }) {

  const [isOpenInfoPopup, setIsOpenInfoPopup] = React.useState(false);

  const [sectionHeight, setSectionHeight] = React.useState(0);
  const heightRef = React.createRef();

  const [numberStep, setNumberStep] = React.useState(5);

  function openInfoPopup() {
    setIsOpenInfoPopup(true);
  }

  function closePopups() {
    setIsOpenInfoPopup(false);
  }

  function showNotifications() {
    setNumberStep(numberStep + 5);
  }

  function renderNotifications(item, i) {
    return (
      <li 
      onClick={() => onOpen(item.id)} 
      key={i} 
      className={`notification__item ${item.viewed ? '' : 'notification__item_type_unread'}`}
      >
        <div className='notification__img'>
          <div className='notification__icon'></div>
        </div>
        <div className={`notification__info ${userNotifications.length > 4 ? '' : 'notification__info_type_short'}`}>
          <span className='notification__date'>{item.date}</span>
          <p className='notification__text'>{item.title}</p>
        </div>
      </li>
    )
  }



  React.useEffect(() => {
    setSectionHeight(heightRef.current.clientHeight);
  }, [heightRef, windowWidth]);
  
  React.useEffect(() => {
    setIsOpenInfoPopup(false);
    setNumberStep(5);
    return(() => {
    })
  },[]);

  return (
    <>
    <Accordion icon={notificationIcon} name='Уведомления' height={sectionHeight} openInfoPopup={openInfoPopup} addInfo={{ count: countNewNotification }}>
      <div ref={heightRef} className='person-notification__container'>
      {
        windowWidth <= 833 
        ?
        <>
        <ul className='person-notification__list'>
          {
            userNotifications.slice(0, numberStep).map((item, i) => (
              renderNotifications(item, i)
            ))
          }
        </ul>
        {
          (userNotifications.length > numberStep) &&
          <button className='btn-more btn-more_type_show' onClick={showNotifications}>Показать больше</button>
        }
        </>
        :
        <ul className='scroll person-notification__list'>
          {
            userNotifications.map((item, i) => (
              renderNotifications(item, i)
            ))
          }
        </ul>
      }

      </div>   
    </Accordion>
    {
      isOpenInfoPopup &&
      <PersonNotificationInfoPopup
        isOpen={isOpenInfoPopup}
        onClose={closePopups}
      />
    }
    </>
  );
}

export default PersonNotification; 