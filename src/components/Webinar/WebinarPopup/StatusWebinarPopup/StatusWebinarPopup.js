import React from 'react';
import Popup from '../../../Popup/Popup.js';
import './StatusWebinarPopup.css';
import * as webinarApi from '../../../../utils/webinarApi.js';
import PreloaderPopup from '../../../Preloader/PreloaderPopup/PreloaderPopup.js';
import PopupSelect from '../../../Popup/PopupSelect/PopupSelect.js';

function StatusWebinarPopup({ isOpen, onClose, webinarId, onConfirm, isLoadingRequest, isShowRequestError }) {

  const [isLoadingInfo, setIsLoadingInfo] = React.useState(true);

  const [currentWebinar, setCurrentWebinar] = React.useState({});

  const [status, setStatus] = React.useState({});
  const [comment, setComment] = React.useState('');

  const statusOptions = [
    { name: 'Планируется', id: 'planned', },
    { name: 'Отменен', id: 'canceled', },
    { name: 'Завершен', id: 'completed', },
    { name: 'Проводится', id: 'active', },
  ]

  function handleSubmit(e) {
    e.preventDefault();
    onConfirm(currentWebinar, status, comment);
  }

  function getWebinarInfo(id) {
    setIsLoadingInfo(true);
    const token = localStorage.getItem('token');
    webinarApi.getWebinarItem({ token: token, webinarId: id })
    .then((res) => {
      setCurrentWebinar(res);
      setComment(res.description);
      setStatus(statusOptions.find((elem) => elem.id === res.status));
    })
    .catch((err) => {
      console.error(err);
    })
    .finally(() => {  
      setIsLoadingInfo(false);
    });
  }

  function handleChangeStatus(option) {
    setStatus(option);
  }

  function handleChangeComment(e) {
    setComment(e.target.value);
  }

  React.useEffect(() => {
    setIsLoadingInfo(true);
    getWebinarInfo(webinarId);

    return(() => {
      setCurrentWebinar({});
      setStatus({});
    })

  // eslint-disable-next-line
  }, [isOpen]);

  return (
    <Popup
    isOpen={isOpen}
    onClose={onClose}
    onSubmit={handleSubmit}
    formWidth={'medium'}
    formName={'control-status-webinar-popup'}
    >

      {
        isLoadingInfo 
        ?
        <PreloaderPopup />
        :
        <>

        <h2 className='popup__title'>Изменение статуса вебинара</h2>
        <p className='popup__author-text'><span className='popup__author-text_weight_bold'>Вебинар: </span>{currentWebinar.title}</p>

        <div className='popup__field'>
          <h4 className='popup__input-caption'>Статус вебинара:</h4>
          <PopupSelect options={statusOptions} currentOption={status} onChooseOption={handleChangeStatus} />
        </div>

        <label className='popup__field'>
          <h4 className='popup__input-caption'>Комментарий:</h4>
          <textarea 
            className='popup__textarea scroll'
            name='control-edit-webinar-comment'
            id='control-edit-webinar-comment'
            placeholder='Введите комментарий..'            
            value={comment}
            onChange={handleChangeComment}
            required
          >
          </textarea>
        </label>

        </>
      }
  
      <div className='popup__btn-container'>
        <button className='popup__btn-cancel' type='button' onClick={() => onClose()}>Назад</button>
        {
          isLoadingRequest ? 
          <button className='popup__btn-save popup__btn-save_type_loading' disabled type='button'>Сохранение..</button>
          :
          <button className={`popup__btn-save`} type='submit'>Сохранить</button>
        }
      </div>
      <span className={`popup__input-error ${isShowRequestError.isShow && 'popup__input-error_status_show'}`}>{isShowRequestError.text}</span>
  
    </Popup>
  )
}

export default StatusWebinarPopup;