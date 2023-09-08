import React from 'react';
import './PracticeTeacherTable.css';
import Table from '../../Table/Table.js';

function PracticeTeacherTable({ practice, openDiscipline }) {

  return (
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
      {
        practice.length > 0 ?
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
        :
        <p className='table__caption_type_empty'>В этом семестре у вас отсутствует практика!</p>
      }
    </Table>
  );
}

export default PracticeTeacherTable;  