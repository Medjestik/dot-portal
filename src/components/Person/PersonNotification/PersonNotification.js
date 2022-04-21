import React from 'react';
import './PersonNotification.css';
import Accordion from '../../Accordion/Accordion.js';
import PersonNotificationInfoPopup from './PersonNotificationInfoPopup/PersonNotificationInfoPopup.js';
import CommentOfTeacherPopup from '../../Popup/CommentOfTeacherPopup/CommentOfTeacherPopup.js';
import notificationIcon from '../../../images/accordion/accordion-notification.svg';

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
              <li onClick={() => openTeacherCommentPopup(item)} key={i} className={`notification__item ${item.unreadNotification ? 'notification__item_type_unread' : ''}`}>
                <div className='notification__img'>
                  <div className='notification__icon'></div>
                </div>
                <div className='notification__info'>
                  <span className='notification__date'>{item.date}</span>
                  <p className='notification__text'>{item.text}</p>
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