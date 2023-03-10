import React from 'react';
import './SemesterUserTable.css';
import StudentViewCommentsPopup from '../../EducationPopup/StudentViewCommentsPopup/StudentViewCommentsPopup.js';

function SemesterUserTable({ disciplines, openDiscipline }) {

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

  React.useEffect(() => {
    setCurrentComments('');
    setIsOpenCommentPopup(false);
  }, []);

  return (
    <>
    <div className='semester-table'>

      <div className='semester-table__line semester-table__header'>
        <div className='semester-table__column semester-table__column-number'>
          <p className='semester-table__text semester-table__text_weight_bold'>№</p>
        </div>
        <div className='semester-table__column semester-table__column-time'>
          <p className='semester-table__text semester-table__text_weight_bold'>Период</p>
        </div>
        <div className='semester-table__column semester-table__column-discipline'>
          <p className='semester-table__text semester-table__text_weight_bold'>Дисциплина</p>
        </div>
        <div className='semester-table__column semester-table__column-teacher'>
          <p className='semester-table__text semester-table__text_weight_bold'>Преподаватель</p>
        </div>
        <div className='semester-table__column semester-table__column-type'>
          <p className='semester-table__text semester-table__text_weight_bold'>Тип</p>
        </div>
        <div className='semester-table__column semester-table__column-score'>
          <p className='semester-table__text semester-table__text_weight_bold'>Оценка</p>
        </div>
        <div className='semester-table__column semester-table__column-score'>
          <p className='semester-table__text semester-table__text_weight_bold'>КР</p>
        </div>
        <div className='semester-table__column semester-table__column-comment'>
          <p className='semester-table__text semester-table__text_weight_bold'>Комментарий</p>
        </div>
      </div>

      {
        disciplines.length > 0 
        ?
        <ul className='semester-table__line-list'>
          {
            disciplines.map((item, i) => (
              <li className='semester-table__line' key={i}>
                <div className='semester-table__column semester-table__column-number'>
                  <p className='semester-table__text'>{i + 1}</p>
                </div>
                <div className='semester-table__column semester-table__column-time'>
                  <p className='semester-table__text'>{item.startDate} - {item.endDate}</p>
                </div>
                <div className='semester-table__column semester-table__column-discipline'>
                  <p 
                  className='semester-table__text semester-table__text_weight_bold semester-table__text_type_active' 
                  onClick={() => openDiscipline(item)}>
                    {item.name}
                  </p>
                </div>
                <div className='semester-table__column semester-table__column-teacher'>
                  <p className='semester-table__text'>{item.tutor}</p>
                </div>
                <div className='semester-table__column semester-table__column-type'>
                  <p className='semester-table__text'>{item.control}</p>
                </div>
                <div className='semester-table__column semester-table__column-score'>
                  {renderMark(item.mark.name)}
                </div>
                {
                  item.course_work 
                  ?
                  <div className='semester-table__column semester-table__column-score'>
                    {renderMark(item.course_mark.name)}
                  </div>
                  :
                  <div className='semester-table__column semester-table__column-score'>
                    <p className='semester-table__text'></p>
                  </div>
                }

                {
                  item.comments.length < 1 
                  ?
                  <div className='semester-table__column semester-table__column-comment'>
                    <p className='semester-table__text semester-table__text_color_grey'>Нет комментария</p>
                  </div>
                  :
                  <div className='semester-table__column semester-table__column-comment'>
                    <p className='semester-table__text semester-table__text_type_cut semester-table__text_type_active' 
                    onClick={() => openCommentPopup(item.comments)}>
                      {item.comments[item.comments.length - 1].text}
                    </p>
                  </div>
                }
              </li>
            ))
          }
        </ul>
        :
        <div className='table__caption_type_empty'>Дисциплины отсутствуют</div>
      }
    </div>
    {
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