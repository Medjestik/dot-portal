import React from 'react';
import Popup from '../../../Popup/Popup';
import { useNavigate } from 'react-router-dom';

function CreateUserPopup({ isOpen, popupName, userId }) {

  const navigate = useNavigate();

  function handleSubmit(e) {
    e.preventDefault();
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
      <h2 className='popup__title'>Пользователь успешно создан</h2>
      <p className='popup__subtitle'>Выберите следующее действие</p>

      <div className='popup__btn-container'>
        <button className='popup__btn-cancel' type='button' onClick={handleExit}>Выйти в меню</button>
        <a className='popup__btn-save' href={`https://course.emiit.ru/view_print_form_true.html?print_form_id=6391746270594207484&user_id=${userId}`} target='_blank' rel='noreferrer'>Экспорт карточки</a>
      </div>
    </Popup>
  )
}

export default CreateUserPopup; 
