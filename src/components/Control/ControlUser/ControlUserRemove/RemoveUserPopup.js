import React from 'react';
import Popup from '../../../Popup/Popup';
import { useNavigate } from 'react-router-dom';

function RemoveUserPopup({ isOpen, popupName, onSubmit }) {

  const navigate = useNavigate();

  function handleSubmit(e) {
    e.preventDefault();
    onSubmit();
  }

  const handleExit = () => {
    navigate('/control');
  }

  return (
    <Popup
      isOpen={isOpen}
      onClose={() => {}}
      onSubmit={handleSubmit}
      formWidth={'small'}
      formName={popupName}
    >
      <h2 className='popup__title'>Действие выполнено успешно</h2>
      <p className='popup__subtitle'>Выберите следующее действие</p>

      <div className='popup__btn-container'>
        <button className='popup__btn-cancel' type='button' onClick={handleExit}>Выйти в меню</button>
        <button className='popup__btn-save' type='submit'>Отчислить еще</button>
      </div>
    </Popup>
  )
}

export default RemoveUserPopup; 
