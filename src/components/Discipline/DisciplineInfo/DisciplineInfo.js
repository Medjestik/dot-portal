import React from 'react';
import './DisciplineInfo.css';
import Table from '../../Table/Table.js';

function DisciplineInfo({ windowWidth, currentDiscipline, documents }) {

  const containerHeightRef = React.createRef();
  const headerHeightRef = React.createRef();

  const [tableHeight, setTableHeight] = React.useState(0);

  React.useEffect(() => {
    setTableHeight(containerHeightRef.current.clientHeight - headerHeightRef.current.clientHeight);
  }, [windowWidth, containerHeightRef, headerHeightRef]);

  const tableStyle = {
    height: tableHeight, // + mainHeight + marginTop
  };

  return (
    <div className='discipline-info'>
      <div className='discipline-info__container'>
        <div className='discipline-info__teacher'>
          <div className='discipline-info__teacher-container'>
            <div className='discipline-info__teacher-img'></div>
            <div className='discipline-info__teacher-info'>
              <h3 className='discipline-info__teacher-name'>{currentDiscipline.disciplineTeacher}</h3>
              <ul className='discipline-info__teacher-info-list'>
                <li className='discipline-info__teacher-info-item'>
                  <p className='discipline-info__teacher-text'>Преподаватель</p>
                  <p className='discipline-info__teacher-text discipline-info__teacher-text_margin_top'>Доцент</p>
                </li>
                <li className='discipline-info__teacher-info-item'>
                  <p className='discipline-info__teacher-text'>+7 (000) 000-00-00</p>
                  <p className='discipline-info__teacher-text discipline-info__teacher-text_margin_top'>0000000000000@000000.ru</p>
                </li>
              </ul>
            </div>
          </div>
          <div className='discipline-info__teacher-comment'>
            <p className='discipline-info__teacher-comment-text'>Комментарий преподавателя</p>
          </div>
        </div>
        <div className='discipline-info__document'>
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
              <ul style={Object.assign({}, tableStyle)} className='table__main table__main_type_info scroll'>
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

      </div>
     
    </div>
  );
}

export default DisciplineInfo; 