import React from 'react';
import './Person.css';
import { CurrentUserContext } from '../../contexts/CurrentUserContext.js';
import * as personApi from '../../utils/personApi';
import Preloader from '../Preloader/Preloader.js';
import PersonArea from './PersonArea/PersonArea.js';
import PersonAreaLaptop from './PersonArea/PersonAreaLaptop/PersonAreaLaptop.js';
import PersonAreaMobile from './PersonArea/PersonAreaMobile/PersonAreaMobile.js';
import PersonData from './PersonData/PersonData.js';
import PersonAdministration from './PersonAdministration/PersonAdministration.js';
import PersonEducation from './PersonEducation/PersonEducation.js';
import PersonAchievement from './PersonAchievement/PersonAchievement.js';
import PersonDocument from './PersonDocument/PersonDocument.js';
import PersonDeclaration from './PersonDeclaration/PersonDeclaration.js';
import PersonNotification from './PersonNotification/PersonNotification.js';
import PersonRating from './PersonRating/PersonRating.js';
import PersonCommunication from './PersonCommunication/PersonCommunication.js';
import PersonDiploma from './PersonDiploma/PersonDiploma.js';
import PersonPhotoPopup from './PersonPopup/PersonPhotoPopup/PersonAreaPhotoPopup.js';
import PersonChangePasswordPopup from './PersonPopup/PersonChangePasswordPopup/PersonAreaChangePasswordPopup.js';
import PersonAreaDataPopup from './PersonPopup/PersonDataPopup/PersonAreaDataPopup.js';
import NotificationPopup from '../Popup/NotificationPopup/NotificationPopup.js';


function Person({ windowWidth, onChangeUserPhoto, onChangeUserData }) {

  const user = {
    photo: '',
    name: 'Костюлин Иван Алексеевич',
    educationLevel: 'Бакалавр',
    date: "00.00.0000",
    inn: "000-000-000 00",
    phone: "+7 (000) 000-00-00",
    mail: "0000000000000@000000.ru",
    curatorPhoto: "",
    curatorName: "Иванова Елена Алексеевна",
    curatorPhone: "+7 (000) 000-00-00",
    curatorMail: "0000000000000@000000.ru",
    adminPhoto: "",
    adminName: "Соловьев Андрей Дмитриевич",
    adminPhone: "+7 (000) 000-00-00",
    adminMail: "0000000000000@000000.ru",
    programDirection: "Экономика",
    programProfile: "Экономика предприятий и организаций еще что-то там",
    group: "ЭМОд-111",
    course: "3",
    semester: "2",
    educationStatus: 100,
    groupRating: 1,
    mainRating: 2,
    achievements: ['Сессия без троек', 'Нет хвостов', 'Номер один в группе'],
    achievementsClassmates: ['Иванов Иван', 'Петров Иван', 'Костюлин Иван',],
  }

  const userDocuments = [
    { name: 'Договор', link: '123', status: 'active', },
    { name: 'Дополнительное соглашение', link: '123', status: 'active', },
    { name: 'Приказ о переводе', link: '', status: 'inactive', },
    { name: 'Дополнительное соглашение', link: '', status: 'inactive', },
    { name: 'Приказ о переводе', link: '', status: 'inactive', }, 
  ]

  const userCheck = [
    { name: '1 семестр', count: '000 000 р', date: '00.00.00 00:00', upload: true, },
    { name: '2 семестр', count: '000 000 р', date: '', upload: false, },
    { name: '3 семестр',  count: '000 000 р', date: '', upload: false, },
    { name: '4 семестр', count: '000 000 р', date: '', upload: false, },
  ]

  const userDeclaration = [
    { name: 'Договор', link: '123', status: 'active', },
    { name: 'Дополнительное соглашение', link: '123', status: 'active', },
    { name: 'Приказ о переводе', link: '', status: 'inactive', },
    { name: 'Дополнительное соглашение', link: '', status: 'inactive', },
    { name: 'Приказ о переводе', link: '', status: 'inactive', },
  ]

  const declarationTemplate = [
    { name: 'Шаблон 1', upload: true, },
    { name: 'Шаблон 2', upload: true, },
    { name: 'Шаблон 3', upload: true, },
    { name: 'Шаблон 4', upload: true, },
  ]

  const scores = [
    { text: 'Иванова Елена Ивановна', count: '5', },
    { text: 'Иванова Елена Ивановна', count: '4', },
    { text: 'Иванова Елена Ивановна', count: '4', },
    { text: 'Иванова Елена Ивановна', count: '5', },
    { text: 'Иванова Елена Ивановна Иванова Елена Ивановна', count: '1', },
  ]

  const [studentData, setStudentData] = React.useState({});
  const [studentEducationInfo, setStudentEducationInfo] = React.useState({});
  const [studentSocial, setStudentSocial] = React.useState({});
  const [userNotifications, setUserNotifications] = React.useState([]);
  const [currentNotification, setCurrentNotification] = React.useState({});
  const [isLoadingNotificationData, setIsLoadingNotificationData] = React.useState(false);

  const [isLoadingPage, setIsLoadingPage] = React.useState(true);
  
  const [isPhotoPopupOpen, setIsPhotoPopupOpen] = React.useState(false);
  const [isChangePasswordPopupOpen, setIsChangePasswordPopupOpen] = React.useState(false); 
  const [isDataPopupOpen, setIsDataPopupOpen] = React.useState(false);
  const [isNotificationPopupOpen, setIsNotificationPopupOpen] = React.useState(false);

  const [isLoadingRequest, setIsLoadingRequest] = React.useState(false);
  const [isShowRequestError, setIsShowRequestError] = React.useState({ isShow: false, text: '' });
  const [isLoadingSocialRequest, setIsLoadingSocialRequest] = React.useState({ isShow: false, type: '' });

  const currentUser = React.useContext(CurrentUserContext);

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

  function handleChangeSocialLink(link, type) {
    const userId = currentUser.id;
    const token = localStorage.getItem('token');
    let social = {};
    if (type === 'vk') {
      social = { ...studentSocial.student, vk: link };
      setIsLoadingSocialRequest({ isShow: true, type: 'vk' });
    } else if (type === 'instagram') {
      social = { ...studentSocial.student, instagram: link };
      setIsLoadingSocialRequest({ isShow: true, type: 'instagram' });
    } else {
      social = { ...studentSocial.student, telegram: link };
      setIsLoadingSocialRequest({ isShow: true, type: 'telegram' });
    }
    personApi.changeStudentSocial({ token, userId, social })
      .then((res) => {
        setStudentSocial({ ...studentSocial, student: res });
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setIsLoadingSocialRequest({ isShow: false, type: '' });
      });
  }

  function getData(id) {
    setIsLoadingPage(true);
    const token = localStorage.getItem('token');
    Promise.all([
      personApi.getStudentData({ token: token, userId: id }),
      personApi.getStudentEducationInfo({ token: token, userId: id }),
      personApi.getStudentSocial({ token: token, userId: id }), 
      personApi.getUserNotifications({ token: token }),
    ])
    .then(([studentData, studentEducationInfo, studentSocial, userNotifications]) => {
      console.log('StudentData', studentData);
      console.log('StudentEducationInfo', studentEducationInfo);
      console.log('StudentSocial', studentSocial);
      console.log('UserNotifications', userNotifications);
      setStudentData(studentData);
      setStudentEducationInfo(studentEducationInfo);
      setStudentSocial(studentSocial);
      setUserNotifications(userNotifications);
    })
    .catch((err) => {
        console.error(err);
    })
    .finally(() => {
      setIsLoadingPage(false);
    });
  }
  
  React.useEffect(() => {
    setIsPhotoPopupOpen(false);
    setIsChangePasswordPopupOpen(false);
    setIsDataPopupOpen(false);

    if (currentUser.access_role === 'user') {
      getData(currentUser.id);
    }
    return () => {
      setStudentData({});
      setStudentEducationInfo({});
      setStudentSocial({});
      setUserNotifications([]);
      setIsLoadingSocialRequest({ isShow: false, type: '' }); 
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
            windowWidth > 1439 &&
            <PersonArea 
            currentUser={currentUser}
            studentData={studentData}
            openPhotoPopup={openPhotoPopup}
            openChangePasswordPopup={openChangePasswordPopup}
            openDataPopup={openDataPopup}
            />
          }
          {
            (windowWidth <= 1439) && (windowWidth > 833) &&
            <>
            <PersonAreaLaptop
            currentUser={currentUser}
            studentData={studentData}
            openPhotoPopup={openPhotoPopup}
            />
            <PersonData
            windowWidth={windowWidth}
            currentUser={currentUser}
            openChangePasswordPopup={openChangePasswordPopup} 
            openDataPopup={openDataPopup}
            />
            </>
          }
          {
            windowWidth <= 833 &&
            <>
            <PersonAreaMobile
            currentUser={currentUser}
            studentData={studentData}
            openPhotoPopup={openPhotoPopup}
            />
            <PersonData
            windowWidth={windowWidth}
            currentUser={currentUser}
            openChangePasswordPopup={openChangePasswordPopup}
            openDataPopup={openDataPopup}
            />
            <PersonAdministration
            windowWidth={windowWidth}
            studentData={studentData}
            />
            </>
          }
          
          <PersonEducation studentEducationInfo={studentEducationInfo} windowWidth={windowWidth} />
          <PersonAchievement user={user} windowWidth={windowWidth} />
          <PersonDocument windowWidth={windowWidth} userDocuments={userDocuments} userCheck={userCheck} />
          <PersonDeclaration windowWidth={windowWidth} userDeclaration={userDeclaration} declarationTemplate={declarationTemplate} />
          <PersonNotification
          windowWidth={windowWidth}
          userNotifications={userNotifications}
          onOpen={handleOpenNotificationPopup}
          currentNotification={currentNotification}
          />
          <PersonRating scores={scores} windowWidth={windowWidth} />
          <PersonCommunication 
          windowWidth={windowWidth}
          studentSocial={studentSocial}
          onChange={handleChangeSocialLink}
          isLoading={isLoadingSocialRequest}
          />
          {
            //<PersonDiploma windowWidth={windowWidth} />
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