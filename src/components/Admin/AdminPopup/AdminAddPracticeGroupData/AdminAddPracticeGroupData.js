import React from 'react';
import Popup from '../../../Popup/Popup.js';
import PopupSelect from '../../../Popup/PopupSelect/PopupSelect.js';

function AdminAddPracticeGroupData({ isOpen, onClose, practice, onAddPlace, onAddManager, onAddTask, isLoadingRequest, isShowRequestError }) {
 
  const types = [
    { name: 'Выберите действие..', id: 'empty', },
    { name: 'Добавление единого места прохождения практики', id: 'place', },
    { name: 'Добавление единого руководителя практики', id: 'manager', },
    { name: 'Добавление единого задания на практику', id: 'task', },
  ]
  const [currentType, setCurrentType] = React.useState(types[0]);
  const [place, setPlace] = React.useState('');
  const [manager, setManager] = React.useState({ name: 'Выберите пользователя..', id: 'empty', });
  const [task, setTask] = React.useState('');

  const [isBlockSubmitButton, setIsBlockSubmitButton] = React.useState(true);

  function handleSubmit(e) {
    e.preventDefault();
    if (currentType.id === 'place') {
        const data = { place: place, }
        onAddPlace(data);
    } else if (currentType.id === 'manager') {
        const data = { manager: manager, }
        onAddManager(data);
    } else if (currentType.id === 'task') {
        const data = { task: task, }
        onAddTask(data);
    }
  }

  function handleChangeType(option) {
    setCurrentType(option);
    setPlace('');
    setManager({ name: 'Выберите пользователя..', id: 'empty', });
    setTask('');
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
    if (currentType.id === 'place') {
        if (place.length < 1) {
            setIsBlockSubmitButton(true);
        } else {
            setIsBlockSubmitButton(false);
        }
    } else if (currentType.id === 'task') {
        if (task.length < 1) {
            setIsBlockSubmitButton(true);
        } else {
            setIsBlockSubmitButton(false);
        }
    } else if (currentType.id === 'manager') {
        if (manager.id === 'empty') {
            setIsBlockSubmitButton(true);
        } else {
            setIsBlockSubmitButton(false);
        }
    } else {
        setIsBlockSubmitButton(true);
    }
  // eslint-disable-next-line
  }, [place, manager, task]);

  React.useEffect(() => {
    setCurrentType(types[0]);
    setPlace('');
    setManager({ name: 'Выберите пользователя..', id: 'empty', });
    setTask('');

    setIsBlockSubmitButton(true);
    // eslint-disable-next-line
  }, [isOpen]);

  return (
    <Popup
      isOpen={isOpen}
      onSubmit={handleSubmit}
      formWidth={'medium'}
      formName={'admin-edit-practice-popup'}
    >
      <h2 className='popup__title'>Назначение группе</h2>

      <div className='popup__field'>
        <h4 className='popup__input-caption'>Выберите действие:</h4>
        <PopupSelect filterType='byId' options={types} currentOption={currentType} onChooseOption={handleChangeType} />
      </div>

      {
        currentType.id === 'place' &&
        <div className='popup__field'>
            <h4 className='popup__input-caption'>Укажите место прохождения практики:</h4>
            <div className='popup__input-field'>
            <input 
            className='popup__input'
            type='text'
            id='add-practice-group-data-place'
            value={place}
            onChange={handleChangePlace}
            name='add-practice-group-data-place' 
            placeholder='Укажите место...'
            autoComplete='off'
            required 
            />
            </div>
        </div>
      }

      {
        currentType.id === 'manager' &&
        <div className='popup__field'>
            <h4 className='popup__input-caption'>Выберите руководителя по практике:</h4>
            <PopupSelect filterType='byId' options={practice.tutors} currentOption={manager} onChooseOption={handleChangeManager} />
        </div>
      }

      {   
        currentType.id === 'task' &&
        <div className='popup__field'>
            <h4 className='popup__input-caption'>Укажите задание на практику:</h4>
            <textarea 
            className='popup__textarea scroll'
            name='add-practice-group-data-task'
            id='add-practice-group-data-task'
            placeholder='Введите задание...'            
            value={task}
            onChange={handleChangeTask}
            required
            >
            </textarea>
        </div>
      }

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

export default AdminAddPracticeGroupData;