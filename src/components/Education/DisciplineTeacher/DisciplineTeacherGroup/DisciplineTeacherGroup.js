import React from 'react';
import './DisciplineTeacherGroup.css';
import Table from '../../../Table/Table.js';

function DisciplineTeacherGroup({ windowWidth, disciplineInfo, disciplineStudents, onOpenStudent, onChooseMark, onViewFiles, onViewTests, onViewComments }) {

  function renderMark(mark) {
    if (mark === 'Не аттестован') {
      return (
        <p className='table__text table__text_type_active table__text_type_error'>Н/А</p>
      )
    } else if (mark === 'Нет оценки') {
      return (
        <p className='table__text table__text_type_empty table__text_type_active'>Нет оценки</p>
      )
    } else if (mark === 'Отлично') {
      return (
        <p className='table__text table__text_type_active'>5 (отл.)</p>
      )
    } else if (mark === 'Хорошо') {
      return (
        <p className='table__text table__text_type_active'>4 (хор.)</p>
      )
    } else if (mark === 'Удовлетворительно') {
      return (
        <p className='table__text table__text_type_active'>3 (удов.)</p>
      )
    } else {
      return (
        <p className='table__text table__text_type_active'>{mark}</p>
      )
    }
  }

  return (
    <div className='discipline-teacher-group'>
      <Table>
        <div className='table__header'>
          <div className='table__main-column'>
            <div className='table__column table__column_type_header table__column_type_count'>
              <p className='table__text table__text_type_header'>№</p>
            </div>
            <div className='table__column table__column_type_header table__column_type_name'>
              <p className='table__text table__text_type_header'>ФИО студента</p>
            </div>
            <div className='table__column table__column_type_header table__column_type_small'>
              <p className='table__text table__text_type_header'>Время</p>
            </div>
            <div className='table__column table__column_type_header table__column_type_small'>
              <p className='table__text table__text_type_header'>Тест</p>
            </div>
            <div className='table__column table__column_type_header table__column_type_small'>
              <p className='table__text table__text_type_header'>Файлы</p>
            </div>
            <div className='table__column table__column_type_header table__column_type_medium'>
              <p className='table__text table__text_type_header'>Оценка</p>
            </div>
            {
              disciplineInfo.course_work &&
              <div className='table__column table__column_type_header table__column_type_medium'>
                <p className='table__text table__text_type_header'>Курсовая</p>
              </div>
            }
            <div className='table__column table__column_type_header table__column_type_large'>
              <p className='table__text table__text_type_header'>Комментарий</p>
            </div>
          </div>
        </div>
        {
        disciplineStudents.length > 0 ?
          <ul className='table__main table__main_scroll_auto'>
            {
              disciplineStudents.map((item, i) => (
                <li className='table__row' key={i}>
                  <div className='table__main-column'>
                    <div className='table__column table__column_type_count'>
                      <p className='table__text'>{i + 1}</p>
                    </div>
                    <div className='table__column table__column_type_name' onClick={() => onOpenStudent(item)}>
                      <p className='table__text table__text_type_header table__text_type_active'>{item.student.fullname}</p>
                    </div>
                    <div className='table__column table__column_type_small'>
                      <p className='table__text'>{item.learning.content_time}</p>
                    </div>
                    <div className='table__column table__column_type_small' onClick={() => onViewTests(item)}>
                      <p className='table__text table__text_type_active'>{item.learning.completed_tests_count}/{item.learning.total_tests_count}</p>
                    </div>
                    <div className='table__column table__column_type_small' onClick={() => onViewFiles(item)}>
                      <p className='table__text table__text_type_active'>{item.files.length} шт.</p>
                    </div>
                    <div className='table__column table__column_type_medium' onClick={() => onChooseMark(item)}>
                      {renderMark(item.mark.name)}
                    </div>
                    {
                      disciplineInfo.course_work &&
                      <div className='table__column table__column_type_medium' onClick={() => onChooseMark(item)}>
                        {renderMark(item.course_mark.name)}
                      </div>
                    }
                    <div className='table__column table__column_type_large' onClick={() => onViewComments(item)}>
                      {
                        item.comments.length > 0 ?
                        <p className='table__text table__text_type_cut table__text_type_active'>{item.comments[item.comments.length - 1].text}</p>
                        :
                        <p className='table__text table__text_type_empty table__text_type_active'>Нет комментария</p>
                      }
                    </div>
                  </div>
                </li>
              ))
            }
          </ul>
        :
          <p className='table__caption_type_empty'>Список студентов пуст!</p>
        }
      </Table>
    </div>
  );
}

export default DisciplineTeacherGroup;  