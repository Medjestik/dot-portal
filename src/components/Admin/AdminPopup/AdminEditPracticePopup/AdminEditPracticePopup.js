import React from 'react';
import Popup from '../../../Popup/Popup.js';
import PopupSelect from '../../../Popup/PopupSelect/PopupSelect.js';

function AdminEditPracticePopup({ isOpen, onClose, currentData, onChangeData, isLoadingRequest, isShowRequestError }) {
 
    const [name, setName] = React.useState(currentData.name || '');
    const [description, setDescription] = React.useState(currentData.description || '');
    const [type, setType] = React.useState(currentData.type || {});
    const [startDate, setStartDate] = React.useState(currentData.start_date || '');
    const [endDate, setEndDate] = React.useState(currentData.end_date || '');
    const [isVisible, setIsVisible] = React.useState(currentData.opened);

    const [isBlockSubmitButton, setIsBlockSubmitButton] = React.useState(false);

  function handleSubmit(e) {
    e.preventDefault();
    const data = {
        name: name,
        type: type,
        description: description,
        start_date: startDate,
        end_date: endDate,
        opened: isVisible,
        id: currentData.id,
    }
    onChangeData(data)
  }

  function handleChangeName(e) {
    setName(e.target.value);
  }

  function handleChangeDescription(e) {
    setDescription(e.target.value);
  }

  function handleChangeType(type) {
    setType(type);

  }

  function handleChangeStartDate(e) {
    setStartDate(e.target.value);
  }

  function handleChangeEndDate(e) {
    setEndDate(e.target.value);
  }

  React.useEffect(() => {
    setName(currentData.name || '');
    setDescription(currentData.description || '');
    setType(currentData.type || {});
    setStartDate(currentData.start_date || '');
    setStartDate(currentData.end_date || '');
    setIsVisible(currentData.opened || false);

    setIsBlockSubmitButton(false);
  }, [isOpen, currentData]);

  return (
    <Popup
      isOpen={isOpen}
      onSubmit={handleSubmit}
      formWidth={'medium'}
      formName={'admin-edit-practice-popup'}
    >
      <h2 className='popup__title'>Редактирование практики</h2>

      <div className='popup__field'>
        <h4 className='popup__input-caption'>Укажите название практики:</h4>
        <div className='popup__input-field'>
          <input 
          className='popup__input'
          type='text'
          id='edit-practice-name'
          value={name}
          onChange={handleChangeName}
          name='edit-practice-name' 
          placeholder='Укажите название...'
          autoComplete='off'
          required 
          />
        </div>
      </div>

      <div className='popup__field'>
        <h4 className='popup__input-caption'>Тип:</h4>
        <PopupSelect filterType='byElem' options={currentData.types} currentOption={type} onChooseOption={handleChangeType} />
      </div>

      <div className='popup__field'>
        <h4 className='popup__input-caption'>Укажите дату начала практики:</h4>
        <div className='popup__input-field'>
          <input 
          className='popup__input'
          type='date'
          id='edit-practice-start-date'
          value={startDate}
          onChange={handleChangeStartDate}
          name='edit-practice-start-date' 
          placeholder='Укажите дату начала...'
          min='1900-01-01'
          max='2100-01-01'
          autoComplete='off'
          required 
          />
        </div>
      </div>

      <div className='popup__field'>
        <h4 className='popup__input-caption'>Укажите дату окончания практики:</h4>
        <div className='popup__input-field'>
          <input 
          className='popup__input'
          type='date'
          id='edit-practice-end-date'
          value={endDate}
          onChange={ handleChangeEndDate}
          name='edit-practice-end-date' 
          placeholder='Укажите дату окончания...'
          min='1900-01-01'
          max='2100-01-01'
          autoComplete='off'
          required 
          />
        </div>
      </div>

      <label className='popup__field'>
        <h4 className='popup__input-caption'>Описание:</h4>
        <textarea 
          className='popup__textarea scroll'
          name='edit-practice-description' 
          placeholder='Введите описание..'            
          value={description}
          onChange={handleChangeDescription}
          required
        >
        </textarea>
      </label>

      <label className='checkbox'>
        <input 
        name='edit-practice-visible'
        type='checkbox checkbox_margin_top'
        id='edit-practice-visible'
        value={isVisible}
        defaultChecked={isVisible}
        onChange={() => setIsVisible(!isVisible)}
        >
        </input>
        <span>Доступна для студентов</span>
      </label>

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

export default AdminEditPracticePopup;