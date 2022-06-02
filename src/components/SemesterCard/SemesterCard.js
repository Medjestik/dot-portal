import React from 'react';
import './SemesterCard.css';

function SemesterCard({ item, openDiscipline }) {

  const [isShowComment, setIsShowComment] = React.useState(false);

  function showComment() {
    setIsShowComment(!isShowComment);
  }

  return (
    <li className='semester-card__item'>
      <p className='semester-card__text'>{item.disciplineStart} - {item.disciplineEnd}</p>
      <p 
        className='semester-card__text semester-card__text_weight_bold semester-table__text_type_active semester-card__text_type_discipline' 
        onClick={() => openDiscipline(item)}>
        {item.disciplineName}
      </p>
      <p className='semester-card__text semester-card__text_type_teacher'>{item.disciplineTeacher}</p>
      
      <div className='semester-card__info'>
        <p className='semester-card__text'>{item.disciplineType}</p>
        <p className='semester-card__text'>{item.score || 'н/а'}</p>
        <p className='semester-card__text'>{item.scoreDate|| 'н/а'}</p>
      </div>

      <p className={`semester-card__text semester-card__text_type_comment ${isShowComment ? 'semester-card__text_type_comment_type_show' : ''}`} onClick={showComment}>Комментарий</p>

      <div className={`semester-card__comment ${isShowComment ? 'semester-card__comment_type_show' : ''}`}>
        {
          item.comment 
          ?
          <p className='semester-card__text'>{item.comment}</p>
          :
          <p className='semester-card__text semester-card__text_color_grey'>Комментарий отсутствует</p>
        }
      </div>
    </li>
  );
}

export default SemesterCard;  