import React from 'react';
import Popup from '../../../Popup/Popup.js';
import './TeacherEditCommentPopup.css';

function TeacherEditCommentPopup({ isOpen, onClose, currentStudent, currentComment, onEdit, isLoadingRequest, isShowRequestError }) {

  const [isBlockSubmitButton, setIsBlockSubmitButton] = React.useState(true);

  const [text, setText] = React.useState('');

  function handleSubmit(e) {
    e.preventDefault();
    const data = { ...currentComment, text: text };
    onEdit(data);
  }

  function handleChangeText(e) {
    setText(e.target.value);
    if (e.target.value.length > 0) {
      setIsBlockSubmitButton(false);
    } else {
      setIsBlockSubmitButton(true);
    }
  }

  React.useEffect(() => {
    setText(currentComment.text);
    setIsBlockSubmitButton(true);

    return(() => {
    })
  }, [currentComment]);

  return (
    <Popup
      isOpen={isOpen}
      onSubmit={handleSubmit}
      formWidth={'medium'}
      formName={'education-teacher-edit-comment-popup'}
    >
      <h2 className='popup__title'>Редактирование комментария</h2>
      <p className='popup__subtitle'>Студент: {currentStudent.student.fullname}</p>

      <label className='popup__field'>
        <h4 className='popup__input-caption'>Комментарий:</h4>
        <textarea 
          className='popup__textarea scroll'
          name='teacher-edit-comment-text' 
          placeholder='Введите комментарий..'            
          value={text}
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

export default TeacherEditCommentPopup;