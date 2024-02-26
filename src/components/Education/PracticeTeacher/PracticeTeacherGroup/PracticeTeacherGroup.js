import React from 'react';
import './PracticeTeacherGroup.css';
import Table from '../../../Table/Table.js';
import TableCard from '../../../Table/TableCard/TableCard.js';

function PracticeTeacherGroup({ windowWidth, practice, onEdit }) {

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

  function renderCardMark(mark) {
    if (mark === 'Не аттестован') {
      return 'Н/А';
    } else if (mark === 'Без оценки') {
      return 'Нет';
    } else if (mark === 'Отлично') {
      return '5 (отл.)';
    } else if (mark === 'Хорошо') {
      return '4 (хор.)';
    } else if (mark === 'Удовлетворительно') {
      return '3 (удов.)';
    } else {
      return mark;
    }
  }

  return (
    <>
    {
      practice.individuals.length > 0 
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
            <div className='table__column table__column_type_header table__column_type_name'>
              <p className='table__text table__text_type_header'>ФИО студента</p>
            </div>
            <div className='table__column table__column_type_header table__column_type_full'>
                <p className='table__text table__text_type_header'>Задание</p>
            </div>
            <div className='table__column table__column_type_header table__column_type_small'>
                <p className='table__text table__text_type_header'>Файлы</p>
            </div>
            <div className='table__column table__column_type_header table__column_type_medium'>
                <p className='table__text table__text_type_header'>Оценка</p>
            </div>
            <div className='table__column table__column_type_header table__column_type_full'>
                <p className='table__text table__text_type_header'>Комментарий</p>
            </div>
          </div>
        </div>
        {
        
          <ul className='table__main table__main_scroll_auto'>
            {
              practice.individuals.map((item, i) => (
                <li className='table__row' key={i}>
                  <div className='table__main-column'>
                    <div className='table__column table__column_type_count'>
                      <p className='table__text'>{i + 1}</p>
                    </div>
                    <div className='table__column table__column_type_name' onClick={() => onEdit(item)}>
                      <p className='table__text table__text_type_header table__text_type_active'>{item.student.name}</p>
                    </div>
                    <div className='table__column table__column_type_full'>
                      {
                        item.task.length > 0 
                        ?
                        <p className='table__text table__text_type_cut'>{item.task}</p>
                        :
                        <p className='table__text table__text_type_empty'>Задание отсутствует</p>
                      }
                    </div>
                    <div className='table__column table__column_type_small'>
                      <p className='table__text'>{item.files.length} шт.</p>
                    </div>
                    <div className='table__column table__column_type_medium'>
                        {renderMark(item.mark.name)}
                    </div>
                    <div className='table__column table__column_type_full'>
                      {
                        item.komment.length > 0 
                        ?
                        <p className='table__text table__text_type_cut'>{item.komment}</p>
                        :
                        <p className='table__text table__text_type_empty'>Нет комментария</p>
                      }
                    </div>
                  </div>
                </li>
              ))
            }
          </ul>
        }
      </Table>
      :
      <TableCard>
        {
          practice.individuals.map((item, i) => (
          <li className='table-card__item' key={i}>
            <p 
              className='table-card__text table-card__text_weight_bold table-card__text_type_active table-card__title' 
              onClick={() => onEdit(item)}>
              {item.student.name}
            </p>
            {
              item.task.length > 0 
              ?
              <p className='table__text table__text_type_cut'>{item.task}</p>
              :
              <p className='table__text table__text_type_empty'>Задание отсутствует</p>
            }
            
            <ul className='data__list data__list_margin_top'>
              <li className='data__item'>
                <p className='data__text'><span className='data__text_font_bold'>Файлы:</span>{item.files.length} шт.</p>
              </li>

              <li className='data__item'>
                <p className='data__text' onClick={() => onEdit(item)}><span className='data__text_font_bold'>Оценка:</span>{item.mark && renderCardMark(item.mark.name || '')}</p>
              </li>
            </ul>

            {
              item.komment.length < 1 
              ?
                <p className='table-card__text table-card__link table-card__link_type_empty'>Комментарии отсутствуют</p>
              :
                <p className='table-card__text table-card__link table-card__link_type_active' onClick={() => onEdit(item)}>Комментарии</p>
            }
          </li>
          ))
        }
      </TableCard>
      }
      </>
      :
      <p className='table__caption_type_empty'>Список студентов пуст!</p>
    }
    </>

  );
}

export default PracticeTeacherGroup;  