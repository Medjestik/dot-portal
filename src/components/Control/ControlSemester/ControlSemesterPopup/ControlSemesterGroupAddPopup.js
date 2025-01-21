import React from 'react';
import * as adminApi from '../../../../utils/admin.js';
import Preloader from '../../../Preloader/Preloader.js';
import Popup from '../../../Popup/Popup.js';
import PopupSelect from '../../../Popup/PopupSelect/PopupSelect.js';
import Table from '../../../Table/Table.js';

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

function ControlSemesterGroupAddPopup({ isOpen, onClose, semesters, groupId, onSubmit, isLoadingRequest, isShowRequestError }) {
  
  const [data, setData] = React.useState({});

  const [currentSemester, setCurrentSemester] = React.useState(emptySemester);
  const [currentCount, setCurrentCount] = React.useState(emptyCount);

  const [isShowSemesterData, setIsShowSemesterData] = React.useState(false);
  const [isLoadingData, setIsLoadingData] = React.useState(false);

  const [isBlockSubmitButton, setIsBlockSubmitButton] = React.useState(true);

  function handleSubmit(e) {
    e.preventDefault();
    /* const data = {
      name: name,
      ych_sem: currentGroup.ych_sem,
      control: currentControlForm.id,
      course_id: currentCourse.id,
      start_date: formatDateFromInput(startDate),
      end_date: formatDateFromInput(endDate),
      lector: currentTutor.id,
      vedomost_lector: currentTutorVed.id,
    }
    onSubmit(data);
    */
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
      setData(res);
      setIsShowSemesterData(true);
    })
    .catch((err) => {
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
    console.log(item);
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
              <div className='table__main-column table__main-column_type_empty'>
                <div className='table__column table__column_type_header table__column_type_count'>
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
              data.discs?.length < 1 
              ?
              <p className='table__caption_type_empty'>По заданным параметрам ничего не найдено.</p>
              :
              <ul className='table__main scroll'>
                {
                  data.discs?.map((item, i) => (
                    <li className={`table__row ${item.webinar_ready && 'table__row_type_complete'}`} key={i}>
                      <div className='table__main-column'>
                        <div className='table__column table__column_type_count'>
                          <label className='checkbox checkbox_width_small'>
                            <input 
                              name={`webinar-discipline-complete-${item.id}`}
                              type='checkbox'
                              id={`webinar-discipline-complete-${item.id}`}
                              value={item.webinar_ready}
                              defaultChecked={item.webinar_ready}
                              onChange={() => handleChangeActive(item)}
                              >
                            </input>
                            <span></span>
                          </label>
                        </div>
                        <div className='table__column table__column_type_date'>
                          <p className='table__text'>{data.dates.start_date} - {data.dates.end_date}</p>
                        </div>
                        <div className='table__column table__column_type_full'>
                          <p className='table__text table__text_type_header'>{item.name}</p>
                        </div>
                        <div className='table__column table__column_type_teacher'>
                          <p className='table__text'>Не определен</p>
                        </div>
                        <div className='table__column table__column_type_full'>
                          <p className='table__text'>{item.course || 'Не определен'}</p>
                        </div>
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
    </Popup>
  )
}

export default ControlSemesterGroupAddPopup;
