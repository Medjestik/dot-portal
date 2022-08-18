import React from 'react';
import './SemesterTeacherTable.css';
import Table from '../../../Table/Table.js';

function DisciplinesTeacherTable({ disciplines, openDiscipline }) {

  return (
    <Table>
      <div className='table__header'>
        <div className='table__main-column table__main-column_type_empty'>
          <div className='table__column table__column_type_header table__column_type_count'>
            <p className='table__text table__text_type_header'>№</p>
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
          disciplines.map((item, i) => (
            <li className='table__row' key={i}>
              <div className='table__main-column'>
                <div className='table__column table__column_type_count'>
                  <p className='table__text'>{i + 1}</p>
                </div>
                <div className='table__column table__column_type_name'>
                  <p className='table__text table__text_type_header table__text_type_active' onClick={() => openDiscipline(item)}>{item.name}</p>
                </div>
                <div className='table__column table__column_type_text'>
                  <p className='table__text'>{`${item.group_name} (${item.group_current_name})`}</p>
                </div>
                <div className='table__column table__column_type_control'>
                  <p className='table__text'>{item.control}</p>
                </div>
              </div>
            </li>
          ))
        }
      </ul>
    </Table>
  );
}

export default DisciplinesTeacherTable;  