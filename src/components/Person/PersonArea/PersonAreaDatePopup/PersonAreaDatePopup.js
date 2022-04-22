import React from 'react';
import Popup from '../../../Popup/Popup.js';

function PersonAreaDatePopup({ isOpen, onClose, currentUser }) {

  const [date, setDate] = React.useState(currentUser.birthDate || '');
  const [dateError, setDateError] = React.useState({ isShow: false, text: '' });

  const [isBlockSubmitButton, setIsBlockSubmitButton] = React.useState(true);

  const isShowRequestError = false;

  function handleSubmit(e) {
    e.preventDefault();
    console.log(date);
  }

  function handleChangeDate(e) {
    setDate(e.target.value);
    if (e.target.checkValidity()) {
      setDateError({ text: '', isShow: false });
    } else {
      setDateError({ text: 'Укажите корректную дату', isShow: true });
    }
  }

  React.useEffect(() => {
    if (date.length < 10 || dateError.isShow) {
      setIsBlockSubmitButton(true);
    } else {
      setIsBlockSubmitButton(false);
    }
  // eslint-disable-next-line
  }, [date]);

  React.useEffect(() => {
    setDate(currentUser.birthDate || '');
    setDateError({ text: '', isShow: false });
    setIsBlockSubmitButton(true);
  }, [isOpen, currentUser]);

  return (
    <Popup isOpen={isOpen} onClose={onClose} >
      <form className='popup__form popup__form_type_small' name='person-area-change-date-popup' action='#' noValidate onSubmit={handleSubmit}>
        <h2 className='popup__title'>Дата рождения</h2>

        <label className='popup__field'>
          <h4 className='popup__input-caption'>Укажите вашу дату рождения:</h4>
          <div className='popup__input-field'>
            <input 
            className='popup__input'
            type='date'
            id='person-area-date'
            value={date}
            onChange={handleChangeDate}
            name='person-area-date' 
            placeholder='Укажите дату...'
            min='1900-01-01'
            max='2100-01-01'
            autoComplete='off'
            required 
            />

          </div>
          <span className={`popup__input-error ${dateError.isShow ? 'popup__input-error_status_show' : ''}`}>
            {dateError.text}
          </span>
        </label>

        <div className='popup__btn-container'>
          <button className='popup__btn-cancel' type='button' onClick={() => onClose()}>Отменить</button>
          <button className={`popup__btn-save ${isBlockSubmitButton ? 'popup__btn-save_type_block' : ''}`} type='submit'>Сохранить</button>
        </div>
        <span className={`popup__input-error ${isShowRequestError && 'popup__input-error_status_show'}`}>К сожалению, произошла ошибка</span>
      </form>
    </Popup>
  )
}

export default PersonAreaDatePopup;