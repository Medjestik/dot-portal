import React from 'react';
import Popup from '../../../Popup/Popup.js';
import PopupSelect from '../../../Popup/PopupSelect/PopupSelect.js';

function AdminSetMarkPopup({ isOpen, onClose, currentStudent, disciplineInfo, setMark, isLoadingRequest, isShowRequestError }) {

  const [isBlockSubmitButton, setIsBlockSubmitButton] = React.useState(true);

  const [currentMark, setCurrentMark] = React.useState(currentStudent.mark);
  const [markText, setMarkText] = React.useState('');

  console.log(currentStudent);
  console.log(disciplineInfo);

  function handleSubmit(e) {
    e.preventDefault();
    const data = { mark: currentMark, text: markText };
    setMark(data);
  }

  function handleChooseMark(option) {
    setCurrentMark(option);
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
    })
  }, []);

  return (
    <Popup
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
      formWidth={'medium'}
      formName={'admin-set-mark-popup'}
    >
      <h2 className='popup__title'>Выберите оценку и введите комментарий</h2>
      <p className='popup__author-text'><span className='popup__author-text_weight_bold'>Студент: </span>{currentStudent.student.fullname}</p>

      <div className='popup__field'>
        <h4 className='popup__input-caption'>{disciplineInfo.type !== 'course' ? 'Оценка по дисциплине:' : 'Оценка за курсовую:'}</h4>
        <PopupSelect options={disciplineInfo.possible_marks} currentOption={currentMark} onChooseOption={handleChooseMark} />
      </div>

      {
        disciplineInfo.type === 'discipline' &&
        <div className='popup__field'>
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
        </div>
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

export default AdminSetMarkPopup;