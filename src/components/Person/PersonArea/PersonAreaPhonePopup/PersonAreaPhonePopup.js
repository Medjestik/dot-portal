import React from 'react';
import Popup from '../../../Popup/Popup.js';
import InputMask from 'react-input-mask';

function PersonAreaPhonePopup({ isOpen, onClose }) {

  const [phone, setPhone] = React.useState('');
  const [phoneError, setPhoneError] = React.useState({ isShow: false, text: '' });

  const [isBlockSubmitButton, setIsBlockSubmitButton] = React.useState(true);

  const isShowRequestError = false;

  function handleSubmit(e) {
    e.preventDefault();
  }


  function handleChangePhone(e) {
    setPhone(e.target.value);
  }


  React.useEffect(() => {
    if (phone.replace(/-|_/g, "").length > 15) {
      setIsBlockSubmitButton(false);
      setPhoneError({ text: '', isShow: false });
    } else {
      setIsBlockSubmitButton(true);
      setPhoneError({ text: 'Укажите корректный номер телефона', isShow: true });
    }
  // eslint-disable-next-line
  }, [phone]);

  React.useEffect(() => {
    setPhone('');
    setPhoneError({ text: '', isShow: false });
    setIsBlockSubmitButton(true);
  }, [isOpen]);

  return (
    <Popup isOpen={isOpen} onClose={onClose} >
      <form className='popup__form popup__form_type_small' name='person-area-change-phone-popup' action='#' noValidate onSubmit={handleSubmit}>
        <h2 className='popup__title'>Номер телефона</h2>

        <label className='popup__field'>
          <h4 className='popup__input-caption'>Укажите ваш актуальный номер мобильного телефона для связи:</h4>
          <div className='popup__input-field'>
          <InputMask mask='+7 (999) 999-99-99' 
            className='popup__input'
            placeholder='Укажите ваш номер телефона...'
            type='tel'
            id='person-area-phone'
            name='person-area-phone'
            value={phone}
            onChange={handleChangePhone}
            required
            autoComplete="off"
          />
          </div>
          <span className={`popup__input-error ${phoneError.isShow ? 'popup__input-error_status_show' : ''}`}>
            {phoneError.text}
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

export default PersonAreaPhonePopup;