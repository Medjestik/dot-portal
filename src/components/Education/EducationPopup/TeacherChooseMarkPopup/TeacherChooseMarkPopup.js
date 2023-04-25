import React from 'react';
import Popup from '../../../Popup/Popup.js';
import './TeacherChooseMarkPopup.css';
import PopupSelect from '../../../Popup/PopupSelect/PopupSelect.js';

function TeacherChooseMarkPopup({ isOpen, onClose, currentStudent, disciplineInfo, setMark, isLoadingRequest, isShowRequestError }) {

  const [isBlockSubmitButton, setIsBlockSubmitButton] = React.useState(true);

  const [currentMark, setCurrentMark] = React.useState(currentStudent.mark);
  const [currentCourseMark, setCurrentCourseMark] = React.useState(currentStudent.course_mark);
  const [markText, setMarkText] = React.useState('');

  function handleSubmit(e) {
    e.preventDefault();
    const data = { mark: currentMark, courseMark: currentCourseMark, text: markText };
    setMark(data);
  }

  function handleChooseMark(option) {
    setCurrentMark(option);
    setIsBlockSubmitButton(false);
  }

  function handleChooseCourseMark(option) {
    setCurrentCourseMark(option);
    setIsBlockSubmitButton(false);
  }

  function handleChangeText(e) {
    setMarkText(e.target.value);
    setIsBlockSubmitButton(false);
  }

  React.useEffect(() => {
    setMarkText('');
    setIsBlockSubmitButton(true);

    return(() => {
      setCurrentMark({});
      setCurrentCourseMark({});
    })
  }, []);

  return (
    <Popup
      isOpen={isOpen}
      onSubmit={handleSubmit}
      formWidth={'medium'}
      formName={'education-teacher-choose-mark-popup'}
    >
      <h2 className='popup__title'>Выберите оценку и введите комментарий</h2>
      <p className='popup__author-text'><span className='popup__author-text_weight_bold'>Студент: </span>{currentStudent.student.fullname}</p>

      <div className='popup__field'>
        <h4 className='popup__input-caption'>Оценка по дисциплине:</h4>
        <PopupSelect options={disciplineInfo.possible_marks} currentOption={currentMark} onChooseOption={handleChooseMark} />
      </div>

      {
        disciplineInfo.course_work &&
        <div className='popup__field'>
          <h4 className='popup__input-caption'>Оценка за курсовую работу:</h4>
          <PopupSelect options={disciplineInfo.possible_marks} currentOption={currentCourseMark} onChooseOption={handleChooseCourseMark} />
        </div>
      }

      <label className='popup__field'>
        <h4 className='popup__input-caption'>Комментарий:</h4>
        <textarea 
          className='popup__textarea scroll'
          name='teacher-choose-mark-text' 
          placeholder='Введите комментарий..'            
          value={markText}
          onChange={handleChangeText}
          required
        >
        </textarea>
      </label>

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

export default TeacherChooseMarkPopup;