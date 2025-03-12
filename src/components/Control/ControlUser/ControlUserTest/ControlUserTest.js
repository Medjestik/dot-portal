import React from 'react';
import * as adminApi from '../../../../utils/admin.js';
import * as reportsApi from '../../../../utils/reports.js';
import * as catalogApi from '../../../../utils/catalog.js';
import Preloader from '../../../Preloader/Preloader';
import Section from '../../../Section/Section';
import SelectSearch from '../../../SelectSearch/SelectSearch.js';
import Table from '../../../Table/Table.js';
import ConfirmActionPopup from '../../../Popup/ConfirmActionPopup/ConfirmActionPopup.js';

function ControlUserTest({ windowWidth }) {

  const containerHeightRef = React.createRef();
  const tableHeaderHeightRef = React.createRef();

  const [tableHeight, setTableHeight] = React.useState(0);

  const [searchUserText, setSearchUserText] = React.useState('');
  const [users, setUsers] = React.useState([]);
  const [currentUser, setCurrentUser] = React.useState({ name: 'Выберите пользователя..', id: 'placeholder' });

  const [courses, setCourses] = React.useState([]);
  const [currentCourse, setCurrentCourse] = React.useState({ name: 'Выберите курс..', id: 'placeholder' });

  const [data, setData] = React.useState([]);
  const [currentItem, setCurrentItem] = React.useState({});

  const [isLoadingUsers, setIsLoadingUsers] = React.useState(false);
  const [isShowUsersSelect, setIsShowUsersSelect] = React.useState(false);
  const [isLoadingCourses, setIsLoadingCourses] = React.useState(false);
  const [isShowCourseSelect, setIsShowCourseSelect] = React.useState(false);
  const [isLoadingData, setIsLoadingData] = React.useState(false);
  const [isShowData, setIsShowData] = React.useState(false);

  const [isOpenDropTestAttemptPopup, setIsOpenDropTestAttemptPopup] = React.useState(false);
  const [isOpenSetScoreTestPopup, setIsOpenSetScoreTestPopup] = React.useState(false);

  const [isLoadingRequest, setIsLoadingRequest] = React.useState(false);
  const [isShowRequestError, setIsShowRequestError] = React.useState({ isShow: false, text: '', });

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
    dataRequest(option.active_learning_id);
  }

  function usersRequest() {
    setIsShowCourseSelect(false);
    setIsShowUsersSelect(false);
    setIsShowData(false);
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
      setCurrentCourse({ name: 'Выберите курс..', id: 'placeholder' });
      setIsShowUsersSelect(true);
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
    reportsApi.getUserTestData({ token, id })
    .then((res) => {
      console.log('ReportUserTestData', res);
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

  function handleDropTestAttempts(data) {
    setIsLoadingRequest(true);
    const token = localStorage.getItem('token');
    adminApi.dropTestAttempts({
      token: token,
      code: data.code,
      active_learning_id: currentCourse.active_learning_id,
    })
    .then(() => {
      setData(prevData => {
        return prevData.map(item => 
          item.code === data.code ? { ...item, cur_attempt_num: 0, score: 0, state: 'Не начат' } : item
        );
      });
      closePopup();
    })
    .catch((err) => {
      console.error(err);
      setIsShowRequestError({ text: 'Произошла ошибка, попробуйте еще раз', isShow: true });
    })
    .finally(() => {  
      setIsLoadingRequest(false);
    });
  }

  function openSetScoreTestPopup(item) {
    setCurrentItem(item);
    setIsOpenSetScoreTestPopup(true);
  }

  function openDropTestAttempt(item) {
    setIsShowRequestError({ isShow: false, text: '', });
    setCurrentItem(item);
    setIsOpenDropTestAttemptPopup(true);
  }

  function closePopup() {
    setIsOpenSetScoreTestPopup(false);
    setIsOpenDropTestAttemptPopup(false);
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
    <Section title='Тестирование студента' heightType='page' headerType='large'>
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
                      <div className='table__main-column'>
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
                          <p className='table__text table__text_align_center table__text_type_header'>Попытки</p>
                        </div>
                        <div className='table__column table__column_type_header table__column_type_medium'>
                          <p className='table__text table__text_align_center table__text_type_header'>Статус</p>
                        </div>
                      </div>
                      <div className='table__column table__column_type_header table__column_type_btn table__column_type_btn-header'>
                        <div className='btn-icon'></div>
                      </div>
                    </div>
                    {
                      data.length > 0 
                      ?
                      <ul style={Object.assign({}, tableStyle)} className='table__main scroll'>
                      {
                        data.map((item, i) => (
                          <li className='table__row' key={i}>
                            <div className='table__main-column'>
                              <div className='table__column table__column_type_count'>
                                <p className='table__text'>{i + 1}</p>
                              </div>
                              <div className='table__column table__column_type_name'>
                                <p className='table__text table__text_type_header'>{item.name || ''}</p>
                              </div>
                              <div className='table__column table__column_type_medium'>
                                <p className='table__text table__text_align_center'>{item.score || 0}/{item.max_score || 0}</p>
                              </div>
                              <div className='table__column table__column_type_medium'>
                                <p className='table__text table__text_align_center'>{item.cur_attempt_num || 0}/{item.attempts_num || 0}</p>
                              </div>
                              <div className='table__column table__column_type_medium'>
                                <p className='table__text table__text_align_center'>{item.state || ''}</p>
                              </div>
                            </div>
                            <div className='table__column table__column_type_btn'>
                              <button className='btn-icon btn-icon_color_accent-blue btn-icon_type_edit' type='button' onClick={() => openDropTestAttempt(item)}></button>
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

      {
        isOpenDropTestAttemptPopup &&
        <ConfirmActionPopup
          isOpen={isOpenDropTestAttemptPopup}
          onClose={closePopup}
          popupName='drop-test-attempts-popup'
          onConfirm={handleDropTestAttempts}
          data={currentItem} 
          actionText='Вы действительно хотите сбросить попытки?'
          isLoadingRequest={isLoadingRequest}
          isShowRequestError={isShowRequestError}
        />
      }
    </Section>
  );
}

export default ControlUserTest;
