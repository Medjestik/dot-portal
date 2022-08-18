import React from 'react';
import './PersonTeacher.css';
import PersonTeacherArea from '../PersonTeacherArea/PersonTeacherArea.js';
import PersonNotification from '../PersonNotification/PersonNotification.js';

function PersonTeacher({ windowWidth, currentUser, openPhotoPopup, openChangePasswordPopup, openDataPopup, userNotifications, currentNotification, openNotificationPopup }) {

  React.useEffect(() => {

    return () => {

    }
  // eslint-disable-next-line
  }, []);

  console.log(currentUser)

  return (
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
        onOpen={openNotificationPopup}
      />
    </>
  );
}

export default PersonTeacher; 