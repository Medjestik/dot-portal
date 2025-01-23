import React from 'react';
import './ControlWebinarDiscipline.css';
import Table from '../../../Table/Table.js';
import * as webinarApi from '../../../../utils/webinarApi.js';
import Preloader from '../../../Preloader/Preloader.js';
import PopupSelect from '../../../Popup/PopupSelect/PopupSelect.js';
import EditDisciplineFromWebinarPopup from '../../../Webinar/WebinarPopup/EditDisciplineFromWebinarPopup/EditDisciplineFromWebinarPopup.js'
 
function ControlWebinarDiscipline({ windowWidth, semesterInfo, addWebinar }) {

  const containerHeightRef = React.createRef();
  const tableHeaderHeightRef = React.createRef();

  const [tableHeight, setTableHeight] = React.useState(0);
  
  const [currentSemester, setCurrentSemester] = React.useState({});
  const [currentData, setCurrentData] = React.useState({});

  const [webinars, setWebinars] = React.useState([]);
  const [filteredWebinars, setFilteredWebinars] = React.useState([]);

  const [isDisciplineFromWebinarPopupOpen, setIsDisciplineFromWebinarPopupOpen] = React.useState(false);

  const [isLoadingWebinar, setIsLoadingWebinar] = React.useState(true);
  const [isLoadingRequest, setIsLoadingRequest] = React.useState(false);
  const [isShowRequestError, setIsShowRequestError] = React.useState({ isShow: false, text: '' });

  const [searchDisciplineText, setSearchDisciplineText] = React.useState('');
  const [searchTeacherText, setSearchTeacherText] = React.useState('');
  const [searchGroupText, setSearchGroupText] = React.useState('');

  function webinarRequest(id) {
    setIsLoadingWebinar(true);
    const token = localStorage.getItem('token');
    webinarApi.getDisciplinesWithWebinars({ token: token, semesterId: id })
    .then((res) => {
      console.log('AdminWebinarsDiscipline', res);
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

  function handleSearchDiscipline(e) {
    setSearchDisciplineText(e.target.value);
  }

  function handleSearchTeacher(e) {
    setSearchTeacherText(e.target.value);
  }
 
  function handleSearchGroup(e) {
    setSearchGroupText(e.target.value);
  }

  function handleChangeStatus(item) {
    const itemData = { activity_id: item.id, webinar_ready: !item.webinar_ready }
    const token = localStorage.getItem('token');
    webinarApi.changeWebinarDisciplineStatus({
      token: token,
      data: itemData,
    })
    .then((res) => {
      const newStatus = { ...item, webinar_ready: !item.webinar_ready };
      const indexWebinars = webinars.indexOf(webinars.find((elem) => (elem.id === item.id)));
      const indexFilteredWebinars = filteredWebinars.indexOf(filteredWebinars.find((elem) => (elem.id === item.id)));
      const newWebinars = ([ 
        ...webinars.slice(0, indexWebinars), 
        newStatus, 
        ...webinars.slice(indexWebinars + 1) 
      ]);
      const newFilteredWebinars = ([ 
        ...filteredWebinars.slice(0, indexFilteredWebinars), 
        newStatus, 
        ...filteredWebinars.slice(indexFilteredWebinars + 1) 
      ]);
      setWebinars(newWebinars);
      setFilteredWebinars(newFilteredWebinars);
    })
    .catch((err) => {
      console.error(err);
    })
    .finally(() => {  
      //setIsLoadingRequest(false);
    });
  }

  function handleChangeSemester(item) { 
    setCurrentSemester(item);
    webinarRequest(item.id)
    setSearchDisciplineText('');
    setSearchGroupText('');
  }

  function handleChangeData(data, disciplineId ) {
    setIsLoadingRequest(true);
    const token = localStorage.getItem('token');
    webinarApi.editDisciplineFromWebinar({
      token: token,
      data: data,
      disciplineId: disciplineId,
    })
    .then((res) => {
      const indexWebinars = webinars.indexOf(webinars.find((elem) => (elem.id === res.id)));
      const indexFilteredWebinars = filteredWebinars.indexOf(filteredWebinars.find((elem) => (elem.id === res.id)));
      const newWebinars = ([ 
        ...webinars.slice(0, indexWebinars), 
        res, 
        ...webinars.slice(indexWebinars + 1) 
      ]);
      const newFilteredWebinars = ([ 
        ...filteredWebinars.slice(0, indexFilteredWebinars), 
        res, 
        ...filteredWebinars.slice(indexFilteredWebinars + 1) 
      ]);
      setWebinars(newWebinars);
      setFilteredWebinars(newFilteredWebinars);
      closePopups();
    })
    .catch((err) => {
      console.error(err);
    })
    .finally(() => {  
      setIsLoadingRequest(false);
    });
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
        if (searchGroupText.length > 0) {
          if (searchTeacherText.length > 0) {
            return item.activity_name.toLowerCase().includes(searchDisciplineText.toLowerCase()) && item.group_name.toLowerCase().includes(searchGroupText.toLowerCase()) && item.lector_fullname.toLowerCase().includes(searchTeacherText.toLowerCase());
          } else {
            return item.activity_name.toLowerCase().includes(searchDisciplineText.toLowerCase()) && item.group_name.toLowerCase().includes(searchGroupText.toLowerCase());
          }
        } else {
          if (searchTeacherText.length > 0) {
            return item.activity_name.toLowerCase().includes(searchDisciplineText.toLowerCase()) && item.lector_fullname.toLowerCase().includes(searchTeacherText.toLowerCase());
          } else {
            return item.activity_name.toLowerCase().includes(searchDisciplineText.toLowerCase());
          }
        }
      })
      setFilteredWebinars(changeData);
    }
  // eslint-disable-next-line
  }, [searchDisciplineText]);

  React.useEffect(() => {
    if (webinars.length > 0) {
      const changeData = webinars.filter((item) => {
        if (searchDisciplineText.length > 0) {
          if (searchGroupText.length > 0) {
            return item.activity_name.toLowerCase().includes(searchDisciplineText.toLowerCase()) && item.group_name.toLowerCase().includes(searchGroupText.toLowerCase()) && item.lector_fullname.toLowerCase().includes(searchTeacherText.toLowerCase());
          } else {
            return item.activity_name.toLowerCase().includes(searchDisciplineText.toLowerCase()) && item.lector_fullname.toLowerCase().includes(searchTeacherText.toLowerCase());
          }
        } else {
          if (searchGroupText.length > 0) {
            return item.group_name.toLowerCase().includes(searchGroupText.toLowerCase()) && item.lector_fullname.toLowerCase().includes(searchTeacherText.toLowerCase());
          } else {
            return item.lector_fullname.toLowerCase().includes(searchTeacherText.toLowerCase());
          }
        }
      })
      setFilteredWebinars(changeData);
    }
  // eslint-disable-next-line
  }, [searchTeacherText]);

  React.useEffect(() => {
    if (webinars.length > 0) {
      const changeData = webinars.filter((item) => {
        if (searchDisciplineText.length > 0) {
          if (searchTeacherText.length > 0) {
            return item.activity_name.toLowerCase().includes(searchDisciplineText.toLowerCase()) && item.group_name.toLowerCase().includes(searchGroupText.toLowerCase()) && item.lector_fullname.toLowerCase().includes(searchTeacherText.toLowerCase());
          } else {
            return item.activity_name.toLowerCase().includes(searchDisciplineText.toLowerCase()) && item.group_name.toLowerCase().includes(searchGroupText.toLowerCase());
          }
        } else {
          if (searchTeacherText.length > 0) {
            return item.group_name.toLowerCase().includes(searchGroupText.toLowerCase()) && item.lector_fullname.toLowerCase().includes(searchTeacherText.toLowerCase());
          } else {
            return item.group_name.toLowerCase().includes(searchGroupText.toLowerCase());
          }
        }
      })
      setFilteredWebinars(changeData);
    }
  // eslint-disable-next-line
  }, [searchGroupText]);

  function openDisciplineFromWebinarPopup(data) { 
    setCurrentData(data);
    setIsDisciplineFromWebinarPopupOpen(true);
  }

  function closePopups() {
    setIsDisciplineFromWebinarPopupOpen(false);
  }

  React.useEffect(() => {
    webinarRequest(semesterInfo[0].id);
    setCurrentSemester(semesterInfo[0]);

    return(() => {
      setWebinars([]);
      setCurrentData({});
      setFilteredWebinars([]);
      setCurrentSemester([]);
    })
  // eslint-disable-next-line
  }, [])

  return (
    <div className='control-webinar-discipline'>

      <div className='section__header'>
        <div className='section__header-item'>
          <span className='section__header-caption'>Выберите семестр:</span>
          <PopupSelect options={semesterInfo} currentOption={currentSemester} onChooseOption={handleChangeSemester} />
        </div>
      </div>   

      <div className='section__header'>   
        <div className='section__header-item'>
          <span className='section__header-caption section__header-caption_margin_bottom'>Поиск по дисциплине:</span>
          <div className={`search search_type_large`}>
            <input
            className='search__input'
            placeholder='Поиск'
            type='text'
            id={`search-filter-admin-search-webinar-discipline-by-discipline`}
            name={`search-filter-admin-search-webinar-discipline-by-discipline`}
            autoComplete='off'
            value={searchDisciplineText}
            onChange={handleSearchDiscipline}
            >
            </input>
          </div>
        </div>
        <div className='section__header-item'>
          <span className='section__header-caption section__header-caption_margin_bottom'>Поиск по спикеру:</span>
          <div className={`search search_type_large`}>
            <input
            className='search__input'
            placeholder='Поиск'
            type='text'
            id={`search-filter-admin-search-webinar-discipline-by-speaker`}
            name={`search-filter-admin-search-webinar-discipline-by-speaker`}
            autoComplete='off'
            value={searchTeacherText}
            onChange={handleSearchTeacher}
            >
            </input>
          </div>
        </div>
        <div className='section__header-item'>
          <span className='section__header-caption section__header-caption_margin_bottom'>Поиск по группе:</span>
          <div className={`search search_type_large`}>
            <input
            className='search__input'
            placeholder='Поиск'
            type='text'
            id={`search-filter-admin-search-webinar-discipline-by-group`}
            name={`search-filter-admin-search-webinar-list-by-group`}
            autoComplete='off'
            value={searchGroupText}
            onChange={handleSearchGroup}
            >
            </input>
          </div>
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
                <p className='table__text table__text_type_header'></p>
              </div>
              <div className='table__column table__column_type_header table__column_type_date'>
                <p className='table__text table__text_type_header'>Период</p>
              </div>
              <div className='table__column table__column_type_header table__column_type_full'>
                <p className='table__text table__text_type_header'>Дисциплина</p>
              </div>
              <div className='table__column table__column_type_header table__column_type_teacher'>
                <p className='table__text table__text_type_header'>Спикер</p>
              </div>
              <div className='table__column table__column_type_header table__column_type_large'>
                <p className='table__text table__text_type_header'>Группа</p>
              </div>
              <div className='table__column table__column_type_header table__column_type_count'>
                <p className='table__text table__text_type_header'>Кол.</p>
              </div>
            </div>
            <div className='table__column table__column_type_header table__column_type_btn table__column_type_btn-header'>
              <div className='btn-icon'></div> 
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
                filteredWebinars.map((item) => (
                  <li className={`table__row ${item.webinar_ready && 'table__row_type_complete'}`} key={item.id}>
                    <div className='table__main-column'>
                      <div className='table__column table__column_type_count'>
                        <label className='checkbox checkbox_width_small'>
                          <input 
                          name={`webinar-discipline-complete-${item.id}`}
                          type='checkbox'
                          id={`webinar-discipline-complete-${item.id}`}
                          value={item.webinar_ready}
                          defaultChecked={item.webinar_ready}
                          onChange={() => handleChangeStatus(item)}
                          >
                          </input>
                          <span></span>
                        </label>
                      </div>
                      <div className='table__column table__column_type_date'>
                        <p className='table__text'>{item.start_date} - {item.end_date}</p>
                      </div>
                      <div className='table__column table__column_type_full'>
                        <p className='table__text table__text_type_header'>{item.activity_name} ({item.control_name})</p>
                      </div>
                      <div className='table__column table__column_type_teacher'>
                        <p className='table__text'>{item.lector_fullname}</p>
                      </div>
                      <div className='table__column table__column_type_large'>
                        <p className='table__text'>{item.group_name}</p>
                      </div>
                      <div className='table__column table__column_type_count'>
                        <p className='table__text'>{item.webinar_count}</p>
                      </div>
                    </div>
                    <div className='table__column table__column_type_btn'>
                      <button className='btn-icon btn-icon_color_accent-blue btn-icon_type_create' type='button' onClick={() => addWebinar({ ...item, action: 'discipline' })}></button>
                      <button className='btn-icon btn-icon_margin_left btn-icon_color_accent-blue btn-icon_type_edit' type='button' onClick={() => openDisciplineFromWebinarPopup(item)}></button> 
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
      isDisciplineFromWebinarPopupOpen &&
      <EditDisciplineFromWebinarPopup
          isOpen={isDisciplineFromWebinarPopupOpen}
          onClose={closePopups}
          currentData={currentData}
          onChangeData={handleChangeData}
          isLoadingRequest={isLoadingRequest}
          isShowRequestError={isShowRequestError}
      />
      }
    </div>     
  );
}

export default ControlWebinarDiscipline; 