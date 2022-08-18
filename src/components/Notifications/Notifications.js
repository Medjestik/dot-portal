import React from 'react';
import './Notifications.css';
import * as personApi from '../../utils/personApi';
import { Route, Routes } from 'react-router-dom';
import Preloader from '../Preloader/Preloader.js';
import SectionTabs from '../Section/SectionTabs/SectionTabs.js';
import SemesterHeader from '../Education/SemesterHeader/SemesterHeader.js';
import SemesterHeaderBtnBack from '../Education/SemesterHeader/SemesterHeaderBtnBack/SemesterHeaderBtnBack.js';
import NotificationPopup from '../Popup/NotificationPopup/NotificationPopup.js';
import { types } from './NotificationsTypes/NotificationsTypes.js';

function Notifications({ windowWidth, onLogout }) {

  const [userNotifications, setUserNotifications] = React.useState([]);
  const [currentNotification, setCurrentNotification] = React.useState({});
  const [isLoadingNotificationData, setIsLoadingNotificationData] = React.useState(false);

  const [isNotificationPopupOpen, setIsNotificationPopupOpen] = React.useState(false);
  
  const [isLoadingPage, setIsLoadingPage] = React.useState(true);

  const containerHeightRef = React.createRef();
  const [tableHeight, setTableHeight] = React.useState(0);

  React.useEffect(() => {
    if (!isLoadingPage) {
      setTableHeight(containerHeightRef.current.clientHeight);
    }
  }, [windowWidth, isLoadingPage, containerHeightRef]);

  const tableStyle = {
    height: tableHeight,
  };

  function getNotifications() {
    setIsLoadingPage(true);
    const token = localStorage.getItem('token');
    personApi.getUserNotifications({ token: token })
    .then((res) => {
      console.log('UserNotifications', res);
      setUserNotifications(res)
    })
    .catch((err) => {
        console.error(err);
    })
    .finally(() => {
      setIsLoadingPage(false);
    });
  }

  function handleOpenNotificationPopup(id) {
    setIsLoadingNotificationData(true);
    setIsNotificationPopupOpen(true);
    const token = localStorage.getItem('token');
    personApi.openUserNotification({ token: token, notificationId: id })
      .then((res) => {
        setCurrentNotification(res);
      })
      .catch((err) => {
        console.log(err);
        setIsNotificationPopupOpen(false);
        setIsLoadingNotificationData(false);
      })
      .finally(() => {
        setIsLoadingNotificationData(false);
      });
  }

  function handleCloseNotificationPopup() {
    const index = userNotifications.indexOf(userNotifications.find((elem) => (elem.id === currentNotification.notification_id)));
    if (index >= 0) {
      setUserNotifications([
        ...userNotifications.slice(0, index), 
        { ...userNotifications[index], viewed: true }, 
        ...userNotifications.slice(index + 1)
      ]);
    }
    setIsNotificationPopupOpen(false);
  }

  function renderNotifications(arr) {
    return (
      arr.length > 0 ?
        <ul style={Object.assign({}, tableStyle)} className='scroll notification__list'>
        {
          arr.map((item, i) => (
            <li 
            key={i} 
            className={`notification__item ${item.viewed ? '' : 'notification__item_type_unread'}`}
            onClick={() => handleOpenNotificationPopup(item.id)}
            >
              <div className='notification__img'>
                <div className='notification__icon'></div>
              </div>
              <div className='notification__info'>
                <span className='notification__date'>{item.date}</span>
                <p className='notification__text'>{item.title}</p>
              </div>
            </li>
          ))
        }
      </ul>
      :
      <span className='notification__caption_type_empty'>Уведомления данного типа отсутствуют!</span>
    )
  }
 
  React.useEffect(() => {
    getNotifications();
    return () => {
      setUserNotifications([]);
    }
  // eslint-disable-next-line
  }, []);

  return (
    <div className='notification'>

      <SemesterHeader onLogout={onLogout}>
        <SemesterHeaderBtnBack onBack={() => {}} isPerformFunction={false} />
      </SemesterHeader>

      {
        isLoadingPage ?
        <Preloader />
        :
        <SectionTabs type='small' tabs={types} >

          <div className='notification__container' ref={containerHeightRef} >

          <Routes>

            <Route exact path='/' element={ 
              renderNotifications(userNotifications.filter(elem => elem.type === 'tutor'))
            }
            >
            </Route>

            <Route exact path='/office' element={ 
              renderNotifications(userNotifications.filter(elem => elem.type === 'decanat'))
            }
            >
            </Route>

            <Route exact path='/system' element={ 
              renderNotifications(userNotifications.filter(elem => elem.type === 'system'))
            }
            >
            </Route>

            <Route exact path='/news' element={ 
              renderNotifications(userNotifications.filter(elem => elem.type === 'news'))
            }
            >
            </Route>

          </Routes>

          </div>
  
        </SectionTabs>
      }

      {
        isNotificationPopupOpen &&
        <NotificationPopup
        isOpen={isNotificationPopupOpen}
        onClose={handleCloseNotificationPopup}
        notification={currentNotification}
        isLoading={isLoadingNotificationData}
        />
      }

    </div>
  );
}

export default Notifications;