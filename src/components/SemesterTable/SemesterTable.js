import React from 'react';
import './SemesterTable.css';
import SemesterCommentPopup from '../Popup/SemesterCommentPopup/SemesterCommentPopup.js';

function SemesterTable({ disciplines, openDiscipline }) {

  const [isOpenCommentPopup, setIsOpenCommentPopup] = React.useState(false);
  const [currentComment, setCurrentComment] = React.useState('');

  function openCommentPopup(comment) {
    setCurrentComment(comment);
    setIsOpenCommentPopup(true);
  }

  function closeCommentPopup() {
    setIsOpenCommentPopup(false);
  }

  React.useEffect(() => {
    setCurrentComment('');
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
                  <p className='semester-table__text'>{item.disciplineStart} - {item.disciplineEnd}</p>
                </div>
                <div className='semester-table__column semester-table__column-discipline'>
                  <p 
                  className='semester-table__text semester-table__text_weight_bold semester-table__text_type_active' 
                  onClick={() => openDiscipline(item)}>
                    {item.disciplineName}
                  </p>
                </div>
                <div className='semester-table__column semester-table__column-teacher'>
                  <p className='semester-table__text'>{item.disciplineTeacher}</p>
                </div>
                <div className='semester-table__column semester-table__column-type'>
                  <p className='semester-table__text'>{item.disciplineType}</p>
                </div>
                <div className='semester-table__column semester-table__column-score'>
                  <p className='semester-table__text'>{item.score || 'н/а'}</p>
                  <p className='semester-table__text semester-table__text_color_grey'>{item.scoreDate}</p>
                </div>
                <div className='semester-table__column semester-table__column-comment'>
                  <p className='semester-table__text semester-table__text_type_cut semester-table__text_type_active' 
                  onClick={() => openCommentPopup(item.comment)}>
                    {item.comment}
                  </p>
                </div>
              </li>
            ))
          }
        </ul>
        :
        <div className='semester-table__text semester-table__text_color_grey'>Дисциплины отсутствуют</div>
      }
    </div>
    {
      isOpenCommentPopup &&
      <SemesterCommentPopup
      isOpen={isOpenCommentPopup}
      onClose={closeCommentPopup}
      comment={currentComment}
      />
    }
    </>
  );
}

export default SemesterTable;  