import React from 'react';
import './DisciplineUserTable.css';
import Table from '../../../Table/Table.js';
import TableCard from '../../../Table/TableCard/TableCard.js';
import StudentViewCommentsPopup from '../../EducationPopup/StudentViewCommentsPopup/StudentViewCommentsPopup.js';

function SemesterUserTable({ windowWidth, data, onOpen }) {

  const [isOpenCommentPopup, setIsOpenCommentPopup] = React.useState(false);
  const [currentComments, setCurrentComments] = React.useState('');

  function openCommentPopup(comment) {
    setCurrentComments(comment);
    setIsOpenCommentPopup(true);
  }

  function closeCommentPopup() {
    setIsOpenCommentPopup(false);
  }

  function renderMark(mark) {
    console.log(mark);
    if (mark === 'Не аттестован') {
      return (
        <p className='table__text'>Н/А</p>
      )
    } else if (mark === 'Без оценки') {
      return (
        <p className='table__text table__text_type_empty'>Нет</p>
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

  React.useEffect(() => {
    setCurrentComments('');
    setIsOpenCommentPopup(false);
  }, []);

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
                <p className='table-card__text table-card__subtitle'>{item.tutor}</p>
                
                <div className='table-card__info'>
                  <ul className='table-card__info-list'>
                    <li className='table-card__info-item'>
                      <p className='data__text'><span className='data__text_font_bold'>Тип:</span>{item.control || ''}</p>
                    </li>
                    <li className='table-card__info-item'>
                      <p className='data__text'><span className='data__text_font_bold'>Оценка:</span>{item.mark && renderCardMark(item.mark.name)}</p>
                    </li>
                    {
                    item.course_work &&
                    <li className='table-card__info-item'>
                      <p className='data__text'><span className='data__text_font_bold'>КР:</span>{item.course_mark && renderCardMark(item.course_mark.name)}</p>
                    </li>
                    }
                  </ul>
                </div>
                {
                  item.comments.length < 1 
                  ?
                    <p className='table-card__text table-card__link table-card__link_type_empty'>Комментарии отсутствуют</p>
                  :
                    <p className='table-card__text table-card__link table-card__link_type_active' onClick={() => openCommentPopup(item.comments)}>Комментарии</p>
                }
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
              <p className='table__text table__text_type_header'>Дисциплина</p>
            </div>
            <div className='table__column table__column_type_header table__column_type_teacher'>
              <p className='table__text table__text_type_header'>Преподаватель</p>
            </div>
            <div className='table__column table__column_type_header table__column_type_small'>
              <p className='table__text table__text_type_header'>Тип</p>
            </div>
            <div className='table__column table__column_type_header table__column_type_small'>
              <p className='table__text table__text_type_header'>Оценка</p>
            </div>
            <div className='table__column table__column_type_header table__column_type_small'>
              <p className='table__text table__text_type_header'>КР</p>
            </div>
            <div className='table__column table__column_type_header table__column_type_teacher'>
              <p className='table__text table__text_type_header'>Комментарий</p>
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
                  <div className='table__column table__column_type_teacher'>
                    <p className='table__text'>{item.tutor}</p>
                  </div>
                  <div className='table__column table__column_type_small'>
                    <p className='table__text'>{item.control}</p>
                  </div>
                  <div className='table__column table__column_type_small'>
                    {item.mark && renderMark(item.mark.name)}
                  </div>
                  {
                    item.course_work 
                    ?
                    <div className='table__column table__column_type_small'>
                      {item.course_mark && renderMark(item.course_mark.name)}
                    </div>
                    :
                    <div className='table__column table__column_type_small'>
                      <p className='table__text'></p>
                    </div>
                  }
                  {
                    item.comments.length < 1 
                    ?
                    <div className='table__column table__column_type_teacher'>
                      <p className='table__text table__text_type_empty'>Нет комментария</p>
                    </div>
                    :
                    <div className='table__column table__column_type_teacher'>
                      <p className='table__text table__text_type_cut table__text_type_active' 
                      onClick={() => openCommentPopup(item.comments)}>
                        {item.comments[item.comments.length - 1].text}
                      </p>
                    </div>
                  }
                </div>
              </li>
            ))
          }
          </ul>
          :
          <div className='table__caption_type_empty'>В этом семестре у вас отсутствуют дисциплины!</div>
        }
      </Table>
    }

    {
      isOpenCommentPopup &&
      <StudentViewCommentsPopup
        isOpen={isOpenCommentPopup}
        onClose={closeCommentPopup}
        comments={currentComments}
      />
    }
    </>
  );
}

export default SemesterUserTable;  