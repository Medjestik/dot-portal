import React from 'react';
import './ControlWebinarAdd.css';
import { useNavigate } from 'react-router-dom';
import GroupWebinarPopup from '../../../Webinar/WebinarPopup/GroupWebinarPopup/GroupWebinarPopup.js';
import UserWebinarPopup from '../../../Webinar/WebinarPopup/UserWebinarPopup/UserWebinarPopup.js';
import DisciplineWebinarPopup from '../../../Webinar/WebinarPopup/DisciplineWebinarPopup/DisciplineWebinarPopup.js';
import DateWebinarPopup from '../../../Webinar/WebinarPopup/DateWebinarPopup/DateWebinarPopup.js';
import Table from '../../../Table/Table.js';
import Preloader from '../../../Preloader/Preloader.js';
import * as webinarApi from '../../../../utils/webinarApi.js';

function ControlWebinarAdd({ windowWidth, semesterInfo, webinarAction }) {

  const navigate = useNavigate();

  const [title, setTitle] = React.useState('');
  const [titleError, setTitleError] = React.useState({ isShow: false, text: '' });
  const [description, setDescription] = React.useState('');

  const [isOpenWebinarGroupPopup, setIsOpenWebinarGroupPopup] = React.useState(false);
  const [isOpenWebinarUserPopup, setIsOpenWebinarUserPopup] = React.useState(false);
  const [isOpenWebinarDisciplinePopup, setIsOpenWebinarDisciplinePopup] = React.useState(false);
  const [isOpenWebinarDatePopup, setIsOpenWebinarDatePopup] = React.useState(false);

  const [isLoadingWebinar, setIsLoadingWebinar] = React.useState(true);
  const [isLoadingRequest, setIsLoadingRequest] = React.useState(false);
  const [isShowRequestError, setIsShowRequestError] = React.useState({ isShow: false, text: '', });

  const [currentGroups, setCurrentGroups] = React.useState([]);
  const [currentUsers, setCurrentUsers] = React.useState([]);
  const [currentDisciplines, setCurrentDisciplines] = React.useState([]);
  const [currentDates, setCurrentDates] = React.useState([]);

  const [isBlockSubmitButton, setIsBlockSubmitButton] = React.useState(true);

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

  function handleAddDate(date) {
    setCurrentDates([date, ...currentDates]);
    closePopup();
  }

  function handleRemoveDate(date) {
    setCurrentDates(currentDates.filter(elem => ((elem.time !== date.time) || (elem.date !== date.date))));
  }

  function handleAddWebinar() {
    const data = {
      title: title,
      description : description,
      type: '',
      disciplines: currentDisciplines.map(elem => ({ id: elem.id })),
      groups: currentGroups.map((elem) => ({ id: elem.id, name: elem.name })),
      users: currentUsers.map((elem) => ({ id: elem.id, role: elem.role })),
      dates: currentDates,
    };

    setIsLoadingRequest(true);
    const token = localStorage.getItem('token');
    webinarApi.addWebinar({
      token: token,
      data: data,
    })
    .then(() => {
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

  function webinarItemRequest(id) {
    const token = localStorage.getItem('token');
    webinarApi.getWebinarItem({ token: token, webinarId: id })
    .then((res) => {
      console.log('WebinarItem', res);
      setTitle(res.title);
      setTitleError({ text: '', isShow: false });
      setDescription('');
      setCurrentGroups(res.groups);
      setCurrentUsers(res.users);
      setCurrentDisciplines(res.disciplines);
    })
    .catch((err) => {
      console.error(err);
    })
    .finally(() => {  
      setIsLoadingWebinar(false);
    });
  }

  function closePopup() {
    setIsOpenWebinarGroupPopup(false);
    setIsOpenWebinarUserPopup(false);
    setIsOpenWebinarDisciplinePopup(false);
    setIsOpenWebinarDatePopup(false);
  }

  React.useEffect(() => {
    if (titleError.isShow || title.length < 1 || currentDates.length < 1) {
      setIsBlockSubmitButton(true);
    } else {
      setIsBlockSubmitButton(false);
    }
  // eslint-disable-next-line
  }, [title, currentDates]);

  React.useEffect(() => {
    setIsLoadingWebinar(true);
    if (webinarAction.action === 'discipline') {
      setTitle(webinarAction.activity_name);
      setTitleError({ text: '', isShow: false });
      setDescription('');
      setCurrentGroups([ { code: webinarAction.group_code, id: webinarAction.group_id, name: webinarAction.group_name, }, ...[]]);
      setCurrentDisciplines([ { activity_name: webinarAction.activity_name, id: webinarAction.id, group_name: webinarAction.group_name, group_code: webinarAction.group_code, group_id: webinarAction.group_id, }, ...[]]);
      if (webinarAction.type_id !== 'prac') {
        setCurrentUsers([ { fullname: webinarAction.lector_fullname, id: webinarAction.lector_id, role: {name: 'Ведущий', id: 'moderator'} }, ...[]]);
      }
      setIsLoadingWebinar(false);
    } else if (webinarAction.action === 'copy') {
      webinarItemRequest(webinarAction.id)
    } else {
      setTitle('');
      setTitleError({ text: '', isShow: false });
      setDescription('');
      setCurrentGroups([]);
      setCurrentDisciplines([]);
      setCurrentUsers([]);
      setCurrentDates([]);
      setIsLoadingWebinar(false);
    }
    
    setIsBlockSubmitButton(true);

    return(() => {
      setCurrentGroups([]);
      setCurrentUsers([]);
      setCurrentDisciplines([]);
      setCurrentDates([]);
    })
  // eslint-disable-next-line
  }, []);

  return (
    <div className='webinar-add'>
      <h2 className='webinar-add__title'>Создание нового вебинара</h2>

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
          id='add-webinar-title'
          value={title}
          onChange={handleChangeTitle}
          name='add-webinar-title' 
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
          <div className='webinar-add__section-header'>
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
              <ul className='table__main table__main_height_small scroll'>
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
          <div className='webinar-add__section-header'>
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
                <ul className='table__main table__main_height_small scroll'>
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
          <div className='webinar-add__section-header'>
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
              <ul className='table__main table__main_height_small scroll'>
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

      <div className='webinar-add__section-row'>

        <div className='webinar-add__section-column'>
          <div className='webinar-add__section-header'>
            <h4 className='webinar-add__subtitle'>Дата и время:</h4>
            <button className='btn_type_add' type='button' onClick={openWebinarDatePopup}></button>
          </div>
          <Table>
            <div className='table__container table__container_margin_top'>
              <div className='table__header'>
                <div className='table__main-column'>
                  <div className='table__column table__column_type_header table__column_type_count'>
                    <p className='table__text table__text_type_header'>№</p>
                  </div>
                  <div className='table__column table__column_type_header table__column_type_large'>
                    <p className='table__text table__text_type_header'>Дата</p>
                  </div>
                  <div className='table__column table__column_type_header table__column_type_medium'>
                    <p className='table__text table__text_type_header'>Время</p>
                  </div>
                  <div className='table__column table__column_type_header table__column_type_large'>
                    <p className='table__text table__text_type_header'>Длительность</p>
                  </div>
                </div>
                <div className='table__column table__column_type_header table__column_type_btn table__column_type_btn-header'>
                  <button className='btn btn_type_download btn_type_download_status_active table__btn'></button> 
                </div>
              </div>
              <ul className='table__main table__main_height_small scroll'>
              {
              currentDates.length > 0
              ?
                <>
                {
                  [...currentDates].reverse().map((item, i) => (
                    <li className='table__row' key={i}>
                      <div className='table__main-column'>
                        <div className='table__column table__column_type_count'>
                          <p className='table__text'>{i + 1}</p>
                        </div>
                        <div className='table__column table__column_type_large'>
                          <p className='table__text'>{item.date}</p>
                        </div>
                        <div className='table__column table__column_type_medium'>
                          <p className='table__text'>{item.time}</p>
                        </div>
                        <div className='table__column table__column_type_large'>
                          <p className='table__text'>{item.duration}</p>
                        </div>
                      </div>
                      <div className='table__column table__column_type_btn'>
                        <button className='btn btn_type_cancel btn_type_cancel_status_active table__btn' onClick={() => handleRemoveDate(item)}></button>
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
          <div className='webinar-add__section-header'>
            <h4 className='webinar-add__subtitle'>Комментарий:</h4>
          </div>
          <textarea 
            className='popup__textarea popup__textarea_height_max scroll'
            name='add-webinar-description'
            id='add-webinar-description'
            placeholder='Введите описание вебинара..'     
            value={description}
            onChange={handleChangeDescription}
            required
          >
          </textarea>
        </div>
      </div>

      <div className='popup__btn_margin_top'></div>

      {
        isLoadingRequest ? 
        <button className='popup__btn-save popup__btn-save_margin_auto popup__btn-save_type_loading' disabled type='button'>Сохранение..</button>
        :
        <button className={`popup__btn-save popup__btn-save_margin_auto ${isBlockSubmitButton ? 'popup__btn-save_type_block' : ''}`} type='button' onClick={() => handleAddWebinar()}>Сохранить</button>
      }
      <span className={`popup__input-error ${isShowRequestError.isShow ? 'popup__input-error_status_show' : ''}`}>{isShowRequestError.text}</span>
      </>
      }

      {
        isOpenWebinarGroupPopup &&
        <GroupWebinarPopup
          isOpen={isOpenWebinarGroupPopup}
          onClose={closePopup}
          onSave={handleChangeGroup}
          currentGroups={[...currentGroups]}
        />
      }

      {
        isOpenWebinarUserPopup &&
        <UserWebinarPopup
          isOpen={isOpenWebinarUserPopup}
          onClose={closePopup}
          onSave={handleChangeUser}
          currentUsers={[...currentUsers]}
        />
      }

      {
        isOpenWebinarDisciplinePopup &&
        <DisciplineWebinarPopup
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
          isOpen={isOpenWebinarDatePopup}
          onClose={closePopup}
          onSave={handleAddDate}
          currentGroups={currentGroups}
          currentUsers={currentUsers}
          currentData={{ date: '', time: '', duration: '60' }}
        />
      }

    </div>
  );
}

export default ControlWebinarAdd;