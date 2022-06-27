import React from 'react';
import './DisciplineTasks.css';
import { CurrentUserContext } from '../../../contexts/CurrentUserContext.js';
import * as educationApi from '../../../utils/educationApi.js';
import Preloader from '../../Preloader/Preloader.js';
import Table from '../../Table/Table.js';
import GetBase64File from '../../../custom/GetBase64File.js';

function DisciplineTasks({ windowWidth, disciplineId }) {
  
  const currentUser = React.useContext(CurrentUserContext);

  const [tasks, setTasks] = React.useState([]);
  const [isLoadingTasks, setIsLoadingTasks] = React.useState(true);
  const [isLoadingRequest, setIsLoadingRequest] = React.useState(false);
  const [taskName, setTaskName] = React.useState('');
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
    if (!isLoadingTasks) {
      setTableHeight(containerHeightRef.current.clientHeight - headerHeightRef.current.clientHeight); 
    }
    
  }, [windowWidth, containerHeightRef, headerHeightRef, isLoadingTasks]);

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
  }

  function disciplineTasksRequest(id) {
    setIsLoadingTasks(true);
    const token = localStorage.getItem('token');
    educationApi.getDisciplineTask({ token: token, disciplineId: id, currentUserId: currentUser.id })
    .then((res) => {
      console.log('DisciplineTasks', res);
      setTasks(res);
    })
    .catch((err) => {
      console.error(err);
    })
    .finally(() => {  
      setIsLoadingTasks(false);
    });
  }

  function disciplineTasksUpload(e) {
    e.preventDefault();
    setIsLoadingRequest(true);
    const token = localStorage.getItem('token');
    const task = { file: contentFile.file, name: taskName, fileName: fileName.name, };
    educationApi.uploadDisciplineTask({ token: token, disciplineId: disciplineId, currentUserId: currentUser.id, task: task })
    .then((res) => {
      setTasks([res, ...tasks]);
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
    disciplineTasksRequest(disciplineId);
    return(() => {
      setTasks([]);
    })
    // eslint-disable-next-line
  }, [disciplineId]);

  return (
    <div className='discipline-tasks'>

      {
        isLoadingTasks ?
        <Preloader />
        :
        <>
        <div className='discipline-tasks__form'>
          <form 
          className='upload-form' 
          ref={formRef} 
          name='discipline-tasks-upload-file' 
          id='discipline-tasks-upload-file'
          onSubmit={disciplineTasksUpload}
          >
            <p className='discipline-tasks__caption'>Загрузите выполненную работу:</p>
            <div className='popup__input-field'>
              <input 
              className='popup__input'
              type='text'
              id='discipline-tasks-name'
              value={taskName}
              onChange={handleChangeTaskName}
              name='discipline-tasks-name'
              placeholder='Введите название работы'
              minLength='1'
              autoComplete='off'
              required 
              >
              </input>
            </div>
            <p className='discipline-tasks__caption'>Выберите файл:</p>
            <div className='upload-form__container'>
              <label htmlFor='discipline-tasks-upload' className='upload-form__field'>
                <p className='upload-form__text'>{fileName.isShow ? fileName.name : ''}</p>
                <div className='upload-form__icon'></div>
              </label>
              <input onChange={handleChangeTask} id='discipline-tasks-upload' className='upload-form__input' type="file" />
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
          </form>
        </div>

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
            tasks.length < 1 ?
            <span className='table__caption_type_empty'>Выполненные работы не загружены!</span>
            :
            <ul style={Object.assign({}, tableStyle)} className='table__main table__main_type_tasks scroll'>
              {
                tasks.map((item, i) => (
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
      </>
      }

    </div>
  );
}

export default DisciplineTasks; 