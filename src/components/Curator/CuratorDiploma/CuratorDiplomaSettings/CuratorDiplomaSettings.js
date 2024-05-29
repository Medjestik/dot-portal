import React from 'react';

function CuratorDiplomaSettings({ windowWidth, diploma, onSubmit, isLoadingRequest, isShowRequestError }) {

  const [isBlockSubmitButton, setIsBlockSubmitButton] = React.useState(true);

  const [date, setDate] = React.useState(diploma.defence_date || '');
  const [dateError, setDateError] = React.useState({ isShow: false, text: '' });

  const [preDate, setPreDate] = React.useState(diploma.predefence_date || '');
  const [preDateError, setPreDateError] = React.useState({ isShow: false, text: '' });

  const [isOpenView, setIsOpenView] = React.useState(diploma.view_vkr || false);
  const [isOpenTheme, setIsOpenTheme] = React.useState(diploma.view_theme || false);
  const [isOpenLoad, setIsOpenLoad] = React.useState(diploma.view_load || false);

  function handleSubmit(e) {
    e.preventDefault();
    const data = {
      view_vkr: isOpenView,
      view_theme: isOpenTheme,
      view_load: isOpenLoad,
      defence_date: date,
      predefence_date: preDate,
      defence_comment: "",
      predefence_comment: "",
    };
    onSubmit(diploma.vkr_id, data);
  }

  function handleChangePreDate(e) {
    setPreDate(e.target.value);
    if (e.target.value.length > 0) {
      if (e.target.checkValidity()) {
        setPreDateError({ text: '', isShow: false });
      } else {
        setPreDateError({ text: 'Укажите корректную дату', isShow: true });
      }
    } else {
      setPreDateError({ text: '', isShow: false });
    }
  }

  function handleChangeDate(e) {
    setDate(e.target.value);
    if (e.target.value.length > 0) {
      if (e.target.checkValidity()) {
        setDateError({ text: '', isShow: false });
      } else {
        setDateError({ text: 'Укажите корректную дату', isShow: true });
      }
    } else {
      setDateError({ text: '', isShow: false });
    }
  }

  React.useEffect(() => {
    setIsBlockSubmitButton(false);
  // eslint-disable-next-line
  }, [date, preDate, isOpenView, isOpenTheme, isOpenLoad]);
  
  React.useEffect(() => {
    //setLink(currentStudent.report_link || '');
    //setPercent(currentStudent.percent || '');
   
  // eslint-disable-next-line
  }, []);

  return (
    <>
      <h2 className='popup__title'>Параметры ВКР для группы</h2>

      <div className='popup__field'>
        <h4 className='popup__input-caption'>Дата предзащиты:</h4>
        <div className='popup__input-field'>
          <input 
            className='popup__input popup__input_type_date'
            type='date'
            id='admin-edit-diploma-predate'
            value={preDate}
            onChange={handleChangePreDate}
            name='admin-edit-diploma-predate' 
            placeholder='Укажите дату предзащиты...'
            min='1900-01-01'
            max='2100-01-01'
            autoComplete='off'
          />
        </div>
        <span className={`popup__input-error ${preDateError.isShow ? 'popup__input-error_status_show' : ''}`}>
          {preDateError.text}
        </span>
      </div>

      <div className='popup__field'>
        <h4 className='popup__input-caption'>Дата защиты:</h4>
        <div className='popup__input-field'>
          <input 
            className='popup__input popup__input_type_date'
            type='date'
            id='admin-edit-diploma-date'
            value={date}
            onChange={handleChangeDate}
            name='admin-edit-diploma-date' 
            placeholder='Укажите дату защиты...'
            min='1900-01-01'
            max='2100-01-01'
            autoComplete='off'
          />
        </div>
        <span className={`popup__input-error ${dateError.isShow ? 'popup__input-error_status_show' : ''}`}>
          {dateError.text}
        </span>
      </div>

      <label className='checkbox checkbox_margin_top-20'>
        <input 
        name='admin-edit-diploma-settings'
        type='checkbox'
        id='admin-edit-diploma-settings'
        value={isOpenView}
        defaultChecked={isOpenView}
        onChange={() => setIsOpenView(!isOpenView)}
        >
        </input>
        <span>Показать раздел ВКР студентам</span>
      </label>

      <label className='checkbox checkbox_margin_top-20'>
        <input 
        name='admin-edit-diploma-theme'
        type='checkbox'
        id='admin-edit-diploma-theme'
        value={isOpenTheme}
        defaultChecked={isOpenTheme}
        onChange={() => setIsOpenTheme(!isOpenTheme)}
        >
        </input>
        <span>Разрешить менять тему ВКР на портале</span>
      </label>

      <label className='checkbox checkbox_margin_top-20'>
        <input 
        name='admin-edit-diploma-load'
        type='checkbox'
        id='admin-edit-diploma-load'
        value={isOpenLoad}
        defaultChecked={isOpenLoad}
        onChange={() => setIsOpenLoad(!isOpenLoad)}
        >
        </input>
        <span>Разрешить загрузку студентам ВКР на проверку</span>
      </label>

      <div className='popup__btn-container'>
        {
          isLoadingRequest ? 
          <button className='popup__btn-save popup__btn-save_type_loading' disabled type='button'>Сохранение..</button>
          :
          <button className={`popup__btn-save ${isBlockSubmitButton ? 'popup__btn-save_type_block' : ''}`} type='button' onClick={handleSubmit}>Сохранить</button>
        }
      </div>
      <span className={`popup__input-error ${isShowRequestError.isShow && 'popup__input-error_status_show'}`}>{isShowRequestError.text}</span>
    </>
  )
}

export default CuratorDiplomaSettings;
