import React from 'react';
import './Person.css';
import { CurrentUserContext } from '../../contexts/CurrentUserContext.js';
import * as api from '../../utils/api.js';
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


function Person({ studentData, windowWidth, onChangeUserPhoto,onChangeUserData }) {

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

  const userEducation = [
    { course: 2, semester: 1, over: 2, credit: 7, status: 'current' },
    { course: 1, semester: 2, over: 6, credit: 2, status: 'over' },
    { course: 1, semester: 1, over: 8, credit: 0, status: 'over' },
  ];

  const userNotifications = [
    { unreadNotification: true, date: '00.00.00 00:00', text: 'Новая оценка по текущему контролю «__» по дисциплине «__»' },
    { unreadNotification: true, date: '00.00.00 00:00', text: 'Не подгружен чек об оплате обучения' },
    { unreadNotification: false, date: '00.00.00 00:00', text: 'Поздравляем, Вами успешно завершен «__» курс «__» семестр' },
    { unreadNotification: false, date: '00.00.00 00:00', text: 'Новый комментарий от преподавателя «__» по дисциплине «__» Новый комментарий от преподавателя «__» по дисциплине «__» Новый комментарий от преподавателя «__» по дисциплине «__»' },
    { unreadNotification: false, date: '00.00.00 00:00', text: 'Новый комментарий от преподавателя «__» по дисциплине «__»' },
    { unreadNotification: false, date: '00.00.00 00:00', text: 'Новый комментарий от преподавателя «__» по дисциплине «__»' },
    { unreadNotification: false, date: '00.00.00 00:00', text: 'Новый комментарий от преподавателя «__» по дисциплине «__»' },
    { unreadNotification: false, date: '00.00.00 00:00', text: 'Новый комментарий от преподавателя «__» по дисциплине «__»' },
  ]

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

  const userSocialClassmates = [
    { name: 'Леонова Анна', vk: '', inst: '_leo_ann_', telegram: '', },
    { name: 'Иванов Иван', vk: 'vk.com/id111111', inst: '', telegram: '', },
    { name: 'Леонова Анна', vk: '', inst: '_leo_ann_', telegram: '', },
    { name: 'Иванов Иван', vk: 'vk.com/id111111', inst: '', telegram: '', },
    { name: 'Леонова Анна', vk: '', inst: '_leo_ann_', telegram: '', },
    { name: 'Иванов Иван', vk: 'vk.com/id111111', inst: '', telegram: '', },
  ]

  const scores = [
    { text: 'Иванова Елена Ивановна', count: '5', },
    { text: 'Иванова Елена Ивановна', count: '4', },
    { text: 'Иванова Елена Ивановна', count: '2', },
    { text: 'Иванова Елена Ивановна', count: '5', },
    { text: 'Иванова Елена Ивановна', count: '3', },
    { text: 'Иванова Елена Ивановна', count: '1', },
    { text: 'Иванова Елена Ивановна', count: '4', },
    { text: 'Иванова Елена Ивановна', count: '5', },
    { text: 'Иванова Елена Ивановна Иванова Елена Ивановна', count: '1', },
  ]

  const [isPhotoPopupOpen, setIsPhotoPopupOpen] = React.useState(false);
  const [isChangePasswordPopupOpen, setIsChangePasswordPopupOpen] = React.useState(false); 
  const [isDataPopupOpen, setIsDataPopupOpen] = React.useState(false);
  const [isLoadingRequest, setIsLoadingRequest] = React.useState(false);
  const [isShowRequestError, setIsShowRequestError] = React.useState({ isShow: false, text: '' });

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

  function handleChangePassword(oldPassword, newPassword) {
    setIsShowRequestError({ isShow: false, text: '' });
    setIsLoadingRequest(true);
    const userId = currentUser.id;
    const token = localStorage.getItem('token');

    api.changePassword({ token, userId, oldPassword, newPassword })
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

    api.changePhoto({ token, userId, name, file })
      .then((res) => {
        onChangeUserPhoto(res.avatar);
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

    api.changeData({ token, userId, data })
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

  function closePersonAreaPopup() {
    setIsShowRequestError({ isShow: false, text: '' });
    setIsPhotoPopupOpen(false);
    setIsChangePasswordPopupOpen(false);
    setIsDataPopupOpen(false);
  }
  
  React.useEffect(() => {
    setIsPhotoPopupOpen(false);
    setIsChangePasswordPopupOpen(false);
    setIsDataPopupOpen(false);
  },[]);

  return (
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
      
      <PersonEducation user={user} userEducation={userEducation} windowWidth={windowWidth} />
      <PersonAchievement user={user} windowWidth={windowWidth} />
      <PersonDocument user={user} windowWidth={windowWidth} userDocuments={userDocuments} userCheck={userCheck} />
      <PersonDeclaration user={user} windowWidth={windowWidth} userDeclaration={userDeclaration} declarationTemplate={declarationTemplate} />
      <PersonNotification user={user} userNotifications={userNotifications} windowWidth={windowWidth} />
      <PersonRating scores={scores} windowWidth={windowWidth} />
      <PersonCommunication userSocialClassmates={userSocialClassmates} windowWidth={windowWidth} />
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
    </div>
  );
}

export default Person; 