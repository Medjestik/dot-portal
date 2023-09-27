import React from 'react';
import Popup from '../../../Popup/Popup.js';
import { useNavigate } from 'react-router-dom';
import * as curatorApi from '../../../../utils/curatorApi.js';
import * as educationApi from '../../../../utils/educationApi.js';
import TableHorizontal from '../../../Table/TableHorizontal/TableHorizontal.js';
import PreloaderPopup from '../../../Preloader/PreloaderPopup/PreloaderPopup.js';
import PopupSelect from '../../../Popup/PopupSelect/PopupSelect.js';
import TeacherChooseMarkPopup from '../TeacherChooseMarkPopup/TeacherChooseMarkPopup.js';

function ViewSemesterDetailPopup({ isOpen, onClose, groupId, semesterOptions, currentSemesterId }) {

  const navigate = useNavigate();

  const [isLoadingInfo, setIsLoadingInfo] = React.useState(true);
  const [isLoadingRequest, setIsLoadingRequest] = React.useState(false);

  const [currentSemesterOption, setCurrentSemesterOption] = React.useState(semesterOptions.find((elem) => currentSemesterId === elem.id));

  const [currentData, setCurrentData] = React.useState({});

  const [currentStudent, setCurrentStudent] = React.useState([]);
  const [currentDiscipline, setCurrentDiscipline] = React.useState([]);

  const tableWidthRef = React.createRef();

  const [tableWidth, setTableWidth] = React.useState(0);

  const [isOpenTeacherChooseMark, setIsOpenTeacherChooseMark] = React.useState(false);

  const [isShowFullWidth, setIsShowFullWidth] = React.useState(false);

  function handleSubmit(e) {
    e.preventDefault();
    onClose();
  }

  function openElem(elem) {
    if (elem.type === 'practice') {
      navigate('/curator/group/' + groupId + '/practice/' + elem.id + '/info');
    } else {
      if (elem.id.includes('kr')) {
        const id = elem.id.slice(0, -3);
        navigate('/curator/discipline/' + id + '/info');
      } else {
        navigate('/curator/discipline/' + elem.id + '/info');
      }
    }
  }

  function openChooseMarkPopup(student) {
    setCurrentStudent(student);
    //setIsOpenTeacherChooseMark(true);
  }

  function setMark(data) {
    setIsLoadingRequest(true);
    const token = localStorage.getItem('token');
    educationApi.teacherSetMark({
      token: token,
      discipline_id: currentDiscipline.id,
      student_id: currentStudent.student.id,
      mark_id: data.mark.id, 
      kr_mark_id: data.courseMark.id,
      comment: data.text
    })
    .then((res) => {
      /*const index = disciplineStudents.indexOf(disciplineStudents.find((elem) => (elem.student.id === res.student.id)));
      const student = {
        ...disciplineStudents[index],
        mark: res.mark,
        course_mark: res.course_mark,
        comments: res.new_comment ? [...disciplineStudents[index].comments, res.new_comment ] :  disciplineStudents[index].comments,
      };
      setCurrentStudent(student);
      setDisciplineStudents([ ...disciplineStudents.slice(0, index), student, ...disciplineStudents.slice(index + 1) ]);
      closeTeacherPopup();
      */
    })
    .catch((err) => {
      console.error(err);
    })
    .finally(() => {  
      setIsLoadingRequest(false);
    });
  }

  function filterBySemester(option) {
    setCurrentSemesterOption(option);
    getSemesterDetail(option.id);
  }

  function getStudentMark(studentId, disciplineId) { 
    const studentMark = currentData.results.find((item) => item.student_id === studentId && item.activity_id === disciplineId);

    if (studentMark) {
      if (studentMark.mark.name === 'Нет оценки') {
        return (
          <p className='table-horizontal__text table-horizontal__text_type_active table-horizontal__text_type_empty'>{studentMark.mark.name}</p>
        )
      } else if (studentMark.mark.name === 'Не аттестован') {
        return (
          <p className='table-horizontal__text table-horizontal__text_type_active table-horizontal__text_type_error'>{studentMark.mark.name}</p>
        )
      } else {
        return (
          <p className='table-horizontal__text table-horizontal__text_type_active'>{studentMark.mark.name}</p>
        )
      }
    } else {
      return (
        <p className='table-horizontal__text table-horizontal__text_type_empty'>Не найдено</p>
      )
    }
  }

  function getSemesterDetail(id) {
    setIsLoadingInfo(true);
    const token = localStorage.getItem('token');
    curatorApi.getSemesterDetail({ token: token, semesterId: id })
    .then((res) => {
      console.log('SemesterDetail', res);
      setCurrentData(res);
    })
    .catch((err) => {
      console.error(err);
    })
    .finally(() => {  
      setIsLoadingInfo(false);
    });
  }

  const tableStyle = {
    width: tableWidth,
  };

  React.useEffect(() => {
    if (!isLoadingInfo) {
      setTableWidth(tableWidthRef.current.scrollWidth);
    }
  }, [isLoadingInfo, tableWidthRef]); 

  React.useEffect(() => {
    setIsLoadingInfo(false);
    getSemesterDetail(currentSemesterId);

    return(() => {
      setCurrentData({});
    })

  // eslint-disable-next-line
  }, [isOpen]);

  return (
    <Popup
      isOpen={isOpen}
      onSubmit={handleSubmit}
      formWidth={isShowFullWidth ? '100' : '1440'}
      formName={'view-semester-detail-popup'}
    >
      {
      isLoadingInfo 
      ?
      <PreloaderPopup />
      :
      <>

        <h2 className='popup__title popup__title_margin_bottom'>Развернутая ведомость</h2>

        <div className='section__header'>
          <div className='section__header-item'>
            <span className='section__header-caption'>Выберите семестр:</span>
            <PopupSelect options={semesterOptions} currentOption={currentSemesterOption} onChooseOption={filterBySemester} />
          </div>
          <div className='section__header-item'>
            <span className='section__header-caption section__header-caption_margin_bottom'></span>
            <button 
            className={`section__header-btn section__header-btn_type_full`} type='button'>
              Экспорт в Excel
            </button>
          </div>
          <div className='section__header-item'>
            <span className='section__header-caption section__header-caption_margin_bottom'></span>
            <button 
            className={`section__header-btn section__header-btn_type_full`} type='button'
            onClick={() => setIsShowFullWidth(!isShowFullWidth)}
            >
              {isShowFullWidth ? 'Скрыть' : 'Развернуть'} 
            </button>
          </div>
          <div className='section__header-item'>
            <span className='section__header-caption section__header-caption_margin_bottom'></span>
            <button 
            className={`section__header-btn section__header-btn_type_full`} type='button' onClick={() => onClose()}>
              Назад
            </button>
          </div>
        </div>

        <TableHorizontal>
          <div className='table-horizontal__header' style={Object.assign({}, tableStyle)}>
            <div className='table-horizontal__main-row' ref={tableWidthRef}>
              <div className='table-horizontal__column table-horizontal__column_type_header table-horizontal__column_type_name table-horizontal__column_type_main'>
                <p className='table-horizontal__text table-horizontal__text_weight_bold'>ФИО / Дисциплина</p>
              </div>
              {
                currentData.activities.map((elem, i) => (
                  <div key={i} className='table-horizontal__column table-horizontal__column_type_header table-horizontal__column_type_text'>
                    <p className='table-horizontal__text table-horizontal__text_weight_bold table-horizontal__text_type_cut table-horizontal__text_type_active' onClick={() => openElem(elem)}>({elem.control}) {elem.name}</p>
                    <p className='table-horizontal__text'>{elem.lector}</p>
                  </div>
                ))
              }
            </div>
          </div>

          <ul className='table-horizontal__main' style={Object.assign({}, tableStyle)}>
            {
              currentData.students.map((student, i) => (
                <li className='table-horizontal__row' key={i}>
                  <div className='table-horizontal__main-row'>
                    <div className='table-horizontal__column table-horizontal__column_type_name'>
                      <p className='table-horizontal__text table-horizontal__text_weight_bold table-horizontal__text_type_active'>{student.fullname}</p>
                    </div>
                    {
                      currentData.activities.map((discipline, i) => (
                        <div className='table-horizontal__column table-horizontal__column_type_text' key={i}>
                          {getStudentMark(student.id, discipline.id)}
                        </div>
                      ))
                    }
                  </div>
                </li>
              ))
            }
          </ul>

        </TableHorizontal>
      </>
      }
    </Popup>
  )
}

export default ViewSemesterDetailPopup;