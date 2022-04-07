import React from 'react';
import Popup from '../../../Popup/Popup.js';
import InputMask from 'react-input-mask';

function PersonAreaIdentifierPopup({ isOpen, onClose }) {

  const [identifier, setIdentifier] = React.useState('');
  const [identifierError, setIdentifierError] = React.useState({ isShow: false, text: '' });

  const [isBlockSubmitButton, setIsBlockSubmitButton] = React.useState(true);

  const isShowRequestError = false;

  function handleSubmit(e) {
    e.preventDefault();
  }

  function handleChangePhone(e) {
    setIdentifier(e.target.value);
  }

  React.useEffect(() => {
    if (identifier.replace(/-|_/g, "").length > 13) {
      setIsBlockSubmitButton(false);
      setIdentifierError({ text: '', isShow: false });
    } else {
      setIsBlockSubmitButton(true);
      setIdentifierError({ text: 'Укажите корректный номер снилс', isShow: true });
    }
  // eslint-disable-next-line
  }, [identifier]);

  React.useEffect(() => {
    setIdentifier('');
    setIdentifierError({ text: '', isShow: false });
    setIsBlockSubmitButton(true);
  }, [isOpen]);

  return (
    <Popup isOpen={isOpen} onClose={onClose} >
      <form className='popup__form popup__form_type_small' name='person-area-change-identifier-popup' action='#' noValidate onSubmit={handleSubmit}>
        <h2 className='popup__title'>СНИЛС</h2>

        <label className='popup__field'>
          <h4 className='popup__input-caption'>Укажите ваш страховой номер индивидуального лицевого счета:</h4>
          <div className='popup__input-field'>
          <InputMask mask='999 999 999 99' 
            className='popup__input'
            placeholder='Укажите ваш снилс...'
            type='tel'
            id='person-area-identifier'
            name='person-area-identifier'
            value={identifier}
            onChange={handleChangePhone}
            required
            autoComplete="off"
          />
          </div>
          <span className={`popup__input-error ${identifierError.isShow ? 'popup__input-error_status_show' : ''}`}>
            {identifierError.text}
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

export default PersonAreaIdentifierPopup;