import React from 'react';
import './CuratorDiploma.css';
import { Route, Routes } from 'react-router-dom';
import * as curatorApi from '../../../utils/curatorApi.js';
import Preloader from '../../Preloader/Preloader';
import Tabs from '../../Tabs/Tabs';
import CuratorDiplomaCheck from './CuratorDiplomaCheck/CuratorDiplomaCheck';
import CuratorDiplomaSettings from './CuratorDiplomaSettings/CuratorDiplomaSettings.js';
import CuratorViewReportsPopup from '../CuratorPopup/CuratorViewReportsPopup/CuratorViewReportsPopup';
import UploadFilePopup from '../../Popup/UploadFilePopup/UploadFilePopup';

function CuratorDiploma({ windowWidth, groupInfo }) {

  const diplomaTabs = [
    { name: 'Выбор тем', location: 'theme', },
    { name: 'Проверка работ', location: 'check', },
    { name: 'Настройки', location: 'settings', },
  ];
  const path = '/curator/group/' + groupInfo.id + '/diploma';

  const [diploma, setDiploma] = React.useState({});
  const [currentStudent, setCurrentStudent] = React.useState({});

  const [isShowUploadFilePopup, setIsShowUploadFilePopup] = React.useState(false);
  const [isShowViewReportsPopup, setIsShowViewReportsPopup] = React.useState(false);

  const [isLoadingData, setIsLoadingData] = React.useState(true);
  const [isLoadingRequest, setIsLoadingRequest] = React.useState(false);
  const [isShowRequestError, setIsShowRequestError] = React.useState({ isShow: false, text: '' });

  function dataRequest() {
    setIsLoadingData(true);
    const token = localStorage.getItem('token');
    curatorApi.getGroupDiploma({ token: token,groupId: groupInfo.id })
    .then((res) => {
      console.log('Diploma', res);
      setDiploma(res);
    })
    .catch((err) => {
      console.error(err);
    })
    .finally(() => {  
      setIsLoadingData(false);
    });
  }

  function handleUploadFile(file) {
    setIsLoadingRequest(true);
    setIsShowRequestError({ isShow: false, text: '' });

    const data = {
      vkr_id: diploma.vkr_id,
      student_id: currentStudent.id,
      work: {
        file: file.file,
        fileName: file.fileName,
      }
    };

    const token = localStorage.getItem('token');
    curatorApi.addDiplomaFile({ token: token, data: data })
    .then((res) => {
      const updatedStudents = diploma.students.map((student) => {
        if (student.id === currentStudent.id) {
          return { ...student, uploads: [...student.uploads, res] };
        }
        return student;
      });
      setDiploma({ ...diploma, students: updatedStudents });
      closePopup();
    })
    .catch((err) => {
      setIsShowRequestError({ isShow: true, text: 'К сожалению, произошла ошибка!' });
      console.error(err);
    })
    .finally(() => {  
      setIsLoadingRequest(false);
    });
  }

  function handleEditDiplomaSettings(id, data) {
    setIsLoadingRequest(true);
    setIsShowRequestError({ isShow: false, text: '' });
    const token = localStorage.getItem('token');
    curatorApi.editDiplomaSettings({ token: token, diplomaId: id, data: data })
    .then((res) => {
      console.log('Diploma', res);
    })
    .catch((err) => {
      setIsShowRequestError({ isShow: true, text: 'К сожалению, произошла ошибка!' });
      console.error(err);
    })
    .finally(() => {  
      setIsLoadingRequest(false);
    });
  }


  function openUploadFilePopup(item) {
    setCurrentStudent(item);
    setIsShowUploadFilePopup(true);
  }

  function openShowReportPopup(item) {
    setCurrentStudent(item);
    setIsShowViewReportsPopup(true);
  }

  function closePopup() {
    setIsShowViewReportsPopup(false);
    setIsShowUploadFilePopup(false);
  }

  React.useEffect(() => {
    dataRequest();
    return (() => {
      setDiploma({});
      setCurrentStudent({});
    });
    // eslint-disable-next-line
  }, []);

  return (
    isLoadingData
    ?
    <Preloader />
    :
    <>
      <Tabs 
        tabs={diplomaTabs}
        path={path}
      />
      <Routes>
        <Route exact path={`check`} element={
          <CuratorDiplomaCheck 
            windowWidth={windowWidth}
            diploma={diploma}
            onUpload={openUploadFilePopup}
            onShowReport={openShowReportPopup}
          />
          }>
        </Route> 
      </Routes>
      <Routes>
        <Route exact path={`settings`} element={
          <CuratorDiplomaSettings 
            windowWidth={windowWidth} 
            diploma={diploma} 
            onSubmit={handleEditDiplomaSettings} 
            isLoadingRequest={isLoadingRequest}
            isShowRequestError={isShowRequestError}
          />
          }>
        </Route> 
      </Routes>
      {
        isShowUploadFilePopup &&
        <UploadFilePopup
          isOpen={isShowUploadFilePopup} 
          onClose={closePopup} 
          popupName={'curator-upload-diploma'}
          currentStudent={currentStudent}
          onAdd={handleUploadFile}
          isLoadingRequest={isLoadingRequest}
          isShowRequestError={isShowRequestError}
        />
      }
      {
        isShowViewReportsPopup &&
        <CuratorViewReportsPopup 
          isOpen={isShowViewReportsPopup} 
          onClose={closePopup} 
          currentStudent={currentStudent}
        />
      }
    </>
  );
}

export default CuratorDiploma; 