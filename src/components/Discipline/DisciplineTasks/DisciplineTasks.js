import React from 'react';
import './DisciplineTasks.css';
import Table from '../../Table/Table.js';

function DisciplineTasks({ windowWidth, currentDiscipline, documents }) {

  const [fileName, setFileName] = React.useState({ isShow: false, name: '', });
  const [isShowWrongType, setIsShowWrongType] = React.useState(false);
  const [contentFile, setContentFile] = React.useState({ file: null, }); 

  const formRef = React.createRef();

  const containerHeightRef = React.createRef();
  const headerHeightRef = React.createRef();

  const [tableHeight, setTableHeight] = React.useState(0);

  React.useEffect(() => {
    setTableHeight(containerHeightRef.current.clientHeight - headerHeightRef.current.clientHeight);
  }, [windowWidth, containerHeightRef, headerHeightRef]);

  const tableStyle = {
    height: tableHeight, // + mainHeight + marginTop
  };

  function handleChangeDiploma(e) {
    setIsShowWrongType(false);
    setFileName({ isShow: false, name: '' });
    if (e.target.files.length > 0) {
      setContentFile({ file: e.target.files[0] });
      setFileName({ isShow: true, name: e.target.files[0].name });
      formRef.current.reset();
    } else {
      setContentFile({ file: null, });
    }
  }

  return (
    <div className='discipline-tasks'>

      <p className='discipline-tasks__caption'>Загрузите выполненную работу:</p>

      <div className='discipline-tasks'>
        <form className='upload-form' ref={formRef} name='person-diploma-upload-file' id='person-diploma-upload-file'>
          <label htmlFor='person-diploma-upload' className='upload-form__field'>
            <p className='upload-form__text'>{fileName.isShow ? fileName.name : ''}</p>
            <div className='upload-form__icon'></div>
          </label>
          <input onChange={handleChangeDiploma} id='person-diploma-upload' className='upload-form__input' type="file" />
          <button className='btn_type_large btn-cancel_type_large' type='button'>Отменить</button>
          <button className={`btn_type_large btn-save_type_large ${contentFile.file !== null ? '' : 'btn-save_type_large_status_block'}`} type='submit'>Сохранить</button>
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
        <ul style={Object.assign({}, tableStyle)} className='table__main table__main_type_tasks scroll'>
          {
            documents.map((item, i) => (
              <li className='table__row' key={i}>
                <div className='table__main-column'>
                  <div className='table__column table__column_type_count'>
                    <p className='table__text'>{i + 1}</p>
                  </div>
                  <div className='table__column table__column_type_date'>
                    <p className='table__text'>{item.date}</p>
                  </div>
                  <div className='table__column table__column_type_name'>
                    <p className='table__text'>{item.title}</p>
                  </div>
                </div>
                <div className='table__column table__column_type_btn'>
                  <button className='btn btn_type_download btn_type_download_status_active table__btn'></button>
                </div>
              </li>
            ))
          }
        </ul>
      </div>
      </Table>
    </div>
  );
}

export default DisciplineTasks; 