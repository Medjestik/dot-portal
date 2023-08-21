import React from 'react';
import Table from '../../../Table/Table.js';
import TableCard from '../../../Table/TableCard/TableCard.js';

function PracticeUserTable({ windowWidth, data, onOpen }) {

  function renderMark(mark) {
    if (mark === 'Не аттестован') {
      return (
        <p className='table__text'>Н/А</p>
      )
    } else if (mark === 'Нет оценки') {
      return (
        <p className='table__text table__text_type_empty'>Нет оценки</p>
      )
    } else if (mark === 'Отлично') {
      return (
        <p className='table__text'>5 (отл.)</p>
      )
    } else if (mark === 'Хорошо') {
      return (
        <p className='table__text'>4 (хор.)</p>
      )
    } else if (mark === 'Удовлетворительно') {
      return (
        <p className='table__text'>3 (удов.)</p>
      )
    } else {
      return (
        <p className='table__text'>{mark}</p>
      )
    }
  }

  return (
    <>
    {
      windowWidth <= 833
      ?
      <>
      {
        data.length > 0 
        ?
        <TableCard>
        {
          data.map((item, i) => (
            <li className='table-card__item' key={i}>
              <p className='table-card__text table-card__date'>{item.startDate} - {item.endDate}</p>
              <p 
                className='table-card__text table-card__text_weight_bold table-card__text_type_active table-card__title' 
                onClick={() => onOpen(item)}>
                {item.name}
              </p>
              
              <div className='table-card__info'>
                <ul className='table-card__info-list'>
                  <li className='table-card__info-item'>
                    <p className='data__text'><span className='data__text_font_bold'>Тип:</span>{item.control || ''}</p>
                  </li>
                  <li className='table-card__info-item'>
                    <p className='data__text'><span className='data__text_font_bold'>Оценка:</span>{item.mark.name || 'Н/А'}</p>
                  </li>
                </ul>
              </div>
            </li>
          ))
        }
      </TableCard>
      :
      <div className='table__caption_type_empty'>В этом семестре у вас отсутствуют дисциплины!</div>
      }
    </>
    :
    <Table>
      <div className='table__header'>
        <div className='table__main-column table__main-column_type_full'>
          <div className='table__column table__column_type_header table__column_type_count'>
            <p className='table__text table__text_type_header'>№</p>
          </div>
          <div className='table__column table__column_type_header table__column_type_date'>
            <p className='table__text table__text_type_header'>Период</p>
          </div>
          <div className='table__column table__column_type_header table__column_type_full'>
            <p className='table__text table__text_type_header'>Практика</p>
          </div>
          <div className='table__column table__column_type_header table__column_type_small'>
            <p className='table__text table__text_type_header'>Тип</p>
          </div>
          <div className='table__column table__column_type_header table__column_type_small'>
            <p className='table__text table__text_type_header'>Оценка</p>
          </div>
        </div>
      </div>

      {
        data.length > 0 
        ?
        <ul className='table__main table__main_scroll_auto'>
        {
          data.map((item, i) => (
            <li className='table__row' key={i}>
              <div className='table__main-column table__main-column_type_full'>
                <div className='table__column table__column_type_count'>
                  <p className='table__text'>{i + 1}</p>
                </div>
                <div className='table__column table__column_type_date'>
                  <p className='table__text'>{item.startDate} - {item.endDate}</p>
                </div>
                <div className='table__column table__column_type_full'>
                  <p 
                  className='table__text table__text_type_header table__text_type_active' 
                  onClick={() => onOpen(item)}>
                    {item.name}
                  </p>
                </div>
                <div className='table__column table__column_type_small'>
                  <p className='table__text'>{item.control || ''}</p>
                </div>
                <div className='table__column table__column_type_small'>
                  {item.mark && renderMark(item.mark.name)}
                </div>
              </div>
            </li>
          ))
        }
        </ul>
        :
        <div className='table__caption_type_empty'>В этом семестре у вас отсутствуют практики!</div>
      }
    </Table>
    }
    </>
  );
}

export default PracticeUserTable;  