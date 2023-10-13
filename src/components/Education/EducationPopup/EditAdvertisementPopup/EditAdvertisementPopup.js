import React from 'react';
import Popup from '../../../Popup/Popup.js';
import * as educationApi from '../../../../utils/educationApi.js';
import PreloaderPopup from '../../../Preloader/PreloaderPopup/PreloaderPopup.js';


function EditAdvertisementPopup({ isOpen, onClose, currentAdvertisementId, onEdit, isLoadingRequest, isShowRequestError }) {

  const [isLoadingInfo, setIsLoadingInfo] = React.useState(true);

  const [isBlockSubmitButton, setIsBlockSubmitButton] = React.useState(true);

  const [title, setTitle] = React.useState('');
  const [titleError, setTitleError] = React.useState({ isShow: false, text: '' });
  const [text, setText] = React.useState('');

  const [currentAdvertisement, setCurrentAdvertisement] = React.useState({});

  function handleSubmit(e) {
    e.preventDefault();
    const data = { ...currentAdvertisement, title: title, text: text };
    onEdit(data);
  }

  function handleChangeTitle(e) {
    setTitle(e.target.value);
    if (e.target.checkValidity()) {
      setTitleError({ text: '', isShow: false });
    } else {
      setTitleError({ text: 'Поле не может быть пустым', isShow: true });
    }
  }

  function handleChangeText(e) {
    setText(e.target.value);
  }

  function getAdvertisementInfo() {
    setIsLoadingInfo(true);
    const token = localStorage.getItem('token');
    educationApi.getAdvertisementInfo({ token: token, advertisementId: currentAdvertisementId })
    .then((res) => {
      console.log('AdvertisementInfo', res);
      setCurrentAdvertisement(res);
      setTitle(res.title);
      setTitleError({ text: '', isShow: false });
      setText(res.text);
      setIsBlockSubmitButton(true);
    })
    .catch((err) => {
      console.error(err);
    })
    .finally(() => {  
      setIsLoadingInfo(false);
    });
  }

  React.useEffect(() => {
    if (titleError.isShow || title.length < 1) {
      setIsBlockSubmitButton(true);
    } else {
      setIsBlockSubmitButton(false);
    }
  // eslint-disable-next-line
  }, [isLoadingInfo, title]);

  React.useEffect(() => {
    setIsLoadingInfo(true);
    getAdvertisementInfo();

    return(() => {
      setCurrentAdvertisement({});
    })

  // eslint-disable-next-line
  }, [isOpen]);

  return (
    <Popup
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
      formWidth={'medium'}
      formName={'education-edit-advertisement-popup'}
    >
      {
      isLoadingInfo 
      ?
      <PreloaderPopup />
      :
      <>
      <h2 className='popup__title popup__title_margin_bottom'>Редактирование объявления</h2>

      <div className='popup__author'>
        {
        currentAdvertisement.authorImg
        ?
        <img className='popup__author-img popup__author-img_size_small' src={currentAdvertisement.authorImg} alt='аватар'></img>
        :
        <div className='popup__author-img popup__author-img_size_small'></div>
        }
        <div className='popup__author-info'>
          <h4 className='popup__author-title'>{currentAdvertisement.author}</h4>
          <p className='popup__author-text'><span className='popup__author-text_weight_bold'>Дата публикации: </span>{currentAdvertisement.date}</p>
        </div>
      </div>

      <label className='popup__field'>
        <h4 className='popup__input-caption'>Заголовок:</h4>
        <div className='popup__input-field'>
          <input 
          className='popup__input'
          type='text'
          id='edit-advertisement-title'
          value={title}
          onChange={handleChangeTitle}
          name='edit-advertisement-title' 
          placeholder='Введите текст заголовка..'
          autoComplete='off'
          minLength={1}
          required 
          />
        </div>
        <span className={`popup__input-error ${titleError.isShow ? 'popup__input-error_status_show' : ''}`}>
          {titleError.text}
        </span>
      </label>

      <label className='popup__field'>
        <h4 className='popup__input-caption'>Текст:</h4>
        <textarea 
          className='popup__textarea scroll'
          name='edit-advertisement-text' 
          placeholder='Введите текст объявления..'            
          value={text}
          onChange={handleChangeText}
          required
        >
        </textarea>
      </label>

      <div className='popup__btn-container'>
        <button className='popup__btn-cancel' type='button' onClick={() => onClose()}>Назад</button>
        {
          isLoadingRequest ? 
          <button className='popup__btn-save popup__btn-save_type_loading' disabled type='button'>Сохранение..</button>
          :
          <button className={`popup__btn-save ${isBlockSubmitButton ? 'popup__btn-save_type_block' : ''}`} type='submit'>Сохранить</button>
        }
      </div>
      <span className={`popup__input-error ${isShowRequestError.isShow && 'popup__input-error_status_show'}`}>{isShowRequestError.text}</span>
      </>
      }
    </Popup>
  )
}

export default EditAdvertisementPopup;