import React from 'react';
import './DisciplineInfo.css';
import Table from '../../Table/Table.js';

function DisciplineInfo({ windowWidth, disciplineInfo }) {

  const containerHeightRef = React.createRef();
  const headerHeightRef = React.createRef();

  const [tableHeight, setTableHeight] = React.useState(0);

  React.useEffect(() => {
    if (windowWidth >= 833 ) {
      setTableHeight(containerHeightRef.current.clientHeight - headerHeightRef.current.clientHeight);
    }
  }, [windowWidth, containerHeightRef, headerHeightRef]);

  const tableStyle = {
    height: tableHeight, // + mainHeight + marginTop
  };

  return (
    <div className='discipline-info'>
      <div className='discipline-info__container'>
        <div className='discipline-info__teacher'>
          <div className='discipline-info__teacher-container'>
            {
              disciplineInfo.tutor.pict_url 
              ?
              <img className='discipline-info__teacher-img' src={disciplineInfo.tutor.pict_url} alt=''></img>
              :
              <div className='discipline-info__teacher-img'></div>
            }
            <div className='discipline-info__teacher-info'>
              <h3 className='discipline-info__teacher-name'>{disciplineInfo.tutor.fullname}</h3>
              <ul className='discipline-info__teacher-info-list'>
                <li className='discipline-info__teacher-info-item'>
                  <p className='discipline-info__teacher-text'>Преподаватель</p>
                  <p className='discipline-info__teacher-text discipline-info__teacher-text_type_job discipline-info__teacher-text_margin_top'>{disciplineInfo.tutor.job}</p>
                </li>
                <li className='discipline-info__teacher-info-item'>
                  <p className='discipline-info__teacher-text'>{disciplineInfo.tutor.phone}</p>
                  <p className='discipline-info__teacher-text discipline-info__teacher-text_type_mail discipline-info__teacher-text_margin_top'>{disciplineInfo.tutor.email}</p>
                </li>
              </ul>
            </div>
          </div>
          <div className='discipline-info__teacher-comment'>
            {
              disciplineInfo.message 
              ? 
              <p className='discipline-info__teacher-comment-text'>{disciplineInfo.message}</p>
              :
              <p className='discipline-info__teacher-comment-text discipline-info__teacher-comment-text_type_empty'>Комментарий...</p>
            }
          </div>
        </div>
        <div className='discipline-info__document'>
        {
        windowWidth < 833
        ?
          <>
          {
            disciplineInfo.additional_files.length > 0 &&
            <>
              <h5 className='discipline-info__document-caption'>Материалы для загрузки:</h5>
              <ul className='discipline-info__document-list'>
                {
                  disciplineInfo.additional_files.map((item, i) => (
                    <li className='discipline-info__document-item' key={i}>
                      <span className='discipline-info__document-count'>{i + 1}.</span>
                      <div className='discipline-info__document-info'>
                        <h6 className='discipline-info__document-name'>{item.name}</h6>
                        <p className='discipline-info__document-date'>{item.date}</p>
                      </div>
                      <a className='btn_type_link' href={item.link} target='_blank' rel="noreferrer">
                        <div className='btn btn_type_download btn_type_download_status_active'></div>
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
                disciplineInfo.additional_files.length < 1 ?
                <span className='table__caption_type_empty'>Дополнительные материалы не загружены!</span>
                :
                <ul 
                style={Object.assign({}, windowWidth <= 1279 ? { height: 'auto' } : tableStyle)} 
                className='table__main table__main_type_info scroll'
                >
                {
                  disciplineInfo.additional_files.map((item, i) => (
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

        </div>

      </div>
     
    </div>
  );
}

export default DisciplineInfo; 