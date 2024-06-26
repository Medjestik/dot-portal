import React from 'react';
import * as personApi from '../../../utils/personApi';
import Preloader from '../../Preloader/Preloader.js';
import PersonArea from '../PersonArea/PersonArea.js';
import PersonAreaLaptop from '../PersonArea/PersonAreaLaptop/PersonAreaLaptop.js';
import PersonAreaMobile from '../PersonArea/PersonAreaMobile/PersonAreaMobile.js';
import PersonData from '../PersonData/PersonData.js';
import PersonAdministration from '../PersonAdministration/PersonAdministration.js';
import PersonEducation from '../PersonEducation/PersonEducation.js';
import PersonAnnouncement from '../PersonAnnouncement/PersonAnnouncement.js';
import PersonNotification from '../PersonNotification/PersonNotification.js';
import PersonCommunication from '../PersonCommunication/PersonCommunication.js';
import PersonWebinar from '../PersonWebinar/PersonWebinar.js';
import PersonDiploma from '../PersonDiploma/PersonDiploma.js';
import StudentViewAdvertisementPopup from '../../Education/EducationPopup/StudentViewAdvertisementPopup/StudentViewAdvertisementPopup.js';

function PersonUser({ windowWidth, currentUser, openPhotoPopup, openChangePasswordPopup, openDataPopup, userNotifications, currentNotification, countNewNotification, openNotificationPopup }) {

  /*const user = {
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

  */

  const [studentData, setStudentData] = React.useState({});
  const [studentEducationInfo, setStudentEducationInfo] = React.useState({});
  const [studentSocial, setStudentSocial] = React.useState({});
  const [studentDiploma, setStudentDiploma] = React.useState({});
  const [personWebinarsPlanned, setPersonWebinarsPlanned] = React.useState([]);
  const [personWebinarsCompleted, setPersonWebinarsCompleted] = React.useState([]);

  const [personAdvertisements, setPersonAdvertisements] = React.useState([]);
  const [currentAdvertisement, setCurrentAdvertisement] = React.useState({});
  const [isOpenViewAdvertisementPopup, setIsOpenViewAdvertisementPopup] = React.useState(false);

  const [isLoadingPage, setIsLoadingPage] = React.useState(true);
  const [isLoadingSocialRequest, setIsLoadingSocialRequest] = React.useState({ isShow: false, type: '' });

  const [isLoadingDiploma, setIsLoadingDiploma] = React.useState('initial');

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

  function handleUploadDiploma(work) {
    const token = localStorage.getItem('token');
    setIsLoadingDiploma('loading');
    const data = { work: work, vkr_id: studentDiploma.vkr_id };
    personApi.uploadDiploma({ token, data })
      .then((res) => {
        setStudentDiploma({ ...studentDiploma, uploads: [...studentDiploma.uploads, res] });
        setIsLoadingDiploma('success');
      })
      .catch((err) => {
        console.log(err);
        setIsLoadingDiploma('error');
      });
  }

  function getData(id) {
    setIsLoadingPage(true);
    const token = localStorage.getItem('token');
    Promise.all([
      personApi.getStudentData({ token: token, userId: id }),
      personApi.getStudentEducationInfo({ token: token, userId: id }),
      personApi.getStudentSocial({ token: token, userId: id }),
      personApi.getPersonWebinarPlanned({ token: token, }),
      personApi.getPersonWebinarCompleted({ token: token, }),
      personApi.getPersonAnnouncement({ token: token, }),
      personApi.getStudentDiploma({ token: token, }),
    ])
    .then(([studentData, studentEducationInfo, studentSocial, studentWebinarsPlanned, studentWebinarsCompleted, studentAdvertisements, studentDiploma]) => {
      console.log('StudentWebinars', studentDiploma);
      setStudentData(studentData);
      setStudentEducationInfo(studentEducationInfo);
      setStudentSocial(studentSocial);
      setPersonWebinarsPlanned(studentWebinarsPlanned);
      setPersonWebinarsCompleted(studentWebinarsCompleted);
      setPersonAdvertisements(studentAdvertisements);
      setStudentDiploma(studentDiploma);
    })
    .catch((err) => {
        console.error(err);
    })
    .finally(() => {
      setIsLoadingPage(false);
    });
  }

  function openPopup(data) {
    setCurrentAdvertisement(data);
    setIsOpenViewAdvertisementPopup(true);
  }

  function closePopup() {
    setIsOpenViewAdvertisementPopup(false);
  }
  
  React.useEffect(() => {

    getData(currentUser.id);

    return () => {
      setStudentData({});
      setStudentEducationInfo({});
      setStudentSocial({});
      setPersonWebinarsPlanned([]);
      setPersonWebinarsCompleted([]);
      setPersonAdvertisements([]);
      setCurrentAdvertisement({});
      setStudentDiploma({});
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
        <>
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
            openChangePasswordPopup={openChangePasswordPopup}
            openDataPopup={openDataPopup}
            />
            <PersonAdministration
              windowWidth={windowWidth}
              studentData={studentData}
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
              studentData={studentData}
              openChangePasswordPopup={openChangePasswordPopup}
              openDataPopup={openDataPopup}
            />
            <PersonAdministration
              windowWidth={windowWidth}
              studentData={studentData}
            />
            </>
          }
          
          <PersonEducation 
            studentEducationInfo={studentEducationInfo} 
            windowWidth={windowWidth} 
          />

          {
            studentDiploma.view_vkr &&
            <PersonDiploma
              windowWidth={windowWidth}
              diploma={studentDiploma}
              onUpload={handleUploadDiploma}
              isLoadingDiploma={isLoadingDiploma}
            />
          }

          
          <PersonWebinar 
            windowWidth={windowWidth}
            personWebinarsPlanned={personWebinarsPlanned}
            personWebinarsCompleted={personWebinarsCompleted}
          />

          <PersonAnnouncement 
            windowWidth={windowWidth} 
            userAnnouncement={personAdvertisements} 
            onOpen={openPopup} 
          />

          <PersonNotification 
            windowWidth={windowWidth} 
            userNotifications={userNotifications} 
            onOpen={openNotificationPopup} 
            currentNotification={currentNotification}
            countNewNotification={countNewNotification}
          />

          <PersonCommunication 
            windowWidth={windowWidth}
            studentSocial={studentSocial}
            onChange={handleChangeSocialLink}
            isLoading={isLoadingSocialRequest}
          />

          {
            isOpenViewAdvertisementPopup &&
            <StudentViewAdvertisementPopup 
              isOpen={isOpenViewAdvertisementPopup}
              onClose={closePopup}
              currentAdvertisementId={currentAdvertisement.id}
            />
          }

          {
            /*
            <PersonAchievement 
              user={user} 
              windowWidth={windowWidth} 
            />

            <PersonDocument 
              windowWidth={windowWidth} 
              userDocuments={userDocuments} 
              userCheck={userCheck} 
            />

            <PersonDeclaration 
              windowWidth={windowWidth} 
              userDeclaration={userDeclaration} 
              declarationTemplate={declarationTemplate} 
            />

            <PersonRating 
              scores={scores} 
              windowWidth={windowWidth} 
            />

            <PersonDiploma 
              windowWidth={windowWidth} 
            />
            */
          }
        </>
      }
    </>
  );
}

export default PersonUser; 