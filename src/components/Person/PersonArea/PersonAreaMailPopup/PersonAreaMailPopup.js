import React from 'react';
import Popup from '../../../Popup/Popup.js';

function PersonAreaMailPopup({ isOpen, onClose }) {

  const [mail, setMail] = React.useState('');
  const [mailError, setMailError] = React.useState({ isShow: false, text: '' });

  const [isBlockSubmitButton, setIsBlockSubmitButton] = React.useState(true);

  const isShowRequestError = false;

  function handleSubmit(e) {
    e.preventDefault();
  }


  function handleChangeMail(e) {
    setMail(e.target.value);
    if (e.target.checkValidity()) {
      setMailError({ text: '', isShow: false });
    } else {
      setMailError({ text: 'Укажите корректную почту', isShow: true });
    }
  }


  React.useEffect(() => {
    if (mail.length < 1 || mailError.isShow) {
      setIsBlockSubmitButton(true);
    } else {
      setIsBlockSubmitButton(false);
    }
  // eslint-disable-next-line
  }, [mail]);

  React.useEffect(() => {
    setMail('');
    setMailError({ text: '', isShow: false });
    setIsBlockSubmitButton(true);
  }, [isOpen]);

  return (
    <Popup isOpen={isOpen} onClose={onClose} >
      <form className='popup__form popup__form_type_small' name='person-area-change-mail-popup' action='#' noValidate onSubmit={handleSubmit}>
        <h2 className='popup__title'>Почта</h2>

        <label className='popup__field'>
          <h4 className='popup__input-caption'>Укажите ваш актуальный e-mail для связи:</h4>
          <div className='popup__input-field'>
            <input 
            className='popup__input'
            type='email'
            id='person-area-mail'
            value={mail}
            onChange={handleChangeMail}
            name='person-area-mail' 
            placeholder='Укажите вашу почту...'
            autoComplete='off'
            required 
            />

          </div>
          <span className={`popup__input-error ${mailError.isShow ? 'popup__input-error_status_show' : ''}`}>
            {mailError.text}
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

export default PersonAreaMailPopup;