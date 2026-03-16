import React from 'react';
import Popup from '../../Popup/Popup.js';

function UserPDPopup({ isOpen, onClose, currentUser, onChangeData, isLoadingRequest, isShowRequestError }) {

  const [agreement, setAgreement] = React.useState((currentUser.pers_data === 'true') ? true : false);

  const [isBlockSubmitButton, setIsBlockSubmitButton] = React.useState(true);

  function handleSubmit(e) {
    e.preventDefault();
    const personData = {
      pers_data: agreement,
    }
    onChangeData(personData)
  }

  React.useEffect(() => {
    if (agreement !== true) {
      setIsBlockSubmitButton(true);
    } else {
      setIsBlockSubmitButton(false);
    }
  // eslint-disable-next-line
  }, [agreement]);

  React.useEffect(() => {
    setIsBlockSubmitButton(true);
  }, [isOpen, currentUser]);

  return (
    <Popup
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
      formWidth={'medium'}
      formName={'user-change-pd-popup'}
    >
      <h2 className='popup__title'>Персональные данные</h2>
      <p className='popup__subtitle'>Для продолжения обучения ознакомьтесь с политикой конфиденциальности.</p>

      <a href='https://cloud.mail.ru/public/mRCd/2Y6K5T9d6' target='_blank' rel='noreferrer' className='popup__text popup__text-link'>Политика конфиденциальности РУТ (МИИТ)</a>

      <label className='checkbox checkbox_margin_top'>
        <input 
        name='user-agreement'
        type='checkbox'
        id='user-agreement'
        value={agreement}
        defaultChecked={agreement}
        onChange={() => setAgreement(!agreement)}
        >
        </input>
        <span>Согласие на обработку персональных данных</span>
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

export default UserPDPopup;