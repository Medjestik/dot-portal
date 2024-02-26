import React from 'react';
import Popup from '../../../Popup/Popup.js';
import * as educationApi from '../../../../utils/educationApi.js';
import PreloaderPopup from '../../../Preloader/PreloaderPopup/PreloaderPopup.js';
import GetBase64File from '../../../../custom/GetBase64File.js';
import Table from '../../../Table/Table.js';

function EditAdvertisementPopup({ isOpen, onClose, currentAdvertisementId, onEdit, isLoadingRequest, isShowRequestError }) {

  const [isLoadingInfo, setIsLoadingInfo] = React.useState(true);

  const [isBlockSubmitButton, setIsBlockSubmitButton] = React.useState(true);

  const [title, setTitle] = React.useState('');
  const [titleError, setTitleError] = React.useState({ isShow: false, text: '' });
  const [text, setText] = React.useState('');

  const [fileList, setFileList] = React.useState([]);

  const [fileError, setFileError] = React.useState({ isShow: false, text: '' });
  const [fileName, setFileName] = React.useState('');
  const [fileNameError, setFileNameError] = React.useState({ isShow: false, text: '' });
  
  const [urlName, setUrlName] = React.useState({ isShow: false, name: '', });
  const [contentFile, setContentFile] = React.useState({ file: null, });

  const [isBlockSaveButton, setIsBlockSaveButton] = React.useState(true);

  const [currentAdvertisement, setCurrentAdvertisement] = React.useState({});

  function handleSubmit(e) {
    e.preventDefault();
    const data = { ...currentAdvertisement, title: title, text: text, };
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

  function handleChangeFileName(e) {
    setFileName(e.target.value);
    if (e.target.checkValidity()) {
      setFileNameError({ text: '', isShow: false });
    } else {
      setFileNameError({ text: 'Укажите название файла', isShow: true });
    }
  }

  function handleChangeFile(e) {
    setUrlName({ isShow: false, name: '' });
    if (e.target.files.length > 0) {
      let file = e.target.files[0];
      if(file.size > 10485760) {
        setFileError({ text: 'Размер файла превышает 10 MB', isShow: true });
      } else {
        GetBase64File(file)
        .then(result => {
          setFileError({ text: '', isShow: false });
          file['base64'] = result;
          setUrlName({ isShow: true, name: file.name });
          setContentFile({ file: file.base64 });
          if (fileName.length < 1) {
            setFileNameError({ text: 'Укажите название файла', isShow: true });
          }
        })
        .catch(err => {
          console.log(err);
        });
      }
    }
  }

  function handleAddTask() {
    const newFile = { file: contentFile.file, name: fileName, fileName: urlName.name, };
    console.log(newFile);
    setFileList([newFile, ...fileList]);
    setFileName('');
    setUrlName({ isShow: false, name: '', });
    setContentFile({ file: null, });
  }

  function handleRemoveTask(file) {
    const newFiles = fileList.filter((elem) => elem.id !== file.id);
    setFileList(newFiles);
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
      setFileList(res.files);
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
    if ((contentFile.file !== null) && (fileName.length > 0)) {
      setIsBlockSaveButton(false);
    } else {
      setIsBlockSaveButton(true);
    }
  }, [contentFile, fileName]);

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

      <div className='popup__field'>
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
      </div>

      <div className='popup__field'>
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
      </div>

      <div className='popup__field'>
        <p className='popup__input-caption'>Введите название файла:</p>
        <div className='popup__input-field'>
          <input 
          className='popup__input'
          type='text'
          id='edit-advertisement-file-name'
          value={fileName}
          onChange={handleChangeFileName}
          name='edit-advertisement-file-name'
          placeholder='Введите название файла'
          minLength='1'
          autoComplete='off'
          required 
          >
          </input>
        </div>
        <span className={`popup__input-error ${fileNameError.isShow ? 'popup__input-error_status_show' : ''}`}>
          {fileNameError.text}
        </span>
      </div>

      <div className='popup__field'>
        <p className='popup__input-caption'>Выберите файл:</p>
        <div className='upload-form__container'>
          <div className='upload-form__section'>
            <label htmlFor='advertisement-tasks-upload' className='upload-form__field'>
              <p className='upload-form__text'>{urlName.isShow ? urlName.name : ''}</p>
              <div className='upload-form__icon'></div>
            </label>
            {
              isBlockSaveButton 
              ?
              <button className='btn-icon btn-icon_margin_left btn-icon_status_block btn-icon_type_create' disabled type='button'></button>
              :
              <button className='btn-icon btn-icon_margin_left btn-icon_color_accent-blue btn-icon_type_create' type='button' onClick={handleAddTask}></button>
            }
            <input onChange={handleChangeFile} id='advertisement-tasks-upload' className='upload-form__input' type="file" />
          </div>
        </div>
        <span className={`popup__input-error ${fileError.isShow ? 'popup__input-error_status_show' : ''}`}>
          {fileError.text}
        </span>
      </div>

      <div className='popup__field'>
        <p className='popup__input-caption'>Прикрепленные файлы:</p>
        <Table>
          <div className='table__container table__container_margin_top'>
            <div className='table__header'>
              <div className='table__main-column'>
                <div className='table__column table__column_type_header table__column_type_count'>
                  <p className='table__text table__text_type_header'>№</p>
                </div>
                <div className='table__column table__column_type_header table__column_type_name'>
                  <p className='table__text table__text_type_header'>Наименование</p>
                </div>
              </div>
              <div className='table__column table__column_type_header table__column_type_btn table__column_type_btn-header'>
                <div className='btn-icon'></div> 
              </div>
            </div>
            <ul className={`table__main table__main_height_smallest scroll`}>
            {
            fileList.length > 0
            ?
              <>
              {
                fileList.map((item, i) => (
                  <li className='table__row' key={i}>
                    <div className='table__main-column'>
                      <div className='table__column table__column_type_count'>
                        <p className='table__text'>{i + 1}</p>
                      </div>
                      <div className='table__column table__column_type_name'>
                        <p className='table__text table__text_type_cut'>{item.name}</p>
                      </div>
                    </div>
                    <div className='table__column table__column_type_btn'>
                      <button className='btn-icon btn-icon_color_accent-orange btn-icon_type_cancel' type='button' onClick={() => handleRemoveTask(item)}></button>
                    </div>
                  </li>
                ))
              }
              </>
              :
              <p className='table__caption_type_empty'>Список пока пуст.</p>
            }
            </ul>
          </div>
        </Table>
      </div>

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