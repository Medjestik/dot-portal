import React from 'react';
import './DisciplineTeacherGroup.css';
import Table from '../../../Table/Table.js';
import TableCard from '../../../Table/TableCard/TableCard.js';

function DisciplineTeacherGroup({ windowWidth, disciplineInfo, disciplineStudents, onOpenStudent, onChooseMark, onViewFiles, onViewTests, onViewComments, onViewStudent }) {

  const containerHeightRef = React.createRef();
  const tableHeaderHeightRef = React.createRef();

  const [tableHeight, setTableHeight] = React.useState(0);

  const tableStyle = {
    height: tableHeight,
  };

  React.useEffect(() => {
    if (windowWidth >= 833) {
      setTableHeight(containerHeightRef.current.clientHeight - tableHeaderHeightRef.current.clientHeight);
    }
  }, [windowWidth, containerHeightRef, tableHeaderHeightRef]);

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
    <div className='discipline-teacher-group'>
      {
        windowWidth > 833
        ?
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
              <ul style={Object.assign({}, tableStyle)} className='table__main scroll'>
                {
                  disciplineStudents.map((item, i) => (
                    <li className='table__row' key={i}>
                      <div className='table__main-column'>
                        <div className='table__column table__column_type_count'>
                          <p className='table__text'>{i + 1}</p>
                        </div>
                        <div className='table__column table__column_direction_row table__column_type_name'>
                          <p className='table__text table__text_type_header table__text_type_active' onClick={() => onOpenStudent(item)}>{item.student.fullname}</p>
                          {
                            item.student.is_sub &&
                            <div className='table__cell-badge-list table__cell-badge-list_position_left'>
                              <div className='table__cell-badge-item'>
                                <span className='table__cell-badge table__cell-badge_color_orange'>Переводник</span>
                              </div>
                            </div>
                          }
                          {
                            item.student.is_och &&
                            <div className='table__cell-badge-list table__cell-badge-list_position_left'>
                              <div className='table__cell-badge-item'>
                                <span className='table__cell-badge table__cell-badge_color_blue'>Очник</span>
                              </div>
                            </div>
                          }
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
          </div>
        </Table>
        :
        <>
        {
          disciplineStudents.length > 0 
          ?
          <TableCard>
            {
              disciplineStudents.map((item, i) => (
              <li className='table-card__item' key={i}>
                {
                  item.student.is_sub &&
                  <span className='table__cell-badge table__cell-badge_color_orange'>Переводник</span>
                }
                {
                  item.student.is_och &&
                  <span className='table__cell-badge table__cell-badge_color_blue'>Очник</span>
                }
                <p 
                  className='table-card__text table-card__text_weight_bold table-card__text_type_active table-card__title' 
                  onClick={() => onViewStudent(item.student)}>
                  {item.student.fullname}
                </p>
                
                <ul className='data__list data__list_margin_top'>
                  <li className='data__item'>
                    <p className='data__text'><span className='data__text_font_bold'>Время изучения:</span>{item.learning.content_time || ''}</p>
                  </li>
                  <li className='data__item'>
                    <p className='data__text' onClick={() => onViewTests(item)}><span className='data__text_font_bold'>Тестирование:</span>{item.learning.completed_tests_count}/{item.learning.total_tests_count}</p>
                  </li>
                  <li className='data__item'>
                    <p className='data__text' onClick={() => onViewFiles(item)}><span className='data__text_font_bold'>Файлы:</span>{item.files.length} шт.</p>
                  </li>
                  {
                    disciplineInfo.course_work &&
                    <li className='data__item'>
                      <p className='data__text' onClick={() => onChooseMark(item)}><span className='data__text_font_bold'>Курсовая работа:</span>{item.course_mark && renderCardMark(item.course_mark.name || '')}</p>
                    </li>
                  }
                  <li className='data__item'>
                    <p className='data__text' onClick={() => onChooseMark(item)}><span className='data__text_font_bold'>Оценка по дисциплине:</span>{item.mark && renderCardMark(item.mark.name || '')}</p>
                  </li>
                </ul>

                {
                  item.comments.length < 1 
                  ?
                    <p className='table-card__text table-card__link table-card__link_type_empty'>Комментарии отсутствуют</p>
                  :
                    <p className='table-card__text table-card__link table-card__link_type_active' onClick={() => onViewComments(item)}>Комментарии</p>
                }
              </li>
              ))
            }
          </TableCard>
          :
          <p className='table__caption_type_empty'>Список студентов пуст!</p>
        }
        </>
      }

    </div>
  );
}

export default DisciplineTeacherGroup;  