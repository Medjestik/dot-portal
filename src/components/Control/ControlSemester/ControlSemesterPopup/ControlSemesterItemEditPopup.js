import React from 'react';
import Popup from '../../../Popup/Popup.js';
import PopupSelect from '../../../Popup/PopupSelect/PopupSelect.js';
import SelectSearch from '../../../SelectSearch/SelectSearch.js';
import { formatDateForInput, formatDateFromInput } from '../../../../shared/formatDate.js';

function ControlSemesterItemEditPopup({ isOpen, onClose, item, tutors, courses, controlForms, onSubmit, onRemove, isLoadingRequest, isShowRequestError }) {

  const [name, setName] = React.useState('');
  const [nameError, setNameError] = React.useState({ isShow: false, text: '' });
  const [currentTutor, setCurrentTutor] = React.useState({});
  const [currentTutorVed, setCurrentTutorVed] = React.useState({});
  const [currentCourse, setCurrentCourse] = React.useState({});
  const [currentControlForm, setCurrentControlForm] = React.useState({});
  const [startDate, setStartDate] = React.useState('');
  const [startDateError, setStartDateError] = React.useState({ isShow: false, text: '' });
  const [endDate, setEndDate] = React.useState('');
  const [endDateError, setEndDateError] = React.useState({ isShow: false, text: '' });

  const [isBlockSubmitButton, setIsBlockSubmitButton] = React.useState(true);

  function handleSubmit(e) {
    e.preventDefault();
    const data = {
      id: item.id,
      name: name,
      control: currentControlForm.id,
      course_id: currentCourse.id,
      start_date: formatDateFromInput(startDate),
      end_date: formatDateFromInput(endDate),
      lector: currentTutor.id,
      vedomost_lector: currentTutorVed.id,
    }
    onSubmit(data);
  }

  function handleChangeName(e) {
    setName(e.target.value);
    if (e.target.checkValidity()) {
      setNameError({ text: '', isShow: false });
    } else {
      setNameError({ text: 'Поле не может быть пустым', isShow: true });
    }
  }

  function handleChooseTutor(option) {
    setCurrentTutor(option);
  }

  function handleChooseTutorVed(option) {
    setCurrentTutorVed(option);
  }

  function handleChooseCourse(option) {
    setCurrentCourse(option);
  }

  function handleChooseControlForm(option) {
    setCurrentControlForm(option);
  }

  function handleChangeStartDate(e) {
    setStartDate(e.target.value);
    if (e.target.value.length > 0) {
      if (e.target.checkValidity()) {
        setStartDateError({ text: '', isShow: false });
      } else {
        setStartDateError({ text: 'Укажите корректную дату', isShow: true });
      }
    } else {
      setStartDateError({ text: '', isShow: false });
    }
  }

  function handleChangeEndDate(e) {
    setEndDate(e.target.value);
    if (e.target.value.length > 0) {
      if (e.target.checkValidity()) {
        setEndDateError({ text: '', isShow: false });
      } else {
        setEndDateError({ text: 'Укажите корректную дату', isShow: true });
      }
    } else {
      setEndDateError({ text: '', isShow: false });
    }
  }

    React.useEffect(() => {
      if (
        nameError.isShow ||
        name.length < 1 ||
        startDateError.isShow ||
        startDate.length < 1 ||
        endDateError.isShow ||
        endDate.length < 1
        ) {
        setIsBlockSubmitButton(true);
      } else {
        setIsBlockSubmitButton(false);
      }
    // eslint-disable-next-line
    }, [name, startDate, endDate, currentTutor, currentTutorVed, currentCourse, currentControlForm]);

  React.useEffect(() => {
    setName(item.name);
    setCurrentTutor({...item.lector, name: item.lector.fullname});
    setCurrentTutorVed({...item.vedomost_lector, name: item.vedomost_lector.fullname});
    setCurrentCourse(item.course);
    setCurrentControlForm(item.control);
    setIsBlockSubmitButton(true);
    setStartDate(formatDateForInput(item.start_date));
    setEndDate(formatDateForInput(item.end_date));
    return(() => {
      setName('');
      setCurrentTutor({});
      setCurrentTutorVed({});
      setCurrentCourse({});
      setCurrentControlForm({});
      setStartDate('');
      setEndDate('');
    })
  }, [item]);

  return (
    <Popup
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
      onClickOutside={false}
      formWidth={'medium'}
      formName={'control-semester-item-edit-popup'}
    >
      <h2 className='popup__title'>Управление дисциплиной</h2>

      <div className='popup__field'>
        <h4 className='popup__input-caption'>Название:</h4>
        <div className='popup__input-field'>
          <input 
          className='popup__input'
          type='text'
          id='control-semester-item-edit-name'
          value={name}
          onChange={handleChangeName}
          name='control-semester-item-edit-name' 
          placeholder='Введите название...'
          autoComplete='off'
          required 
          />
        </div>
        <span className={`popup__input-error ${nameError.isShow ? 'popup__input-error_status_show' : ''}`}>
          {nameError.text}
        </span>
      </div>

      <div className='popup__field'>
        <h4 className='popup__input-caption'>Электронный контент:</h4>
        <SelectSearch options={courses} currentOption={currentCourse} onChooseOption={handleChooseCourse} />
        <span className={`popup__input-error popup__input-error_status_show`}></span>
      </div>

      <div className='popup__field'>
        <h4 className='popup__input-caption'>Преподаватель:</h4>
        <SelectSearch options={tutors} currentOption={currentTutor} onChooseOption={handleChooseTutor} />
        <span className={`popup__input-error popup__input-error_status_show`}></span>
      </div>

      <div className='popup__field'>
        <h4 className='popup__input-caption'>Преподаватель в ведомости:</h4>
        <SelectSearch options={tutors} currentOption={currentTutorVed} onChooseOption={handleChooseTutorVed} />
        <span className={`popup__input-error popup__input-error_status_show`}></span>
      </div>

      <div className='popup__field'>
        <h4 className='popup__input-caption'>Форма контроля:</h4>
        <PopupSelect options={controlForms} currentOption={currentControlForm} onChooseOption={handleChooseControlForm} />
        <span className={`popup__input-error popup__input-error_status_show`}></span>
      </div>

      <div className='popup__field'>
        <h4 className='popup__input-caption'>Дата начала:</h4>
        <div className='popup__input-field'>
        <input 
          className='popup__input popup__input_type_date'
          type='date'
          id='control-semester-item-edit-start-date'
          value={startDate}
          onChange={handleChangeStartDate}
          name='control-semester-item-edit-start-date' 
          placeholder='Укажите дату...'
          min='2000-01-01'
          max='2100-01-01'
          autoComplete='off'
          required 
        />
        </div>
        <span className={`popup__input-error ${startDateError.isShow ? 'popup__input-error_status_show' : ''}`}>
          {startDateError.text}
        </span>
      </div>

      <div className='popup__field'>
        <h4 className='popup__input-caption'>Дата окончания:</h4>
        <div className='popup__input-field'>
        <input 
          className='popup__input popup__input_type_date'
          type='date'
          id='control-semester-item-edit-end-date'
          value={endDate}
          onChange={handleChangeEndDate}
          name='control-semester-item-edit-end-date' 
          placeholder='Укажите дату...'
          min='2000-01-01'
          max='2100-01-01'
          autoComplete='off'
          required 
        />
        </div>
        <span className={`popup__input-error ${endDateError.isShow ? 'popup__input-error_status_show' : ''}`}>
          {endDateError.text}
        </span>
      </div>

      <div className='popup__btn-container'>
        <button className='popup__btn-cancel' type='button' onClick={() => onClose()}>Назад</button>
        <button className='popup__btn-remove' type='button' onClick={() => onRemove(item)}>Удалить</button>
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

export default ControlSemesterItemEditPopup;
