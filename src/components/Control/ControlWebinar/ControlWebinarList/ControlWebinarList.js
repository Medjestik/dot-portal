import React from 'react';
import './ControlWebinarList.css';
import { useNavigate } from 'react-router-dom';
import Table from '../../../Table/Table.js';
import TableCard from '../../../Table/TableCard/TableCard.js';
import * as webinarApi from '../../../../utils/webinarApi.js';
import Preloader from '../../../Preloader/Preloader.js';
import ConfirmRemovePopup from '../../../Popup/ConfirmRemovePopup/ConfirmRemovePopup.js';
import StatusWebinarPopup from '../../../Webinar/WebinarPopup/StatusWebinarPopup/StatusWebinarPopup.js';

function ControlWebinarList({ windowWidth, addWebinar }) {

  const navigate = useNavigate();

  const containerHeightRef = React.createRef();
  const tableHeaderHeightRef = React.createRef();

  const [tableHeight, setTableHeight] = React.useState(0);

  const [currentWebinar, setCurrentWebinar] = React.useState({});

  const [isOpenWebinarRemove, setIsOpenWebinarRemove] = React.useState(false);
  const [isOpenStatusWebinar, setIsOpenStatusWebinar] = React.useState(false);

  const [webinars, setWebinars] = React.useState([]);
  const [filteredWebinars, setFilteredWebinars] = React.useState([]);

  const [isLoadingWebinar, setIsLoadingWebinar] = React.useState(true);
  const [isLoadingRequest, setIsLoadingRequest] = React.useState(false);
  const [isShowRequestError, setIsShowRequestError] = React.useState({ isShow: false, text: '', });

  const [searchNameText, setSearchNameText] = React.useState('');
  const [searchTeacherText, setSearchTeacherText] = React.useState('');
  const [date, setDate] = React.useState('');
  const [dateError, setDateError] = React.useState({ isShow: false, text: '' }); 
  const [isShowSearchDate, setIsShowSearchDate] = React.useState(false);

  function renderStatus(status) {
    switch(status) {
      case 'completed':
        return ( 
          <div className='status'>
            <span className='status__icon status__icon_type_completed'></span>
            <p className='table__text table__text_type_active'>Завершен</p>
          </div>
        )
      
        case 'canceled':
          return ( 
            <div className='status'>
              <span className='status__icon status__icon_type_canceled'></span>
              <p className='table__text table__text_type_active'>Отменен</p>
            </div>
          )

          case 'active':
            return ( 
              <div className='status'>
                <span className='status__icon status__icon_type_canceled'></span>
                <p className='table__text table__text_type_active'>Проводится</p>
              </div>
            )

      default:
        return ( 
          <div className='status'>
            <span className='status__icon status__icon_type_planned'></span>
            <p className='table__text table__text_type_active'>Планируется</p>
          </div>
        )
    }
  }

  function webinarRequest(nameText, teacherText) {
    setIsLoadingWebinar(true);
    const token = localStorage.getItem('token');
    webinarApi.getAdminWebinarsList({ token: token })
    .then((res) => {
      console.log('AdminWebinars', res);
      let changeData = [];
      if ((nameText.length > 0) && (teacherText.length > 0)) {
        changeData = res.filter((item) => {
          return item.name.toLowerCase().includes(nameText.toLowerCase()) && item.key_speaker.toLowerCase().includes(teacherText.toLowerCase());
        })
      } else if ((nameText.length > 0) && (teacherText.length < 1)) {
        changeData = res.filter((item) => {
          return item.name.toLowerCase().includes(nameText.toLowerCase());
        })
      } else if ((nameText.length < 1) && (teacherText.length > 0)) {
        changeData = res.filter((item) => {
          return item.key_speaker.toLowerCase().includes(teacherText.toLowerCase());
        })
      } else {
        changeData = res;
      }
      setWebinars(res);
      setFilteredWebinars(changeData);
    })
    .catch((err) => {
      console.error(err);
    })
    .finally(() => {  
      setIsLoadingWebinar(false);
    });
  }

  function handleSearchByDate(webinarDate) {
    setSearchNameText('');
    localStorage.setItem('webinarSearchNameText', '');
    setSearchTeacherText('');
    localStorage.setItem('webinarSearchTeacherText', '');

    setIsLoadingWebinar(true);
    const token = localStorage.getItem('token');
    webinarApi.findWebinarsDate({
      token: token,
      searchText: webinarDate,
    })
    .then((res) => {
      if (res.length > 0) {
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

  function openStatusWebinarPopup(data) {
    setCurrentWebinar(data);
    setIsOpenStatusWebinar(true);
  }

  function openRemoveWebinarPopup(data) {
    setCurrentWebinar(data);
    setIsOpenWebinarRemove(true);
  }

  function handleChangeStatus(webinar, status, comment) {
    const data = { ...webinar, description : comment, status: status.id, };

    setIsLoadingRequest(true);
    const token = localStorage.getItem('token');
    webinarApi.editWebinar({
      token: token,
      data: data,
    })
    .then((res) => {
      const elem = webinars.find((elem) => (elem.id === res.id));
      const newElemStatus = { ...elem, status: res.status }
      const index = webinars.indexOf(elem);
      const filteredIndex = filteredWebinars.indexOf(elem);
      setWebinars([...webinars.slice(0, index), newElemStatus, ...webinars.slice(index + 1)]);
      setFilteredWebinars([...filteredWebinars.slice(0, filteredIndex), newElemStatus, ...filteredWebinars.slice(filteredIndex + 1)]);
    })
    .catch((err) => {
      console.error(err);
      setIsShowRequestError({ text: 'Произошла ошибка, попробуйте еще раз', isShow: true });
    })
    .finally(() => {  
      setIsLoadingRequest(false);
      closePopup();
    });
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
   localStorage.setItem('webinarSearchNameText', e.target.value);
   handleClearDate();
  }

  function handleSearchTeacher(e) {
    setSearchTeacherText(e.target.value);
    localStorage.setItem('webinarSearchTeacherText', e.target.value);
    handleClearDate();
  }

  function handleChangeDate(e) {
    const newDate = e.target.value;
    setDate(newDate);
  
    console.log(`Текущее значение даты: "${newDate}"`);
  
    if (newDate) {
      if (e.target.checkValidity()) {
        setDateError({ text: '', isShow: false });
  
        localStorage.setItem('webinarSearchDate', newDate);
  
        setIsShowSearchDate(true);
  
      } else {
        setIsShowSearchDate(false);
        setDateError({ text: 'Укажите корректную дату', isShow: true });
      }
    } else {
      handleClearDate();
      setIsShowSearchDate(false);
      
      localStorage.removeItem('webinarSearchDate');
  
      const savedName = localStorage.getItem('webinarSearchNameText') || '';
      const savedTeacher = localStorage.getItem('webinarSearchTeacherText') || '';
  
      setSearchNameText(savedName);
      setSearchTeacherText(savedTeacher);

      setFilteredWebinars(webinars);
    }
  }

  const handleClearDate = () => {
    // Если поле даты очищено — удаляем дату из localStorage
    localStorage.removeItem('webinarSearchDate');

    setDate('');
    // Убираем ошибку
    setDateError({ text: '', isShow: false });
  }

  function closePopup() {
    setIsOpenWebinarRemove(false);
    setIsOpenStatusWebinar(false);
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
        const matchesName = item.name.toLowerCase().includes(searchNameText.toLowerCase());
        const matchesSpeaker = item.key_speaker.toLowerCase().includes(searchTeacherText.toLowerCase());
  
        if (searchNameText.length > 0 && searchTeacherText.length > 0) {
          return matchesName && matchesSpeaker;
        }
        if (searchNameText.length > 0) {
          return matchesName;
        }
        if (searchTeacherText.length > 0) {
          return matchesSpeaker;
        }
        return true;
      });
  
      setFilteredWebinars(changeData);
    }
  }, [searchNameText, searchTeacherText, webinars]); 

  React.useEffect(() => {
    const savedName = localStorage.getItem('webinarSearchNameText') || '';
    const savedTeacher = localStorage.getItem('webinarSearchTeacherText') || '';
    const savedDate = localStorage.getItem('webinarSearchDate');
  
    if (savedDate !== null) {
      setSearchNameText('');
      setSearchTeacherText('');
      setDate(savedDate);
      handleSearchByDate(savedDate);
    } else {
      setSearchNameText(savedName);
      setSearchTeacherText(savedTeacher);
      setDate('');
      webinarRequest(savedName, savedTeacher);
    }
  
    return () => {
      setDate('');
      setDateError({ text: '', isShow: false });
      setWebinars([]);
      setFilteredWebinars([]);
      setCurrentWebinar({});
    };
  // eslint-disable-next-line
  }, []);

  return (
    <div className='control-webinar-list'>

      { 
      isLoadingWebinar
      ?
      <Preloader />
      :
      <>

      <div className={`section__header ${windowWidth <= 833 ? 'section__header_direction_column' : ''}`}>
        {
          windowWidth <= 833 
          ?
          <div className='section__header-item section__header-item_margin_top'>
            <button className='section__header-btn section__header-btn_type_full' type='button' onClick={() => addWebinar({ action: 'new' })}>Создать вебинар</button>
          </div>
          :
          <div className='section__header-item section__header-item_type_content'>
            <span className='section__header-caption section__header-caption_margin_bottom'></span>
            <button className='section__header-btn section__header-btn_type_full' type='button'onClick={() => addWebinar({ action: 'new' })}>Создать вебинар</button>
          </div>
        }
        <div className={`section__header-item ${windowWidth <= 833 ? 'section__header-item_margin_top' : ''}`}>
          <span className='section__header-caption section__header-caption_margin_bottom'>Поиск по наименованию:</span>
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
        <div className={`section__header-item ${windowWidth <= 833 ? 'section__header-item_margin_top' : ''}`}>
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
        <div className={`section__header-item ${windowWidth <= 833 ? 'section__header-item_margin_top' : ''}`}>
          <span className='section__header-caption section__header-caption_margin_bottom'>Поиск по дате:</span>
          <div className='popup__input-field popup__input-field_margin_top'>
            <input 
              className='popup__input popup__input_type_date'
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
        {
          isShowSearchDate
          ?
          <div className='popup__input_icon_search' onClick={() => handleSearchByDate(date)}></div>
          :
          <div className='popup__input_icon_search-block'></div>
        }
      </div>
      {
        windowWidth <= 833
        ?
        <TableCard>
          {
            filteredWebinars.length < 1 
            ?
            <p className='table__caption_type_empty'>По заданным параметрам вебинаров не найдено.</p>
            :
            <>
            {
              filteredWebinars.map((item, i) => (
                <li className='table-card__item' key={i}>
                  <div onClick={() => openStatusWebinarPopup(item)}>
                    {renderStatus(item.status)}
                  </div>
                  
                  <div className='table-card__title'>
                    <a 
                    className='table-card__text table-card__text_weight_bold table-card__text_type_active table-card__title' 
                    href={item.status === 'completed' ? item.record_link : item.link} 
                    target='_blank' rel='noreferrer'>
                      {item.name}
                    </a>
                  </div>

                  <p className='table-card__text table-card__subtitle'>{item.key_speaker}</p>

                  <div className='table-card__info'>
                    <ul className='table-card__info-list'>
                      <li className='table-card__info-item'>
                        <p className='data__text'><span className='data__text_font_bold'>Дата:</span>{item.date || ''}</p>
                      </li>
                      <li className='table-card__info-item'>
                        <p className='data__text'><span className='data__text_font_bold'>Время:</span>{item.time || ''}</p>
                      </li>
                    </ul>
                  </div>

                  <div className='table-card__menu'>
                    <button className='icon icon_size_18 icon_type_edit' type='button' onClick={() => openEditWebinarItem(item)}></button>
                    <button className='icon icon_size_18 icon_type_remove icon_margin_left' type='button' onClick={() => openRemoveWebinarPopup(item)}></button>
                  </div>
                </li>
              ))
            }
            </>
          }
        </TableCard>
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
                <div className='btn-icon'></div>
                <div className='btn-icon btn-icon_margin_left'></div>
                <div className='btn-icon btn-icon_margin_left'></div>
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
                          <a className='table__text table__text_weight_bold table__text_type_active' href={item.status === 'completed' ? item.record_link : item.link} target='_blank' rel='noreferrer'>{item.name}</a>
                        </div>
                        <div className='table__column table__column_type_teacher'>
                          <p className='table__text'>{item.key_speaker}</p>
                        </div>
                        <div className='table__column table__column_type_status' onClick={() => openStatusWebinarPopup(item)}>
                          {renderStatus(item.status)}
                        </div>
                      </div>
                      <div className='table__column table__column_type_btn'>
                        <button className='btn-icon btn-icon_color_accent-blue btn-icon_type_edit' type='button'onClick={() => openEditWebinarItem(item)}></button>
                        <button className='btn-icon btn-icon_margin_left btn-icon_color_accent-blue btn-icon_type_copy' type='button' onClick={() => addWebinar({ ...item, action: 'copy' })}></button> 
                        <button className='btn-icon btn-icon_margin_left btn-icon_color_accent-orange btn-icon_type_cancel' type='button' onClick={() => openRemoveWebinarPopup(item)}></button>
                      </div>
                    </li>
                  ))
                }
              </ul>
            }
          </div>
        </Table>
      }

      </>
      }
      
      {       
        isOpenStatusWebinar &&
        <StatusWebinarPopup
          isOpen={isOpenStatusWebinar}
          onClose={closePopup}
          webinarId={currentWebinar.id}
          onConfirm={handleChangeStatus}
          isLoadingRequest={isLoadingRequest}
          isShowRequestError={isShowRequestError}
        />
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