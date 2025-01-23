import React from 'react';
import * as reportsApi from '../../../../utils/reports.js';
import * as catalogApi from '../../../../utils/catalog.js';
import Preloader from '../../../Preloader/Preloader';
import Section from '../../../Section/Section';
import SelectSearch from '../../../SelectSearch/SelectSearch.js';
import Table from '../../../Table/Table.js';
import TestChart from '../../../TestChart/TestChart.js';

function ControlReportGroup({ windowWidth }) {

  const containerHeightRef = React.createRef();
  const tableHeaderHeightRef = React.createRef();

  const [tableHeight, setTableHeight] = React.useState(0);

  const [groups, setGroups] = React.useState([]);
  const [currentGroup, setCurrentGroup] = React.useState({ name: 'Выберите группу..', id: 'placeholder' });

  const [courses, setCourses] = React.useState([]);
  const [currentCourse, setCurrentCourse] = React.useState({ name: 'Выберите курс..', id: 'placeholder' });

  const [data, setData] = React.useState([]);

  const [isLoadingGroups, setIsLoadingGroups] = React.useState(true);
  const [isLoadingCourses, setIsLoadingCourses] = React.useState(false);
  const [isShowCourseSelect, setIsShowCourseSelect] = React.useState(false);
  const [isLoadingData, setIsLoadingData] = React.useState(false);
  const [isShowData, setIsShowData] = React.useState(false);

  function handleChangeGroup(option) { 
    setIsShowCourseSelect(false);
    setIsShowData(false);
    setData([]);
    setCurrentCourse({ name: 'Выберите курс..', id: 'placeholder' });
    setCurrentGroup(option);
    coursesRequest(option.id);
  }

  function handleChangeCourse(option) {
    setIsShowData(false);
    setData([]);
    setCurrentCourse(option);
    dataRequest(option.id);
  }

  function groupsRequest() {
    setIsLoadingGroups(true);
    const token = localStorage.getItem('token');
    catalogApi.getCatalogGroups({ token: token })
    .then((res) => {
      console.log('ReportGroups', res);
      setGroups(res);
    })
    .catch((err) => {
      console.error(err);
    })
    .finally(() => {  
      setIsLoadingGroups(false);
    })
  }

  function coursesRequest(id) {
    setIsLoadingCourses(true);
    const token = localStorage.getItem('token');
    reportsApi.getGroupCourses({ token: token, groupId: id })
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
    reportsApi.getGroupCourseData({ token: token, groupId: currentGroup.id, courseId: id })
    .then((res) => {
      console.log('ReportGroupCourseData', res);
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

  React.useEffect(() => {
    groupsRequest();
  return (() => {
    setGroups([]);
    setCourses([]);
    setData([]);
    setCurrentGroup({});
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
      {
        isLoadingGroups 
        ?
        <Preloader />
        :
        <>
        <div className='section__header'>
          <div className='section__header-item'>
            <span className='section__header-caption'>Выберите группу:</span>
            <SelectSearch options={groups} currentOption={currentGroup} onChooseOption={handleChangeGroup} />
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
                  className={`section__header-btn section__header-btn_margin_top-4`} 
                  href={`https://course.emiit.ru/view_print_form_true.html?print_form_id=6135710235479460782&object_id=${currentCourse.id}&group_id=${currentGroup.id}`} 
                  target='_blank' 
                  rel='noreferrer'>
                    Экспорт отчета
                  </a>
                  :
                  <button className={`section__header-btn section__header-btn_margin_top-4 section__header-btn_type_block`} type='button'>Экспорт отчета</button>
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
                    <div className='table__column table__column_padding_small table__column_type_header table__column_type_count'>
                      <p className='table__text table__text_type_header'>№</p>
                    </div>
                    <div className='table__column table__column_padding_small table__column_type_header table__column_type_name'>
                      <p className='table__text table__text_type_header'>Студент</p>
                    </div>
                    <div className='table__column table__column_padding_small table__column_type_header table__column_type_date'>
                      <p className='table__text table__text_type_header'>Время</p>
                    </div>
                    <div className='table__column table__column_padding_small table__column_type_header table__column_type_full'>
                      <p className='table__text table__text_type_header'>Тестирование</p>
                    </div>
                    <div className='table__column table__column_padding_small table__column_type_header table__column_type_medium'>
                      <p className='table__text table__text_align_center table__text_type_header'>Результат</p>
                    </div>
                    <div className='table__column table__column_padding_small table__column_type_header table__column_type_medium'>
                      <p className='table__text table__text_align_center table__text_type_header'>Процент</p>
                    </div>
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
                          <div className='table__column table__column_padding_small table__column_type_count'>
                            <p className='table__text'>{i + 1}</p>
                          </div>
                          <div className='table__column table__column_padding_small table__column_type_name'>
                            <p className='table__text table__text_type_header'>{item.fullname || ''}</p>
                          </div>
                          <div className='table__column table__column_padding_small table__column_type_date'>
                            <p className='table__text'>{item.learn?.content_time || 0}</p>
                          </div>
                          <div className='table__column table__column_padding_small table__column_type_full'>
                            <ul className='table__list'>
                              {
                                item.learn?.tests_info.map((test, i) => (
                                  <li key={i} className='table__cell'>
                                    <p className='table__text table__text_type_cut'>{test.name || ''}</p>
                                  </li>
                                ))
                              }
                            </ul>
                          </div>
                          <div className='table__column table__column_padding_small table__column_type_medium'>
                            <ul className="table__list">
                              {item.learn?.tests_info.map((test, i) => (
                                <li key={i} className="table__cell table__cell_align_center">
                                  {test.state_name === 'Не начат' ? (
                                    <p className="table__text table__text_align_center table__text_type_empty">
                                      {test.score || 0}/{test.max_score || '?'}
                                    </p>
                                  ) : test.state_name === 'Не пройден' ? (
                                    <p className="table__text table__text_align_center table__text_type_error">
                                      {test.score || 0}/{test.max_score || '?'}
                                    </p>
                                  ) : (
                                    <p className="table__text table__text_align_center">
                                      {test.score || 0}/{test.max_score || '?'}
                                    </p>
                                  )}
                                </li>
                              ))}
                            </ul>
                          </div>
                          <div className='table__column table__column_padding_small table__column_type_medium'>
                            <ul className='table__list'>
                              {
                                item.learn?.tests_info.map((test, i) => (
                                  <li key={i} className='table__cell table__cell_align_center'>
                                    <TestChart test={test} size='small' />
                                  </li>
                                ))
                              }
                            </ul>
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
 
    </Section>
  );
}

export default ControlReportGroup;