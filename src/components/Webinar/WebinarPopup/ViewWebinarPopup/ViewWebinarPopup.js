import React from 'react';
import Popup from '../../../Popup/Popup.js';
import './ViewWebinarPopup.css';
import * as webinarApi from '../../../../utils/webinarApi.js';
import PreloaderPopup from '../../../Preloader/PreloaderPopup/PreloaderPopup.js';

function ViewWebinarPopup({ isOpen, onClose, currentWebinarId }) {

  const [isLoadingInfo, setIsLoadingInfo] = React.useState(true);

  const [currentWebinar, setCurrentWebinar] = React.useState({});

  function renderStatus(status) {
    switch(status) {
      case 'completed':
        return ( 
          <div className='status'>
            <p className='table__text'>Завершен</p>
          </div>
        )
      
        case 'canceled':
          return ( 
            <div className='status'>
              <p className='table__text'>Отменен</p>
            </div>
          )

      default:
        return ( 
          <div className='status'>
            <p className='table__text'>Планируется</p>
          </div>
        )
    }
  }

  function handleSubmit(e) {
    e.preventDefault();
    onClose();
  }

  function getWebinarInfo() {
    setIsLoadingInfo(true);
    const token = localStorage.getItem('token');
    webinarApi.getWebinarInfo({ token: token, webinarId: currentWebinarId })
    .then((res) => {
      console.log('webinar', res);
      setCurrentWebinar(res);
    })
    .catch((err) => {
      console.error(err);
    })
    .finally(() => {  
      setIsLoadingInfo(false);
    });
  }

  React.useEffect(() => {
    setIsLoadingInfo(true);
    getWebinarInfo();

    return(() => {
      setCurrentWebinar({});
    })

  // eslint-disable-next-line
  }, [isOpen]);

  return (
    <Popup
    isOpen={isOpen}
    onSubmit={handleSubmit}
    formWidth={'large'}
    formName={'student-view-webinar-popup'}
    >

      {
        isLoadingInfo 
        ?
        <PreloaderPopup />
        :
        <>
        <div className='popup__author'>
          {
            currentWebinar.speakers.length < 1 
            ?
            <h4 className='popup__author-name'>{currentWebinar.name || ''}</h4>
            :
            <>
            {
              currentWebinar.speakers[0].avatar
              ?
              <img className='popup__author-img' src={currentWebinar.speakers[0].avatar} alt='аватар'></img>
              :
              <div className='popup__author-img'></div>
            }
            <div className='popup__author-info'>
              <p className='popup__author-description'>{currentWebinar.speakers[0].fullname || ''}</p>    
              <h4 className='popup__author-name'>{currentWebinar.name || ''}</h4>
            </div>
            </>
          }
        </div>
          
        <div className='popup__row'>
          <div className='popup__row-item'>
            <h6 className='popup__row-title popup__row-title_margin_right'>Дата:</h6>
            <p className='popup__row-text'>{currentWebinar.date || ''}</p>
          </div>
          <div className='popup__row-item'>
            <h6 className='popup__row-title popup__row-title_margin_right'>Длительность:</h6>
            <p className='popup__row-text'>{currentWebinar.duration || ''} мин.</p> 
          </div>
        </div>

        <div className='popup__row'>
          <div className='popup__row-item'>
            <h6 className='popup__row-title popup__row-title_margin_right'>Статус:</h6>
            {renderStatus(currentWebinar.status)}
          </div>
          <div className='popup__row-item'>
            <h6 className='popup__row-title popup__row-title_margin_right'>Ссылка:</h6>
            {
              currentWebinar.status === 'completed' 
              ?
              <a className='popup__row-text popup__text_type_link' href={currentWebinar.recordLink} target='_blank' rel='noreferrer'>Запись</a>
              :
              <a className='popup__row-text popup__text_type_link' href={currentWebinar.link} target='_blank' rel='noreferrer'>Комната</a>
            }
          </div>
        </div>

        <div className='popup__row'>
          <h6 className='popup__row-title'>Примечание:</h6>
        </div>
        <p className='popup__textarea popup__textarea_height_small scroll-inside'>{currentWebinar.description || ''}</p>

        {
          currentWebinar.files.length < 1 
          ?
          <div className=''></div>
          :
          <div className='popup__row'>
            <h6 className='popup__row-title'>Материалы:</h6>
          </div>
        }
        </>
      }
  
      <div className='popup__btn_margin_top'></div>
      <button className='popup__btn-back' type='submit'>Назад</button>

    </Popup>
  )
}

export default ViewWebinarPopup;