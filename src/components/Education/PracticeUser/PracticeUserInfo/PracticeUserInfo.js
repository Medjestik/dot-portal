import React from 'react';
import './PracticeUserInfo.css';
import Table from '../../../Table/Table.js';

function PracticeUserInfo({ windowWidth, practiceInfo }) {

  const containerHeightRef = React.createRef();
  const tableHeaderHeightRef = React.createRef();
  const taskHeightRef = React.createRef();

  const [taskHeight, setTaskHeight] = React.useState(0);

  React.useEffect(() => {
    if (windowWidth >= 833) {
      console.log(taskHeightRef.current.clientHeight)
      setTaskHeight(taskHeightRef.current.clientHeight);
    }
  }, [windowWidth, containerHeightRef, tableHeaderHeightRef, taskHeightRef]);



  const taskStyle = {
    height: taskHeight - 36,
  };

  function convertDate(date) {
    return new Date(date).toLocaleString('ru', { month: 'numeric', day: 'numeric', }) + '.' + new Date(date).toLocaleString('sv', { year: 'numeric', });
  }

  React.useEffect(() => {
    return(() => {
      
    })
  }, []);

  return (
    <>
    <div className='practice-info__container'>
      <div className='discipline-info__column'>
        <div ref={taskHeightRef} className='discipline-info__description'>
          <h3 className='discipline-info__teacher-name'>{practiceInfo.name}</h3>
          <ul className='data__list data__list_margin_top'>
            <li className='data__item'>
              <p className='data__text'>
              <span className='data__text data__text_font_bold'>Период: </span>
              {practiceInfo.start_date? convertDate(practiceInfo.start_date) : '00.00.0000'} - {practiceInfo.end_date? convertDate(practiceInfo.end_date) : '00.00.0000'}
              </p>
            </li>
            <li className='data__item'>
              <p className='data__text'>
              <span className='data__text data__text_font_bold'>Тип: </span>
              {practiceInfo.type}
              </p>
            </li>
            <li className='data__item'>
              <p className='data__text'>
              <span className='data__text data__text_font_bold'>Место: </span>
              {practiceInfo.individual.place}
              </p>
            </li>
            <li className='data__item'>
              <p className='data__text'>
              <span className='data__text data__text_font_bold'>Руководитель: </span>
              {practiceInfo.individual.uni_boss.name}
              </p>
            </li>
            <li className='data__item'>
              <p className='data__text'>
              <span className='data__text data__text_font_bold'>Оценка: </span>
              {practiceInfo.individual.mark.name}
              </p>
            </li>
            <li className='data__item'>
              <span className='data__text data__text_font_bold'>Комментарий преподавателя: </span>
            </li>
            <li className='data__item'>
              <div className='data__area data__area_height_small scroll-inside'>{practiceInfo.individual.komment}</div>
            </li>
          </ul>
        </div>
      </div>

      {
        windowWidth >= 833 &&
        <div className='discipline-info__column'>
          <div className='discipline-info__description'>
            <h3 className='discipline-info__teacher-name'>Задание на практику</h3>
            <ul className='data__list data__list_margin_top'>
              <li className='data__item'>
                <div className='data__area scroll-inside'>{practiceInfo.individual.task}</div>
              </li>
            </ul>
          </div>
        </div>
      }

    </div>

    {
      windowWidth >= 833 &&
      <div className='discipline-info__section discipline-info__materials'>
        <div className='discipline-info__section-header'>
          <h4 className='discipline-info__section-title'>Дополнительные материалы</h4>
        </div>
        <div className='discipline-info__materials-table'>
          <Table>
            <div ref={containerHeightRef} className='table__container'>
              <div ref={tableHeaderHeightRef} className='table__header'>
                <div className='table__main-column'>
                  <div className='table__column table__column_type_header table__column_type_count'>
                    <p className='table__text table__text_type_header'>№</p>
                  </div>
                  <div className="table__column table__column_type_header table__column_type_date">
                    <p className="table__text table__text_type_header">Дата</p>
                  </div>
                  <div className='table__column table__column_type_header table__column_type_name'>
                    <p className='table__text table__text_type_header'>Наименование</p>
                  </div>
                </div>
                <div className='table__column table__column_type_header table__column_type_btn table__column_type_btn-header'>
                  <div className='btn btn_type_download btn_type_download_status_active'></div>
                </div>
              </div>
              <ul className='table__main table__main_scroll_auto'>
                  {
                  practiceInfo.files.length < 1 
                  ?
                  <p className='table__caption_type_empty'>Дополнительные материалы пока не загружены.</p>
                  :
                  [...practiceInfo.files].reverse().map((item, i) => (
                    <li className='table__row' key={i}>
                      <div className='table__main-column'>
                        <div className='table__column table__column_type_count'>
                          <p className='table__text'>{i + 1}</p>
                        </div>
                        <div className="table__column table__column_type_date">
                          <p className="table__text">{item.date ? convertDate(item.date) : '00.00.0000' }</p>
                        </div>
                        <div className='table__column table__column_type_name'>
                          <p className='table__text'>{item.title}</p>
                        </div>
                      </div>
                      <div className='table__column table__column_type_btn'>
                        <a className='btn btn_type_download btn_type_download_status_active' href={item.link} target='_blank' rel='noreferrer'> </a>
                      </div>
                    </li>
                  ))
                  }
              </ul>
            </div>
          </Table>
        </div>
      </div>
    }

    </>
  );
}

export default PracticeUserInfo; 