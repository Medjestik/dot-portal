import React from 'react';
import Popup from '../../../Popup/Popup.js';

function PersonAreaChangePasswordPopup({ isOpen, onClose, onChangePassword, isLoadingRequest, isShowRequestError }) {

  const [currentPassword, setCurrentPassword] = React.useState('');
  const [isShowCurrentPassword, setIsShowCurrentPassword] = React.useState(false);
  const [currentPasswordError, setCurrentPasswordError] = React.useState({ isShow: false, text: '' });

  const [newPassword, setNewPassword] = React.useState('');
  const [isShowNewPassword, setIsShowNewPassword] = React.useState(false);
  const [newPasswordError, setNewPasswordError] = React.useState({ isShow: false, text: '' });

  const [repeatPassword, setRepeatPassword] = React.useState('');
  const [isShowRepeatPassword, setIsShowRepeatPassword] = React.useState(false);
  const [repeatPasswordError, setRepeatPasswordError] = React.useState({ isShow: false, text: '' });

  const [isBlockSubmitButton, setIsBlockSubmitButton] = React.useState(true);

  function handleSubmit(e) {
    e.preventDefault();
    onChangePassword(currentPassword, newPassword);
  }

  function changeCurrentPassword(e) {
    setCurrentPassword(e.target.value);
    if (e.target.checkValidity()) {
      setCurrentPasswordError({ text: '', isShow: false });
    } else {
      setCurrentPasswordError({ text: 'Пароль должен содержать более 6 символов', isShow: true });
    }
  }

  function changeNewPassword(e) {
    setNewPassword(e.target.value);
    if (e.target.checkValidity()) {
      setNewPasswordError({ text: '', isShow: false });
    } else {
      setNewPasswordError({ text: 'Пароль должен содержать более 6 символов', isShow: true });
    }
  }

  function changeRepeatPassword(e) {
    setRepeatPassword(e.target.value);
    if (e.target.value === newPassword) {
      setRepeatPasswordError({ text: '', isShow: false });
    } else {
      setRepeatPasswordError({ text: 'Пароли не совпадают', isShow: true });
    }
  }

  React.useEffect(() => {
    if (currentPassword.length < 1 || newPassword.length < 1 || repeatPassword.length < 1 || currentPasswordError.isShow || newPasswordError.isShow || repeatPasswordError.isShow) {
      setIsBlockSubmitButton(true);
    } else {
      setIsBlockSubmitButton(false);
    }
  // eslint-disable-next-line
  }, [currentPassword, newPassword, repeatPassword]);

  React.useEffect(() => {
    setCurrentPassword('');
    setIsShowCurrentPassword(false);
    setCurrentPasswordError({ isShow: false, text: '' });
    setNewPassword('');
    setIsShowNewPassword(false);
    setNewPasswordError({ isShow: false, text: '' });
    setRepeatPassword('');
    setIsShowRepeatPassword(false);
    setRepeatPasswordError({ isShow: false, text: '' });
    setIsBlockSubmitButton(true);
  }, [isOpen]);

  return (
    <Popup isOpen={isOpen} onClose={onClose} >
      <form className='popup__form popup__form_type_small' name='person-area-change-password-popup' action='#' noValidate onSubmit={handleSubmit}>
        <h2 className='popup__title'>Изменение пароля</h2>

        <label className='popup__field'>
          <h4 className='popup__input-caption'>Текущий пароль:</h4>
          <div className='popup__input-field'>
            <input 
            className='popup__input popup__input_with_icon'
            type={isShowCurrentPassword ? 'text' : 'password'}
            id='currentPassword'
            value={currentPassword}
            onChange={changeCurrentPassword}
            name='currentPassword'
            placeholder='Введите ваш текущий пароль'
            minLength='6'
            autoComplete='off'
            required 
            />
            <div 
            className={`popup__input-icon 
            ${isShowCurrentPassword ? 'popup__input-icon-password_type_hide' : 'popup__input-icon-password_type_show' } 
            `} 
            onClick={() => setIsShowCurrentPassword(!isShowCurrentPassword)}>
            </div>
          </div>
          <span className={`popup__input-error ${currentPasswordError.isShow ? 'popup__input-error_status_show' : ''}`}>
            {currentPasswordError.text}
          </span>
        </label>

        <label className='popup__field'>
          <h4 className='popup__input-caption'>Пароль:</h4>
          <div className='popup__input-field'>
            <input 
            className='popup__input popup__input_with_icon'
            type={isShowNewPassword ? 'text' : 'password'} 
            id='newPassword'
            value={newPassword}
            onChange={changeNewPassword}
            name='newPassword'
            placeholder='Введите ваш новый пароль'
            minLength='6'
            autoComplete='off'
            required 
            />
            <div 
            className={`popup__input-icon 
            ${isShowNewPassword ? 'popup__input-icon-password_type_hide' : 'popup__input-icon-password_type_show' } 
            `} 
            onClick={() => setIsShowNewPassword(!isShowNewPassword)}>
            </div>
          </div>
          <span className={`popup__input-error ${newPasswordError.isShow ? 'popup__input-error_status_show' : ''}`}>
            {newPasswordError.text}
          </span>
        </label>

        <label className='popup__field'>
          <h4 className='popup__input-caption'>Повторите пароль:</h4>
          <div className='popup__input-field'>
            <input 
            className='popup__input popup__input_with_icon'
            type={isShowRepeatPassword ? 'text' : 'password'}
            id='repeatPassword'
            value={repeatPassword}
            onChange={changeRepeatPassword}
            name='repeatPassword' 
            placeholder='Повторите ваш новый пароль' 
            minLength='6'
            autoComplete='off'
            required 
            />
            <div 
            className={`popup__input-icon 
            ${isShowRepeatPassword ? 'popup__input-icon-password_type_hide' : 'popup__input-icon-password_type_show' } 
            `} 
            onClick={() => setIsShowRepeatPassword(!isShowRepeatPassword)}>
            </div>
          </div>
          <span className={`popup__input-error ${repeatPasswordError.isShow ? 'popup__input-error_status_show' : ''}`}>
            {repeatPasswordError.text}
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
      </form>
    </Popup>
  )
}

export default PersonAreaChangePasswordPopup;