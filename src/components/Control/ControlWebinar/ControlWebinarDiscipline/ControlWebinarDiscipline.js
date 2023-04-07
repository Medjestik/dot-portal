import React from 'react';
import './ControlWebinarDiscipline.css';
import Table from '../../../Table/Table.js';
import * as webinarApi from '../../../../utils/webinarApi.js';
import Preloader from '../../../Preloader/Preloader.js';
import PopupSelect from '../../../Popup/PopupSelect/PopupSelect.js';
 
function ControlWebinarDiscipline({ windowWidth, semesterInfo, addWebinar }) {

  const containerHeightRef = React.createRef();
  const tableHeaderHeightRef = React.createRef();

  const [tableHeight, setTableHeight] = React.useState(0);
  
  const [currentSemester, setCurrentSemester] = React.useState({});

  const [webinars, setWebinars] = React.useState([]);
  const [filteredWebinars, setFilteredWebinars] = React.useState([]);

  const [isLoadingWebinar, setIsLoadingWebinar] = React.useState(true);

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

  function handleChangeSemester(item) {
    setCurrentSemester(item);
    webinarRequest(item.id)
    setSearchDisciplineText('');
    setSearchGroupText('');
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

  React.useEffect(() => {
    webinarRequest(semesterInfo[0].id);
    setCurrentSemester(semesterInfo[0]);

    return(() => {
      setWebinars([]);
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
                <p className='table__text table__text_type_header'>№</p>
              </div>
              <div className='table__column table__column_type_header table__column_type_full'>
                <p className='table__text table__text_type_header'>Дисциплина</p>
              </div>
              <div className='table__column table__column_type_header table__column_type_small'>
                <p className='table__text table__text_type_header'>Тип</p>
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
              <div className='btn btn_type_create btn_type_create_status_active'></div> 
              <div className='btn btn_type_create btn_type_create_status_active table__btn'></div> 
            </div>
          </div>
          {
            filteredWebinars.length < 1 
            ?
            <p className='table__caption_type_empty'>По заданным параметрам вебинаров не найдено.</p>
            :
            <ul style={Object.assign({}, tableStyle)} className='table__main table__main_type_webinar scroll'>
              {
                [...filteredWebinars].reverse().map((item, i) => (
                  <li className='table__row' key={i}>
                    <div className='table__main-column'>
                      <div className='table__column table__column_type_count'>
                        <p className='table__text'>{i + 1}</p>
                      </div>
                      <div className='table__column table__column_type_full'>
                        <p className='table__text table__text_type_header'>{item.activity_name}</p>
                      </div>
                      <div className='table__column table__column_type_small'>
                        <p className='table__text'>{item.control_name}</p>
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
                      <button 
                        className='btn btn_type_create btn_type_create_status_active' 
                        type='button' 
                        onClick={() => addWebinar({ ...item, action: 'discipline' })}
                      >
                      </button>
                      <button 
                        className='btn btn_type_edit btn_type_edit_status_active table__btn' 
                        type='button'
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
    </div>     
  );
}

export default ControlWebinarDiscipline; 