import React from 'react';
import './PersonTeacher.css';
import * as personApi from '../../../utils/personApi';
import Preloader from '../../Preloader/Preloader.js';
import PersonTeacherArea from '../PersonTeacherArea/PersonTeacherArea.js';
import PersonNotification from '../PersonNotification/PersonNotification.js';
import PersonWebinar from '../PersonWebinar/PersonWebinar.js';

function PersonTeacher({ windowWidth, currentUser, openPhotoPopup, openChangePasswordPopup, openDataPopup, userNotifications, currentNotification, countNewNotification, openNotificationPopup }) {

  const [isLoadingPage, setIsLoadingPage] = React.useState(true);

  const [personWebinarsPlanned, setPersonWebinarsPlanned] = React.useState([]);
  const [personWebinarsCompleted, setPersonWebinarsCompleted] = React.useState([]);

  function getData(id) {
    setIsLoadingPage(true);
    const token = localStorage.getItem('token');
    Promise.all([
      personApi.getPersonWebinarPlanned({ token: token, }),
      personApi.getPersonWebinarCompleted({ token: token, }),
    ])
    .then(([studentWebinarsPlanned, studentWebinarsCompleted]) => {
      setPersonWebinarsPlanned(studentWebinarsPlanned);
      setPersonWebinarsCompleted(studentWebinarsCompleted);
    })
    .catch((err) => {
        console.error(err);
    })
    .finally(() => {
      setIsLoadingPage(false);
    });
  }

  React.useEffect(() => {
    getData(currentUser.id);
    return () => {
      setPersonWebinarsPlanned([]);
      setPersonWebinarsCompleted([]);
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
      <>
      <PersonTeacherArea
        currentUser={currentUser}
        openPhotoPopup={openPhotoPopup}
        openChangePasswordPopup={openChangePasswordPopup}
        openDataPopup={openDataPopup} 
      />
      <PersonNotification
        windowWidth={windowWidth}
        userNotifications={userNotifications}
        currentNotification={currentNotification}
        countNewNotification={countNewNotification}
        onOpen={openNotificationPopup}
      />
      <PersonWebinar 
        windowWidth={windowWidth}
        personWebinarsPlanned={personWebinarsPlanned}
        personWebinarsCompleted={personWebinarsCompleted}
      />
      </>
    }
    </>
  );
}

export default PersonTeacher; 