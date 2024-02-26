import React from 'react';
import './PracticeTeacherTable.css';
import Table from '../../Table/Table.js';
import TableCard from '../../Table/TableCard/TableCard.js';

function PracticeTeacherTable({ windowWidth, practice, openDiscipline }) {

  return (
    <>
    {
      practice.length > 0 
      ?
      <>
      {
      windowWidth > 833
      ?
      <Table>
        <div className='table__header'>
          <div className='table__main-column'>
            <div className='table__column table__column_type_header table__column_type_count'>
              <p className='table__text table__text_type_header'>№</p>
            </div>
            <div className='table__column table__column_type_header table__column_type_date'>
              <p className='table__text table__text_type_header'>Период</p>
            </div>
            <div className='table__column table__column_type_header table__column_type_name'>
              <p className='table__text table__text_type_header'>Наименование</p>
            </div>
            <div className='table__column table__column_type_header table__column_type_text'>
              <p className='table__text table__text_type_header'>Группа</p>
            </div>
            <div className='table__column table__column_type_header table__column_type_control'>
              <p className='table__text table__text_type_header'>Контроль</p>
            </div>
          </div>
        </div>
        <ul className='table__main table__main_scroll_auto'>
          {
            practice.map((item, i) => (
              <li className='table__row' key={i}>
                <div className='table__main-column'>
                  <div className='table__column table__column_type_count'>
                    <p className='table__text'>{i + 1}</p>
                  </div>
                  <div className='table__column table__column_type_date'>
                    <p className='table__text'>{item.start_date} - {item.end_date}</p>
                  </div>
                  <div className='table__column table__column_type_name'>
                    <p className='table__text table__text_type_header table__text_type_active' onClick={() => openDiscipline(item)}>{item.practic_name || ''}</p>
                  </div>
                  <div className='table__column table__column_type_text'>
                    <p className='table__text'>{`${item.group_name} (${item.group_current_name})`}</p>
                  </div>
                  <div className='table__column table__column_type_control'>
                    <p className='table__text'>ЗаО</p>
                  </div>
                </div>
              </li>
            ))
          }
        </ul>
      </Table>
      :
      <TableCard>
      {
        practice.map((item, i) => (
          <li className='table-card__item' key={i}>
            <p className='table-card__text table-card__date'>{item.start_date} - {item.end_date}</p>
            <p 
              className='table-card__text table-card__text_weight_bold table-card__text_type_active table-card__title' 
              onClick={() => openDiscipline(item)}>
              {item.practic_name || ''}
            </p>
            
            <div className='table-card__info'>
              <ul className='table-card__info-list'>
                <li className='table-card__info-item'>
                  <p className='data__text'><span className='data__text_font_bold'>Группа:</span>{`${item.group_name} (${item.group_current_name})`}</p>
                </li>
                <li className='table-card__info-item'>
                  <p className='data__text'><span className='data__text_font_bold'>Контроль:</span>ЗаО</p>
                </li>
              </ul>
            </div>
          </li>
        ))
      }
      </TableCard>
      }
      </>
      :
      <p className='table__caption_type_empty'>В этом семестре у вас отсутствует практика!</p>
    }
    </>
  );
}

export default PracticeTeacherTable;  