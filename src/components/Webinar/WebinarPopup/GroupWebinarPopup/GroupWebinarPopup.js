import React from 'react';
import Popup from '../../../Popup/Popup.js';
import './GroupWebinarPopup.css';
import * as webinarApi from '../../../../utils/webinarApi.js';
import Table from '../../../Table/Table.js';

function GroupWebinarPopup({ windowWidth, isOpen, onClose, onSave, currentGroups }) {

  const [isBlockSearchButton, setIsBlockSearchButton] = React.useState(true);
  const [isLoadingPageSearch, setIsLoadingSearch] = React.useState(false);

  const [searchedGroups, setSearchedGroups] = React.useState([]);
  const [selectedGroups, setSelectedGroups] = React.useState([]);

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
    onSave(selectedGroups);
    console.log(searchedGroups);
  }

  function handleChangeSearchText(e) {
    setSearchText(e.target.value);
    if (e.target.checkValidity()) {
      setSearchTextError({ text: '', isShow: false });
    } else {
      setSearchTextError({ text: 'Поле не может быть пустым', isShow: true });
    }
  }

  function handleSearch() {
    setIsLoadingSearch(true);
    const token = localStorage.getItem('token');
    webinarApi.findWebinarsGroup({
      token: token,
      searchText: searchText,
    })
    .then((res) => {  
      if (res.length > 0) {
        setSearchedGroups(res);
      } else {
        setSearchTextError({ text: 'Группы не найдены, измените запрос', isShow: true });
        setSearchedGroups([]);
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

  function handleSelectGroup(item) {
    if (selectedGroups.some((elem) => elem.id === item.id)) {
    } else {
      setSelectedGroups([...selectedGroups, item]);
    }
  }

  function handleUnSelectGroup(item) {
    setSelectedGroups(selectedGroups.filter(elem => elem.id !== item.id));
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
    setSearchText('');
    setSearchTextError({ text: '', isShow: false });
    setSelectedGroups(currentGroups);
   
    setIsBlockSearchButton(true);
    return(() => {
      setSearchedGroups([]);
      setSelectedGroups([]);
    })
  // eslint-disable-next-line
  }, [isOpen]);

  return (
    <Popup
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
      formWidth={'full'}
      formName={'group-webinar-popup'}
    >
      <h2 className='popup__title'>Группы</h2>

      <div className='popup__search'>
        <label className='popup__field popup__field_margin_top'>
          <div className='popup__input-field popup__input-field_margin_top'>
            <input 
            className='popup__input'
            type='text'
            id='group-webinar-popup-search-text'
            value={searchText}
            onChange={handleChangeSearchText}
            name='group-webinar-popup-search-text' 
            placeholder='Наименование группы..'
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
        <h4 className='popup__input-caption popup__input-caption_weight_bold'>Найденные группы:</h4>
        <Table>
          <div className='table__container table__container_margin_top'>
            <div className='table__header'>
              <div className='table__main-column'>
                {
                  windowWidth > 833 &&
                  <div className='table__column table__column_type_header table__column_type_large'>
                    <p className='table__text table__text_type_header'>Код</p>
                  </div>
                }
                <div className='table__column table__column_type_header table__column_type_name'>
                  <p className='table__text table__text_type_header'>Наименование</p>
                </div>
              </div>
              <div className='table__column table__column_type_header table__column_type_btn table__column_type_btn-header table__column_type_btn-header-with-scroll'>
                <div className='btn-icon'></div> 
              </div>
            </div>
            {
              searchedGroups.length > 0
              ?
              <ul className='table__main table__main_height_small scroll'>
                {
                  searchedGroups.map((item, i) => (
                    <li className='table__row' key={i}>
                      <div className='table__main-column'>
                        {
                          windowWidth > 833 &&
                          <div className='table__column table__column_type_large'>
                            <p className='table__text'>{item.code}</p>
                          </div>
                        }
                        <div className='table__column table__column_type_name'>
                          <p className='table__text'>{item.name}</p>
                        </div>
                      </div>
                      <div className='table__column table__column_type_btn'>
                        <button className='btn-icon btn-icon_color_accent-blue btn-icon_type_create' type='button' onClick={() => handleSelectGroup(item)}></button>
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
        <h4 className='popup__input-caption popup__input-caption_weight_bold'>Выбранные группы:</h4>
        <Table>
          <div className='table__container table__container_margin_top'>
            <div className='table__header'>
              <div className='table__main-column'>
                {
                  windowWidth > 833 &&
                  <div className='table__column table__column_type_header table__column_type_large'>
                    <p className='table__text table__text_type_header'>Код</p>
                  </div>
                }
                <div className='table__column table__column_type_header table__column_type_name'>
                  <p className='table__text table__text_type_header'>Наименование</p>
                </div>
              </div>
              <div className='table__column table__column_type_header table__column_type_btn table__column_type_btn-header'>
                <div className='btn-icon'></div> 
              </div>
            </div>
            {
              selectedGroups.length > 0
              ?
              <ul className={`table__main ${windowWidth > 833 ? 'table__main_height_small scroll' : ''}`}>
                {
                  [...selectedGroups].reverse().map((item, i) => (
                    <li className='table__row' key={i}>
                      <div className='table__main-column'>
                      {
                        windowWidth > 833 &&
                        <div className='table__column table__column_type_large'>
                          <p className='table__text'>{item.code}</p>
                        </div>
                      }
                        <div className='table__column table__column_type_name'>
                          <p className='table__text'>{item.name}</p>
                        </div>
                      </div>
                      <div className='table__column table__column_type_btn'>
                        <button className='btn-icon btn-icon_color_accent-orange btn-icon_type_cancel' type='button' onClick={() => handleUnSelectGroup(item)}></button>
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

export default GroupWebinarPopup;