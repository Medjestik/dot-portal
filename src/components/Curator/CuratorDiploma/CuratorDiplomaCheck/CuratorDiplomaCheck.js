import React from 'react';
import Table from '../../../Table/Table';

function CuratorDiplomaCheck({ windowWidth, diploma, onUpload, onShowReport }) {

  const containerHeightRef = React.createRef();
  const tableHeaderHeightRef = React.createRef();

  const [tableHeight, setTableHeight] = React.useState(0);

  React.useEffect(() => {
    if (windowWidth >= 833) {
      setTableHeight(containerHeightRef.current.clientHeight - tableHeaderHeightRef.current.clientHeight);
    }
  }, [windowWidth, containerHeightRef, tableHeaderHeightRef]);

  const tableStyle = {
    height: tableHeight,
  };

  function renderBestAttempt(item) {
    if (item.uploads.length > 0) {
      const bestAttempt = item.uploads.reduce((best, current) => {
        return current.percent > best.percent ? current : best;
      });
      return (
        bestAttempt.pass
        ?
        <>
          <div className='table__column table__column_type_large'>
            <a className='table__text table__text_type_active' href={bestAttempt.report_link} target='_blanc' rel='noreferrer'>{bestAttempt.percent}% (отчет)</a>
          </div>
          <div className='table__column table__column_type_status'>
            <p className='table__text'>Пройден</p>
          </div>
        </>
        :
        <>
          <div className='table__column table__column_type_large'>
            {
              bestAttempt.report_link.length > 0
              ?
              <a className='table__text table__text_type_active' href={bestAttempt.report_link} target='_blanc' rel='noreferrer'>{bestAttempt.percent}% (отчет)</a>
              :
              <p className='table__text table__text_type_empty'>0%</p>
            }
            
          </div>
          <div className='table__column table__column_type_status'>
            {
              bestAttempt.percent 
              ?
              <p className='table__text table__text_color_orange'>Не пройден</p>
              :
              <p className='table__text table__text_color_blue'>На проверке</p>
            }
            
          </div>
        </>
      )
    } else {
      return (
        <>
          <div className='table__column table__column_type_large'>
            <p className='table__text table__text_type_empty'>0%</p>
          </div>
          <div className='table__column table__column_type_status'>
            <p className='table__text table__text_type_empty'>Не загружено</p>
          </div>
        </>
      )
    } 
  }

  return (
    <>
    <Table>
      <div ref={containerHeightRef} className='table__container'>
        <div ref={tableHeaderHeightRef} className='table__header'>
          <div className='table__main-column table__main-column_type_empty'>
            <div className='table__column table__column_type_header table__column_type_count'>
              <p className='table__text table__text_type_header'>№</p>
            </div>
            <div className='table__column table__column_type_header table__column_type_name'>
              <p className='table__text table__text_type_header'>ФИО студента</p>
            </div>
            <div className='table__column table__column_type_header table__column_type_small'>
              <p className='table__text table__text_type_header'>Файлы</p>
            </div>
            <div className='table__column table__column_type_header table__column_type_large'>
              <p className='table__text table__text_type_header'>Оригинальность</p>
            </div>
            <div className='table__column table__column_type_header table__column_type_status'>
              <p className='table__text table__text_type_header'>Статус</p>
            </div>
          </div>
        </div>

        {
          diploma.students.length > 0 
          ?
          <ul style={Object.assign({}, tableStyle)} className='table__main scroll'>
          {
            diploma.students.map((item, i) => (
              <li className='table__row' key={i}>
                <div className='table__main-column'>
                  <div className='table__column table__column_type_count'>
                    <p className='table__text'>{i + 1}</p>
                  </div>
                  <div className='table__column table__column_type_name'>
                    <p className='table__text table__text_type_header table__text_type_active' onClick={() => onUpload(item)}>{item.name}</p>
                  </div>
                  <div className='table__column table__column_type_small'>
                    <p className='table__text table__text_type_active' onClick={() => onShowReport(item)}>{item.uploads.length} шт.</p>
                  </div>
                  {
                    renderBestAttempt(item)
                  }
                </div>
              </li>
            ))
          }
          </ul>
          :
          <div className='table__caption_type_empty'>Студенты не найдены!</div>
        }
      </div>
    </Table>
    </>
  )
}

export default CuratorDiplomaCheck;