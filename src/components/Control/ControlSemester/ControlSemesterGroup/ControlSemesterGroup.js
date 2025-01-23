import React from 'react';
import { useParams } from 'react-router-dom';
import * as adminApi from '../../../../utils/admin.js';
import * as catalogApi from '../../../../utils/catalog.js';
import Preloader from '../../../Preloader/Preloader';
import Section from '../../../Section/Section';
import Table from '../../../Table/Table.js';
import ControlSemesterGroupAddPopup from '../ControlSemesterPopup/ControlSemesterGroupAddPopup.js';

function ControlSemesterGroup({ windowWidth }) {

  const { groupId } = useParams();

  const containerHeightRef = React.createRef();
  const tableHeaderHeightRef = React.createRef();
  const [tableHeight, setTableHeight] = React.useState(0);

  const [items, setItems] = React.useState([]);
  const [currentItem, setCurrentItem] = React.useState({});
  const [semesters, setSemesters] = React.useState([]);
  const [tutors, setTutors] = React.useState([]);
  const [courses, setCourses] = React.useState([]);

  const [isOpenAddPopup, setIsOpenAddPopup] = React.useState(false);
  const [isOpenEditPopup, setIsOpenEditPopup] = React.useState(false);

  const [isLoadingData, setIsLoadingData] = React.useState(false);
  const [isLoadingRequest, setIsLoadingRequest] = React.useState(false);
  const [isShowRequestError, setIsShowRequestError] = React.useState({ isShow: false, text: '', });

  function dataRequest() {
    setIsLoadingData(true);
    const token = localStorage.getItem('token');
    Promise.all([
      adminApi.getLearningGroupSemesters({ token: token, id: groupId }),
      adminApi.getSemesters({ token: token }),
      catalogApi.getCatalogTutors({ token: token }),
      catalogApi.getCatalogCourses({ token: token }),
    ])
    .then(([items, semesters, tutors, courses]) => {
      console.log('GroupSemesters', items);
      setItems(items);
      setSemesters(semesters);
      setTutors(tutors);
      setCourses(courses);
    })
    .catch((err) => {
      console.error(err);
    })
    .finally(() => {  
      setIsLoadingData(false);
    })
  }

  function handleCreateSemesterGroup(data) {
    setIsLoadingRequest(true);
    const token = localStorage.getItem('token');
    console.log(data);
    adminApi.createGroupSemester({
      token: token,
      data: data,
    })
    .then((res) => {
      setItems([...items, res]);
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

  function openAddPopup() {
    setIsOpenAddPopup(true);
  }

  function openEditPopup(item) {
    setCurrentItem(item);
    setIsOpenEditPopup(true);
  }

  function closePopup() {
    setIsOpenAddPopup(false);
    setIsOpenEditPopup(false);
  }

  React.useEffect(() => {
    dataRequest();
  return (() => {
    setItems([]);
    setCurrentItem({});
    setSemesters([]);
  })
    // eslint-disable-next-line
  }, []);

  React.useEffect(() => {
    if ((windowWidth >= 833) && (!isLoadingData)) {
      setTableHeight(containerHeightRef.current.clientHeight - tableHeaderHeightRef.current.clientHeight);
    }
  }, [windowWidth, isLoadingData, containerHeightRef, tableHeaderHeightRef]);

  const tableStyle = {
    height: tableHeight,
  };

  return (
    <Section title='Учебные семестры группы' heightType='page' headerType='large'>
      {
        isLoadingData
        ?
        <Preloader />
        :
        <>
        <div className='section__header'>
          <div className='section__header-item section__header-item_type_content'>
            <button className='section__header-btn section__header-btn_type_full' type='button' onClick={openAddPopup}>Создать учебный семестр</button>
          </div>
        </div>
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
                  <p className='table__text table__text_type_header table__text_align_center'>Дисциплины</p>
                </div>
                <div className='table__column table__column_type_header table__column_type_medium'>
                  <p className='table__text table__text_type_header table__text_align_center'>Практики</p>
                </div>
              </div>
              <div className='table__column table__column_type_header table__column_type_btn table__column_type_btn-header'>
                <div className='btn-icon'></div>
              </div>
            </div>
            {
              items.length > 0 
              ?
              <ul style={Object.assign({}, tableStyle)} className='table__main scroll'>
              {
                items.map((item, i) => (
                  <li className='table__row' key={i}>
                    <div className='table__main-column'>
                      <div className='table__column table__column_type_count'>
                        <p className='table__text'>{item.sem_num || ''}</p>
                      </div>
                      <div className='table__column table__column_type_name'>
                        <p className='table__text table__text_type_header'>{item.ych_sem_name || ''}</p>
                      </div>
                      <div className='table__column table__column_type_medium'>
                        <p className='table__text table__text_align_center'>{item.disciplines_count || 0}</p>
                      </div>
                      <div className='table__column table__column_type_medium'>
                        <p className='table__text table__text_align_center'>{item.practics_count || 0}</p>
                      </div>
                    </div>
                    <div className='table__column table__column_type_btn'>
                      <button className='btn-icon btn-icon_color_accent-blue btn-icon_type_edit' type='button' onClick={() => {}}></button>
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
        </>
      }
      {
        isOpenAddPopup &&
        <ControlSemesterGroupAddPopup
          isOpen={isOpenAddPopup}
          onClose={closePopup}
          semesters={semesters}
          courses={courses}
          tutors={tutors}
          groupId={groupId}
          onSubmit={handleCreateSemesterGroup}
          isLoadingRequest={isLoadingRequest}
          isShowRequestError={isShowRequestError}
        />
      }
    </Section>
  );
}

export default ControlSemesterGroup;
