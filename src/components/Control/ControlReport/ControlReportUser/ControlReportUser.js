import React from 'react';
import * as reportsApi from '../../../../utils/reports.js';
import * as catalogApi from '../../../../utils/catalog.js';
import Preloader from '../../../Preloader/Preloader';
import Section from '../../../Section/Section';
import SelectSearch from '../../../SelectSearch/SelectSearch.js';
import Table from '../../../Table/Table.js';

function ControlReportUser({ windowWidth }) {

  const containerHeightRef = React.createRef();
  const tableHeaderHeightRef = React.createRef();

  const [tableHeight, setTableHeight] = React.useState(0);

  const [searchUserText, setSearchUserText] = React.useState('');
  const [users, setUsers] = React.useState([]);
  const [currentUser, setCurrentUser] = React.useState({ name: 'Выберите пользователя..', id: 'placeholder' });

  const [courses, setCourses] = React.useState([]);
  const [currentCourse, setCurrentCourse] = React.useState({ name: 'Выберите курс..', id: 'placeholder' });

  const [data, setData] = React.useState([]);

  const [isLoadingUsers, setIsLoadingUsers] = React.useState(true);
  const [isShowUsersSelect, setIsShowUsersSelect] = React.useState(false);
  const [isLoadingCourses, setIsLoadingCourses] = React.useState(false);
  const [isShowCourseSelect, setIsShowCourseSelect] = React.useState(false);
  const [isLoadingData, setIsLoadingData] = React.useState(false);
  const [isShowData, setIsShowData] = React.useState(false);

  function handleChangeSearchUserText(e) {
    setSearchUserText(e.target.value);
  }

  function handleChangeUser(option) { 
    setIsShowCourseSelect(false);
    setIsShowData(false);
    setData([]);
    setCurrentCourse({ name: 'Выберите курс..', id: 'placeholder' });
    setCurrentUser(option);
    coursesRequest(option.id);
  }

  function handleChangeCourse(option) {
    setIsShowData(false);
    setData([]);
    setCurrentCourse(option);
    dataRequest(option.id);
  }

  function usersRequest() {
    setIsShowUsersSelect(true);
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
    })
    .catch((err) => {
      console.error(err);
    })
    .finally(() => {  
      setIsLoadingUsers(false);
    })
  }

  function coursesRequest(id) {
    setIsLoadingCourses(true);
    const token = localStorage.getItem('token');
    reportsApi.getUserCourses({ token: token, userId: id })
    .then((res) => {
      console.log('ReportGroupCourses', res);
      setCourses(res);
      setIsShowCourseSelect(true);
    })
    .catch((err) => {
      console.error(err);
    })
    .finally(() => {  
      setIsLoadingCourses(false);
    })
  }

  function dataRequest(id) {
    setIsLoadingData(true);
    const token = localStorage.getItem('token');
    reportsApi.getUserCourseData({ token: token, userId: currentUser.id, courseId: id })
    .then((res) => {
      console.log('ReportUserCourseData', res);
      setData(res);
      setIsShowData(true);
    })
    .catch((err) => {
      console.error(err);
    })
    .finally(() => {  
      setIsLoadingData(false);
    })
  }

  function renderStatus(elem) {
    if (elem.state_id === 1) {
      return (
        <p className='table__text table__text_align_center table__text_color_orange'>В процессе</p>
      )
    } else if (elem.state_id === 2) {
      return (
        <p className='table__text table__text_align_center table__text_color_blue'>Завершен</p>
      )
    } else if (elem.state_id === 3) {
      return (
        <p className='table__text table__text_align_center table__text_color_orange'>Не пройден</p>
      )
    } else if (elem.state_id === 4) {
      return (
        <p className='table__text table__text_align_center table__text_color_blue'>Пройден</p>
      ) 
    } else {
      return (
        <p className='table__text table__text_align_center table__text_type_empty'>Не начат</p>
      ) 
    }
  }


  React.useEffect(() => {
  return (() => {
    setUsers([]);
    setCourses([]);
    setData([]);
    setCurrentUser({});
    setCurrentCourse({});
  })
    // eslint-disable-next-line
  }, []);

  React.useEffect(() => {
    if (
      containerHeightRef.current &&
      tableHeaderHeightRef.current &&
      windowWidth >= 833 &&
      isShowData
    ) {
      setTableHeight(
        containerHeightRef.current.clientHeight -
        tableHeaderHeightRef.current.clientHeight
      );
    }
  }, [windowWidth, isShowData, containerHeightRef, tableHeaderHeightRef]);

  const tableStyle = {
    height: tableHeight,
  };

  return (
    <Section title='Отчет по группе' heightType='page' headerType='large'>
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
        isShowUsersSelect &&
        <>
        {
          isLoadingUsers 
          ?
          <Preloader />
          :
          <>
          <div className='section__header'>
            <div className='section__header-item'>
              <span className='section__header-caption'>Выберите пользователя:</span>
              <SelectSearch options={users} currentOption={currentUser} onChooseOption={handleChangeUser} />
            </div>
          </div>
          {
            isLoadingCourses
            ?
            <Preloader />
            :
            <>
            {
              isShowCourseSelect &&
              <div className='section__header'>
                <div className='section__header-item'>
                  <span className='section__header-caption'>Выберите курс:</span>
                  <SelectSearch options={courses} currentOption={currentCourse} onChooseOption={handleChangeCourse} />
                </div>
                <div className='section__header-item section__header-item_type_content'>
                  <span className='section__header-caption section__header-caption_margin_bottom'></span>
                  {
                    isShowData
                    ?
                    <a 
                    className={`section__header-btn section__header-btn_margin_top`} 
                    href={`https://course.emiit.ru/view_print_form_true.html?print_form_id=6135710235479460782&object_id=${currentCourse.id}&group_id=${currentUser.id}`} 
                    target='_blank' 
                    rel='noreferrer'>
                      Экспорт отчета
                    </a>
                    :
                    <button className={`section__header-btn section__header-btn_margin_top section__header-btn_type_block`} type='button'>Экспорт отчета</button>
                  }
                </div>
              </div>
            }
            </>
          }
          {
            isLoadingData
            ?
            <Preloader />
            :
            <>
            {
              isShowData &&
              <Table>
                <div ref={containerHeightRef} className='table__container'>
                  <div ref={tableHeaderHeightRef} className='table__header'>
                    <div className='table__main-column table__main-column_type_empty'>
                      <div className='table__column table__column_type_header table__column_type_count'>
                        <p className='table__text table__text_type_header'>№</p>
                      </div>
                      <div className='table__column table__column_type_header table__column_type_name'>
                        <p className='table__text table__text_type_header'>Наименование</p>
                      </div>
                      <div className='table__column table__column_type_header table__column_type_medium'>
                        <p className='table__text table__text_align_center table__text_type_header'>Результат</p>
                      </div>
                      <div className='table__column table__column_type_header table__column_type_medium'>
                        <p className='table__text table__text_align_center table__text_type_header'>Статус</p>
                      </div>
                    </div>
                  </div>
                  {
                    data.parts.part.length > 0 
                    ?
                    <ul style={Object.assign({}, tableStyle)} className='table__main scroll'>
                    {
                      data.parts.part.map((item, i) => (
                        item.type === 'test' &&
                        <li className='table__row' key={i}>
                          <div className='table__main-column'>
                            <div className='table__column table__column_type_count'>
                              <p className='table__text'>{i + 1}</p>
                            </div>
                            <div className='table__column table__column_type_name'>
                              <p className='table__text table__text_type_header'>{item.name || ''}</p>
                            </div>
                            <div className='table__column table__column_type_medium'>
                              <p className='table__text table__text_align_center'>{item.score || 0}/{item.max_score || '?'}</p>
                            </div>
                            <div className='table__column table__column_type_medium'>
                              {renderStatus(item)}
                            </div>
                          </div>
                        </li>
                      ))
                    }
                    </ul>
                    :
                    <div className='table__caption_type_empty'>По заданным параметрам ничего не найдено!</div>
                  }
                </div>
              </Table>
            }
            </>
          }
          </>
        }
      </>
      }
      

    </Section>
  );
}

export default ControlReportUser;
