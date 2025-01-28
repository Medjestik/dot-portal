import React from 'react';
import { useNavigate } from 'react-router-dom';
import * as curatorApi from '../../../../utils/curatorApi.js';
import * as adminApi from '../../../../utils/admin.js';
import TableHorizontal from '../../../Table/TableHorizontal/TableHorizontal.js';
import PreloaderPopup from '../../../Preloader/PreloaderPopup/PreloaderPopup.js';
import PopupSelect from '../../../Popup/PopupSelect/PopupSelect.js';
import AdminSetMarkPopup from '../AdminSetMarkPopup/AdminSetMarkPopup.js';
import AdminFixStatisticPopup from '../AdminFixStatisticPopup/AdminFixStatisticPopup.js';

function ViewSemesterDetailPopup({ isOpen, onClose, groupId, semesterOptions, currentSemesterId, role }) {

  const navigate = useNavigate();

  const [isOpenSetMarkPopup, setIsOpenSetMarkPopup] = React.useState(false);
  const [isOpenFixStatisticPopup, setIsOpenFixStatisticPopup] = React.useState(false);

  const [isLoadingInfo, setIsLoadingInfo] = React.useState(true);
  const [isLoadingRequest, setIsLoadingRequest] = React.useState(false);
  const [isShowRequestError, setIsShowRequestError] = React.useState({ isShow: false, text: '', });

  const [currentSemesterOption, setCurrentSemesterOption] = React.useState(semesterOptions.find((elem) => currentSemesterId === elem.id));

  const [currentData, setCurrentData] = React.useState({});
  const [currentStudent, setCurrentStudent] = React.useState({});
  const [currentDiscipline, setCurrentDiscipline] = React.useState({});

  const tableWidthRef = React.createRef();

  const [tableWidth, setTableWidth] = React.useState(0);
  const [isShowFullWidth, setIsShowFullWidth] = React.useState(false);

  function generateMenuLink(student, activities) {
    let link = '';

    if (activities.type === 'practice') {
      link = 'https://edu.emiit.ru/' + role + '/group/' + groupId + '/practice/' + activities.id + '/info';
    } else if (activities.type === 'course') {
      const courseId = activities.id.slice(0, -3); 
      link = 'https://edu.emiit.ru/' + role + '/discipline/' + courseId + '/student/' + student.id;
    } else {
      link = 'https://edu.emiit.ru/' + role + '/discipline/' + activities.id + '/student/' + student.id;
    }

    return (
      <a 
      className='icon icon_size_18 icon_type_search' 
      target='_blank' 
      rel='noreferrer' 
      href={link}>
      </a>
    )
  }

  function generateElemLink(elem) {
    if (elem.type === 'practice') {
      return (
        <a 
        className='table-horizontal__text table-horizontal__text_weight_bold table-horizontal__text_type_cut table-horizontal__text_type_active' 
        target='_blank' 
        rel='noreferrer' 
        href={'https://edu.emiit.ru/' + role + '/group/' + groupId + '/practice/' + elem.id + '/info'}>
          ({elem.control}) {elem.name}
        </a>
        )
    } else {
      if (elem.id.includes('kr')) {
        const id = elem.id.slice(0, -3);  
        
        return (
          <a 
          className='table-horizontal__text table-horizontal__text_weight_bold table-horizontal__text_type_cut table-horizontal__text_type_active' 
          target='_blank' 
          rel='noreferrer' 
          href={'https://edu.emiit.ru/' + role + '/discipline/' + id + '/group'}>
            ({elem.control}) {elem.name}
          </a>
          )
      } else {
        return (
          <a 
          className='table-horizontal__text table-horizontal__text_weight_bold table-horizontal__text_type_cut table-horizontal__text_type_active' 
          target='_blank' 
          rel='noreferrer' 
          href={'https://edu.emiit.ru/' + role + '/discipline/' + elem.id + '/group'}>
            ({elem.control}) {elem.name}
          </a>
          )
      }
    }
  }

  function filterBySemester(option) {
    setCurrentSemesterOption(option);
    getSemesterDetail(option.id);
  }

  function getStudentMark(student, activities) { 
    const studentMark = currentData.results.find((item) => item.student_id === student.id && item.activity_id === activities.id);

    if (studentMark) {
      if (studentMark.mark.name === 'Нет оценки') {
        return (
          <p 
          onClick={() => openSetMarkPopup(activities, student, studentMark)}
          className='table-horizontal__text table-horizontal__text_type_active table-horizontal__text_type_empty'
          >
            {studentMark.mark.name}
          </p>
        )
      } else if (studentMark.mark.name === 'Не аттестован') {
        return (
          <p 
          onClick={() => openSetMarkPopup(activities, student, studentMark)}
          className='table-horizontal__text table-horizontal__text_type_active table-horizontal__text_type_error'
          >
            {studentMark.mark.name}
          </p>
        )
      } else {
        return (
          <p 
          onClick={() => openSetMarkPopup(activities, student, studentMark)}
          className='table-horizontal__text table-horizontal__text_type_active'
          >
            {studentMark.mark.name}
          </p>
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

  function openSetMarkPopup(discipline, student, mark) {
    setCurrentDiscipline({ ...discipline });
    setCurrentStudent({ student, mark: mark.mark });
    setIsOpenSetMarkPopup(true);
  }

  function openFixStatisticPopup(student) {
    // setCurrentDiscipline({ ...discipline });
    setCurrentStudent(student);
    setIsOpenFixStatisticPopup(true);
  }

  function closePopup() {
    setIsOpenSetMarkPopup(false);
    setIsOpenFixStatisticPopup(false);
  }

  function handleSetMark(mark) {
    setIsLoadingRequest(true);
    const token = localStorage.getItem('token');
    adminApi.setMark({ 
      token, 
      activity_id: currentDiscipline.id, 
      student_id: currentStudent.student.id, 
      type: currentDiscipline.type, 
      mark_id: mark.mark.id, 
      comment: mark.text  
    })
    .then((res) => {
      const newResults = currentData.results.map((result) => {
        if (result.activity_id === res.activity_id && result.student_id === res.student_id) {
          console.log(result);
          return res;
        }
        return result;
      })
      setCurrentData({ ...currentData, results: newResults });
      closePopup();
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(() => {
      setIsLoadingRequest(false);
    });
  }

  function handleFixStatistic(student, disciplines) {
    setIsLoadingRequest(true);
    const token = localStorage.getItem('token');
    adminApi.fixStatistic({ 
      token, 
      user_id: student.id,
      disciplines: disciplines
    })
    .then((res) => {
      console.log(res);
      closePopup();
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(() => {
      setIsLoadingRequest(false);
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
      setCurrentStudent({});
      setCurrentDiscipline({});
    })

  // eslint-disable-next-line
  }, [isOpen]);

  return (
    <>
    <div className={`popup ${isOpen ? 'popup_opened' : ''}`}>
      <div className='scroll popup__container'>
        <div className={`popup__form popup__form_width_${isShowFullWidth ? '100' : '1440'} popup__form_height_min`} >
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
            <div className='section__header-item section__header-item_type_content'>
              <span className='section__header-caption section__header-caption_margin_bottom'></span>
              <a 
              href={`https://course.emiit.ru/view_print_form_true.html?print_form_id=7390360828329790778&semester_id=${currentSemesterOption.id}`} 
              className='btn-icon btn-icon_color_accent-blue btn-icon_type_file-export' 
              target='_blank'
              rel='noreferrer'
              >
              </a>
            </div>
            <div className='section__header-item section__header-item_type_content'>
              <span className='section__header-caption section__header-caption_margin_bottom'></span>
              <button className={`btn-icon btn-icon_color_accent-blue btn-icon_type_${isShowFullWidth ? 'collapse' : 'expand'}`} type='button' onClick={() => setIsShowFullWidth(!isShowFullWidth)}></button>
            </div>
            <div className='section__header-item section__header-item_type_content'>
              <span className='section__header-caption section__header-caption_margin_bottom'></span>
              <button className='btn-icon btn-icon_color_accent-blue btn-icon_type_refresh' type='button' onClick={() => getSemesterDetail(currentSemesterOption.id)}></button>
            </div>
            <div className='section__header-item section__header-item_type_content'>
              <span className='section__header-caption section__header-caption_margin_bottom'></span>
              <button className='section__header-btn section__header-btn_type_fix' type='button' onClick={() => onClose()}>Назад</button>
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
                      {generateElemLink(elem)}
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
                      <div className={`table-horizontal__column table-horizontal_display_row table-horizontal__column_type_name`}>
                        {
                        student.avatar
                        ?
                        <img className='popup__author-img popup__author-img_size_40' src={student.avatar} alt='аватар'></img>
                        :
                        <div className='popup__author-img popup__author-img_size_40'></div>
                        }
                        <div className='table-horizontal__cell-container'>
                          <p className='table-horizontal__text table-horizontal__text_weight_bold table-horizontal__text_type_active'>{student.fullname}</p>
                          {
                            student.is_sub &&
                            <div className='table-horizontal__cell-badge-list table-horizontal__cell-badge-list_position_bottom'>
                              <div className='table-horizontal__cell-badge-item'>
                                <span className='table-horizontal__cell-badge table-horizontal__cell-badge_color_orange'>Переводник</span>
                              </div>
                            </div>
                          }
                          {
                            student.is_och &&
                            <div className='table-horizontal__cell-badge-list table-horizontal__cell-badge-list_position_bottom'>
                              <div className='table-horizontal__cell-badge-item'>
                                <span className='table-horizontal__cell-badge table-horizontal__cell-badge_color_blue'>Очник</span>
                              </div>
                            </div>
                          }
                        </div>
                        <div className='table-horizontal__cell-menu'>
                          <div className='table-horizontal__cell-menu-item'>
                            <button className='icon icon_size_18 icon_type_settings' type='button' onClick={() => openFixStatisticPopup(student)} />
                          </div>
                        </div>

                      </div>
                      {
                        currentData.activities.map((activities, i) => (
                          <div className='table-horizontal__column table-horizontal_display_row table-horizontal__column_type_text' key={i}>
                            {getStudentMark(student, activities)}
                            <div className='table-horizontal__cell-menu'>
                              <div className='table-horizontal__cell-menu-item'>
                                {generateMenuLink(student, activities)}
                              </div>
                            </div>
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
        </div>
      </div>
    </div>

    {
      isOpenSetMarkPopup &&
      <AdminSetMarkPopup 
        isOpen={isOpenSetMarkPopup}
        onClose={closePopup}
        currentStudent={currentStudent}
        disciplineInfo={currentDiscipline}
        setMark={handleSetMark}
        isLoadingRequest={isLoadingRequest}
        isShowRequestError={isShowRequestError}
      />
    }

    {
      isOpenFixStatisticPopup &&
      <AdminFixStatisticPopup 
        isOpen={isOpenFixStatisticPopup}
        onClose={closePopup}
        currentStudent={currentStudent}
        disciplines={currentData.activities.filter((elem) => elem.type === 'discipline')}
        onFix={handleFixStatistic}
        isLoadingRequest={isLoadingRequest}
        isShowRequestError={isShowRequestError}
      />
    }
    </>
  )
}

export default ViewSemesterDetailPopup;