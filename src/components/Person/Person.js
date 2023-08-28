import React from 'react';
import './Person.css';
import { CurrentUserContext } from '../../contexts/CurrentUserContext.js';
import * as personApi from '../../utils/personApi';
import Preloader from '../Preloader/Preloader.js';
import PersonUser from './PersonUser/PersonUser.js';
import PersonTeacher from './PersonTeacher/PersonTeacher.js';
import PersonPhotoPopup from './PersonPopup/PersonPhotoPopup/PersonAreaPhotoPopup.js';
import PersonChangePasswordPopup from './PersonPopup/PersonChangePasswordPopup/PersonAreaChangePasswordPopup.js';
import PersonAreaDataPopup from './PersonPopup/PersonDataPopup/PersonAreaDataPopup.js';
import NotificationPopup from '../Popup/NotificationPopup/NotificationPopup.js';

function Person({ windowWidth, onChangeUserPhoto, onChangeUserData }) {

  const currentUser = React.useContext(CurrentUserContext);

  const [isPhotoPopupOpen, setIsPhotoPopupOpen] = React.useState(false);
  const [isChangePasswordPopupOpen, setIsChangePasswordPopupOpen] = React.useState(false); 
  const [isDataPopupOpen, setIsDataPopupOpen] = React.useState(false);
  const [isNotificationPopupOpen, setIsNotificationPopupOpen] = React.useState(false);

  const [userNotifications, setUserNotifications] = React.useState([]);
  const [countNewNotification, setCountNewNotification] = React.useState(0);
  const [currentNotification, setCurrentNotification] = React.useState({});
  const [isLoadingNotificationData, setIsLoadingNotificationData] = React.useState(false);

  const [isLoadingPage, setIsLoadingPage] = React.useState(true);
  const [isLoadingRequest, setIsLoadingRequest] = React.useState(false);
  const [isShowRequestError, setIsShowRequestError] = React.useState({ isShow: false, text: '' });

  function openPhotoPopup() {
    setIsPhotoPopupOpen(true);
  }

  function openChangePasswordPopup() {
    setIsChangePasswordPopupOpen(true);
  }

  function openDataPopup() {
    setIsDataPopupOpen(true);
  }

  function closePersonAreaPopup() {
    setIsShowRequestError({ isShow: false, text: '' });
    setIsPhotoPopupOpen(false);
    setIsChangePasswordPopupOpen(false);
    setIsDataPopupOpen(false);
  }

  function handleChangePassword(oldPassword, newPassword) {
    setIsShowRequestError({ isShow: false, text: '' });
    setIsLoadingRequest(true);
    const userId = currentUser.id;
    const token = localStorage.getItem('token');

    personApi.changePassword({ token, userId, oldPassword, newPassword })
      .then((res) => {
        localStorage.setItem('token', res.token);
        closePersonAreaPopup();
      })
      .catch((err) => {
        console.log(err);
        setIsShowRequestError({ isShow: true, text: 'Неправильно введен текущий пароль. Повторите попытку!' })
      })
      .finally(() => {
        setIsLoadingRequest(false);
      });
  }

  function handleChangePhoto(name, file) {
    setIsShowRequestError({ isShow: false, text: '' });
    setIsLoadingRequest(true);
    const userId = currentUser.id;
    const token = localStorage.getItem('token');

    personApi.changePhoto({ token, userId, name, file })
      .then((res) => {
        if (res) {
          onChangeUserPhoto(res.avatar);
        } else {
          onChangeUserPhoto({ name: '', link: '' });
        }
        closePersonAreaPopup();
      })
      .catch((err) => {
        console.log(err);
        setIsShowRequestError({ isShow: true, text: 'К сожалению, произошла ошибка!' })
      })
      .finally(() => {
        setIsLoadingRequest(false);
      });
  }

  function handleChangeData(data) {
    setIsShowRequestError({ isShow: false, text: '' });
    setIsLoadingRequest(true);
    const userId = currentUser.id;
    const token = localStorage.getItem('token');

    personApi.changeData({ token, userId, data })
      .then((res) => {
        onChangeUserData(res);
        closePersonAreaPopup();
      })
      .catch((err) => {
        console.log(err);
        setIsShowRequestError({ isShow: true, text: 'К сожалению, произошла ошибка!' })
      })
      .finally(() => {
        setIsLoadingRequest(false);
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

  function getData(id) {
    setIsLoadingPage(true);
    const token = localStorage.getItem('token');
    Promise.all([
      personApi.getUserNotifications({ token: token }),
    ])
    .then(([userNotifications]) => {
      console.log('UserNotifications', userNotifications);
      setUserNotifications(userNotifications);
      const count = userNotifications.reduce((total, current) => {
        if (!current.viewed) {
          total = total + 1;
        }
        return total;
      }, 0);
      setCountNewNotification(count);
    })
    .catch((err) => {
        console.error(err);
    })
    .finally(() => {
      setIsLoadingPage(false);
    });
  }

  React.useEffect(() => {
    if (JSON.stringify(currentNotification) !== '{}') {
      const notification = userNotifications.find((elem) => (elem.id === currentNotification.notification_id));
      if (!notification.viewed) {
        setCountNewNotification(countNewNotification - 1);
      }
    }
    // eslint-disable-next-line
  }, [currentNotification]);

  React.useEffect(() => {
    setIsPhotoPopupOpen(false);
    setIsChangePasswordPopupOpen(false);
    setIsDataPopupOpen(false);

    getData(currentUser.id);

    return () => {
      setUserNotifications([]);
      setCurrentNotification({});
      setCountNewNotification(0);
    }
  // eslint-disable-next-line
  }, []);

  return (
    <>
      {
        isLoadingPage 
        ?
        <Preloader />
        :
        <div className='person'>

          {
            currentUser.access_role === 'dot' 
            ?
            <PersonUser
              windowWidth={windowWidth}
              currentUser={currentUser}
              openPhotoPopup={openPhotoPopup}
              openChangePasswordPopup={openChangePasswordPopup}
              openDataPopup={openDataPopup}
              userNotifications={userNotifications}
              currentNotification={currentNotification}
              countNewNotification={countNewNotification}
              openNotificationPopup={handleOpenNotificationPopup}
            />
            :
            <PersonTeacher
              windowWidth={windowWidth}
              currentUser={currentUser}
              openPhotoPopup={openPhotoPopup}
              openChangePasswordPopup={openChangePasswordPopup}
              openDataPopup={openDataPopup}
              userNotifications={userNotifications}
              currentNotification={currentNotification}
              openNotificationPopup={handleOpenNotificationPopup}
            />
          }
          {
            isPhotoPopupOpen &&
            <PersonPhotoPopup
              isOpen={isPhotoPopupOpen}
              onClose={closePersonAreaPopup}
              currentUser={currentUser}
              onChangePhoto={handleChangePhoto}
              isLoadingRequest={isLoadingRequest}
              isShowRequestError={isShowRequestError}
            />
          }
          {
            isChangePasswordPopupOpen &&
            <PersonChangePasswordPopup
              isOpen={isChangePasswordPopupOpen}
              onClose={closePersonAreaPopup}
              onChangePassword={handleChangePassword}
              isLoadingRequest={isLoadingRequest}
              isShowRequestError={isShowRequestError}
            />
          }
          {
            isDataPopupOpen &&
            <PersonAreaDataPopup
              isOpen={isDataPopupOpen}
              onClose={closePersonAreaPopup}
              currentUser={currentUser}
              onChangeData={handleChangeData}
              isLoadingRequest={isLoadingRequest}
              isShowRequestError={isShowRequestError}
            />
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
      }
    </>
  );
}

export default Person; 