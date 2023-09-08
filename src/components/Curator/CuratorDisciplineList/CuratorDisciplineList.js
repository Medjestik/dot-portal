import React from 'react';
import './CuratorDisciplineList.css';
import { useNavigate } from 'react-router-dom';
import * as curatorApi from '../../../utils/curatorApi.js';
import Preloader from '../../Preloader/Preloader.js';
import Table from '../../Table/Table.js';
import PopupSelect from '../../Popup/PopupSelect/PopupSelect.js';
import Search from '../../Search/Search.js';
import ViewSemesterDetailPopup from '../../Education/EducationPopup/ViewSemesterDetailPopup/ViewSemesterDetailPopup.js';

function CuratorDisciplineList({ windowWidth, groupInfo }) {

  const navigate = useNavigate();

  const [semesterOptions, setSemesterOptions] = React.useState([{ name: 'Не выбран', id: 'empty', },]);
  const [currentSemesterOption, setCurrentSemesterOption] = React.useState(semesterOptions[0]);
  
  const [disciplines, setDisciplines] = React.useState([]);
  const [filteredDisciplines, setFilteredDisciplines] = React.useState([]);
  const [searchedDisciplines, setSearchedDisciplines] = React.useState([]);

  const [isOpenViewSemesterDetail, setIsOpenViewSemesterDetail] = React.useState(false);

  const containerHeightRef = React.createRef();
  const tableHeaderHeightRef = React.createRef();

  const [tableHeight, setTableHeight] = React.useState(0);

  const [isLoadingData, setIsLoadingData] = React.useState(true);

  React.useEffect(() => {
    if ((windowWidth >= 833) && (!isLoadingData)) {
      setTableHeight(containerHeightRef.current.clientHeight - tableHeaderHeightRef.current.clientHeight);
    }
  }, [isLoadingData, windowWidth, containerHeightRef, tableHeaderHeightRef]);

  const tableStyle = {
    height: tableHeight,
  };

  function handleSearch(data) {
    setSearchedDisciplines(data);
    if (currentSemesterOption.id === 'empty') {
      setFilteredDisciplines(data);
    } else {
      setFilteredDisciplines(data.filter((elem) => (elem.semester_id === currentSemesterOption.id)));
    }
  }

  function filterBySemester(option) {
    setCurrentSemesterOption(option);
    if (option.id === 'empty') {
      setFilteredDisciplines(searchedDisciplines);
    } else {
      setFilteredDisciplines(searchedDisciplines.filter((elem) => (elem.semester_id === option.id)));
    }
  }

  function openDiscipline(id) {
    navigate('/curator/discipline/' + id + '/info')
  }

  function openViewSemesterDetailPopup() {
    setIsOpenViewSemesterDetail(true);
  }

  function closePopup() {
    setIsOpenViewSemesterDetail(false);
  }

  function dataRequest() {
    setIsLoadingData(true);
    const token = localStorage.getItem('token');
    curatorApi.getGroupDisciplines({ token: token, groupId: groupInfo.id })
    .then((res) => {
      console.log('GroupDisciplines', res);
      
      let uniqSemesters = res.reduce((acc, item) => {
        if (acc.map[item.semestr]) // если данный семестр уже был
          return acc; // ничего не делаем, возвращаем уже собранное
    
        acc.map[item.semestr] = true; // помечаем семестр, как обработанный
        acc.disc.push({id: item.semester_id, name: 'Семестр ' + item.semestr}); // добавляем объект в массив семестров
        return acc; // возвращаем собранное
      }, {
        map: {}, // здесь будут отмечаться обработанные дисциплины
        disc: [] // здесь конечный массив уникальных семестров
      })
      .disc; // получаем конечный массив

      setSemesterOptions([semesterOptions[0], ...uniqSemesters]);
      setDisciplines(res);
      setFilteredDisciplines(res);
      setSearchedDisciplines(res);
    })
    .catch((err) => {
      console.error(err);
    })
    .finally(() => {  
      setIsLoadingData(false);
    });
  }

  React.useEffect(() => {
    dataRequest();
    return (() => {
      setSemesterOptions([]);
      setDisciplines([]);
    })
    // eslint-disable-next-line
  }, []);

  return (
    isLoadingData
    ?
    <Preloader />
    :
    <>

    <div className='section__header'>
      <div className='section__header-item'>
        <span className='section__header-caption section__header-caption_margin_bottom'>Поиск по названию:</span>
        <Search type='large' id='webinar' data={disciplines} onSearch={handleSearch} />
      </div>
      <div className='section__header-item'>
        <span className='section__header-caption'>Выберите семестр:</span>
        <PopupSelect filterType='byId' options={semesterOptions} currentOption={currentSemesterOption} onChooseOption={filterBySemester} />
      </div>
      <div className='section__header-item'>
        <span className='section__header-caption section__header-caption_margin_bottom'></span>
        <button 
        className={`section__header-btn section__header-btn_type_full ${currentSemesterOption.id !== 'empty' ? '' : 'section__header-btn_type_block'}`} type='button' onClick={() => openViewSemesterDetailPopup()}>
          Развернутая ведомость
        </button>
      </div>
    </div>

    <Table>
      <div ref={containerHeightRef} className='table__container'>
        <div ref={tableHeaderHeightRef} className='table__header'>
          <div className='table__main-column table__main-column_type_empty'>
            <div className='table__column table__column_type_header table__column_type_count'>
              <p className='table__text table__text_type_header'>№</p>
            </div>
            <div className='table__column table__column_type_header table__column_type_date'>
              <p className='table__text table__text_type_header'>Период</p>
            </div>
            <div className='table__column table__column_type_header table__column_type_full'>
              <p className='table__text table__text_type_header'>Дисциплина</p>
            </div>
            <div className='table__column table__column_type_header table__column_type_teacher'>
              <p className='table__text table__text_type_header'>Преподаватель</p>
            </div>
            <div className='table__column table__column_type_header table__column_type_small'>
              <p className='table__text table__text_type_header'>Тип</p>
            </div>
            <div className='table__column table__column_type_header table__column_type_small'>
              <p className='table__text table__text_type_header'>Семестр</p>
            </div>
          </div>
        </div>

        {
          filteredDisciplines.length > 0 
          ?
          <ul style={Object.assign({}, tableStyle)} className='table__main scroll'>
          {
            filteredDisciplines.map((item, i) => (
              <li className='table__row' key={i}>
                <div className='table__main-column'>
                  <div className='table__column table__column_type_count'>
                    <p className='table__text'>{i + 1}</p>
                  </div>
                  <div className='table__column table__column_type_date'>
                    <p className='table__text'>{item.start_date} - {item.end_date}</p>
                  </div>
                  <div className='table__column table__column_type_full'>
                    <p 
                    className='table__text table__text_type_header table__text_type_active'
                    onClick={() => openDiscipline(item.id)} 
                    >
                      {item.name}
                    </p>
                  </div>
                  <div className='table__column table__column_type_teacher'>
                    <p className='table__text'>{item.tutor}</p>
                  </div>
                  <div className='table__column table__column_type_small'>
                    <p className='table__text'>{item.control}</p>
                  </div>
                  <div className='table__column table__column_type_small'>
                    <p className='table__text'>{item.semestr}</p>
                  </div>
                </div>
              </li>
            ))
          }
          </ul>
          :
          <div className='table__caption_type_empty'>В этом семестре у вас отсутствуют дисциплины!</div>
        }
      </div>
    </Table>

    {
      isOpenViewSemesterDetail &&
      <ViewSemesterDetailPopup 
        isOpen={isOpenViewSemesterDetail}
        onClose={closePopup}
        groupId={groupInfo.id}
        semesterOptions={semesterOptions.filter((elem) => elem.id !== 'empty')}
        currentSemesterId={currentSemesterOption.id}
      />
    }

    </>
  );
}

export default CuratorDisciplineList;  