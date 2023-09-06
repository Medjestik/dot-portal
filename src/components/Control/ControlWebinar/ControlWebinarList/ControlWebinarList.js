import React from 'react';
import './ControlWebinarList.css';
import { useNavigate } from 'react-router-dom';
import Table from '../../../Table/Table.js';
import * as webinarApi from '../../../../utils/webinarApi.js';
import Preloader from '../../../Preloader/Preloader.js';
import ConfirmRemovePopup from '../../../Popup/ConfirmRemovePopup/ConfirmRemovePopup.js';

function ControlWebinarList({ windowWidth, addWebinar }) {

  const navigate = useNavigate();

  const containerHeightRef = React.createRef();
  const tableHeaderHeightRef = React.createRef();

  const [tableHeight, setTableHeight] = React.useState(0);

  const [currentWebinar, setCurrentWebinar] = React.useState({});

  const [isOpenWebinarRemove, setIsOpenWebinarRemove] = React.useState(false);

  const [webinars, setWebinars] = React.useState([]);
  const [filteredWebinars, setFilteredWebinars] = React.useState([]);

  const [isLoadingWebinar, setIsLoadingWebinar] = React.useState(true);
  const [isLoadingRequest, setIsLoadingRequest] = React.useState(false);
  const [isShowRequestError, setIsShowRequestError] = React.useState({ isShow: false, text: '', });

  const [searchNameText, setSearchNameText] = React.useState('');
  const [searchTeacherText, setSearchTeacherText] = React.useState('');
  const [date, setDate] = React.useState('');
  const [dateError, setDateError] = React.useState({ isShow: false, text: '' });

  function renderStatus(status) {
    switch(status) {
      case 'completed':
        return ( 
          <div className='status'>
            <span className='status__icon status__icon_type_completed'></span>
            <p className='table__text'>Завершен</p>
          </div>
        )
      
        case 'canceled':
          return ( 
            <div className='status'>
              <span className='status__icon status__icon_type_canceled'></span>
              <p className='table__text'>Отменен</p>
            </div>
          )

          case 'active':
            return ( 
              <div className='status'>
                <span className='status__icon status__icon_type_canceled'></span>
                <p className='table__text'>Проводится</p>
              </div>
            )

      default:
        return ( 
          <div className='status'>
            <span className='status__icon status__icon_type_planned'></span>
            <p className='table__text'>Планируется</p>
          </div>
        )
    }
  }

  function webinarRequest() {
    setIsLoadingWebinar(true);
    const token = localStorage.getItem('token');
    webinarApi.getAdminWebinarsList({ token: token })
    .then((res) => {
      console.log('AdminWebinars', res);
      setWebinars(res);
      setFilteredWebinars(res);
    })
    .catch((err) => {
      console.error(err);
    })
    .finally(() => {  
      setIsLoadingWebinar(false);
    });
  }

  function handleSearchByDate(webinarDate) {
    setIsLoadingWebinar(true);
    const token = localStorage.getItem('token');
    webinarApi.findWebinarsDate({
      token: token,
      searchText: webinarDate,
    })
    .then((res) => {
      console.log(res);
      if (res.length > 0) {
        //setWebinars([]);
        setFilteredWebinars(res);
      } else {
        setDateError({ text: 'Вебинары не найдены, измените запрос', isShow: true });
      }
    })
    .catch((err) => {
      console.error(err);
      setDateError({ text: 'Произошла ошибка, попробуйте еще раз', isShow: true });
    })
    .finally(() => {  
      setIsLoadingWebinar(false);
    });
  }

  function openRemoveWebinarPopup(data) {
    setCurrentWebinar(data);
    setIsOpenWebinarRemove(true);
  }

  function handleRemoveWebinar(data) {
    setIsLoadingRequest(true);
    const token = localStorage.getItem('token');
    webinarApi.removeWebinar({
      token: token,
      webinarId: data.id,
    })
    .then(() => {
      setWebinars(webinars.filter((elem) => data.id !== elem.id));
      setFilteredWebinars(filteredWebinars.filter((elem) => data.id !== elem.id));
    })
    .catch((err) => {
      console.error(err);
    })
    .finally(() => {  
      setIsLoadingRequest(false);
      closePopup();
    })
  }

  function openEditWebinarItem(item) {
    navigate('/control/webinar/' + item.id);
  }

  function handleSearchName(e) {
   setSearchNameText(e.target.value);
  }

  function handleSearchTeacher(e) {
    setSearchTeacherText(e.target.value);
  }

  function handleChangeDate(e) {
    setDate(e.target.value);
    if (e.target.value.length > 0) {
      if (e.target.checkValidity()) {
        setDateError({ text: '', isShow: false });
        handleSearchByDate(e.target.value);
      } else {
        setDateError({ text: 'Укажите корректную дату', isShow: true });
      }
    } else {
      setDateError({ text: '', isShow: false });
    }
  }

  function closePopup() {
    setIsOpenWebinarRemove(false);
    setIsShowRequestError({ isShow: false, text: '', })
  }

  React.useEffect(() => {
    if (windowWidth >= 833 && !isLoadingWebinar) {
      setTableHeight(containerHeightRef.current.clientHeight - tableHeaderHeightRef.current.clientHeight);
    }
  }, [windowWidth, containerHeightRef, tableHeaderHeightRef, isLoadingWebinar]);

  const tableStyle = {
    height: tableHeight,
  };

  React.useEffect(() => {
    if (webinars.length > 0) {
      const changeData = webinars.filter((item) => {
        if (searchTeacherText.length > 0) {
          return item.name.toLowerCase().includes(searchNameText.toLowerCase()) && item.key_speaker.toLowerCase().includes(searchTeacherText.toLowerCase());
        } else {
          return item.name.toLowerCase().includes(searchNameText.toLowerCase());
        }
      })
      setFilteredWebinars(changeData);
    }
  // eslint-disable-next-line
  }, [searchNameText]);

  React.useEffect(() => {
    if (webinars.length > 0) {
      const changeData = webinars.filter((item) => {
        if (searchNameText.length > 0) {
          return item.key_speaker.toLowerCase().includes(searchTeacherText.toLowerCase()) && item.name.toLowerCase().includes(searchNameText.toLowerCase());
        } else {
          return item.key_speaker.toLowerCase().includes(searchTeacherText.toLowerCase());
        }
      })
      setFilteredWebinars(changeData);
    }
  // eslint-disable-next-line
  }, [searchTeacherText]);

  React.useEffect(() => {
    webinarRequest();

    return(() => {
      setDate('');
      setDateError({ text: '', isShow: false });
      setWebinars([]);
      setFilteredWebinars([]);
      setCurrentWebinar({});
    })
  }, [])

  return (
    <div className='control-webinar-list'>

      <div className='section__header'>   
        <div className='section__header-item'>
          <span className='section__header-caption section__header-caption_margin_bottom'></span>
          <button className='section__header-btn section__header-btn_type_full' type='button' onClick={() => addWebinar({ action: 'new' })}>Создать вебинар</button>
        </div>
        <div className='section__header-item'>
          <span className='section__header-caption section__header-caption_margin_bottom'>Поиск по названию:</span>
          <div className={`search search_type_large`}>
            <input
            className='search__input'
            placeholder='Поиск'
            type='text'
            id={`search-filter-admin-search-webinar-list-by-name`}
            name={`search-filter-admin-search-webinar-list-by-name`}
            autoComplete='off'
            value={searchNameText}
            onChange={handleSearchName}
            >
            </input>
          </div>
        </div>
        <div className='section__header-item'>
          <span className='section__header-caption section__header-caption_margin_bottom'>Поиск по преподавателю:</span>
          <div className={`search search_type_large`}>
            <input
            className='search__input'
            placeholder='Поиск'
            type='text'
            id={`search-filter-admin-search-webinar-list-by-teacher`}
            name={`search-filter-admin-search-webinar-list-by-teacher`}
            autoComplete='off'
            value={searchTeacherText}
            onChange={handleSearchTeacher}
            >
            </input>
          </div>
        </div>
        <div className='section__header-item'>
          <span className='section__header-caption section__header-caption_margin_bottom'>Поиск по дате:</span>
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
          <span className={`popup__input-error ${dateError.isShow ? 'popup__input-error_status_show' : ''}`}>
            {dateError.text}
          </span>
        </div>
      </div>

      { 
      isLoadingWebinar
      ?
      <Preloader />
      :
      <Table>
        <div ref={containerHeightRef} className='table__container'>
          <div ref={tableHeaderHeightRef} className='table__header'>
            <div className='table__main-column'>
              <div className='table__column table__column_type_header table__column_type_count'>
                <p className='table__text table__text_type_header'>№</p>
              </div>
              <div className='table__column table__column_type_header table__column_type_date'>
                <p className='table__text table__text_type_header'>Дата</p>
              </div>
              <div className='table__column table__column_type_header table__column_type_name'>
                <p className='table__text table__text_type_header'>Наименование</p>
              </div>
              <div className='table__column table__column_type_header table__column_type_teacher'>
                <p className='table__text table__text_type_header'>Спикер</p>
              </div>
              <div className='table__column table__column_type_header table__column_type_status'>
                <p className='table__text table__text_type_header'>Статус</p>
              </div>
            </div>
            <div className='table__column table__column_type_header table__column_type_btn table__column_type_btn-header'>
              <div className='btn btn_type_edit btn_type_edit_status_active'></div> 
              <div className='btn btn_type_copy btn_type_copy_status_active'></div> 
              <div className='btn btn_type_download btn_type_download_status_active table__btn'></div> 
            </div>
          </div>
          {
            filteredWebinars.length < 1 
            ?
            <p className='table__caption_type_empty'>По заданным параметрам вебинаров не найдено.</p>
            :
            <ul style={Object.assign({}, tableStyle)} className='table__main table__main_type_webinar scroll'>
              {
                filteredWebinars.map((item, i) => (
                  <li className='table__row' key={item.id}>
                    <div className='table__main-column'>
                      <div className='table__column table__column_type_count'>
                        <p className='table__text'>{i + 1}</p>
                      </div>
                      <div className='table__column table__column_type_date'>
                        <p className='table__text'>{item.date}</p>
                        <p className='table__text'>{item.time}</p>
                      </div>
                      <div className='table__column table__column_type_name'>
                        <a className='table__text table__text_weight_bold table__text_type_active' href={item.link} target='_blank' rel='noreferrer'>{item.name}</a>
                      </div>
                      <div className='table__column table__column_type_teacher'>
                        <p className='table__text'>{item.key_speaker}</p>
                      </div>
                      <div className='table__column table__column_type_status'>
                        {renderStatus(item.status)}
                      </div>
                    </div>
                    <div className='table__column table__column_type_btn'>
                      <button 
                        className='btn btn_type_edit btn_type_edit_status_active' 
                        type='button'
                        onClick={() => openEditWebinarItem(item)}
                      >  
                      </button>
                      <button 
                        className='btn btn_type_copy btn_type_copy_status_active' 
                        type='button'
                        onClick={() => addWebinar({ ...item, action: 'copy' })}
                      >  
                      </button> 
                      <button 
                        className='btn btn_type_cancel btn_type_cancel_status_active table__btn' 
                        type='button' 
                        onClick={() => openRemoveWebinarPopup(item)}
                      > 
                      </button>
                    </div>
                  </li>
                ))
              }
            </ul>
          }
        </div>
      </Table>
      }

      {       
        isOpenWebinarRemove &&
        <ConfirmRemovePopup
          isOpen={isOpenWebinarRemove}
          onClose={closePopup}
          popupName='control-webinar-remove'
          onConfirm={handleRemoveWebinar}
          data={currentWebinar}
          isLoadingRequest={isLoadingRequest}
          isShowRequestError={isShowRequestError}
        />
      }

    </div>
  );
}

export default ControlWebinarList;