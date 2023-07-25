import React from 'react';
import Table from '../../../Table/Table.js';

function PracticeUserTable({ data, onOpen }) {

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
                  <p className='table__text'>{item.control}</p>
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
    </>
  );
}

export default PracticeUserTable;  