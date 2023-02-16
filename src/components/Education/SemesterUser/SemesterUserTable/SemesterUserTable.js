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
          <p className='semester-table__text semester-table__text_weight_bold'>Срок обучения</p>
        </div>
        <div className='semester-table__column semester-table__column-discipline'>
          <p className='semester-table__text semester-table__text_weight_bold'>Дисциплина</p>
        </div>
        <div className='semester-table__column semester-table__column-teacher'>
          <p className='semester-table__text semester-table__text_weight_bold'>Преподаватель</p>
        </div>
        <div className='semester-table__column semester-table__column-type'>
          <p className='semester-table__text semester-table__text_weight_bold'>Контроль</p>
        </div>
        <div className='semester-table__column semester-table__column-score'>
          <p className='semester-table__text semester-table__text_weight_bold'>Оценка</p>
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
                  <p className='semester-table__text'>{item.mark || 'н/а'}</p>
                  <p className='semester-table__text semester-table__text_color_grey'>{item.markDate || 'н/а'}</p>
                </div>
                <div className='semester-table__column semester-table__column-comment'>
                  <p className='semester-table__text semester-table__text_type_cut semester-table__text_type_active' 
                  onClick={() => openCommentPopup(item.comments)}>
                    {item.lastComment || ''}
                  </p>
                </div>
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