import React from 'react';
import Popup from '../../../Popup/Popup.js';
import PopupSelect from '../../../Popup/PopupSelect/PopupSelect.js';

function EditPracticePopup({ isOpen, onClose, practice, currentStudent, onEdit, isLoadingRequest, isShowRequestError }) {
 
  const [score, setScore] = React.useState(currentStudent.mark);
  const [comment, setComment] = React.useState(currentStudent.komment);
  const [task, setTask] = React.useState(currentStudent.task);

  const [isBlockSubmitButton, setIsBlockSubmitButton] = React.useState(true);

  function handleSubmit(e) {
    e.preventDefault();

    const data = {
        task: task,
        mark: score,
        komment: comment,
    }
    onEdit(data);
  }

  function handleChangeTask(e) {
    setTask(e.target.value);
  }

  function handleChangeScore(option) {
    setScore(option);
  }

  function handleChangeComment(e) {
    setComment(e.target.value);
  }

  React.useEffect(() => {
    setIsBlockSubmitButton(false);
  // eslint-disable-next-line
  }, [score, comment, task]);

  React.useEffect(() => {
    setIsBlockSubmitButton(true);
    // eslint-disable-next-line
  }, [isOpen]);

  return (
    <Popup
      isOpen={isOpen}
      onSubmit={handleSubmit}
      formWidth={'medium'}
      formName={'teacher-edit-practice-popup'}
    >
        <h2 className='popup__title'>Редактирование практики</h2>
        <p className='popup__author-text'><span className='popup__author-text_weight_bold'>Студент: </span>{currentStudent.student.name}</p>
        <p className='popup__author-text'><span className='popup__author-text_weight_bold'>Телефон: </span>{currentStudent.student.phone}</p>
        <p className='popup__author-text'><span className='popup__author-text_weight_bold'>Почта: </span>{currentStudent.student.email}</p>

        <div className='popup__field'>
            <h4 className='popup__input-caption'>Задание для студента:</h4>
            <textarea 
            className='popup__textarea scroll'
            name='teacher-edit-practice-student-task'
            id='teacher-edit-practice-student-task'
            placeholder='Введите задание...'            
            value={task}
            onChange={handleChangeTask}
            required
            >
            </textarea>
        </div>

        <div className='popup__field'>
            <h4 className='popup__input-caption'>Выберите оценку:</h4>
            <PopupSelect filterType='byId' options={practice.marks} currentOption={score} onChooseOption={handleChangeScore} />
        </div>

        <div className='popup__field'>
            <h4 className='popup__input-caption'>Загруженные файлы:</h4>
            {
            currentStudent.files.length > 0 ?
            <ul className='popup__list popup__list_margin_top'>
            {
                [...currentStudent.files].reverse().map((elem, i) => (
                <li key={i} className='popup__item'>
                    <div className='popup__item-container'>
                    <a className='btn btn_type_download btn_type_download_status_active btn_margin_zero' target='_blank' rel='noreferrer' href={elem.link}> </a>
                    <div className='popup__item-info'>
                        <h4 className='popup__item-title'>{elem.name}</h4>
                        <p className='popup__item-text popup__item-text_size_small'><span className='popup__item-text_weight_bold'>Дата загрузки: </span>{elem.date}</p>
                    </div>
                    </div>
                </li>
                ))
            }
            </ul>
            :
            <p className='table__caption_type_empty'>Нет загруженных файлов.</p>
            }
        </div>

        <div className='popup__field'>
            <h4 className='popup__input-caption'>Комментарий для студента:</h4>
            <textarea 
            className='popup__textarea scroll'
            name='teacher-edit-practice-student-comment'
            id='teacher-edit-practice-student-comment'
            placeholder='Введите комментарий...'            
            value={comment}
            onChange={handleChangeComment}
            required
            >
            </textarea>
        </div>

        <div className='popup__btn-container'>
            <button className='popup__btn-cancel' type='button' onClick={() => onClose()}>Отменить</button>
            {
            isLoadingRequest ? 
            <button className='popup__btn-save popup__btn-save_type_loading' disabled type='button'>Сохранение..</button>
            :
            <button className={`popup__btn-save ${isBlockSubmitButton ? 'popup__btn-save_type_block' : ''}`} type='submit'>Сохранить</button>
            }
        </div>
        <span className={`popup__input-error ${isShowRequestError.isShow && 'popup__input-error_status_show'}`}>{isShowRequestError.text}</span>
    </Popup>
  )
}

export default EditPracticePopup;