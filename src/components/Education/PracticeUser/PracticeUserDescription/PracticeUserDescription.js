import React from 'react';
import './PracticeUserDescription.css';
import TableList from '../../../Table/TableList/TableList.js';

function PracticeUserInfo({ windowWidth, practiceInfo }) {

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

    <ul className='data__list'>
      <li className='data__item'>
        <span className='data__text data__text_font_bold'>Описание задания: </span>
      </li>
      <li className='data__item'>
        <textarea defaultValue={practiceInfo.description} id='practice-user-description' name='practice-user-description' disabled className='data__area data__area_height_small scroll-inside'></textarea>
      </li>
      <li className='data__item'>
        <span className='data__text data__text_font_bold'>Индивидуальное задание: </span>
      </li>
      <li className='data__item'>
        <textarea defaultValue={practiceInfo.individual.task} id='practice-user-task' name='practice-user-task' disabled className='data__area data__area_height_small scroll-inside'></textarea>
      </li>
    </ul>

      {
        practiceInfo.files.length > 0 &&
        <>
          <h5 className='table__title table__title_margin_top'>Загруженные материалы:</h5>
          <TableList>
            {
              practiceInfo.files.map((item, i) => (
                <li className='table-list__item' key={i}>
                  <span className='table-list__count'>{i + 1}.</span>
                  <div className='table-list__info'>
                    <h6 className='table-list__info-title'>{item.title || ''}</h6>
                    <ul className='table-list__info-list'>
                      <li className='table-list__info-item'>
                        <p className='table-list__info-text'><span className='table-list__info-text_font_bold'>Дата загрузки:</span>{convertDate(item.date) || ''}</p>
                      </li>
                    </ul>
                  </div>
                  <a className='btn_type_link' href={item.link} target='_blank' rel="noreferrer">
                    <div className='btn btn_type_download btn_type_download_status_active discipline-list__btn'></div>
                  </a>
                </li>
              ))
            }
          </TableList>
        </>
      }

    </div>
    </>
  );
}

export default PracticeUserInfo; 