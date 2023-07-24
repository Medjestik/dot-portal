import React from 'react';
import Popup from '../../../Popup/Popup.js';
import GetBase64File from '../../../../custom/GetBase64File.js';

function AdminAddPracticeOrderPopup({ isOpen, onClose, onAdd, isLoadingRequest, isShowRequestError }) {
 
    const [number, setNumber] = React.useState('');
    const [numberError, setNumberError] = React.useState({ isShow: false, text: '' });
    const [description, setDescription] = React.useState('');
    const [date, setDate] = React.useState('');
    const [dateError, setDateError] = React.useState({ isShow: false, text: '' });

    const [fileName, setFileName] = React.useState({ isShow: false, name: '', });
    const [fileError, setFileError] = React.useState({ isShow: false, text: '' });
    const [contentFile, setContentFile] = React.useState({ file: null, });

    const [isBlockSubmitButton, setIsBlockSubmitButton] = React.useState(true);

  function handleSubmit(e) {
    e.preventDefault();
    const data = {
        number: number,
        date: date,
        description: description,
        file: contentFile.file,
        fileName: fileName.name,
    }
    onAdd(data)
  }

  function handleChangeNumber(e) {
    setNumber(e.target.value);
    if (e.target.checkValidity()) {
        setNumberError({ text: '', isShow: false });
    } else {
        setNumberError({ text: 'Номер приказа не может быть пустым', isShow: true });
    }
  }

  function handleChangeDescription(e) {
    setDescription(e.target.value);
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

  function handleChangeFile(e) {
    setFileName({ isShow: false, name: '' });
    if (e.target.files.length > 0) {

      let file = e.target.files[0];
      if(file.size > 10485760) {
        setFileError({ text: 'Размер файла превышает 10 MB', isShow: true });
      } else {
        setFileError({ text: '', isShow: false });
        GetBase64File(file)
        .then(result => {
          file['base64'] = result;
          setFileName({ isShow: true, name: file.name });
          setContentFile({ file: file.base64 });
        })
        .catch(err => {
          console.log(err);
        });
      }
    }
  }

  React.useEffect(() => {
    if (numberError.isShow || number.length < 1 || dateError.isShow || date.length < 1) {
      setIsBlockSubmitButton(true);
    } else {
      setIsBlockSubmitButton(false);
    }
  // eslint-disable-next-line
  }, [number, date]);

  React.useEffect(() => {
    setNumber('');
    setDescription('');
    setDate('');

    setIsBlockSubmitButton(true);
  }, [isOpen,]);

  return (
    <Popup
      isOpen={isOpen}
      onSubmit={handleSubmit}
      formWidth={'medium'}
      formName={'admin-add-practice-order-popup'}
    >
      <h2 className='popup__title'>Создание приказа</h2>

      <div className='popup__field'>
        <h4 className='popup__input-caption'>Укажите номер приказа:</h4>
        <div className='popup__input-field'>
          <input 
          className='popup__input'
          type='text'
          id='add-practice-order-number'
          value={number}
          onChange={handleChangeNumber}
          name='add-practice-order-number' 
          placeholder='Укажите номер...'
          autoComplete='off'
          minLength={1}
          required 
          />
        </div>
        <span className={`popup__input-error ${numberError.isShow ? 'popup__input-error_status_show' : ''}`}>
          {numberError.text}
        </span>
      </div>

      <div className='popup__field'>
        <h4 className='popup__input-caption'>Укажите дату приказа:</h4>
        <div className='popup__input-field'>
          <input 
          className='popup__input'
          type='date'
          id='add-practice-order-date'
          value={date}
          onChange={handleChangeDate}
          name='add-practice-order-date' 
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
      </div>

      <div className='popup__field'>
        <h4 className='popup__input-caption'>Описание:</h4>
        <textarea 
          className='popup__textarea scroll'
          name='edit-practice-description' 
          placeholder='Введите описание..'            
          value={description}
          onChange={handleChangeDescription}
          required
        >
        </textarea>
      </div>

      <div className='popup__field'>
        <h4 className='popup__input-caption'>Выберите файл:</h4>
        <div className='upload-form__container'>
          <div className='upload-form__section'>
            <label htmlFor='add-practice-order-file-upload' className='upload-form__field'>
              <p className='upload-form__text'>{fileName.isShow ? fileName.name : ''}</p>
              <div className='upload-form__icon'></div>
            </label>
            <input onChange={handleChangeFile} id='add-practice-order-file-upload' name='add-practice-order-file-upload' className='upload-form__input' type="file" />
          </div>
        </div>
        <span className={`popup__input-error ${fileError.isShow ? 'popup__input-error_status_show' : ''}`}>
          {fileError.text}
        </span>
      </div>

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

export default AdminAddPracticeOrderPopup;