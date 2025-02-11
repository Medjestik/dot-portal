import React from 'react';
import * as adminApi from '../../../../utils/admin.js';
import * as catalogApi from '../../../../utils/catalog.js';
import Preloader from '../../../Preloader/Preloader';
import Section from '../../../Section/Section';
import InputMask from 'react-input-mask';
import SelectSearch from '../../../SelectSearch/SelectSearch.js';
import CreateUserPopup from './CreateUserPopup.js';
import './ControlUserAdd.css';

function ControlUserAdd({ windowWidth }) {

  const [users, setUsers] = React.useState([]);
  const [userId, setUserId] = React.useState('');
  const [groups, setGroups] = React.useState([]);
  const [currentGroup, setCurrentGroup] = React.useState({ name: 'Выберите группу..', id: 'placeholder' });
  const [firstName, setFirstName] = React.useState('');
  const [firstNameError, setFirstNameError] = React.useState({ isShow: false, text: '' });
  const [lastName, setLastName] = React.useState('');
  const [lastNameError, setLastNameError] = React.useState({ isShow: false, text: '' });
  const [middleName, setMiddleName] = React.useState('');
  const [phone, setPhone] = React.useState('');
  const [phoneError, setPhoneError] = React.useState({ isShow: false, text: '' });
  const [mail, setMail] = React.useState('');
  const [mailError, setMailError] = React.useState({ isShow: false, text: '' });
  const [login, setLogin] = React.useState('');
  const [loginError, setLoginError] = React.useState({ isShow: false, text: '' });
  const [isTransfer, setIsTransfer] = React.useState(false);
  const [transferOrder, setTransferOrder] = React.useState('');
  const [transferSemester, setTransferSemester] = React.useState('');

  const [isShowCreateUserPopup, setIsShowCreateUserPopup] = React.useState(false);

  const [isLoadingData, setIsLoadingData] = React.useState(false);
  const [isBlockSubmitButton, setIsBlockSubmitButton] = React.useState(true);
  const [isLoadingRequest, setIsLoadingRequest] = React.useState(false);
  const [isShowRequestError, setIsShowRequestError] = React.useState({ isShow: false, text: '' });

  function handleChangeGroup(option) { 
    setCurrentGroup(option);
  }

  function handleChangeFirstName(e) {
    setFirstName(e.target.value);
    if (e.target.checkValidity()) {
      setFirstNameError({ text: '', isShow: false });
    } else {
      setFirstNameError({ text: 'Поле не может быть пустым', isShow: true });
    }
  }

  function handleChangeLastName(e) {
    setLastName(e.target.value);
    if (e.target.checkValidity()) {
      setLastNameError({ text: '', isShow: false });
    } else {
      setLastNameError({ text: 'Поле не может быть пустым', isShow: true });
    }
  }

  function handleChangeMiddleName(e) {
    setMiddleName(e.target.value);
  }

  function handleChangeLogin(e) {
    setLogin(e.target.value);
    if (e.target.checkValidity()) {
      setLoginError({ text: '', isShow: false });
    } else {
      setLoginError({ text: 'Поле не может быть пустым', isShow: true });
    }
  }

  function handleChangePhone(e) {
    setPhone(e.target.value);
    if (e.target.value.match(/[0-9]/)) {
      if (e.target.value.includes('_')) {
        setPhoneError({ text: 'Укажите корректный номер телефона', isShow: true });
      } else {
        setPhoneError({ text: '', isShow: false });
      }
    } else {
      setPhoneError({ text: '', isShow: false });
    }
  }

  function handleChangeMail(e) {
    setMail(e.target.value);
    if (e.target.checkValidity()) {
      setMailError({ text: '', isShow: false });
    } else {
      setMailError({ text: 'Укажите корректную почту', isShow: true });
    }
  }

  function handleChangeTransferOrder(e) {
    setTransferOrder(e.target.value);
  }

  function handleChangeTransferSemester(e) {
    setTransferSemester(e.target.value);
  }

  function handleSubmit() {
    const data = {
      group_id: currentGroup.id,
      firstname: firstName,
      lastname: lastName,
      middlename: middleName,
      email: mail,
      phone: phone,
      login: login,
      transfer: isTransfer,
      transfer_doc: transferOrder,
      sem_num: transferSemester
    };setIsShowRequestError({ isShow: false, text: '' });
    setIsLoadingRequest(true);
    const token = localStorage.getItem('token');
    adminApi.createDotStudent({ token: token, data: data })
    .then((res) => {
      console.log(res);
      setUserId(res.user_id);
      setIsShowCreateUserPopup(true);
    })
    .catch((err) => {
      console.error(err);
      setIsShowRequestError({ isShow: true, text: 'К сожалению, произошла ошибка!' });
    })
    .finally(() => {  
      setIsLoadingRequest(false);
    })
  }

  function dataRequest() {
    setIsLoadingData(true);
    const token = localStorage.getItem('token');
    Promise.all([
      adminApi.getLearningGroups({ token: token }),
      catalogApi.getLastCreatedUsers({ token: token }),
    ])
    .then(([groupsData, usersData]) => {
      console.log('ControlUserGroups', groupsData);
      console.log('ControlLastUsers', usersData);
      setGroups(groupsData);
      setUsers(usersData);
    })
    .catch((err) => {
      console.error(err);
    })
    .finally(() => {  
      setIsLoadingData(false);
    })
  }

    React.useEffect(() => {
      if (firstName.length < 1 || lastName.length < 1 || login.length < 1 || currentGroup.id === 'placeholder') {
        setIsBlockSubmitButton(true);
      } else {
        setIsBlockSubmitButton(false);
      }
    // eslint-disable-next-line
    }, [firstName, lastName, login, currentGroup]);

  React.useEffect(() => {
    dataRequest();
  return (() => {
    setUsers([]);
    setGroups([]);
    setUserId('');
    setIsShowCreateUserPopup(false);
  })
    // eslint-disable-next-line
  }, []);

  return (
    <Section title='Создание студента ДОТ' heightType='page' headerType='large'>
      {
        isLoadingData 
        ?
        <Preloader />
        :
        <div className='control-user-add__container'>
          <div className='control-user-add__form'>
            <div className='popup__row popup__row_gap popup__row_margin_top'>
              <div className='popup__field popup__input-field_margin_top'>
                <h4 className='popup__input-caption'>Фамилия:</h4>
                <div className='popup__input-field'>
                  <input 
                  className='popup__input'
                  type='text'
                  id='control-user-add-last-name'
                  value={lastName}
                  onChange={handleChangeLastName}
                  name='control-user-add-last-name' 
                  placeholder='Введите фамилию...'
                  autoComplete='off'
                  required 
                  />
                </div>
                <span className={`popup__input-error ${lastNameError.isShow ? 'popup__input-error_status_show' : ''}`}>
                  {lastNameError.text}
                </span>
              </div>
              <div className='popup__field popup__input-field_margin_top'>
                <h4 className='popup__input-caption'>Имя:</h4>
                <div className='popup__input-field'>
                  <input 
                  className='popup__input'
                  type='text'
                  id='control-user-add-first-name'
                  value={firstName}
                  onChange={handleChangeFirstName}
                  name='control-user-add-first-name' 
                  placeholder='Введите имя...'
                  autoComplete='off'
                  required 
                  />
                </div>
                <span className={`popup__input-error ${firstNameError.isShow ? 'popup__input-error_status_show' : ''}`}>
                  {firstNameError.text}
                </span>
              </div>
              <div className='popup__field popup__input-field_margin_top'>
                <h4 className='popup__input-caption'>Отчество:</h4>
                <div className='popup__input-field'>
                  <input 
                  className='popup__input'
                  type='text'
                  id='control-user-add-middle-name'
                  value={middleName}
                  onChange={handleChangeMiddleName}
                  name='control-user-add-middle-name' 
                  placeholder='Введите отчество...'
                  autoComplete='off'
                  required 
                  />
                </div>
                <span className={`popup__input-error`}>
                </span>
              </div>
            </div>
            <div className='popup__row popup__row_gap'>
              <div className='popup__field popup__input-field_margin_top'>
                <h4 className='popup__input-caption'>Электронная почта:</h4>
                <div className='popup__input-field'>
                  <input 
                  className='popup__input'
                  type='email'
                  id='person-area-mail'
                  value={mail}
                  onChange={handleChangeMail}
                  name='person-area-mail' 
                  placeholder='Укажите вашу почту...'
                  autoComplete='off'
                  required 
                  />
                </div>
                <span className={`popup__input-error ${mailError.isShow ? 'popup__input-error_status_show' : ''}`}>
                  {mailError.text}
                </span>
              </div>
              <div className='popup__field popup__input-field_margin_top'>
                <h4 className='popup__input-caption'>Номер мобильного телефона:</h4>
                <div className='popup__input-field'>
                <InputMask mask='9 (999) 999-99-99' 
                  className='popup__input'
                  placeholder='Укажите ваш номер телефона...'
                  type='tel'
                  id='person-area-phone'
                  name='person-area-phone'
                  value={phone}
                  onChange={handleChangePhone}
                  required
                  autoComplete="off"
                />
                </div>
                <span className={`popup__input-error ${phoneError.isShow ? 'popup__input-error_status_show' : ''}`}>
                  {phoneError.text}
                </span>
              </div>
            </div>
            <div className='popup__row popup__row_gap'>
              <div className='popup__field popup__input-field_margin_top'>
                <h4 className='popup__input-caption'>Логин:</h4>
                <div className='popup__input-field'>
                  <input 
                  className='popup__input'
                  type='text'
                  id='control-user-add-login'
                  value={login}
                  onChange={handleChangeLogin}
                  name='control-user-add-login' 
                  placeholder='Введите логин...'  
                  autoComplete='off'
                  required 
                  />
                </div>
                <span className={`popup__input-error ${loginError.isShow ? 'popup__input-error_status_show' : ''}`}>
                  {loginError.text}
                </span>
              </div>
              <div className='popup__field popup__input-field_margin_top'>
                <h4 className='popup__input-caption'>Группа:</h4>
                <SelectSearch options={groups} currentOption={currentGroup} onChooseOption={handleChangeGroup} />
                <span className={`popup__input-error popup__input-error_status_show`}></span>
              </div>
            </div>
            <label className='checkbox checkbox_margin_top'>
              <input 
              name='control-user-add-transfer'
              type='checkbox'
              id='control-user-add-transfer'
              value={isTransfer}
              defaultChecked={isTransfer}
              onChange={() => setIsTransfer(!isTransfer)}
              >
              </input>
              <span>Студент переводник</span>
            </label>
            {
              isTransfer &&
              <div className='popup__row popup__row_gap'>
                <div className='popup__field popup__input-field_margin_top'>
                  <h4 className='popup__input-caption'>Приказ о переводе:</h4>
                  <div className='popup__input-field'>
                    <input 
                    className='popup__input'
                    type='text'
                    id='control-user-add-transfer-order'
                    value={transferOrder}
                    onChange={handleChangeTransferOrder}
                    name='control-user-add-transfer-order' 
                    placeholder='Введите номер приказа и дату...'
                    autoComplete='off'
                    required 
                    />
                  </div>
                  <span className={`popup__input-error`}></span>
                </div>
                <div className='popup__field popup__input-field_margin_top'>
                  <h4 className='popup__input-caption'>Семестр перевода:</h4>
                  <div className='popup__input-field'>
                    <input 
                    className='popup__input'
                    type='text'
                    id='control-user-add-transfer-semester'
                    value={transferSemester}
                    onChange={handleChangeTransferSemester}
                    name='control-user-add-transfer-semester' 
                    placeholder='Введите семестр на который переводится...'
                    autoComplete='off'
                    required 
                    />
                  </div>
                  <span className={`popup__input-error`}></span>
                </div>
              </div>
            }
            <div className='popup__btn-container'>
              {
                isLoadingRequest ? 
                <button className='popup__btn-save popup__btn-save_width_fix popup__btn-save_type_loading' disabled type='button'>Сохранение..</button>
                :
                <button className={`popup__btn-save popup__btn-save_width_fix ${isBlockSubmitButton ? 'popup__btn-save_type_block' : ''}`} type='button' onClick={handleSubmit}>Сохранить</button>
              }
            </div>
            <span className={`popup__input-error ${isShowRequestError.isShow && 'popup__input-error_status_show'}`}>{isShowRequestError.text}</span>
          </div>
          <div className='control-user-add__users'>
            <h4 className='control-user-add-users__title'>Созданные студенты ДОТ:</h4>
            <ul className='control-user-add-users__list'>
              {
                users.map((user) => (
                  <li className='control-user-add-users__item' key={user.id}>
                    <div className='control-user-add-users__avatar'></div>
                    <div className='control-user-add-users__info'>
                      <h6 className='control-user-add-users__name'>{user.fullname}</h6>
                      <p className='control-user-add-users__login'>{user.login}</p>
                    </div>
                  </li>
                ))
              }
            </ul>
          </div>
        </div>
      }
      {
        isShowCreateUserPopup &&
        <CreateUserPopup 
          isOpen={isShowCreateUserPopup}
          popupName='create-user-popup'
          userId={userId}
        />
      }
    </Section>
  );
}

export default ControlUserAdd;
