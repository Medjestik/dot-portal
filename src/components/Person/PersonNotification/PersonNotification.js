import React from 'react';
import './PersonNotification.css';
import Accordion from '../../Accordion/Accordion.js';
import notificationIcon from '../../../images/accordion/accordion-notification.png';
import PersonNotificationInfoPopup from './PersonNotificationInfoPopup/PersonNotificationInfoPopup.js';
import CommentOfTeacherPopup from '../../Popup/CommentOfTeacherPopup/CommentOfTeacherPopup.js';

function PersonNotification({ user, userNotifications }) {

  const [isOpenInfoPopup, setIsOpenInfoPopup] = React.useState(false);
  const [isOpenTeacherCommentPopup, setIsOpenTeacherCommentPopup] = React.useState(false);
  const [currentNotification, setCurrentNotification] = React.useState({});

  function openInfoPopup() {
    setIsOpenInfoPopup(true);
  }

  function openTeacherCommentPopup(notification) {
    setIsOpenTeacherCommentPopup(true);
    setCurrentNotification(notification);
    console.log(notification)
  }

  function closePopups() {
    setIsOpenInfoPopup(false);
    setIsOpenTeacherCommentPopup(false);
  }
  
  React.useEffect(() => {
    setIsOpenInfoPopup(false);
    setIsOpenTeacherCommentPopup(false);

    return(() => {
      setCurrentNotification({});
    })
  },[]);

  return (
    <>
    <Accordion icon={notificationIcon} name='Уведомления' height={336} openInfoPopup={openInfoPopup}>
      <div className='person-notification__container'>
        <ul className='scroll person-notification__list'>
          {
            userNotifications.map((item, i) => (
              <li onClick={() => openTeacherCommentPopup(item)} key={i} className={`person-notification__item ${item.unreadNotification ? 'person-notification__item_type_unread' : ''}`}>
                <div className='person-notification__img'>
                  <div className='person-notification__icon'></div>
                </div>
                <div className='person-notification__info'>
                  <span className='person-notification__date'>{item.date}</span>
                  <p className='person-notification__text'>{item.text}</p>
                </div>
              </li>
            ))
          }
        </ul>
      </div>   
    </Accordion>
    {
      isOpenInfoPopup &&
      <PersonNotificationInfoPopup
        isOpen={isOpenInfoPopup}
        onClose={closePopups}
      />
    }
    {
      isOpenTeacherCommentPopup &&
      <CommentOfTeacherPopup
      isOpen={isOpenTeacherCommentPopup}
      onClose={closePopups}
      comment={currentNotification}
      />
    }
    </>
  );
}

export default PersonNotification; 