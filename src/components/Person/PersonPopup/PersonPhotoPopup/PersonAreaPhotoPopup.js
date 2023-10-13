import React from 'react';
import Popup from '../../../Popup/Popup.js';
import GetBase64File from '../../../../custom/GetBase64File.js';

function PersonAreaPhotoPopup({ isOpen, onClose, currentUser, onChangePhoto, isLoadingRequest, isShowRequestError }) {

  const [fileName, setFileName] = React.useState(currentUser.avatar ? { isShow: true, name: currentUser.avatar.name, } : { isShow: false, name: '', });
  const [isShowWrongType, setIsShowWrongType] = React.useState(false);
  const [contentFile, setContentFile] = React.useState({ file: null, });
  const [isBlockSubmitButton, setIsBlockSubmitButton] = React.useState(true);

  const formRef = React.createRef();

  function handleSubmit(e) {
    e.preventDefault();
    onChangePhoto(fileName.name, contentFile.file);
  }

  function removeUploadFile() {
    setContentFile({ file: null, });
    setFileName({ isShow: false, name: '', });
    setIsBlockSubmitButton(false);
  }

  function handleChangePhoto(e) {
    setIsShowWrongType(false);
    setFileName({ isShow: false, name: '' });
    if (e.target.files.length > 0) {
      if (e.target.files[0].name.match(/.(jpg|jpeg|bmp|png)$/i)) {
        let file = e.target.files[0];
        GetBase64File(file)
        .then(result => {
          file['base64'] = result;
          setFileName({ isShow: true, name: file.name });
          setContentFile({ file: file.base64 });
          setIsBlockSubmitButton(false);
        })
        .catch(err => {
          console.log(err);
        });
      } else {
        setFileName({ isShow: false, name: e.target.files[0].name });
        setIsShowWrongType(true);
        setContentFile({ file: null, });
        setIsBlockSubmitButton(true);
      }
      formRef.current.reset();
    } else {
      setContentFile({ file: null, });
      setIsBlockSubmitButton(true);
    }
  }

  return (
    <Popup 
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
      formWidth={'small'}
      formName={'person-area-photo-popup'}
    >
      <h2 className='popup__title'>Фотография</h2>
      <p className='popup__subtitle'>Загрузите вашу фотографию:</p>
      <div className='popup__upload-section'>
        <div className='popup__upload-text-container'>
          <p className='popup__upload-text'>{fileName.isShow ? fileName.name : ''}</p>
        </div>
        <label htmlFor='person-area-photo-upload' className='btn-icon btn-icon_type_upload btn-icon_color_accent-blue'></label>
        <input onChange={handleChangePhoto} id='person-area-photo-upload' name='person-area-photo-upload' className='popup__upload-input' type="file" />
        <button className='btn-icon btn-icon_type_cancel btn-icon_color_accent-orange btn-icon_margin_left' type='button' onClick={removeUploadFile}></button>
      </div>
      <span className={`popup__input-error ${isShowWrongType && 'popup__input-error_status_show'}`}>Неверный формат файла</span>
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

export default PersonAreaPhotoPopup;