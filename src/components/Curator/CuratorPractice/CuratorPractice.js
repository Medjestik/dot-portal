import React from 'react';
import './CuratorPractice.css';
import { Route, Routes, useNavigate, useParams, useLocation } from 'react-router-dom';
import * as adminApi from '../../../utils/admin.js';
import Preloader from '../../Preloader/Preloader.js';
import SectionSelect from '../../Section/SectionSelect/SectionSelect.js';
import AdminEditPracticePopup from '../../Admin/AdminPopup/AdminEditPracticePopup/AdminEditPracticePopup.js';
import AdminAddPracticeOrderPopup from '../../Admin/AdminPopup/AdminAddPracticeOrderPopup/AdminAddPracticeOrderPopup.js';
import AdminAddPracticeGroupData from '../../Admin/AdminPopup/AdminAddPracticeGroupData/AdminAddPracticeGroupData.js';
import AdminEditPracticeStudentData from '../../Admin/AdminPopup/AdminEditPracticeStudentData/AdminEditPracticeStudentData';
import AdminEditPracticeStudentScore from '../../Admin/AdminPopup/AdminEditPracticeStudentScore/AdminEditPracticeStudentScore.js';
import UploadFilePopup from '../../Popup/UploadFilePopup/UploadFilePopup.js';
import ConfirmActionPopup from '../../Popup/ConfirmActionPopup/ConfirmActionPopup.js';
import ConfirmRemovePopup from '../../Popup/ConfirmRemovePopup/ConfirmRemovePopup.js';
import CuratorPracticeInfo from '../CuratorPracticeInfo/CuratorPracticeInfo.js';
import CuratorPracticeOrder from '../CuratorPracticeOrder/CuratorPracticeOrder.js';
import CuratorPracticeStudent from '../CuratorPracticeStudent/CuratorPracticeStudent.js';
import CuratorPracticeScore from '../CuratorPracticeScore/CuratorPracticeScore.js';

function CuratorPractice({ windowWidth }) {

  const [practice, setPractice] = React.useState({});
  const [currentFile, setCurrentFile] = React.useState({});
  const [currentOrder, setCurrentOrder] = React.useState({});
  const [currentSection, setCurrentSection] = React.useState({});
  const [currentStudent, setCurrentStudent] = React.useState({});

  const [isDataPopupOpen, setIsDataPopupOpen] = React.useState(false);
  const [isAddFilePopupOpen, setIsAddFilePopupOpen] = React.useState(false);
  const [isAddOrderPopupOpen, setIsAddOrderPopupOpen] = React.useState(false);
  const [isDeleteFilePopupOpen, setIsDeleteFilePopupOpen] = React.useState(false);
  const [isDeleteOrderPopupOpen, setIsDeleteOrderPopupOpen] = React.useState(false);
  const [isAssignOrderPopupOpen, setIsAssignOrderPopupOpen] = React.useState(false);
  const [isAddGroupDataPopupOpen, setIsAddGroupDataPopupOpen] = React.useState(false);
  const [isEditStudentDataPopupOpen, setIsEditStudentDataPopupOpen] = React.useState(false);
  const [isEditStudentScorePopupOpen, setIsEditStudentScorePopupOpen] = React.useState(false);

  const [isLoadingData, setIsLoadingData] = React.useState(true);
  const [isLoadingRequest, setIsLoadingRequest] = React.useState(false);
  const [isShowRequestError, setIsShowRequestError] = React.useState({ isShow: false, text: '' });

  const navigate = useNavigate();
  const { groupId, practiceId } = useParams();
  const location = useLocation();

  const sections = [
    { title: 'Общая информация', id: 1, link: '/info' },
    { title: 'Приказы', id: 2, link: '/order' },
    { title: 'Информация по студентам', id: 3, link: '/student' },
    { title: 'Оценки', id: 4, link: '/score' },
  ];

  function chooseSection(option) {
    navigate('/curator/group/' + groupId + '/practice/' + practiceId + option.link);
  }

  function dataRequest() {
    setIsLoadingData(true);
    const token = localStorage.getItem('token');
    adminApi.getPractice({ token: token, practiceId: practiceId })
    .then((res) => {
      console.log('Practice', res);
      setPractice(res);
    })
    .catch((err) => {
      console.error(err);
    })
    .finally(() => {  
      setIsLoadingData(false);
    });
  }

  function handleChangeData(info) {
    setIsShowRequestError({ isShow: false, text: '' });
    setIsLoadingRequest(true);
    const token = localStorage.getItem('token');
    adminApi.editPractice({ token, info })
      .then((res) => {
        console.log(res);
        setPractice(res);
        closePopups();
      })
      .catch((err) => {
        console.log(err);
        setIsShowRequestError({ isShow: true, text: 'К сожалению, произошла ошибка!' });
      })
      .finally(() => {
        setIsLoadingRequest(false);
      });
  }

  function handleAddFile(data) {
    setIsLoadingRequest(true);
    const token = localStorage.getItem('token');
    adminApi.addPracticeFile({
      token: token,
      practiceId: practice.id,
      file: data,
    })
    .then((res) => {
      setPractice({...practice, files: [res, ...practice.files]});
      closePopups();
    })
    .catch((err) => {
      console.error(err);
      setIsShowRequestError({ isShow: true, text: 'К сожалению, произошла ошибка!' });
    })
    .finally(() => {  
      setIsLoadingRequest(false);
    });
  }

  function handleDeleteFile(data) {
    setIsLoadingRequest(true);
    const token = localStorage.getItem('token');
    adminApi.deletePracticeFile({
      token: token,
      practiceId: practice.id,
      fileId: data.resource,
    })
    .then(() => {
      setPractice({...practice, files: practice.files.filter((elem) => elem.resource !== data.resource)});
      closePopups();
    })
    .catch((err) => {
      console.error(err);
      setIsShowRequestError({ isShow: true, text: 'К сожалению, произошла ошибка!' });
    })
    .finally(() => {  
      setIsLoadingRequest(false);
    });
  }

  function handleAddOrder(order) {
    setIsShowRequestError({ isShow: false, text: '' });
    setIsLoadingRequest(true);
    const token = localStorage.getItem('token');
    adminApi.addPracticeOrder({ 
        token: token,
        practiceId: practice.id,
        order: order,
     })
      .then((res) => {
        setPractice({...practice, orders: [res, ...practice.orders]});
        closePopups();
      })
      .catch((err) => {
        console.log(err);
        setIsShowRequestError({ isShow: true, text: 'К сожалению, произошла ошибка!' });
      })
      .finally(() => {
        setIsLoadingRequest(false);
      });
  }

  function handleDeleteOrder(data) {
    setIsLoadingRequest(true);
    const token = localStorage.getItem('token');
    adminApi.deletePracticeOrder({
      token: token,
      practiceId: practice.id,
      orderId: data.id,
    })
    .then(() => {
      setPractice({...practice, orders: practice.orders.filter((elem) => elem.id !== data.id)});
      closePopups();
    })
    .catch((err) => {
      console.error(err);
      setIsShowRequestError({ isShow: true, text: 'К сожалению, произошла ошибка!' });
    })
    .finally(() => {  
      setIsLoadingRequest(false);
    });
  }

  function handleAssignOrder(data) {
    setIsLoadingRequest(true);
    const token = localStorage.getItem('token');
    adminApi.assignPracticeOrder({
      token: token,
      practiceId: practice.id,
      orderId: data.id,
    })
    .then((res) => {
      setPractice({...practice, individuals: res});
      closePopups();
    })
    .catch((err) => {
      console.error(err);
      setIsShowRequestError({ isShow: true, text: 'К сожалению, произошла ошибка!' });
    })
    .finally(() => {  
      setIsLoadingRequest(false);
    });
  }

  function handleAddGroupDataPlace(data) {
    setIsShowRequestError({ isShow: false, text: '' });
    setIsLoadingRequest(true);
    const token = localStorage.getItem('token');
    adminApi.addPracticeGroupDataPlace({ 
        token: token,
        practiceId: practice.id,
        place: data.place,
     })
      .then((res) => {
        setPractice({...practice, individuals: res});
        closePopups();
      })
      .catch((err) => {
        console.log(err);
        setIsShowRequestError({ isShow: true, text: 'К сожалению, произошла ошибка!' });
      })
      .finally(() => {
        setIsLoadingRequest(false);
      });
  }

  function handleAddGroupDataManager(data) {
    setIsShowRequestError({ isShow: false, text: '' });
    setIsLoadingRequest(true);
    const token = localStorage.getItem('token');
    adminApi.addPracticeGroupDataManager({ 
        token: token,
        practiceId: practice.id,
        uni_boss: data.manager.id,
     })
      .then((res) => {
        setPractice({...practice, individuals: res});
        closePopups();
      })
      .catch((err) => {
        console.log(err);
        setIsShowRequestError({ isShow: true, text: 'К сожалению, произошла ошибка!' });
      })
      .finally(() => {
        setIsLoadingRequest(false);
      });
  }

  function handleAddGroupDataTask(data) {
    setIsShowRequestError({ isShow: false, text: '' });
    setIsLoadingRequest(true);
    const token = localStorage.getItem('token');
    adminApi.addPracticeGroupDataTask({ 
        token: token,
        practiceId: practice.id,
        task: data.task,
     })
      .then((res) => {
        setPractice({...practice, individuals: res});
        closePopups();
      })
      .catch((err) => {
        console.log(err);
        setIsShowRequestError({ isShow: true, text: 'К сожалению, произошла ошибка!' });
      })
      .finally(() => {
        setIsLoadingRequest(false);
      });
  }

  function handleEditStudentData(data) {
    setIsShowRequestError({ isShow: false, text: '' });
    setIsLoadingRequest(true);
    const token = localStorage.getItem('token');
    adminApi.editPracticeStudentData({ 
        token: token,
        practiceId: practice.id,
        studentId: currentStudent.student.id,
        parameters: data,
     })
      .then((res) => {
        const index = practice.individuals.indexOf(practice.individuals.find((elem) => (elem.student.id === currentStudent.student.id)));
        const individuals = ([ 
          ...practice.individuals.slice(0, index), 
          res, 
          ...practice.individuals.slice(index + 1)
        ]);
        setPractice({...practice, individuals: individuals});
        closePopups();
      })
      .catch((err) => {
        console.log(err);
        setIsShowRequestError({ isShow: true, text: 'К сожалению, произошла ошибка!' });
      })
      .finally(() => {
        setIsLoadingRequest(false);
      });
  }

  function handleEditStudentScore(data) {
    setIsShowRequestError({ isShow: false, text: '' });
    setIsLoadingRequest(true);
    const token = localStorage.getItem('token');
    adminApi.editPracticeStudentScore({ 
        token: token,
        practiceId: practice.id,
        studentId: currentStudent.student.id,
        parameters: data,
     })
      .then((res) => {
        const index = practice.individuals.indexOf(practice.individuals.find((elem) => (elem.student.id === currentStudent.student.id)));
        const individuals = ([ 
          ...practice.individuals.slice(0, index), 
          res, 
          ...practice.individuals.slice(index + 1)
        ]);
        setPractice({...practice, individuals: individuals});
        closePopups();
      })
      .catch((err) => {
        console.log(err);
        setIsShowRequestError({ isShow: true, text: 'К сожалению, произошла ошибка!' });
      })
      .finally(() => {
        setIsLoadingRequest(false);
      });
  }

  function openDataPopup() {
    setIsDataPopupOpen(true);
  }

  function openAddFilePopup() {
    setIsAddFilePopupOpen(true);
  }

  function openDeleteFilePopup(data) {
    setCurrentFile(data);
    setIsDeleteFilePopupOpen(true);
  }

  function openAddOrderPopup() {
    setIsAddOrderPopupOpen(true);
  }

  function openDeleteOrderPopup(data) {
    setCurrentOrder(data);
    setIsDeleteOrderPopupOpen(true);
  }

  function openAssignOrderPopup(data) {
    setCurrentOrder(data);
    setIsAssignOrderPopupOpen(true);
  }

  function openAddGroupDataPopup(data) { 
    setIsAddGroupDataPopupOpen(true);
  }

  function openAddStudentDataPopup(data) { 
    setCurrentStudent(data);
    setIsEditStudentDataPopupOpen(true);
  }

  function openAddStudentScorePopup(data) { 
    setCurrentStudent(data);
    setIsEditStudentScorePopupOpen(true);
  }

  function closePopups() {
    setIsDataPopupOpen(false);
    setIsAddFilePopupOpen(false);
    setIsDeleteFilePopupOpen(false);
    setIsAddOrderPopupOpen(false);
    setIsDeleteOrderPopupOpen(false);
    setIsAssignOrderPopupOpen(false);
    setIsAddGroupDataPopupOpen(false);
    setIsEditStudentDataPopupOpen(false);
    setIsEditStudentScorePopupOpen(false);
    setIsLoadingRequest(false);
    setIsShowRequestError({ isShow: false, text: '' });
  }

  React.useEffect(() => {
    dataRequest();
    setIsDataPopupOpen(false);
    return (() => {
        setPractice({});
        setCurrentFile({});
        setCurrentOrder({});
        setCurrentStudent({});
    })
    // eslint-disable-next-line
  }, []);

  React.useEffect(() => {
    if (location.pathname.includes('practice')) {
      sections.forEach((section) => {
        if (location.pathname.includes(section.link)) {
          setCurrentSection(section);
        }
      });
    }
    // eslint-disable-next-line
  }, [location]);

  return (
    isLoadingData
    ?
    <Preloader />
    :
    <>

    <Routes>
        <Route exact path={`info`}
          element={
            <>
            <div className='section__header'>
                <div className='section__header-item'>
                    <p className='section__header-caption section__header-caption_margin_bottom'>Выберите раздел:</p>
                    <SectionSelect sections={sections} currentSection={currentSection} onChooseSection={chooseSection} />
                </div>
                <div className='section__header-item'>
                    <span className='section__header-caption section__header-caption_margin_bottom'></span>
                    <button 
                    className={`section__header-btn section__header-btn_type_full`} type='button' onClick={() => openDataPopup()}>
                    Изменить данные
                    </button>
                </div>
                <div className='section__header-item'>
                    <span className='section__header-caption section__header-caption_margin_bottom'></span>
                    <button 
                    className={`section__header-btn section__header-btn_type_full`} type='button' onClick={() => openAddFilePopup()}>
                    Добавить файл
                    </button>
                </div>
            </div>
            <CuratorPracticeInfo windowWidth={windowWidth} practice={practice} onDelete={openDeleteFilePopup} />
            </>
          }
        />

        <Route exact path={`order`}
          element={
            <>
            <div className='section__header'>
                <div className='section__header-item'>
                    <p className='section__header-caption section__header-caption_margin_bottom'>Выберите раздел:</p>
                    <SectionSelect sections={sections} currentSection={currentSection} onChooseSection={chooseSection} />
                </div>
                <div className='section__header-item'>
                    <span className='section__header-caption section__header-caption_margin_bottom'></span>
                    <button 
                    className={`section__header-btn section__header-btn_type_full`} type='button' onClick={() => openAddOrderPopup()}>
                    Создать приказ
                    </button>
                </div>
            </div>
            <CuratorPracticeOrder windowWidth={windowWidth} practice={practice} onAssign={openAssignOrderPopup} onDelete={openDeleteOrderPopup} />
            </>
          }
        />

        <Route exact path={`student`}
          element={
            <>
            <div className='section__header'>
                <div className='section__header-item'>
                    <p className='section__header-caption section__header-caption_margin_bottom'>Выберите раздел:</p>
                    <SectionSelect sections={sections} currentSection={currentSection} onChooseSection={chooseSection} />
                </div>
                <div className='section__header-item'>
                    <span className='section__header-caption section__header-caption_margin_bottom'></span>
                    <button 
                    className={`section__header-btn section__header-btn_type_full`} type='button' onClick={() => openAddGroupDataPopup()}>
                    Назначить группе
                    </button>
                </div>
            </div>
            <CuratorPracticeStudent windowWidth={windowWidth} practice={practice} onEdit={openAddStudentDataPopup} />
            </>
          }
        />

        <Route exact path={`score`}
          element={
            <>
            <div className='section__header'>
                <div className='section__header-item'>
                    <p className='section__header-caption section__header-caption_margin_bottom'>Выберите раздел:</p>
                    <SectionSelect sections={sections} currentSection={currentSection} onChooseSection={chooseSection} />
                </div>
                <div className='section__header-item'>
                    <span className='section__header-caption section__header-caption_margin_bottom'></span>
                    <button 
                    className={`section__header-btn section__header-btn_type_full`} type='button' onClick={() => {}}>
                    Написать группе
                    </button>
                </div>
            </div>
            <CuratorPracticeScore windowWidth={windowWidth} practice={practice} onEdit={openAddStudentScorePopup} />
            </>
          }
        />

    </Routes>


    {            
    isDataPopupOpen &&
    <AdminEditPracticePopup
        isOpen={isDataPopupOpen}
        onClose={closePopups}
        currentData={practice}
        onChangeData={handleChangeData}
        isLoadingRequest={isLoadingRequest}
        isShowRequestError={isShowRequestError}
    />
    }

    {            
    isAddOrderPopupOpen &&
    <AdminAddPracticeOrderPopup
        isOpen={isAddOrderPopupOpen}
        onClose={closePopups}
        onAdd={handleAddOrder}
        isLoadingRequest={isLoadingRequest}
        isShowRequestError={isShowRequestError}
    />
    }

    {            
    isAddFilePopupOpen &&
    <UploadFilePopup
        isOpen={isAddFilePopupOpen}
        onClose={closePopups}
        popupName='admin-practice-add-file'
        onAdd={handleAddFile}
        isLoadingRequest={isLoadingRequest}
        isShowRequestError={isShowRequestError}
    />
    }

    {            
    isDeleteFilePopupOpen &&
    <ConfirmRemovePopup
        isOpen={isDeleteFilePopupOpen}
        onClose={closePopups}
        popupName='admin-practice-delete-file'
        onConfirm={handleDeleteFile}
        data={currentFile}
        isLoadingRequest={isLoadingRequest}
        isShowRequestError={isShowRequestError}
    />
    }

    {            
    isDeleteOrderPopupOpen &&
    <ConfirmRemovePopup
        isOpen={isDeleteOrderPopupOpen}
        onClose={closePopups}
        popupName='admin-practice-delete-order'
        onConfirm={handleDeleteOrder}
        data={currentOrder}
        isLoadingRequest={isLoadingRequest}
        isShowRequestError={isShowRequestError}
    />
    }

    {            
    isAssignOrderPopupOpen &&
    <ConfirmActionPopup
        isOpen={isAssignOrderPopupOpen}
        onClose={closePopups}
        popupName='admin-practice-assign-order'
        onConfirm={handleAssignOrder}
        data={currentOrder}
        actionText='Вы действительно хотите установить данный приказ для всех пустых значений?'
        isLoadingRequest={isLoadingRequest}
        isShowRequestError={isShowRequestError}
    />
    }

    {            
    isAddGroupDataPopupOpen &&
    <AdminAddPracticeGroupData
        isOpen={isAddGroupDataPopupOpen}
        onClose={closePopups}
        practice={practice}
        onAddPlace={handleAddGroupDataPlace}
        onAddManager={handleAddGroupDataManager}
        onAddTask={handleAddGroupDataTask}
        isLoadingRequest={isLoadingRequest}
        isShowRequestError={isShowRequestError}
    />
    }

    {            
    isEditStudentDataPopupOpen &&
    <AdminEditPracticeStudentData
        isOpen={isEditStudentDataPopupOpen}
        onClose={closePopups}
        practice={practice}
        currentStudent={currentStudent}
        onEdit={handleEditStudentData}
        isLoadingRequest={isLoadingRequest}
        isShowRequestError={isShowRequestError}
    />
    }

    {            
    isEditStudentScorePopupOpen &&
    <AdminEditPracticeStudentScore
        isOpen={isEditStudentScorePopupOpen}
        onClose={closePopups}
        practice={practice}
        currentStudent={currentStudent}
        onEdit={handleEditStudentScore}
        isLoadingRequest={isLoadingRequest}
        isShowRequestError={isShowRequestError}
    />
    }

    </>
  );
}

export default CuratorPractice;  