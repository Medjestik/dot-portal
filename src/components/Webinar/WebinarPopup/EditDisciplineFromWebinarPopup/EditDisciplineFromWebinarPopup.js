import React from 'react';
import Popup from '../../../Popup/Popup.js';
import * as webinarApi from '../../../../utils/webinarApi.js';
import PopupSelect from '../../../Popup/PopupSelect/PopupSelect.js';
import PreloaderPopup from '../../../Preloader/PreloaderPopup/PreloaderPopup.js';
import ConvertDate from '../../../Date/ConvertDate.js';

function EditDisciplineFromWebinarPopup({ isOpen, onClose, currentData, onChangeData, isLoadingRequest, isShowRequestError }) {

  const [teachers, setTeachers] = React.useState([]);

  const [startDate, setStartDate] = React.useState(ConvertDate(currentData.start_date) || '');
  const [endDate, setEndDate] = React.useState(ConvertDate(currentData.end_date) || '');
  const [currentMainTeacher, setCurrentMainTeacher] = React.useState({});
  const [currentOfficialTeacher, setCurrentOfficialTeacher] = React.useState({});

  const [isLoadingData, setIsLoadingData] = React.useState(true);

  const [isBlockSubmitButton, setIsBlockSubmitButton] = React.useState(false);

  function teachersRequest() {
    setIsLoadingData(true);
    const token = localStorage.getItem('token');
    webinarApi.webinarGetTutors({ token: token })
    .then((res) => {
      //console.log('Teachers', res);
      setTeachers(res);
    })
    .catch((err) => {
      console.error(err);
    })
    .finally(() => {  
      setIsLoadingData(false);
    });
  }

  function handleSubmit(e) {
    e.preventDefault();
    const data = {
      start_date: startDate,
      end_date: endDate,
      lector_id: currentMainTeacher.id,
      vedomost_lector_id: currentOfficialTeacher.id,
    }
    onChangeData(data, currentData.id);
  }

  function handleChangeStartDate(e) {
    setStartDate(e.target.value);
  }

  function handleChangeEndDate(e) {
    setEndDate(e.target.value);
  }

  function handleChangeMainTeacher(data) {
    setCurrentMainTeacher(data);
  }

  function handleChangeOfficialTeacher(data) {
    setCurrentOfficialTeacher(data);
  }

  React.useEffect(() => {
    teachersRequest();
    setStartDate(ConvertDate(currentData.start_date) || '');
    setEndDate(ConvertDate(currentData.end_date) || '');
    setCurrentMainTeacher({ name: currentData.lector_fullname, id: currentData.lector_id });
    setCurrentOfficialTeacher({ name: currentData.vedomost_lector_fullname, id: currentData.vedomost_lector_id });
    setIsBlockSubmitButton(false);

    return (() => {
      setTeachers([]);
      setCurrentMainTeacher({});
      setCurrentOfficialTeacher({});
    })
  }, [isOpen, currentData]);

  return (
    <Popup
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
      formWidth={'medium'}
      formName={'admin-edit-discipline-from-webinar-popup'}
    >
      <h2 className='popup__title'>Редактирование дисциплины</h2>
      
      {
        isLoadingData
        ?
        <PreloaderPopup />
        :
        <>
        <div className='popup__field'>
          <h4 className='popup__input-caption'>Укажите дату начала:</h4>
          <div className='popup__input-field'>
            <input 
            className='popup__input popup__input_type_date'
            type='date'
            id='edit-discipline-from-webinar-start-date'
            value={startDate}
            onChange={handleChangeStartDate}
            name='edit-practice-start-date' 
            placeholder='Укажите дату начала...'
            min='1900-01-01'
            max='2100-01-01'
            autoComplete='off'
            required 
            />
          </div>
        </div>

        <div className='popup__field'>
          <h4 className='popup__input-caption'>Укажите дату окончания:</h4>
          <div className='popup__input-field'>
            <input 
            className='popup__input popup__input_type_date'
            type='date'
            id='edit-discipline-from-webinar-end-date'
            value={endDate}
            onChange={handleChangeEndDate}
            name='edit-practice-end-date' 
            placeholder='Укажите дату окончания...'
            min='1900-01-01'
            max='2100-01-01'
            autoComplete='off'
            required 
            />
          </div>
        </div>

        {
          <div className='popup__field'>
            <h4 className='popup__input-caption'>Преподаватель основной:</h4>
            <PopupSelect filterType='byId' options={teachers} currentOption={currentMainTeacher} onChooseOption={handleChangeMainTeacher} />
          </div>
        }

        {
          <div className='popup__field'>
            <h4 className='popup__input-caption'>Преподаватель в ведомости:</h4>
            <PopupSelect filterType='byId' options={teachers} currentOption={currentOfficialTeacher} onChooseOption={handleChangeOfficialTeacher} />
          </div>
        }

        <div className='popup__btn-container'>
          <button className='popup__btn-cancel' type='button' onClick={() => onClose()}>Отменить</button>
          {
            isLoadingRequest ? 
            <button className='popup__btn-save popup__btn-save_type_loading' disabled type='button'>Сохранение..</button>
            :
            <button className={`popup__btn-save ${isBlockSubmitButton ? 'popup__btn-save_type_block' : ''}`} type='submit'>Сохранить</button>
          }
        </div>
        <span className={`popup__input-error ${isShowRequestError.isShow && 'popup__input-error_status_show'}`}>{isShowRequestError.text}</span>
        </>
      }
    </Popup>
  )
}

export default EditDisciplineFromWebinarPopup;