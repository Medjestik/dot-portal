import React from 'react';
import * as catalogApi from '../../../../utils/catalog.js';
import * as adminApi from '../../../../utils/admin.js';
import Preloader from '../../../Preloader/Preloader';
import Section from '../../../Section/Section';
import SelectSearch from '../../../SelectSearch/SelectSearch.js';
import RemoveUserPopup from './RemoveUserPopup.js';

function ControlUserRemove({ windowWidth }) {

  const [searchUserText, setSearchUserText] = React.useState('');
  const [users, setUsers] = React.useState([]);
  const [currentUser, setCurrentUser] = React.useState({ name: 'Выберите пользователя..', id: 'placeholder' });

  const [isLoadingUsers, setIsLoadingUsers] = React.useState(false);
  const [isShowUsersSelect, setIsShowUsersSelect] = React.useState(false);
  const [isShowUserForm, setIsShowUserForm] = React.useState(false);
  const [isShowRemoveUserPopup, setIsShowRemoveUserPopup] = React.useState(false);

  const [number, setNumber] = React.useState('');
  const [numberError, setNumberError] = React.useState({ isShow: false, text: '' });
  const [reason, setReason] = React.useState('');
  const [reasonError, setReasonError] = React.useState({ isShow: false, text: '' });

  const [isLoadingRequest, setIsLoadingRequest] = React.useState(false);
  const [isShowRequestError, setIsShowRequestError] = React.useState({ isShow: false, text: '', });
  const [isBlockSubmitButton, setIsBlockSubmitButton] = React.useState(true);

  function handleChangeSearchUserText(e) {
    setSearchUserText(e.target.value);
  }

  function handleChangeUser(option) { 
    setCurrentUser(option);
    setIsShowUserForm(true);
  }

  function handleChangeNumber(e) {
    setNumber(e.target.value);
    if (e.target.checkValidity()) {
      setNumberError({ text: '', isShow: false });
    } else {
      setNumberError({ text: 'Поле не может быть пустым', isShow: true });
    }
  }

  function handleChangeReason(e) {
    setReason(e.target.value);
    if (e.target.checkValidity()) {
      setReasonError({ text: '', isShow: false });
    } else {
      setReasonError({ text: 'Поле не может быть пустым', isShow: true });
    }
  }

  function cleanForm() {
    setSearchUserText('');
    setUsers([]);
    setCurrentUser({ name: 'Выберите пользователя..', id: 'placeholder' });
    setIsShowUsersSelect(false);
    setIsShowUserForm(false);
    setIsShowRemoveUserPopup(false);
    setNumber('');
    setReason('');
  }

  function usersRequest() {
    setIsShowUsersSelect(false);
    setIsShowUserForm(false);
    setIsLoadingUsers(true);
    const token = localStorage.getItem('token');
    catalogApi.getCatalogUsers({ token: token, text: searchUserText })
    .then((res) => {
      console.log('ReportUsers', res);
      const updatedUsers = res.map((user) => ({
        ...user,
        name: `${user.fullname} (${user.login})`
      }));
      setUsers(updatedUsers);
      setCurrentUser({ name: 'Выберите пользователя..', id: 'placeholder' });
      setIsShowUsersSelect(true);
    })
    .catch((err) => {
      console.error(err);
    })
    .finally(() => {  
      setIsLoadingUsers(false);
    })
  }

  function handleSubmit() {
    const data = {
      userId: currentUser.id,
      number: number,
      reason: reason
    };
    setIsShowRequestError({ isShow: false, text: '' });
    setIsLoadingRequest(true);
    const token = localStorage.getItem('token');
    adminApi.removeDotStudent({ token: token, data: data })
    .then((res) => {
      console.log(res);
      setIsShowRemoveUserPopup(true);
    })
    .catch((err) => {
      console.error(err);
      setIsShowRequestError({ isShow: true, text: 'К сожалению, произошла ошибка!' });
    })
    .finally(() => {  
      setIsLoadingRequest(false);
    })
  }

    function handleRenew() {
    const data = {
      userId: currentUser.id,
    };
    setIsShowRequestError({ isShow: false, text: '' });
    setIsLoadingRequest(true);
    const token = localStorage.getItem('token');
    adminApi.renewDotStudent({ token: token, data: data })
    .then((res) => {
      console.log(res);
      setIsShowRemoveUserPopup(true);
    })
    .catch((err) => {
      console.error(err);
      setIsShowRequestError({ isShow: true, text: 'К сожалению, произошла ошибка!' });
    })
    .finally(() => {  
      setIsLoadingRequest(false);
    })
  }

  React.useEffect(() => {
    if (number.length < 1 || reason.length < 1) {
      setIsBlockSubmitButton(true);
    } else {
      setIsBlockSubmitButton(false);
    }
  // eslint-disable-next-line
  }, [number, reason]);

  React.useEffect(() => {
  return (() => {
    setUsers([]);
    setCurrentUser({});
  })
    // eslint-disable-next-line
  }, []);

  return (
    <Section title='Отчисление студента' heightType='page' headerType='large'>
      <div className='section__header'>
        <div className='section__header-item'>
          <span className='section__header-caption'>Введите ФИО пользователя:</span>
          <div className='popup__input-field'>
            <input 
            className='popup__input'
            type='text'
            id='control-report-search-user'
            value={searchUserText}
            onChange={handleChangeSearchUserText}
            name='control-report-search-user' 
            placeholder='Введите данные для поиска...'
            autoComplete='off'
            required 
            />
          </div>
        </div>
        <div className='section__header-item section__header-item_type_content'>
          <span className='section__header-caption section__header-caption_margin_bottom'></span>
          {
            searchUserText.length > 3
            ?
            <button className={`section__header-btn section__header-btn_margin_top-8`} type='button' onClick={usersRequest}>Поиск пользователя</button>
            :
            <button className={`section__header-btn section__header-btn_margin_top-8 section__header-btn_type_block`} type='button'>Поиск пользователя</button>
          }
        </div>
      </div>
      {
          isLoadingUsers 
          ?
          <Preloader />
          :
          <>
          {
            isShowUsersSelect &&
            <>
            <div className='section__header'>
              <div className='section__header-item'>
                <span className='section__header-caption'>Выберите пользователя:</span>
                <SelectSearch options={users} currentOption={currentUser} onChooseOption={handleChangeUser} />
              </div>
            </div>
            
            </>
          }
          </>
        }
        {
          isShowUserForm &&
          <>
          {
            currentUser.is_dismissed === 'true'
            ?
            <>
            <h4 className='popup__input-caption'>Студент уже отчислен.</h4>
            <div className='popup__field'>
              {
                isLoadingRequest ? 
                <button className='popup__btn-save popup__btn-save_width_fix popup__btn-save_type_loading' disabled type='button'>Восстановить студента</button>
                :
                <button className={`popup__btn-save popup__btn-save_width_fix`} type='button' onClick={handleRenew}>Восстановить студента</button>
              }
            </div>
            </>
            :
            <div className='control-user-add__form'>
              <div className='popup__field popup__input-field_margin_top'>
                <h4 className='popup__input-caption'>Номер приказа</h4>
                <div className='popup__input-field'>
                  <input 
                  className='popup__input'
                  type='text'
                  id='control-user-remove-number'
                  value={number}
                  onChange={handleChangeNumber}
                  name='control-user-remove-number' 
                  placeholder='Введите номер приказа...'
                  autoComplete='off'
                  required 
                  />
                </div>
                <span className={`popup__input-error ${numberError.isShow ? 'popup__input-error_status_show' : ''}`}>
                  {numberError.text}
                </span>
              </div>
              <div className='popup__field'>
                <h4 className='popup__input-caption'>Причина отчисления</h4>
                <div className='popup__input-field'>
                  <input 
                  className='popup__input'
                  type='text'
                  id='control-user-remove-reason'
                  value={reason}
                  onChange={handleChangeReason}
                  name='control-user-remove-reason' 
                  placeholder='Введите причину отчисления...'
                  autoComplete='off'
                  required 
                  />
                </div>
                <span className={`popup__input-error ${reasonError.isShow ? 'popup__input-error_status_show' : ''}`}>
                  {reasonError.text}
                </span>
              </div>
              <div className='popup__btn-container'>
                {
                  isLoadingRequest ? 
                  <button className='popup__btn-save popup__btn-save_width_fix popup__btn-save_type_loading' disabled type='button'>Отчислить студента</button>
                  :
                  <button className={`popup__btn-save popup__btn-save_width_fix ${isBlockSubmitButton ? 'popup__btn-save_type_block' : ''}`} type='button' onClick={handleSubmit}>Отчислить студента</button>
                }
              </div>
            </div>
          }
          </>

        }
        {
          isShowRemoveUserPopup &&
          <RemoveUserPopup 
            isOpen={isShowRemoveUserPopup}
            popupName='remove-user-popup'
            onSubmit={cleanForm}
          />
        }
    </Section>
  );
}

export default ControlUserRemove;
