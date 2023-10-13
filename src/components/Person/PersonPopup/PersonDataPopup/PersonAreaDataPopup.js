import React from 'react';
import Popup from '../../../Popup/Popup.js';
import InputMask from 'react-input-mask';

function PersonAreaDataPopup({ isOpen, onClose, currentUser, onChangeData, isLoadingRequest, isShowRequestError }) {

  const [date, setDate] = React.useState(currentUser.birthDate || '');
  const [dateError, setDateError] = React.useState({ isShow: false, text: '' });
  const [identifier, setIdentifier] = React.useState(currentUser.snils || '');
  const [identifierError, setIdentifierError] = React.useState({ isShow: false, text: '' });
  const [phone, setPhone] = React.useState(currentUser.phone || '');
  const [phoneError, setPhoneError] = React.useState({ isShow: false, text: '' });
  const [mail, setMail] = React.useState(currentUser.email || '');
  const [mailError, setMailError] = React.useState({ isShow: false, text: '' });

  const [isBlockSubmitButton, setIsBlockSubmitButton] = React.useState(true);

  function handleSubmit(e) {
    e.preventDefault();
    const personData = {
      birthDate: date,
      snils: identifier,
      phone: phone,
      email: mail,
    }
    onChangeData(personData)
  }

  function handleChangeDate(e) {
    setDate(e.target.value);
    if (e.target.value.length > 0) {
      if (e.target.checkValidity()) {
        setDateError({ text: '', isShow: false });
      } else {
        setDateError({ text: 'Укажите корректную дату', isShow: true });
      }
    } else {
      setDateError({ text: '', isShow: false });
    }
  }

  function handleChangeIdentifier(e) {
    setIdentifier(e.target.value);
    if (e.target.value.match(/[0-9]/)) {
      if (e.target.value.includes('_')) {
        setIdentifierError({ text: 'Укажите корректный номер снилс', isShow: true });    
      } else {
        setIdentifierError({ text: '', isShow: false });
      }
    } else {
      setIdentifierError({ text: '', isShow: false });
    }
  }

  function handleChangePhone(e) {
    setPhone(e.target.value);
    if (e.target.value.match(/[0-9]/)) {
      if (e.target.value.includes('_')) {
        setPhoneError({ text: 'Укажите корректный номер телефона', isShow: true });
      } else {
        setPhoneError({ text: '', isShow: false });
      }
    } else {
      setPhoneError({ text: '', isShow: false });
    }
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
    if (dateError.isShow || identifierError.isShow || phoneError.isShow || mailError.isShow) {
      setIsBlockSubmitButton(true);
    } else {
      setIsBlockSubmitButton(false);
    }
  // eslint-disable-next-line
  }, [date, identifier, phone, mail]);


  React.useEffect(() => {
    setDate(currentUser.birthDate || '');
    setDateError({ text: '', isShow: false });
    setIdentifier(currentUser.snils || '');
    setIdentifierError({ text: '', isShow: false });
    setPhone(currentUser.phone || '');
    setPhoneError({ text: '', isShow: false });
    setMail(currentUser.email || '');
    setMailError({ text: '', isShow: false });
    setIsBlockSubmitButton(true);
  }, [isOpen, currentUser]);

  return (
    <Popup
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
      formWidth={'medium'}
      formName={'person-area-change-data-popup'}
    >
      <h2 className='popup__title'>Персональные данные</h2>

      <label className='popup__field'>
        <h4 className='popup__input-caption'>Дата рождения:</h4>
        <div className='popup__input-field'>
          <input 
          className='popup__input popup__input_type_date'
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

      <label className='popup__field'>
        <h4 className='popup__input-caption'>Cтраховой номер индивидуального лицевого счета:</h4>
        <div className='popup__input-field'>
        <InputMask mask='999 999 999 99' 
          className='popup__input'
          placeholder='Укажите ваш снилс...'
          type='tel'
          id='person-area-identifier'
          name='person-area-identifier'
          value={identifier}
          onChange={handleChangeIdentifier}
          required
          autoComplete="off"
        />
        </div>
        <span className={`popup__input-error ${identifierError.isShow ? 'popup__input-error_status_show' : ''}`}>
          {identifierError.text}
        </span>
      </label>

      <label className='popup__field'>
        <h4 className='popup__input-caption'>Номер мобильного телефона:</h4>
        <div className='popup__input-field'>
        <InputMask mask='9 (999) 999-99-99' 
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

      <label className='popup__field'>
        <h4 className='popup__input-caption'>Электронная почта:</h4>
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

export default PersonAreaDataPopup;