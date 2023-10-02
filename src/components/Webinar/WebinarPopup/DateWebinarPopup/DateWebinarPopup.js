import React from 'react';
import Popup from '../../../Popup/Popup.js';
import './DateWebinarPopup.css';
import * as webinarApi from '../../../../utils/webinarApi.js';
import InputMask from 'react-input-mask';
import Table from '../../../Table/Table.js';

function DateWebinarPopup({ isOpen, onClose, onSave, currentGroups, currentUsers, currentData }) {

  const [isLoadingSearch, setIsLoadingSearch] = React.useState(false);
  const [isBlockSearchButton, setIsBlockSearchButton] = React.useState(true);
  const [isBlockSaveButton, setIsBlockSaveButton] = React.useState(true);

  const [searchedWebinars, setSearchedWebinars] = React.useState([]);

  const [date, setDate] = React.useState('');
  const [dateError, setDateError] = React.useState({ isShow: false, text: '' });
  const [time, setTime] = React.useState('');
  const [timeError, setTimeError] = React.useState({ isShow: false, text: '' });
  const [duration, setDuration] = React.useState('');
  const [durationError, setDurationError] = React.useState({ isShow: false, text: '' });

  const startsWithTwo = time[0] === '2';
  
  const maskTime = [
    /[0-2]/,
    startsWithTwo ? /[0-3]/ : /[0-9]/,
    ':',
    /[0-5]/,
    /[0-9]/
  ]
  
  function handleSubmit(e) {
    e.preventDefault();
    handleSearch();
  }

  function handleSave() {
    const data = { date: date, time: time, duration: duration };
    onSave(data);
  }

  function handleChangeDate(e) {
    setDate(e.target.value);
    setSearchedWebinars([]);
    if (e.target.value.length > 0) {
      if (e.target.checkValidity()) {
        setDateError({ text: '', isShow: false });
        setIsBlockSearchButton(false);
      } else {
        setDateError({ text: 'Укажите корректную дату', isShow: true });
        setIsBlockSearchButton(true);
      }
    } else {
      setDateError({ text: '', isShow: false });
      setIsBlockSearchButton(true);
    }
  }

  function handleChangeTime(e) {
    setTime(e.target.value);
    if (e.target.value.match(/[0-9]/)) {
      if (e.target.value.includes('_')) {
        setTimeError({ text: 'Укажите корректное время', isShow: true });    
      } else {
        setTimeError({ text: '', isShow: false });
      }
    } else {
      setTimeError({ text: '', isShow: false });
    }
  }

  function handleChangeDuration(e) {
    setDuration(e.target.value);
    if (e.target.checkValidity()) {
      setDurationError({ text: '', isShow: false }); 
    } else {
      setDurationError({ text: 'Укажите корректную продолжительность', isShow: true });  
    }
  }

  function handleSearch() {
    setIsLoadingSearch(true);
    const token = localStorage.getItem('token');
    webinarApi.findWebinarsDate({
      token: token,
      searchText: date,
    })
    .then((res) => {
      if (res.length > 0) {
        setSearchedWebinars(res);
      } else {
        setDateError({ text: 'Вебинары не найдены, измените запрос', isShow: true });
        setSearchedWebinars([]);
      }
    })
    .catch((err) => {
      console.error(err);
      setDateError({ text: 'Произошла ошибка, попробуйте еще раз', isShow: true });
    })
    .finally(() => {  
      setIsLoadingSearch(false);
    });
  }

  React.useEffect(() => {
    if (
      timeError.isShow || 
      time.length < 1 || 
      time.includes('_') || 
      timeError.isShow || 
      time.length < 1 || 
      dateError.isShow ||
      date.length < 1
      ) {
      setIsBlockSaveButton(true);
    } else {
      setIsBlockSaveButton(false);
    }
  // eslint-disable-next-line
  }, [date, time, duration]);

  React.useEffect(() => {
    setDate(currentData.date);
    setDateError({ text: '', isShow: false });
    setTime(currentData.time);
    setTimeError({ text: '', isShow: false });
    setDuration(currentData.duration);
    setDurationError({ text: '', isShow: false });
    setIsBlockSearchButton(currentData.date.length > 0 ? false : true);

    return(() => {
      setSearchedWebinars([]);
    })
  // eslint-disable-next-line
  }, [isOpen]);

  return (
    <Popup
      isOpen={isOpen}
      onSubmit={handleSubmit}
      formWidth={'full'}
      formName={'add-date-webinar-popup'}
    >
      <h2 className='popup__title'>Дата и время</h2>

      <div className='popup__field'>
        <h4 className='popup__input-caption'>Выберите дату:</h4>
        <div className='popup__search'>
          <div className='popup__field popup__field_margin_top'>
            <div className='popup__input-field popup__input-field_margin_top'>
            <input 
              className='popup__input'
              type='date'
              id='add-webinar-date'
              value={date}
              onChange={handleChangeDate}
              name='add-webinar-date' 
              placeholder='Укажите дату...'
              min='2000-01-01'
              max='2100-01-01'
              autoComplete='off'
              required 
            />
            </div>
          </div>
          {
            isLoadingSearch ? 
            <button className='popup__search-button popup__search-button_type_loading' disabled type='button'>Поиск</button>
            :
            <button className={`popup__search-button ${isBlockSearchButton ? 'popup__search-button_type_block' : ''}`} type='submit'>Поиск</button>
          }
        </div>
        <span className={`popup__input-error ${dateError.isShow ? 'popup__input-error_status_show' : ''}`}>
          {dateError.text}
        </span>
      </div>

      <div className='popup__field-container'>

        <label className='popup__field popup__field_type_row'>
          <h4 className='popup__input-caption'>Время начала:</h4>
          <div className='popup__input-field'>
          <InputMask 
            className='popup__input'
            placeholder='Введите время начала...'
            mask={maskTime}
            id='add-webinar-time'
            name='add-webinar-time'
            value={time}
            onChange={handleChangeTime}
            required
            autoComplete='off'
          />
          </div>
          <span className={`popup__input-error ${timeError.isShow ? 'popup__input-error_status_show' : ''}`}>
            {timeError.text}
          </span>
        </label>

        <label className='popup__field popup__field_type_row'>
          <h4 className='popup__input-caption'>Продолжительность (в минутах):</h4>
          <div className='popup__input-field'>
          <input 
            className='popup__input'
            placeholder='Введите продолжительность...'
            type='number'
            id='add-webinar-duration'
            name='add-webinar-duration'
            value={duration}
            onChange={handleChangeDuration}
            required
            autoComplete='off'
            minLength={1}
          />
          </div>
          <span className={`popup__input-error ${durationError.isShow ? 'popup__input-error_status_show' : ''}`}>
            {durationError.text}
          </span>
        </label>

      </div>

      <div className='popup__field'>
        <h4 className='popup__input-caption popup__input-caption_weight_bold'>Вебинары по указанной дате:</h4>
        <Table>
          <div className='table__container table__container_margin_top'>
            <div className='table__header'>
              <div className='table__main-column table__main-column_type_empty'>
                <div className='table__column table__column_type_header table__column_type_small'>
                  <p className='table__text table__text_type_header'>Время</p>
                </div>
                <div className='table__column table__column_type_header table__column_type_name'>
                  <p className='table__text table__text_type_header'>Наименование</p>
                </div>
                <div className='table__column table__column_type_header table__column_type_full'>
                  <p className='table__text table__text_type_header'>Группа</p>
                </div>
                <div className='table__column table__column_type_header table__column_type_full'>
                  <p className='table__text table__text_type_header'>Ведущий</p>
                </div>
              </div>
            </div>
            {
              searchedWebinars.length > 0
              ?
              <ul className='table__main table__main_height_large scroll'>
                {
                  searchedWebinars.map((item, i) => (
                    <li className='table__row' key={i}>
                      <div className={`table__main-column ${(currentGroups.map(element => element.id).some(el => item.groups.map(element => element.id).includes(el))) || (currentUsers.map(element => element.id).some(el => item.moderators.map(element => element.id).includes(el))) ? 'table__main-column_type_block' : ''}`}>
                        <div className='table__column table__column_type_small'>
                          <p className='table__text'>{item.time}</p>
                        </div>
                        <div className='table__column table__column_type_name'>
                          <p className='table__text'>{item.name}</p>
                        </div>
                        <div className='table__column table__column_type_full'>
                          <p className='table__text'>{item.groups.map((elem) => elem.name).join(', ')}</p>
                        </div>
                        <div className='table__column table__column_type_full'>
                          <p className='table__text'>{item.moderators.map((elem) => elem.name).join(', ')}</p>
                        </div>
                      </div>
                    </li>
                  ))
                }
              </ul>
              :
              <p className='table__caption_type_empty'>Список пока пуст.</p>
            }
          </div>
        </Table>
      </div>

      <div className='popup__btn-container'>
        <button className='popup__btn-cancel' type='button' onClick={() => onClose()}>Назад</button>
        <button className={`popup__btn-save ${isBlockSaveButton ? 'popup__btn-save_type_block' : ''}`} type='button' onClick={() => handleSave()}>Сохранить</button>
      </div>

    </Popup>
  )
}

export default DateWebinarPopup;