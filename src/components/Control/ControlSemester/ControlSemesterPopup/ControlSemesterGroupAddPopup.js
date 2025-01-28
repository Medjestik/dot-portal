import React from 'react';
import * as adminApi from '../../../../utils/admin.js';
import Preloader from '../../../Preloader/Preloader.js';
import Popup from '../../../Popup/Popup.js';
import PopupSelect from '../../../Popup/PopupSelect/PopupSelect.js';
import Table from '../../../Table/Table.js';
import TableSelect from '../../../Table/TableSelect/TableSelect.js';

const emptySemester = { name: 'Выберите календарный семестр..', id: 'placeholder' };
const emptyCount = { name: 'Выберите номер семестра..', id: 'placeholder' };

const countOptions = [
  { name: '1 семестр', id: 1 },
  { name: '2 семестр', id: 2 },
  { name: '3 семестр', id: 3 },
  { name: '4 семестр', id: 4 },
  { name: '5 семестр', id: 5 },
  { name: '6 семестр', id: 6 },
  { name: '7 семестр', id: 7 },
  { name: '8 семестр', id: 8 },
  { name: '9 семестр', id: 9 },
  { name: '10 семестр', id: 10 },
]

function ControlSemesterGroupAddPopup({ isOpen, onClose, semesters, courses, tutors, groupId, onSubmit, isLoadingRequest, isShowRequestError }) {
  
  const [data, setData] = React.useState([]);
  const [currentItem, setCurrentItem] = React.useState({});

  const [currentSemester, setCurrentSemester] = React.useState(emptySemester);
  const [currentCount, setCurrentCount] = React.useState(emptyCount);

  const [isOpenChangeCourse, setIsOpenChangeCourse] = React.useState(false);
  const [isOpenChangeTutor, setIsOpenChangeTutor] = React.useState(false);
  const [isShowSemesterData, setIsShowSemesterData] = React.useState(false);
  const [isLoadingData, setIsLoadingData] = React.useState(false);

  const [isBlockSubmitButton, setIsBlockSubmitButton] = React.useState(true);

  function handleSubmit(e) {
    e.preventDefault();
    const requestData = {
      group_id: groupId,
      semester_id: currentSemester.id,
      semester_number: currentCount.id,
      disciplines: data
        .filter((item) => item.type === 'discipline' && item.active)
        .map((item) => ({
          name: item.name,
          course: item.course ? item.course.id : null,
          control: item.control,
          lector: item.lector ? item.lector.id: null,
          start_date: item.startDate,
          end_date: item.endDate,
        })),
      practics: data
        .filter((item) => item.type === 'practics' && item.active)
        .map((item) => ({ name: item.name })),
    };
    onSubmit(requestData);
  }

  function dataRequest() {
    setIsLoadingData(true);
    const token = localStorage.getItem('token');
    adminApi.getSemesterPlanData({ 
      token, 
      groupId: groupId, 
      semesterNumber: currentCount.id, 
      semesterId: currentSemester.id 
    })
    .then((res) => {
      console.log('SemesterData', res);
      let arr = [];
      if (res) {
        const disciplines = res.discs.map((elem) => {
          return { 
            name: elem.name, 
            startDate: res.dates.start_date,
            endDate: res.dates.end_date,
            course: elem.course ? courses.find((course) => course.id === elem.course) : null,
            lector: null,
            control: elem.control,
            choose: elem.choose,
            active: elem.choose ? (elem.chosen ? true : false) : true,
            type: 'discipline'
          };
        });
    
        const practics = res.practics.map((elem) => {
          return { 
            name: elem.name, 
            startDate: res.dates.start_date,
            endDate: res.dates.end_date,
            course: null,
            lector: null,
            choose: false,
            active: true,
            type: 'practics'
          };
        });
    
        arr = [...disciplines, ...practics];
      }
      setData(arr);
      setIsShowSemesterData(true);
      setIsBlockSubmitButton(false);
    })
    .catch((err) => {
      setData([]);
      setIsShowSemesterData(true);
      setIsBlockSubmitButton(true);
      console.error(err);
    })
    .finally(() => {  
      setIsLoadingData(false);
    })
  }

  function handleChooseSemester(option) {
    setCurrentSemester(option);
  }

  function handleChooseCount(option) {
    setCurrentCount(option);
  }

  function handleChangeActive(item) {
    setData((prevData) =>
      prevData.map((elem) =>
        elem.name === item.name
          ? { ...elem, active: !elem.active }
          : elem
      )
    );
  }

  function openChangeCourseSelect(item) {
    setCurrentItem(item);
    setIsOpenChangeCourse(true);
  }

  function openChangeTutorSelect(item) {
    setCurrentItem(item);
    setIsOpenChangeTutor(true);
  }

  function handleSaveCourse(course) {
    setData((prevData) =>
      prevData.map((elem) =>
        elem.name === currentItem.name
          ? { ...elem, course: course }
          : elem
      )
    );
    closeSelect();
  }

  function handleSaveTutor(tutor) {
    setData((prevData) =>
      prevData.map((elem) =>
        elem.name === currentItem.name
          ? { ...elem, lector: tutor }
          : elem
      )
    );
    closeSelect();
  }

  function closeSelect() {
    setIsOpenChangeCourse(false);
    setIsOpenChangeTutor(false);
  }

  React.useEffect(() => {
    if (currentSemester.id !== 'placeholder' && currentCount.id !== 'placeholder') {
      dataRequest();
    }
  // eslint-disable-next-line
  }, [currentSemester, currentCount]);

  React.useEffect(() => {
    return(() => {
      setData({});
      setCurrentItem({});
      setCurrentSemester({});
      setCurrentCount({});
    })
  }, []);

  return (
    <Popup
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
      onClickOutside={false}
      formWidth={'full'}
      formName={'control-semester-group-add-popup'}
    >
      <h2 className='popup__title'>Создание учебного семестра</h2>

      <div className='popup__field'>
        <h4 className='popup__input-caption'>Календарный семестр:</h4>
        <PopupSelect options={semesters} currentOption={currentSemester} onChooseOption={handleChooseSemester} />
        <span className={`popup__input-error popup__input-error_status_show`}></span>
      </div>

      <div className='popup__field'>
        <h4 className='popup__input-caption'>Номер семестра:</h4>
        <PopupSelect options={countOptions} currentOption={currentCount} onChooseOption={handleChooseCount} />
        <span className={`popup__input-error popup__input-error_status_show`}></span>
      </div>

      {
        isShowSemesterData &&
        <>
        {
          isLoadingData
          ?
          <Preloader />
          :
          <Table>
            <div className='table__container'>
              <div className='table__header'>
                <div className='table__main-column'>
                  <div className='table__column table__column_type_header table__column_type_checkbox'>
                    <p className='table__text table__text_type_header'></p>
                  </div>
                  <div className='table__column table__column_type_header table__column_type_date'>
                    <p className='table__text table__text_type_header'>Период</p>
                  </div>
                  <div className='table__column table__column_type_header table__column_type_full'>
                    <p className='table__text table__text_type_header'>Дисциплина</p>
                  </div>
                  <div className='table__column table__column_type_header table__column_type_teacher'>
                    <p className='table__text table__text_type_header'>Преподаватель</p>
                  </div>
                  <div className='table__column table__column_type_header table__column_type_full'>
                    <p className='table__text table__text_type_header'>Электронный контент</p>
                  </div>
                </div>
              </div>
              {
                data.length < 1 
                ?
                <p className='table__caption_type_empty'>По заданным параметрам ничего не найдено.</p>
                :
                <ul className='table__main table__main_scroll_auto'>
                  {
                    data.map((item, i) => (
                      <li className={`table__row ${item.active && 'table__row_type_complete'}`} key={i}>
                        <div className='table__main-column'>
                          <div className='table__column table__column_type_checkbox'>
                            <label className='checkbox checkbox_width_small'>
                              <input 
                                name={`webinar-discipline-complete-${item.id}`}
                                type='checkbox'
                                id={`webinar-discipline-complete-${item.id}`}
                                value={item.active}
                                defaultChecked={item.active}
                                onChange={() => handleChangeActive(item)}
                                >
                              </input>
                              <span></span>
                            </label>
                          </div>
                          <div className='table__column table__column_type_date'>
                            <p className='table__text'>{item.startDate} - {item.endDate}</p>
                          </div>
                          <div className='table__column table__column_type_full'>
                            <p className={`table__text ${item.choose ? '' : 'table__text_type_header'}`}>{item.name}</p>
                          </div>
                          {
                            item.type === 'discipline'
                            ?
                            <>
                            <div className='table__column table__column_type_teacher'>
                              <p className={`table__text ${item.lector ? '' : 'table__text_type_empty'} table__text_type_active`} onClick={() => openChangeTutorSelect(item)}>{item.lector ? item.lector.name : 'Не определен'}</p>
                            </div>
                            <div className='table__column table__column_type_full'>
                              <p className={`table__text ${item.course ? '' : 'table__text_type_empty'} table__text_type_active`} onClick={() => openChangeCourseSelect(item)}>{item.course ? item.course.name : 'Не определен'}</p>
                            </div>
                            </>
                            :
                            <>
                            <div className='table__column table__column_type_teacher'>
                                <p className={`table__text`}></p>
                              </div>
                              <div className='table__column table__column_type_full'>
                                <p className={`table__text`}></p>
                              </div>
                            </>
                          }

                        </div>
                      </li>
                    ))
                  }
                </ul>
              }
            </div>
          </Table>
        }
        </>
      }

      <div className='popup__btn-container'>
        <button className='popup__btn-cancel' type='button' onClick={() => onClose()}>Назад</button>
        {
          isLoadingRequest ? 
          <button className='popup__btn-save popup__btn-save_type_loading' disabled type='button'>Сохранение..</button>
          :
          <button className={`popup__btn-save ${isBlockSubmitButton ? 'popup__btn-save_type_block' : ''}`} type='submit'>Сохранить</button>
        }
      </div>
      <span className={`popup__input-error ${isShowRequestError.isShow && 'popup__input-error_status_show'}`}>{isShowRequestError.text}</span>

      {
        isOpenChangeCourse &&
        <TableSelect 
          isOpen={isOpenChangeCourse}
          onClose={closeSelect}
          title={'Выбрать электронный курс'}
          onSave={handleSaveCourse}
          options={courses}
          currentOption={currentItem.course ? currentItem.course : { id: 'placeholder', name: 'Выберите курс..' }}
        />
      }
      {
        isOpenChangeTutor &&
        <TableSelect 
          isOpen={isOpenChangeTutor}
          onClose={closeSelect}
          title={'Выбрать преподавателя'}
          onSave={handleSaveTutor}
          options={tutors}
          currentOption={currentItem.lector ? currentItem.lector : { id: 'placeholder', name: 'Выберите преподавателя..' }}
        />
      }
    </Popup>
  )
}

export default ControlSemesterGroupAddPopup;
