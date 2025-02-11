import React from 'react';
import Popup from '../../../Popup/Popup.js';
import SelectSearch from '../../../SelectSearch/SelectSearch.js';

function AdminEditPracticeStudentData({ isOpen, onClose, practice, currentStudent, onEdit, isLoadingRequest, isShowRequestError }) {
 
  const [place, setPlace] = React.useState(currentStudent.place);
  const [manager, setManager] = React.useState(currentStudent.uni_boss);
  const [task, setTask] = React.useState(currentStudent.task);

  const [isBlockSubmitButton, setIsBlockSubmitButton] = React.useState(true);

  function handleSubmit(e) {
    e.preventDefault();

    const data = {
        place: place,
        uni_boss: manager,
        task: task,
    }
    onEdit(data);
  }

  function handleChangePlace(e) {
    setPlace(e.target.value);
  }

  function handleChangeManager(option) {
    setManager(option);
  }

  function handleChangeTask(e) {
    setTask(e.target.value);
  }

  React.useEffect(() => {
    setIsBlockSubmitButton(false);
  // eslint-disable-next-line
  }, [place, manager, task]);

  React.useEffect(() => {
    setIsBlockSubmitButton(true);
    // eslint-disable-next-line
  }, [isOpen]);

  return (
    <Popup
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
      formWidth={'medium'}
      formName={'admin-edit-practice-popup'}
    >
        <h2 className='popup__title'>Назначение студенту</h2>

        <div className='popup__field'>
            <h4 className='popup__input-caption'>Укажите место прохождения практики:</h4>
            <div className='popup__input-field'>
            <input 
            className='popup__input'
            type='text'
            id='edit-practice-student-data-place'
            value={place}
            onChange={handleChangePlace}
            name='edit-practice-student-data-place' 
            placeholder='Укажите место...'
            autoComplete='off'
            required 
            />
            </div>
        </div>

        <div className='popup__field'>
            <h4 className='popup__input-caption'>Выберите руководителя по практике:</h4>
            <SelectSearch filterType='byId' options={practice.tutors} currentOption={manager} onChooseOption={handleChangeManager} />
        </div>

        <div className='popup__field'>
            <h4 className='popup__input-caption'>Укажите задание на практику:</h4>
            <textarea 
            className='popup__textarea scroll'
            name='edit-practice-student-data-task'
            id='edit-practice-student-data-task'
            placeholder='Введите задание...'            
            value={task}
            onChange={handleChangeTask}
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

export default AdminEditPracticeStudentData;