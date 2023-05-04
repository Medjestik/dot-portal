import React from 'react';
import './CuratorAdvertisement.css';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import * as curatorApi from '../../../utils/curatorApi.js';
import Search from '../../Search/Search.js';
import Preloader from '../../Preloader/Preloader.js';
import Table from '../../Table/Table.js';
import AddAdvertisementPopup from '../../Education/EducationPopup/AddAdvertisementPopup/AddAdvertisementPopup.js';

function CuratorAdvertisement({ windowWidth }) {

  const [advertisements, setAdvertisements] = React.useState([{ title: 'test', name: 'test', date: '20.04.2023', time: '14:00', author: 'Медникова Оксана Васильевна', discipline: 'Информационные системы управления документооборотом' }]);
  const [currentAdvertisement, setCurrentAdvertisement] = React.useState({});

  const [isOpenAddAdvertisement, setIsOpenAddAdvertisement] = React.useState(false);
  const [isOpenEditAdvertisement, setIsOpenEditAdvertisement] = React.useState(false);

  const [isLoadingAdvertisement, setIsLoadingAdvertisement] = React.useState(true);
  const [isLoadingRequest, setIsLoadingRequest] = React.useState(false);
  const [isShowRequestError, setIsShowRequestError] = React.useState({ isShow: false, text: '', });

  const containerHeightRef = React.createRef();
  const tableHeaderHeightRef = React.createRef();

  const [tableHeight, setTableHeight] = React.useState(0);

  React.useEffect(() => {
    if ((windowWidth >= 833) && (!isLoadingAdvertisement)) {
      setTableHeight(containerHeightRef.current.clientHeight - tableHeaderHeightRef.current.clientHeight);
    }
  }, [isLoadingAdvertisement, windowWidth, containerHeightRef, tableHeaderHeightRef]);

  const tableStyle = {
    height: tableHeight,
  };

  function openAddAdvertisementPopup() {
    setIsOpenAddAdvertisement(true);
  }

  function openEditAdvertisementPopup(data) {
    setCurrentAdvertisement(data);
    setIsOpenEditAdvertisement(true);
  }

  function closePopup() {
    setIsOpenAddAdvertisement(false);
    setIsOpenEditAdvertisement(false);
    setIsShowRequestError({ isShow: false, text: '', })
  }

  function handleSearch() {

  }

  function groupRequest() {
    setIsLoadingAdvertisement(false);
    /*
    const token = localStorage.getItem('token');
    curatorApi.getGroupInfo({ token: token, groupId: groupId })
    .then((res) => {
      console.log('GroupInfo', res);
      setGroupInfo(res);
    })
    .catch((err) => {
      console.error(err);
    })
    .finally(() => {  
      setIsLoadingGroup(false);
    });
    */
  }

  function addAdvertisement(data) {
    setIsLoadingRequest(true);
    console.log(data);
    /*
    const token = localStorage.getItem('token');
    educationApi.teacherAddAdvertisement({
      token: token,
      disciplineId: disciplineId,
      advertisement: data,
    })
    .then((res) => {
      setAdvertisement([res, ...advertisement]);
      closePopup();
    })
    .catch((err) => {
      console.error(err);
    })
    .finally(() => {  
      setIsLoadingRequest(false);
    });
    */
  }

  function editAdvertisement(data) {
    console.log(data);
    /*
    setIsLoadingRequest(true);
    const token = localStorage.getItem('token');
    educationApi.teacherEditAdvertisement({
      token: token,
      advertisement: data,
    })
    .then((res) => {
      const index = advertisement.indexOf(advertisement.find((elem) => (elem.id === data.id)));
      setAdvertisement([ ...advertisement.slice(0, index), res, ...advertisement.slice(index + 1)]);
      closePopup();
    })
    .catch((err) => {
      console.error(err);
    })
    .finally(() => {  
      setIsLoadingRequest(false);
    });
    */
  }

  React.useEffect(() => {
    groupRequest();
    return (() => {
      setAdvertisements([]);
      setCurrentAdvertisement({})
    })
    // eslint-disable-next-line
  }, []);

  return (
    isLoadingAdvertisement
    ?
    <Preloader />
    :
    <>
    <div className='section__header'>
      <div className='section__header-item'>
        <span className='section__header-caption section__header-caption_margin_bottom'>Поиск по заголовку:</span>
        <Search type='large' id='webinar' data={advertisements} onSearch={handleSearch} />
      </div>
      <div className='section__header-item'>
        <span className='section__header-caption section__header-caption_margin_bottom'></span>
        <button className='section__header-btn section__header-btn_type_full' type='button' onClick={() => openAddAdvertisementPopup()}>Создать объявление</button>
      </div>
    </div>

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
              <p className='table__text table__text_type_header'>Заголовок</p>
            </div>
            <div className='table__column table__column_type_header table__column_type_full'>
              <p className='table__text table__text_type_header'>Дисциплина</p>
            </div>
            <div className='table__column table__column_type_header table__column_type_teacher'>
              <p className='table__text table__text_type_header'>Автор</p>
            </div>
          </div>
          <div className='table__column table__column_type_header table__column_type_btn table__column_type_btn-header'>
            <div className='btn btn_type_download btn_type_download_status_active'></div>
            <div className='btn btn_type_download btn_type_download_status_active table__btn'></div>
          </div>
        </div>
        <ul style={Object.assign({}, tableStyle)} className='table__main scroll'>
          {
            advertisements.length < 1 
            ?
            <p className='table__caption_type_empty'>Объявления пока не загружены.</p>
            :
            advertisements.map((item, i) => (
              <li className='table__row' key={i}>
                <div className='table__main-column'>
                  <div className='table__column table__column_type_count'>
                    <p className='table__text'>{i + 1}</p>
                  </div>
                  <div className='table__column table__column_type_date'>
                    <p className='table__text'>{item.date}</p>
                    <p className='table__text'>{item.time}</p>
                  </div>
                  <div className='table__column table__column_type_name'>
                    <p className='table__text table__text_type_header'>{item.title}</p>
                  </div>
                  <div className='table__column table__column_type_full'>
                    <p className='table__text'>{item.discipline}</p>
                  </div>
                  <div className='table__column table__column_type_teacher'>
                    <p className='table__text'>{item.author}</p>
                  </div>
                </div>
                <div className='table__column table__column_type_btn'>
                  <button 
                  className='btn btn_type_advertisement btn_margin_right' 
                  type='button' 
                  >
                </button>
                  <button 
                  className='btn btn_type_cancel btn_type_cancel_status_active table__btn' 
                  type='button' 
                  >
                  </button>
                </div>
              </li>
            ))
          }
        </ul>
      </div>
    </Table>

    {
      isOpenAddAdvertisement &&
      <AddAdvertisementPopup
        isOpen={isOpenAddAdvertisement}
        onClose={closePopup}
        onAdd={addAdvertisement}
        isLoadingRequest={isLoadingRequest}
        isShowRequestError={isShowRequestError}
      />
    }

    </>
    
  );
}

export default CuratorAdvertisement; 