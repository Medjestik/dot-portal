import React from 'react';
import Popup from '../../../Popup/Popup.js';
import './UserWebinarPopup.css';
import * as webinarApi from '../../../../utils/webinarApi.js';
import Table from '../../../Table/Table.js';
import PopupSelect from '../../../Popup/PopupSelect/PopupSelect.js';

function UserWebinarPopup({ windowWidth, isOpen, onClose, onSave, currentUsers }) {

  const [isBlockSearchButton, setIsBlockSearchButton] = React.useState(true);
  const [isLoadingPageSearch, setIsLoadingSearch] = React.useState(false);

  const roleOptions = [
    { name: 'Ведущий', id: 'moderator', },
    { name: 'Участник', id: 'user', },
  ]

  const [currentRole, setCurrentRole] = React.useState({});

  const [searchedUsers, setSearchedUsers] = React.useState([]);
  const [selectedUsers, setSelectedUsers] = React.useState([]);

  const [searchText, setSearchText] = React.useState('');
  const [searchTextError, setSearchTextError] = React.useState({ isShow: false, text: '' });

  function handleSubmit(e) {
    e.preventDefault();
    if (searchTextError.isShow || searchText.length < 1) {
    } else {
      handleSearch();
    }
  }

  function handleSave() {
    onSave(selectedUsers);
  }

  function handleChangeSearchText(e) {
    setSearchText(e.target.value);
    if (e.target.checkValidity()) {
      setSearchTextError({ text: '', isShow: false });
    } else {
      setSearchTextError({ text: 'Поле не может быть пустым', isShow: true });
    }
  }

  function handleChangeRole(item) {
    setCurrentRole(item);
  }

  function handleSearch() {
    setIsLoadingSearch(true);
    const token = localStorage.getItem('token');
    webinarApi.findWebinarsUser({
      token: token,
      searchText: searchText,
    })
    .then((res) => {
      console.log(res);
      if (res.length > 0) {
        setSearchedUsers(res);
      } else {
        setSearchTextError({ text: 'Пользователи не найдены, измените запрос', isShow: true });
        setSearchedUsers([]);
      }
    })
    .catch((err) => {
      console.error(err);
      setSearchTextError({ text: 'Произошла ошибка, попробуйте еще раз', isShow: true });
    })
    .finally(() => {  
      setIsLoadingSearch(false);
    });
  }

  function handleSelectUser(item) {
    if (selectedUsers.some((elem) => elem.id === item.id)) {
    } else {
      setSelectedUsers([...selectedUsers, { ...item, role: currentRole }]);
    }
  }

  function handleUnSelectUser(item) {
    setSelectedUsers(selectedUsers.filter(elem => elem.id !== item.id));
  }

  React.useEffect(() => {
    if (searchTextError.isShow || searchText.length < 1) {
      setIsBlockSearchButton(true);
    } else {
      setIsBlockSearchButton(false);
    }
  // eslint-disable-next-line
  }, [searchText]);

  React.useEffect(() => {
    setCurrentRole(roleOptions[0]);
    setSearchText('');
    setSearchTextError({ text: '', isShow: false });
    setSelectedUsers(currentUsers);
   
    setIsBlockSearchButton(true);
    return(() => {
      setCurrentRole({});
      setSearchedUsers([]);
      setSelectedUsers([]);
    })
  // eslint-disable-next-line
  }, [isOpen]);

  return (
    <Popup
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
      formWidth={'full'}
      formName={'user-webinar-popup'}
    >
      <h2 className='popup__title'>Участники</h2>

      <div className='popup__field'>
        <h4 className='popup__input-caption'>Роль участника:</h4>
        <PopupSelect options={roleOptions} currentOption={currentRole} onChooseOption={handleChangeRole} />
      </div>

      <div className='popup__search'>
        <label className='popup__field popup__field_margin_top'>
          <div className='popup__input-field popup__input-field_margin_top'>
            <input 
            className='popup__input'
            type='text'
            id='user-webinar-popup-search-text'
            value={searchText}
            onChange={handleChangeSearchText}
            name='user-webinar-popup-search-text' 
            placeholder='Имя участника..'
            autoComplete='off'
            minLength={1}
            required 
            />
          </div>
        </label>
        {
          isLoadingPageSearch ? 
          <button className='popup__search-button popup__search-button_type_loading' disabled type='button'>Поиск</button>
          :
          <button className={`popup__search-button ${isBlockSearchButton ? 'popup__search-button_type_block' : ''}`} type='submit'>Поиск</button>
        }
      </div>
      <span className={`popup__input-error ${searchTextError.isShow ? 'popup__input-error_status_show' : ''}`}>
        {searchTextError.text}
      </span>

      <div className='popup__field'>
        <h4 className='popup__input-caption popup__input-caption_weight_bold'>Найденные пользователи:</h4>
        <Table>
          <div className='table__container table__container_margin_top'>
            <div className='table__header'>
              <div className='table__main-column'>
                <div className='table__column table__column_type_header table__column_type_large'>
                  <p className='table__text table__text_type_header'>Логин</p>
                </div>
                <div className='table__column table__column_type_header table__column_type_name'>
                  <p className='table__text table__text_type_header'>ФИО</p>
                </div>
              </div>
              <div className='table__column table__column_type_header table__column_type_btn table__column_type_btn-header table__column_type_btn-header-with-scroll'>
                <div className='btn-icon'></div> 
              </div>
            </div>
            {
              searchedUsers.length > 0
              ?
              <ul className='table__main table__main_height_small scroll'>
                {
                  searchedUsers.map((item, i) => (
                    <li className='table__row' key={i}>
                      <div className='table__main-column'>
                        <div className='table__column table__column_type_large'>
                          <p className='table__text'>{item.login}</p>
                        </div>
                        <div className='table__column table__column_type_name'>
                          <p className='table__text'>{item.fullname}</p>
                        </div>
                      </div>
                      <div className='table__column table__column_type_btn'>
                        <button className='btn-icon btn-icon_color_accent-blue btn-icon_type_create' type='button' onClick={() => handleSelectUser(item)}></button>
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

      <div className='popup__field'>
        <h4 className='popup__input-caption popup__input-caption_weight_bold'>Выбранные пользователи:</h4>
        <Table>
          <div className='table__container table__container_margin_top'>
            <div className='table__header'>
              <div className='table__main-column'>
                <div className='table__column table__column_type_header table__column_type_large'>
                  <p className='table__text table__text_type_header'>Роль</p>
                </div>
                <div className='table__column table__column_type_header table__column_type_name'>
                  <p className='table__text table__text_type_header'>ФИО</p>
                </div>
              </div>
              <div className='table__column table__column_type_header table__column_type_btn table__column_type_btn-header'>
                <div className='btn-icon'></div> 
              </div>
            </div>
            {
              selectedUsers.length > 0
              ?
              <ul className={`table__main ${windowWidth > 833 ? 'table__main_height_small scroll' : ''}`}>
                {
                  [...selectedUsers].reverse().map((item, i) => (
                    <li className='table__row' key={i}>
                      <div className='table__main-column'>
                        <div className='table__column table__column_type_large'>
                          <div className='status'>
                            {
                              item.role.id === 'moderator'
                              ?
                              <>
                              <span className='status__icon status__icon_type_planned'></span>
                              <p className='table__text'>Модератор</p>
                              </>
                              :
                              <>
                              <span className='status__icon status__icon_type_canceled'></span>
                              <p className='table__text'>Участник</p>
                              </>
                            }
                          </div>
                        </div>
                        <div className='table__column table__column_type_name'>
                          <p className='table__text'>{item.fullname}</p>
                        </div>
                      </div>
                      <div className='table__column table__column_type_btn'>
                        <button className='btn-icon btn-icon_color_accent-orange btn-icon_type_cancel' type='button' onClick={() => handleUnSelectUser(item)}></button>
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
        <button className={`popup__btn-save`} type='button' onClick={() => handleSave()}>Сохранить</button>
      </div>
    </Popup>
  )
}

export default UserWebinarPopup;