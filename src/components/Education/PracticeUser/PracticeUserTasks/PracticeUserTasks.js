import React from 'react';
import './PracticeUserTasks.css';
import { CurrentUserContext } from '../../../../contexts/CurrentUserContext.js';
import * as educationApi from '../../../../utils/educationApi.js';
import Table from '../../../Table/Table.js';
import GetBase64File from '../../../../custom/GetBase64File.js';

function PracticeUserTasks({ windowWidth, practiceInfo, practiceAddTask }) {
  
  const currentUser = React.useContext(CurrentUserContext);

  const [isLoadingRequest, setIsLoadingRequest] = React.useState(false);
  const [taskName, setTaskName] = React.useState('');
  const [taskNameError, setTaskNameError] = React.useState({ isShow: false, text: '' });
  const [isBlockSaveButton, setIsBlockSaveButton] = React.useState(true);

  const [fileName, setFileName] = React.useState({ isShow: false, name: '', });
  const [isShowWrongType, setIsShowWrongType] = React.useState(false);
  const [contentFile, setContentFile] = React.useState({ file: null, });

  const formRef = React.createRef();
 

  const containerHeightRef = React.createRef();
  const headerHeightRef = React.createRef();

  const [tableHeight, setTableHeight] = React.useState(0);

  const tableStyle = {
    height: tableHeight, // + mainHeight + marginTop
  };

  React.useEffect(() => {
    if (windowWidth >= 833) {
      setTableHeight(containerHeightRef.current.clientHeight - headerHeightRef.current.clientHeight); 
    }
    
  }, [windowWidth, containerHeightRef, headerHeightRef]);

  function handleChangeTask(e) {
    setIsShowWrongType(false);
    setFileName({ isShow: false, name: '' });
    if (e.target.files.length > 0) {
      let file = e.target.files[0];
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

  function cleanForm() {
    setTaskName('');
    setFileName({ isShow: false, name: '', });
    setContentFile({ file: null, });
  }

  function handleChangeTaskName(e) {
    setTaskName(e.target.value);
    if (e.target.checkValidity()) {
      setTaskNameError({ text: '', isShow: false });
    } else {
      setTaskNameError({ text: 'Укажите корректное название', isShow: true });
    }
  }

  function disciplineTasksUpload(e) {
    e.preventDefault();
    setIsLoadingRequest(true);
    const token = localStorage.getItem('token');
    const task = { file: contentFile.file, name: taskName, fileName: fileName.name, };
    educationApi.uploadPracticeTask({ token: token, practiceId: practiceInfo.id, currentUserId: currentUser.id, task: task })
    .then((res) => {
      practiceAddTask(res);
      cleanForm();
    })
    .catch((err) => {
      console.error(err);
    })
    .finally(() => {  
      setIsLoadingRequest(false);
    });
  }

  React.useEffect(() => {
    if ((contentFile.file !== null) && (taskName.length > 0)) {
      setIsBlockSaveButton(false);
    } else {
      setIsBlockSaveButton(true);
    }
  }, [contentFile, taskName]);

  React.useEffect(() => {
    setTaskName('');
  }, []);

  React.useEffect(() => {
    cleanForm();
    return(() => {
    })
    // eslint-disable-next-line
  }, []);

  return (
    <div className='discipline-tasks'>
    <>
        <div className='discipline-tasks__form'>
          <form 
          className='upload-form' 
          ref={formRef} 
          name='practice-tasks-upload-file' 
          id='practice-tasks-upload-file'
          onSubmit={disciplineTasksUpload}
          >
            <div className='popup__field'>
              <p className='popup__input-caption'>Загрузите выполненную работу:</p>
              <div className='popup__input-field'>
                <input 
                className='popup__input'
                type='text'
                id='practice-tasks-name'
                value={taskName}
                onChange={handleChangeTaskName}
                name='practice-tasks-name'
                placeholder='Введите название работы'
                minLength='1'
                autoComplete='off'
                required 
                >
                </input>
              </div>
              <span className={`popup__input-error ${taskNameError.isShow ? 'popup__input-error_status_show' : ''}`}>
                {taskNameError.text}
              </span>
            </div>

            <div className='popup__field'>
              <p className='popup__input-caption'>Выберите файл:</p>
              <div className='upload-form__container'>
                <div className='upload-form__section'>
                  <label htmlFor='practice-tasks-upload' className='upload-form__field'>
                    <p className='upload-form__text'>{fileName.isShow ? fileName.name : ''}</p>
                    <div className='upload-form__icon'></div>
                  </label>
                  <input onChange={handleChangeTask} id='practice-tasks-upload' className='upload-form__input' type="file" />
                </div>
                <div className='upload-form__buttons'>
                  <button className='btn_type_large btn-cancel_type_large' type='button' onClick={cleanForm}>Отменить</button>
                    {
                      isLoadingRequest ? 
                      <button className='btn_type_large btn-save_type_large btn-save_type_large_status_loading' disabled type='button'>Сохранение..</button>
                      :
                      <button 
                      className={`btn_type_large btn-save_type_large ${isBlockSaveButton ? 'btn-save_type_large_status_block' : ''}`} 
                      type='submit'
                      >
                        Сохранить
                      </button>
                    }
                </div>
              </div>
            </div>
          </form>
        </div>

        {
        windowWidth < 833
        ?
          <>
          {
            practiceInfo.individual.files.length > 0 &&
            <>
              <h5 className='discipline-list__caption'>Загруженные материалы:</h5>
              <ul className='discipline-list'>
                {
                  [...practiceInfo.individual.files].reverse().map((item, i) => (
                    <li className='discipline-list__item' key={i}>
                      <span className='discipline-list__count'>{i + 1}.</span>
                      <div className='discipline-list__info'>
                        <h6 className='discipline-list__info-name'>{item.name}</h6>
                        <p className='discipline-list__info-date'>{item.date}</p>
                      </div>
                      <a className='btn_type_link' href={item.link} target='_blank' rel="noreferrer">
                        <div className='btn btn_type_download btn_type_download_status_active discipline-list__btn'></div>
                      </a>
                    </li>
                  ))
                }
              </ul>
            </>
          }
          </>
        :
          <Table>
            <div ref={containerHeightRef} className='table__container'>
              <div ref={headerHeightRef} className='table__header'>
                <div className='table__main-column'>
                  <div className='table__column table__column_type_header table__column_type_count'>
                    <p className='table__text table__text_type_header'>№</p>
                  </div>
                  <div className='table__column table__column_type_header table__column_type_date'>
                    <p className='table__text table__text_type_header'>Дата</p>
                  </div>
                  <div className='table__column table__column_type_header table__column_type_name'>
                    <p className='table__text table__text_type_header'>Наименование</p>
                  </div>
                </div>
                <div className='table__column table__column_type_header table__column_type_btn table__column_type_btn-header'>
                  <button className='btn btn_type_download btn_type_download_status_active table__btn'></button> 
                </div>
              </div>
              {
                practiceInfo.individual.files.length < 1 ?
                <span className='table__caption_type_empty'>Выполненные работы не загружены!</span>
                :
                <ul style={Object.assign({}, tableStyle)} className='table__main table__main_type_tasks scroll'>
                  {
                    [...practiceInfo.individual.files].reverse().map((item, i) => (
                      <li className='table__row' key={i}>
                        <div className='table__main-column'>
                          <div className='table__column table__column_type_count'>
                            <p className='table__text'>{i + 1}</p>
                          </div>
                          <div className='table__column table__column_type_date'>
                            <p className='table__text'>{item.date}</p>
                          </div>
                          <div className='table__column table__column_type_name'>
                            <p className='table__text'>{item.name}</p>
                          </div>
                        </div>
                        <div className='table__column table__column_type_btn'>
                          <a className='btn_type_link' href={item.link} target='_blank' rel="noreferrer">
                            <div className='btn btn_type_download btn_type_download_status_active table__btn'></div>
                          </a>
                        </div>
                      </li>
                    ))
                  }
                </ul>
              }
            </div>
          </Table>
        }
      </>
    </div>
  );
}

export default PracticeUserTasks; 