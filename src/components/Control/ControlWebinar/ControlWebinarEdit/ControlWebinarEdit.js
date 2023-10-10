import React from 'react';
import './ControlWebinarEdit.css';
import * as webinarApi from '../../../../utils/webinarApi.js';
import { useNavigate, useParams } from 'react-router-dom';
import InputMask from 'react-input-mask';
import Preloader from '../../../Preloader/Preloader.js';
import Table from '../../../Table/Table.js';
import PopupSelect from '../../../Popup/PopupSelect/PopupSelect.js';
import GroupWebinarPopup from '../../../Webinar/WebinarPopup/GroupWebinarPopup/GroupWebinarPopup.js';
import UserWebinarPopup from '../../../Webinar/WebinarPopup/UserWebinarPopup/UserWebinarPopup.js';
import DisciplineWebinarPopup from '../../../Webinar/WebinarPopup/DisciplineWebinarPopup/DisciplineWebinarPopup.js';
import DateWebinarPopup from '../../../Webinar/WebinarPopup/DateWebinarPopup/DateWebinarPopup.js';

function ControlWebinarEdit({ windowWidth, semesterInfo }) {

  const params = useParams();
  const navigate = useNavigate();

  const [title, setTitle] = React.useState('');
  const [titleError, setTitleError] = React.useState({ isShow: false, text: '' });
  const [description, setDescription] = React.useState('');
  const [date, setDate] = React.useState('');
  const [dateError, setDateError] = React.useState({ isShow: false, text: '' });
  const [time, setTime] = React.useState('');
  const [timeError, setTimeError] = React.useState({ isShow: false, text: '' });
  const [duration, setDuration] = React.useState('');
  const [durationError, setDurationError] = React.useState({ isShow: false, text: '' });

  const [currentWebinar, setCurrentWebinar] = React.useState({});
  const [currentGroups, setCurrentGroups] = React.useState([]);
  const [currentUsers, setCurrentUsers] = React.useState([]);
  const [currentDisciplines, setCurrentDisciplines] = React.useState([]);

  const [isOpenWebinarGroupPopup, setIsOpenWebinarGroupPopup] = React.useState(false);
  const [isOpenWebinarUserPopup, setIsOpenWebinarUserPopup] = React.useState(false);
  const [isOpenWebinarDisciplinePopup, setIsOpenWebinarDisciplinePopup] = React.useState(false);
  const [isOpenWebinarDatePopup, setIsOpenWebinarDatePopup] = React.useState(false);

  const [isLoadingWebinar, setIsLoadingWebinar] = React.useState(true);
  const [isBlockSubmitButton, setIsBlockSubmitButton] = React.useState(false);
  const [isLoadingRequest, setIsLoadingRequest] = React.useState(false);
  const [isShowRequestError, setIsShowRequestError] = React.useState({ isShow: false, text: '', });

  const statusOptions = [
    { name: 'Не выбран', id: 'empty', },
    { name: 'Планируется', id: 'planned', },
    { name: 'Отменен', id: 'canceled', },
    { name: 'Завершен', id: 'completed', },
    { name: 'Проводится', id: 'active', },
  ]

  const [currentStatusOption, setCurrentStatusOption] = React.useState(statusOptions[0]);

  const startsWithTwo = time[0] === '2';
  
  const maskTime = [
    /[0-2]/,
    startsWithTwo ? /[0-3]/ : /[0-9]/,
    ':',
    /[0-5]/,
    /[0-9]/
  ]

  function handleChangeTitle(e) {
    setTitle(e.target.value);
    if (e.target.checkValidity()) {
      setTitleError({ text: '', isShow: false });
    } else {
      setTitleError({ text: 'Поле не может быть пустым', isShow: true });
    }
  }

  function handleChangeDescription(e) {
    setDescription(e.target.value);
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

  function openWebinarGroupPopup() {
    setIsOpenWebinarGroupPopup(true);
  }

  function handleChangeGroup(data) {
    setCurrentGroups(data);
    closePopup();
  }

  function handleUnSelectGroup(item) {
    setCurrentGroups(currentGroups.filter(elem => elem.id !== item.id));
  }

  function openWebinarUserPopup() {
    setIsOpenWebinarUserPopup(true);
  }

  function handleChangeUser(data) {
    setCurrentUsers(data);
    closePopup();
  }

  function handleUnSelectUser(item) {
    setCurrentUsers(currentUsers.filter(elem => elem.id !== item.id));
  }

  function openWebinarDisciplinePopup() {
    setIsOpenWebinarDisciplinePopup(true);
  }

  function handleChangeDiscipline(data) {
    setCurrentDisciplines(data);

    const groupsId = currentGroups.map((element) => element.id);
    const filterGroups = data.filter(element => groupsId.indexOf(element.group_id) === -1);
    const transformGroups  = filterGroups.map(element => ({ id: element.group_id, name: element.group_name, code: element.group_code }));

    if (title.length < 1 && data.length > 0) {
      setTitle(data[0].activity_name);
    }

    setCurrentGroups([...transformGroups, ...currentGroups])
    closePopup();
  }

  function handleUnSelectDiscipline(item) {
    setCurrentDisciplines(currentDisciplines.filter(elem => elem.id !== item.id));
  }

  function openWebinarDatePopup() {
    setIsOpenWebinarDatePopup(true);
  }

  function handleEditDate(data) {
    setDate(data.date);
    setTime(data.time);
    setDuration(data.duration);
    closePopup();
  }

  function changeStatus(option) {
    setCurrentStatusOption(option);
  }

  function webinarItemRequest(id) {
    setIsLoadingWebinar(true);
    const token = localStorage.getItem('token');
    webinarApi.getWebinarItem({ token: token, webinarId: id })
    .then((res) => {
      console.log('WebinarItem', res);
      setCurrentWebinar(res);
      setTitle(res.title);
      setDescription(res.description);
      setDate(res.date);
      setTime(res.time);
      setDuration(res.duration);
      setCurrentGroups(res.groups);
      setCurrentUsers(res.users);
      setCurrentDisciplines(res.disciplines);
      setCurrentStatusOption(statusOptions.find((elem) => elem.id === res.status));
    })
    .catch((err) => {
      console.error(err);
    })
    .finally(() => {  
      setIsLoadingWebinar(false);
    });
  }

  function handleEditWebinar() {
    const data = {
      ...currentWebinar,
      title: title,
      description : description,
      date: date,
      time: time,
      duration: duration,
      disciplines: currentDisciplines,
      groups: currentGroups,
      users: currentUsers,
      status: currentStatusOption.id,
    };

    setIsLoadingRequest(true);
    const token = localStorage.getItem('token');
    webinarApi.editWebinar({
      token: token,
      data: data,
    })
    .then((res) => {
      navigate('/control/webinar/list');
    })
    .catch((err) => {
      console.error(err);
      setIsShowRequestError({ text: 'Произошла ошибка, попробуйте еще раз', isShow: true });
    })
    .finally(() => {  
      setIsLoadingRequest(false);
    });
  }

  function closePopup() {
    setIsOpenWebinarGroupPopup(false);
    setIsOpenWebinarUserPopup(false);
    setIsOpenWebinarDisciplinePopup(false);
    setIsOpenWebinarDatePopup(false);
  }

  React.useEffect(() => {
    
    webinarItemRequest(params.webinarId);

    setTitleError({ text: '', isShow: false });
    setDateError({ text: '', isShow: false });
    setTimeError({ text: '', isShow: false });
    setDurationError({ text: '', isShow: false });

    return(() => {
      setCurrentWebinar({});
      setCurrentGroups([]);
      setCurrentUsers([]);
      setCurrentDisciplines([]);
    })
  // eslint-disable-next-line
  }, [])

  return (
    <div className='webinar-add'>
      <h2 className='webinar-add__title'>Редактирование вебинара</h2>
      {
        isLoadingWebinar 
        ?
        <Preloader />
        :
        <>
        <label className='popup__field'>
          <h4 className='webinar-add__subtitle'>Название:</h4>
          <div className='popup__input-field'>
            <input 
            className='popup__input'
            type='text'
            id='edit-webinar-title'
            value={title}
            onChange={handleChangeTitle}
            name='edit-webinar-title' 
            placeholder='Введите название вебинара..'
            autoComplete='off'
            minLength={1}
            required 
            />
          </div>
          <span className={`popup__input-error ${titleError.isShow ? 'popup__input-error_status_show' : ''}`}>
            {titleError.text}
          </span>
        </label>

        <div className='webinar-add__section-row'>

          <div className='webinar-add__section-column'>

            <div className='webinar-add__section-item'>
              <div className='webinar-add__section-header webinar-add__section-header-mobile'>
                <h4 className='webinar-add__subtitle'>Дата проведения:</h4>
                <button className='btn_type_add' type='button' onClick={openWebinarDatePopup}></button>
              </div>
              <div className='popup__input-field'>
                <input 
                  className='popup__input'
                  type='date'
                  id='edit-webinar-date'
                  value={date}
                  onChange={handleChangeDate}
                  name='edit-webinar-date' 
                  placeholder='Укажите дату...'
                  min='2000-01-01'
                  max='2100-01-01'
                  autoComplete='off'
                  required 
                />
              </div>
              <span className={`popup__input-error ${dateError.isShow ? 'popup__input-error_status_show' : ''}`}>
                {dateError.text}
              </span>
            </div>

            <div className='webinar-add__section-item'>
              <div className='webinar-add__section-header webinar-add__section-header-mobile'>
                <h4 className='webinar-add__subtitle'>Время начала:</h4>
              </div>
              <div className='popup__input-field'>
                <InputMask 
                  className='popup__input'
                  placeholder='Введите время начала...'
                  mask={maskTime}
                  id='edit-webinar-time'
                  name='edit-webinar-time'
                  value={time}
                  onChange={handleChangeTime}
                  required
                  autoComplete='off'
                />
              </div>
              <span className={`popup__input-error ${timeError.isShow ? 'popup__input-error_status_show' : ''}`}>
                {timeError.text}
              </span>
            </div>

            <div className='webinar-add__section-item'>
              <div className='webinar-add__section-header webinar-add__section-header-mobile'>
                <h4 className='webinar-add__subtitle'>Продолжительность (в минутах):</h4>
              </div>
              <div className='popup__input-field'>
                <input 
                  className='popup__input'
                  placeholder='Введите продолжительность...'
                  type='number'
                  id='edit-webinar-duration'
                  name='edit-webinar-duration'
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
            </div>

          </div>

          <div className='webinar-add__section-column'>
            <div className='webinar-add__section-item'>
              <div className='webinar-add__section-header webinar-add__section-header-mobile'>
                <h4 className='webinar-add__subtitle'>Статус:</h4>
              </div>
              <PopupSelect options={statusOptions} currentOption={currentStatusOption} onChooseOption={changeStatus} />
            </div>
            <div className='webinar-add__section-header webinar-add__section-header-mobile'>
              <h4 className='webinar-add__subtitle'>Комментарий:</h4>
            </div>
            <textarea 
              className='popup__textarea popup__textarea_height_max scroll'
              name='edit-webinar-description'
              id='edit-webinar-description'
              placeholder='Введите описание вебинара..'     
              value={description}
              onChange={handleChangeDescription}
              required
            >
            </textarea>
          </div>
        </div>

        <div className='webinar-add__section-row'>

          <div className='webinar-add__section-column'>
            <div className='webinar-add__section-header webinar-add__section-header-mobile'>
              <h4 className='webinar-add__subtitle'>Группы:</h4>
              <button className='btn_type_add' type='button' onClick={openWebinarGroupPopup}></button>
            </div>
            <Table>
              <div className='table__container table__container_margin_top'>
                <div className='table__header'>
                  <div className='table__main-column'>
                    <div className='table__column table__column_type_header table__column_type_count'>
                      <p className='table__text table__text_type_header'>№</p>
                    </div>
                    <div className='table__column table__column_type_header table__column_type_name'>
                      <p className='table__text table__text_type_header'>Наименование</p>
                    </div>
                  </div>
                  <div className='table__column table__column_type_header table__column_type_btn table__column_type_btn-header'>
                    <button className='btn btn_type_download btn_type_download_status_active table__btn'></button> 
                  </div>
                </div>
                <ul className={`table__main ${windowWidth > 833 ? 'table__main_height_small scroll' : ''}`}>
                {
                currentGroups.length > 0
                ?
                  <>
                  {
                    [...currentGroups].reverse().map((item, i) => (
                      <li className='table__row' key={i}>
                        <div className='table__main-column'>
                          <div className='table__column table__column_type_count'>
                            <p className='table__text'>{i + 1}</p>
                          </div>
                          <div className='table__column table__column_type_name'>
                            <p className='table__text'>{item.name}</p>
                          </div>
                        </div>
                        <div className='table__column table__column_type_btn'>
                          <button className='btn btn_type_cancel btn_type_cancel_status_active table__btn' onClick={() => handleUnSelectGroup(item)}></button>
                        </div>
                      </li>
                    ))
                  }
                  </>
                  :
                  <p className='table__caption_type_empty'>Список пока пуст.</p>
                }
                </ul>
              </div>
            </Table>
          </div>

          <div className='webinar-add__section-column'>
            <div className='webinar-add__section-header webinar-add__section-header-mobile'>
              <h4 className='webinar-add__subtitle'>Участники:</h4>
              <button className='btn_type_add' type='button' onClick={openWebinarUserPopup}></button>
            </div>
            <Table>
              <div className='table__container table__container_margin_top'>
                <div className='table__header'>
                  <div className='table__main-column'>
                    <div className='table__column table__column_type_header table__column_type_small'>
                      <p className='table__text table__text_type_header'>Роль</p>
                    </div>
                    <div className='table__column table__column_type_header table__column_type_name'>
                      <p className='table__text table__text_type_header'>ФИО</p>
                    </div>
                  </div>
                  <div className='table__column table__column_type_header table__column_type_btn table__column_type_btn-header'>
                    <div className='btn btn_type_download btn_type_download_status_active table__btn'></div> 
                  </div>
                </div>
                  <ul className={`table__main ${windowWidth > 833 ? 'table__main_height_small scroll' : ''}`}>
                  {
                  currentUsers.length > 0
                  ?
                  <>
                  {
                    [...currentUsers].reverse().map((item, i) => (
                      <li className='table__row' key={i}>
                        <div className='table__main-column'>
                          <div className='table__column table__column_type_small'>
                            <div className='status'>
                              {
                                item.role.id === 'moderator'
                                ?
                                <>
                                <span className='status__icon status__icon_type_planned'></span>
                                <p className='table__text'>Мод.</p>
                                </>
                                :
                                <>
                                <span className='status__icon status__icon_type_canceled'></span>
                                <p className='table__text'>Уч.</p>
                                </>
                              }
                            </div>
                          </div>
                          <div className='table__column table__column_type_name'>
                            <p className='table__text'>{item.fullname}</p>
                          </div>
                        </div>
                        <div className='table__column table__column_type_btn'>
                          <button 
                          className='btn btn_type_cancel btn_type_cancel_status_active table__btn'
                          type='button' 
                          onClick={() => handleUnSelectUser(item)}
                          >
                          </button>
                        </div>
                      </li>
                    ))
                  }
                  </>
                :
                <p className='table__caption_type_empty'>Список пока пуст.</p>
                }
                </ul>
              </div>
            </Table>
          </div>

          <div className='webinar-add__section-column'>
            <div className='webinar-add__section-header webinar-add__section-header-mobile'>
              <h4 className='webinar-add__subtitle'>Дисциплины:</h4>
              <button className='btn_type_add' type='button' onClick={openWebinarDisciplinePopup}></button>
            </div>
            <Table>
              <div className='table__container table__container_margin_top'>
                <div className='table__header'>
                  <div className='table__main-column'>
                    <div className='table__column table__column_type_header table__column_type_count'>
                      <p className='table__text table__text_type_header'>№</p>
                    </div>
                    <div className='table__column table__column_type_header table__column_type_name'>
                      <p className='table__text table__text_type_header'>Наименование</p>
                    </div>
                  </div>
                  <div className='table__column table__column_type_header table__column_type_btn table__column_type_btn-header'>
                    <button className='btn btn_type_download btn_type_download_status_active table__btn'></button> 
                  </div>
                </div>
                <ul className={`table__main ${windowWidth > 833 ? 'table__main_height_small scroll' : ''}`}>
                {
                currentDisciplines.length > 0
                ?
                  <>
                  {
                    [...currentDisciplines].reverse().map((item, i) => (
                      <li className='table__row' key={i}>
                        <div className='table__main-column'>
                          <div className='table__column table__column_type_count'>
                            <p className='table__text'>{i + 1}</p>
                          </div>
                          <div className='table__column table__column_type_name'>
                            <p className='table__text'>{item.activity_name}</p>
                          </div>
                        </div>
                        <div className='table__column table__column_type_btn'>
                          <button className='btn btn_type_cancel btn_type_cancel_status_active table__btn' onClick={() => handleUnSelectDiscipline(item)}></button>
                        </div>
                      </li>
                    ))
                  }
                  </>
                  :
                  <p className='table__caption_type_empty'>Список пока пуст.</p>
                }
                </ul>
              </div>
            </Table>
          </div>
        </div>

        <div className='popup__btn_margin_top'></div>

        {
          isLoadingRequest ? 
          <button className='popup__btn-save popup__btn-save_margin_auto popup__btn-save_type_loading' disabled type='button'>Сохранение..</button>
          :
          <button className={`popup__btn-save popup__btn-save_margin_auto ${isBlockSubmitButton ? 'popup__btn-save_type_block' : ''}`} onClick={handleEditWebinar} type='button' >Сохранить</button>
        }
        <span className={`popup__input-error ${isShowRequestError.isShow ? 'popup__input-error_status_show' : ''}`}>{isShowRequestError.text}</span>
        </>
      }

      {
        isOpenWebinarGroupPopup &&
        <GroupWebinarPopup
          windowWidth={windowWidth}
          isOpen={isOpenWebinarGroupPopup}
          onClose={closePopup}
          onSave={handleChangeGroup}
          currentGroups={[...currentGroups]}
        />
      }

      {
        isOpenWebinarUserPopup &&
        <UserWebinarPopup
          windowWidth={windowWidth}
          isOpen={isOpenWebinarUserPopup}
          onClose={closePopup}
          onSave={handleChangeUser}
          currentUsers={[...currentUsers]}
        />
      }

      {
        isOpenWebinarDisciplinePopup &&
        <DisciplineWebinarPopup
          windowWidth={windowWidth}
          isOpen={isOpenWebinarDisciplinePopup}
          onClose={closePopup}
          onSave={handleChangeDiscipline}
          currentDisciplines={[...currentDisciplines]}
          semesterInfo={semesterInfo}
        />
      }

      {
        isOpenWebinarDatePopup &&
        <DateWebinarPopup
          windowWidth={windowWidth}
          isOpen={isOpenWebinarDatePopup}
          onClose={closePopup}
          onSave={handleEditDate}
          currentGroups={currentGroups}
          currentUsers={currentUsers}
          currentData={{ date: date, time: time, duration: duration }}
        />
      }

   </div>
  )

}

export default ControlWebinarEdit;