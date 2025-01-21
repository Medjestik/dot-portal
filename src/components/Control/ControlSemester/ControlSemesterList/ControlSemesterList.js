import React from 'react';
import './ControlSemesterList.css';
import * as adminApi from '../../../../utils/admin.js';
import * as catalogApi from '../../../../utils/catalog.js';
import Preloader from '../../../Preloader/Preloader';
import Section from '../../../Section/Section';
import PopupSelect from '../../../Popup/PopupSelect/PopupSelect';
import Table from '../../../Table/Table.js';
import ControlSemesterItemAddPopup from '../ControlSemesterPopup/ControlSemesterItemAddPopup.js';
import ControlSemesterItemEditPopup from '../ControlSemesterPopup/ControlSemesterItemEditPopup.js';
import ConfirmRemovePopup from '../../../Popup/ConfirmRemovePopup/ConfirmRemovePopup.js';

function ControlSemesterList({ windowWidth }) {

  const containerHeightRef = React.createRef();
  const tableHeaderHeightRef = React.createRef();
  const [tableHeight, setTableHeight] = React.useState(0);

  const [items, setItems] = React.useState([]);
  const [filteredItems, setFilteredItems] = React.useState([]);
  const [currentItem, setCurrentItem] = React.useState({});
  const [groups, setGroups] = React.useState([]);
  const [tutors, setTutors] = React.useState([]);
  const [courses, setCourses] = React.useState([]);
  const [controlForms, setControlForms] = React.useState([]);

  const [semesters, setSemesters] = React.useState([]);
  const [currentSemesterOption, setCurrentSemesterOption] = React.useState({});

  const [searchText, setSearchText] = React.useState('');

  const [isOpenAddPopup, setIsOpenAddPopup] = React.useState(false);
  const [isOpenEditPopup, setIsOpenEditPopup] = React.useState(false);
  const [isOpenRemovePopup, setIsOpenRemovePopup] = React.useState(false);

  const [isLoadingInitial, setIsLoadingInitial] = React.useState(true);
  const [isLoadingData, setIsLoadingData] = React.useState(false);
  const [isLoadingRequest, setIsLoadingRequest] = React.useState(false);
  const [isShowRequestError, setIsShowRequestError] = React.useState({ isShow: false, text: '', });

  function handleSetSemester(option) {
    setCurrentSemesterOption(option);
    setSearchText('');
    dataRequest(option.id);
  }

  function initialRequest() {
    setIsLoadingInitial(true);
    const token = localStorage.getItem('token');
    Promise.all([
      adminApi.getSemesters({ token: token }),
      catalogApi.getCatalogTutors({ token: token }),
      catalogApi.getCatalogCourses({ token: token }),
      catalogApi.getCatalogControlForms({ token: token }),
    ])
      .then(([semesters, tutors, courses, controlForms]) => {
        setSemesters(semesters);
        setTutors(tutors);
        setCourses(courses);
        setControlForms(controlForms);
        setCurrentSemesterOption(semesters[semesters.length - 1]);

        Promise.all([
          adminApi.getSemesterItems({ token: token, semester: semesters[semesters.length - 1].id }),
          adminApi.getSemesterGroups({ token: token, semester: semesters[semesters.length - 1].id }),
        ])
        .then(([items, groups]) => {
          setItems(items);
          setFilteredItems(items);
          setGroups(groups);
        })
        .catch((err) => {
          console.error(err);
        })
        .finally(() => {  
          setIsLoadingInitial(false);
        })
      })
      .catch((err) => {
        console.error(err);
      })
  }

  function handleSearch(e) {
    setSearchText(e.target.value);
  }

  function openAddPopup() {
    setIsOpenAddPopup(true);
  }

  function openEditPopup(item) {
    setCurrentItem(item);
    setIsOpenEditPopup(true);
  }

  function openRemovePopup(item) {
    setCurrentItem(item);
    setIsOpenRemovePopup(true);
  }

  function closePopup() {
    setIsOpenAddPopup(false);
    setIsOpenEditPopup(false);
  }

  function closeRemovePopup() {
    setIsOpenRemovePopup(false);
  }

  function dataRequest(id) {
    setIsLoadingData(true);
    const token = localStorage.getItem('token');
    adminApi.getSemesterItems({ token: token, semester: id })
    .then((res) => {
      console.log('SemesterItems', res);
      setItems(res);
      setFilteredItems(res);
    })
    .catch((err) => {
      console.error(err);
    })
    .finally(() => {  
      setIsLoadingData(false);
    })
  }

  function handleAddSemesterItem(data) {
    setIsLoadingRequest(true);
    const token = localStorage.getItem('token');
    adminApi.addSemesterItem({
      token: token,
      data: data,
    })
    .then((res) => {
      setItems((prevItems) => [res, ...prevItems]);
      setFilteredItems((prevFilteredItems) => [res, ...prevFilteredItems]);
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

  function handleEditSemesterItem(data) {
    setIsLoadingRequest(true);
    const token = localStorage.getItem('token');
    adminApi.editSemesterItem({
      token: token,
      data: data,
    })
    .then((res) => {
      setItems((prevItems) =>
        prevItems.map((item) => (item.id === res.id ? res : item))
      );

      setFilteredItems((prevFilteredItems) =>
        prevFilteredItems.map((item) => (item.id === res.id ? res : item))
      );
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

  function handleRemoveSemesterItem(data) {
    setIsLoadingRequest(true);
    const token = localStorage.getItem('token');
    console.log(data);
    
    adminApi.removeSemesterItem({
      token: token,
      id: data.id,
    })
      .then(() => {
        setItems((prevItems) =>
          prevItems.filter((item) => item.id !== data.id)
        );
  
        setFilteredItems((prevFilteredItems) =>
          prevFilteredItems.filter((item) => item.id !== data.id)
        );
        closeRemovePopup();
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

  React.useEffect(() => {
    initialRequest();
  return (() => {
    setItems([]);
    setFilteredItems([]);
    setSemesters([]);
    setCurrentSemesterOption({});
    setCurrentItem({});
    setGroups([]);
    setTutors([]);
    setCourses([]);
    setControlForms([]);
  })
    // eslint-disable-next-line
  }, []);

  React.useEffect(() => {
    if ((windowWidth >= 833) && (!isLoadingInitial) && (!isLoadingData)) {
      setTableHeight(containerHeightRef.current.clientHeight - tableHeaderHeightRef.current.clientHeight);
    }
  }, [windowWidth, isLoadingInitial, isLoadingData, containerHeightRef, tableHeaderHeightRef]);

  React.useEffect(() => {      
    if (searchText.length > 0) {
      if (items.length > 0) {
        const lowerCaseSearchText = searchText.toLowerCase();
    
        const filtered = items.filter((item) => {
          return (
            (item.name && item.name.toLowerCase().includes(lowerCaseSearchText)) ||
            (item.course?.name && item.course.name.toLowerCase().includes(lowerCaseSearchText)) ||
            (item.lector?.fullname && item.lector.fullname.toLowerCase().includes(lowerCaseSearchText)) ||
            (item.vedomost_lector?.fullname && item.vedomost_lector.fullname.toLowerCase().includes(lowerCaseSearchText)) ||
            (item.group?.name && item.group.name.toLowerCase().includes(lowerCaseSearchText))
          );
        });
    
        setFilteredItems(filtered);
      } else {
        setFilteredItems([]);
      }
    } 
  }, [searchText, items]);

  const tableStyle = {
    height: tableHeight,
  };

  return (
    <Section title='Учебные семестры' heightType='page' headerType='large'>
      {
        isLoadingInitial 
        ?
        <Preloader />
        :
        <>
        <div className='section__header'>
          <div className='section__header-item'>
            <span className='section__header-caption'>Выберите период:</span>
            <PopupSelect options={semesters} currentOption={currentSemesterOption} onChooseOption={handleSetSemester} />
          </div>
          <div className={`section__header-item ${windowWidth <= 833 ? 'section__header-item_margin_top' : ''}`}>
            <span className='section__header-caption section__header-caption_margin_bottom'>Поиск:</span>
            <div className={`search search_type_large`}>
              <input
              className='search__input'
              placeholder='Поиск'
              type='text'
              id={`search-filter-admin-search-semester`}
              name={`search-filter-admin-search-semester`}
              autoComplete='off'
              value={searchText}
              onChange={handleSearch}
              >
              </input>
            </div>
          </div>
          <div className='section__header-item section__header-item_type_content'>
            <span className='section__header-caption section__header-caption_margin_bottom'></span>
            <button className='section__header-btn section__header-btn_type_full' type='button' onClick={openAddPopup}>Создать дисциплину</button>
          </div>
        </div>
        { 
          isLoadingData
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
                  <div className='table__column table__column_type_header table__column_type_name'>
                    <p className='table__text table__text_type_header'>Дисциплина</p>
                  </div>
                  <div className='table__column table__column_type_header table__column_type_teacher'>
                    <p className='table__text table__text_type_header'>Преподаватель</p>
                  </div>
                  <div className='table__column table__column_type_header table__column_type_large'>
                    <p className='table__text table__text_type_header'>Группа</p>
                  </div>
                  <div className='table__column table__column_type_header table__column_type_date'>
                    <p className='table__text table__text_type_header'>Период</p>
                  </div>
                  <div className='table__column table__column_type_header table__column_type_medium'>
                    <p className='table__text table__text_type_header'>Контроль</p>
                  </div>
                </div>
                <div className='table__column table__column_type_header table__column_type_btn table__column_type_btn-header'>
                  <div className='btn-icon'></div>
                </div>
              </div>
              {
                filteredItems.length > 0 
                ?
                <ul style={Object.assign({}, tableStyle)} className='table__main scroll'>
                {
                  filteredItems.map((item, i) => (
                    <li className='table__row' key={i}>
                      <div className='table__main-column'>
                        <div className='table__column table__column_type_count'>
                          <p className='table__text'>{i + 1}</p>
                        </div>
                        <div className='table__column table__column_type_name'>
                          <p className='table__text table__text_type_header'>{item.name || ''}</p>
                          <p className='table__text'>({item.course?.name || ''})</p>
                        </div>
                        <div className='table__column table__column_type_teacher'>
                          {
                            item.lector?.fullname === item.vedomost_lector?.fullname
                            ?
                            <p className='table__text'>{item.lector?.fullname || ''}</p>
                            :
                            <>
                            <p className='table__text'>{item.lector?.fullname || ''} /</p>
                            <p className='table__text'>{item.vedomost_lector?.fullname || ''}</p>
                            </>
                          }
                        </div>
                        <div className='table__column table__column_type_large'>
                          <p className='table__text'>{item.group?.name || ''}</p>
                        </div>
                        <div className='table__column table__column_type_date'>
                          <p className='table__text'>{item.start_date || 0} {item.end_date || 0}</p>
                        </div>
                        <div className='table__column table__column_type_medium'>
                          <p className='table__text'>{item.control?.name || 0}</p>
                        </div>
                      </div>
                      <div className='table__column table__column_type_btn'>
                        <button className='btn-icon btn-icon_color_accent-blue btn-icon_type_edit' type='button' onClick={() => openEditPopup(item)}></button>
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
      {
        isOpenAddPopup &&
        <ControlSemesterItemAddPopup
          isOpen={isOpenAddPopup}
          onClose={closePopup}
          groups={groups}
          tutors={tutors}
          courses={courses}
          controlForms={controlForms}
          onSubmit={handleAddSemesterItem}
          isLoadingRequest={isLoadingRequest}
          isShowRequestError={isShowRequestError}
        />
      }
      {
        isOpenEditPopup &&
        <ControlSemesterItemEditPopup
          isOpen={isOpenEditPopup}
          onClose={closePopup}
          item={currentItem} 
          tutors={tutors}
          courses={courses}
          controlForms={controlForms}
          onSubmit={handleEditSemesterItem}
          onRemove={openRemovePopup}
          isLoadingRequest={isLoadingRequest}
          isShowRequestError={isShowRequestError}
        />
      }
      {
        isOpenRemovePopup &&
        <ConfirmRemovePopup
          isOpen={isOpenRemovePopup}
          onClose={closeRemovePopup}
          popupName='remove-semester-item-popup'
          data={currentItem} 
          onConfirm={handleRemoveSemesterItem}
          isLoadingRequest={isLoadingRequest}
          isShowRequestError={isShowRequestError}
        />
      }
    </Section>
  );
}

export default ControlSemesterList;
