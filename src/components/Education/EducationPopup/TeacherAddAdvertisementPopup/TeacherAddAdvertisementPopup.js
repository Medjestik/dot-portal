import React from 'react';
import Popup from '../../../Popup/Popup.js';
import './TeacherAddAdvertisementPopup.css';

function TeacherAddAdvertisementPopup({ isOpen, onClose, onAdd, isLoadingRequest, isShowRequestError }) {

  const [isBlockSubmitButton, setIsBlockSubmitButton] = React.useState(true); 

  const [title, setTitle] = React.useState('');
  const [titleError, setTitleError] = React.useState({ isShow: false, text: '' });
  const [text, setText] = React.useState('');

  function handleSubmit(e) {
    e.preventDefault();
    const data = { title: title, text: text };
    onAdd(data);
  }

  function handleChangeTitle(e) {
    setTitle(e.target.value);
    if (e.target.checkValidity()) {
      setTitleError({ text: '', isShow: false });
    } else {
      setTitleError({ text: 'Поле не может быть пустым', isShow: true });
    }
  }

  function handleChangeText(e) {
    setText(e.target.value);
  }

  React.useEffect(() => {
    if (titleError.isShow || title.length < 1) {
      setIsBlockSubmitButton(true);
    } else {
      setIsBlockSubmitButton(false);
    }
  // eslint-disable-next-line
  }, [title]);

  React.useEffect(() => {
    setTitle('');
    setTitleError({ text: '', isShow: false });
    setText('');
    setIsBlockSubmitButton(true);
    return(() => {
    })
  }, [isOpen]);

  return (
    <Popup
      isOpen={isOpen}
      onSubmit={handleSubmit}
      formWidth={'medium'}
      formName={'education-teacher-add-advertisement-popup'}
    >
      <h2 className='popup__title'>Создание объявления</h2>

      <label className='popup__field'>
        <h4 className='popup__input-caption'>Заголовок:</h4>
        <div className='popup__input-field'>
          <input 
          className='popup__input'
          type='text'
          id='teacher-add-advertisement-title'
          value={title}
          onChange={handleChangeTitle}
          name='teacher-add-advertisement-title' 
          placeholder='Введите текст заголовка..'
          autoComplete='off'
          minLength={1}
          required 
          />

        </div>
        <span className={`popup__input-error ${titleError.isShow ? 'popup__input-error_status_show' : ''}`}>
          {titleError.text}
        </span>
      </label>

      <label className='popup__field'>
        <h4 className='popup__input-caption'>Текст:</h4>
        <textarea 
          className='popup__textarea scroll'
          name='teacher-add-advertisement-text' 
          placeholder='Введите текст объявления..'            
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

export default TeacherAddAdvertisementPopup;