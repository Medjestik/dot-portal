import React from 'react';
import './CuratorAdvertisement.css';
import * as curatorApi from '../../../utils/curatorApi.js';
import * as educationApi from '../../../utils/educationApi.js';
import Search from '../../Search/Search.js';
import Preloader from '../../Preloader/Preloader.js';
import Table from '../../Table/Table.js';
import AddAdvertisementPopup from '../../Education/EducationPopup/AddAdvertisementPopup/AddAdvertisementPopup.js';
import EditAdvertisementPopup from '../../Education/EducationPopup/EditAdvertisementPopup/EditAdvertisementPopup.js';
import ConfirmRemovePopup from '../../Popup/ConfirmRemovePopup/ConfirmRemovePopup.js';

function CuratorAdvertisement({ windowWidth, groupInfo }) {

  const [advertisements, setAdvertisements] = React.useState([]);
  const [searchedAdvertisements, setSearchedAdvertisements] = React.useState([]);
  const [currentAdvertisement, setCurrentAdvertisement] = React.useState({});

  const [isOpenAddAdvertisement, setIsOpenAddAdvertisement] = React.useState(false);
  const [isOpenEditAdvertisement, setIsOpenEditAdvertisement] = React.useState(false);
  const [isOpenRemoveAdvertisement, setIsOpenRemoveAdvertisement] = React.useState(false);

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

  function openRemoveAdvertisementPopup(data) {
    setCurrentAdvertisement(data);
    setIsOpenRemoveAdvertisement(true);
  }

  function closePopup() {
    setIsOpenAddAdvertisement(false);
    setIsOpenEditAdvertisement(false);
    setIsOpenRemoveAdvertisement(false);
    setIsShowRequestError({ isShow: false, text: '', })
  }

  function handleSearch(data) {
    setSearchedAdvertisements(data);
  }

  function groupRequest() {
    setIsLoadingAdvertisement(true);
    const token = localStorage.getItem('token');
    curatorApi.getGroupAdvertisement({ token: token, groupId: groupInfo.id })
    .then((res) => {
      console.log('GroupAdvertisement', res);
      setAdvertisements(res);
      setSearchedAdvertisements(res);
    })
    .catch((err) => {
      console.error(err);
    })
    .finally(() => {  
      setIsLoadingAdvertisement(false);
    });
  }

  function addAdvertisement(data) {
    setIsLoadingRequest(true);
    const token = localStorage.getItem('token');
    curatorApi.curatorAddAdvertisement({
      token: token,
      groupId: groupInfo.id,
      advertisement: data,
    })
    .then((res) => {
      setAdvertisements([res, ...advertisements]);
      setSearchedAdvertisements([res, ...searchedAdvertisements]);
      closePopup();
    })
    .catch((err) => {
      console.error(err);
    })
    .finally(() => {  
      setIsLoadingRequest(false);
    });
  }

  function editAdvertisement(data) {
    setIsLoadingRequest(true);
    const token = localStorage.getItem('token');
    educationApi.editAdvertisement({
      token: token,
      advertisement: data,
    })
    .then((res) => {
      const index = advertisements.indexOf(advertisements.find((elem) => (elem.id === data.id)));
      const searchIndex = searchedAdvertisements.indexOf(searchedAdvertisements.find((elem) => (elem.id === data.id)));
      setAdvertisements([...advertisements.slice(0, index), res, ...advertisements.slice(index + 1)]);
      setSearchedAdvertisements([...searchedAdvertisements.slice(0, searchIndex), res, ...searchedAdvertisements.slice(index + 1)]);
      closePopup();
    })
    .catch((err) => {
      console.error(err);
    })
    .finally(() => {  
      setIsLoadingRequest(false);
    });
  }

  function removeAdvertisement(data) {
    setIsLoadingRequest(true);
    const token = localStorage.getItem('token');
    curatorApi.removeAdvertisement({
      token: token,
      advertisementId: data.id,
    })
    .then(() => {
      setAdvertisements(advertisements.filter((elem) => data.id !== elem.id));
      setSearchedAdvertisements(searchedAdvertisements.filter((elem) => data.id !== elem.id));
      closePopup();
    })
    .catch((err) => {
      console.error(err);
    })
    .finally(() => {  
      setIsLoadingRequest(false);
    })
  }

  React.useEffect(() => {
    groupRequest();
    return (() => {
      setAdvertisements([]);
      setSearchedAdvertisements([]);
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
        <Search type='large' id='webinar' data={advertisements.map((elem) => { return {...elem, name: elem.title} })} onSearch={handleSearch} />
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
            searchedAdvertisements.length < 1 
            ?
            <p className='table__caption_type_empty'>Объявления пока не загружены.</p>
            :
            searchedAdvertisements.map((item, i) => (
              <li className='table__row' key={i}>
                <div className='table__main-column'>
                  <div className='table__column table__column_type_count'>
                    <p className='table__text'>{i + 1}</p>
                  </div>
                  <div className='table__column table__column_type_date'>
                    <p className='table__text'>{item.date}</p>
                  </div>
                  <div className='table__column table__column_type_name'>
                    <p className='table__text table__text_type_header'>{item.title}</p>
                  </div>
                  <div className='table__column table__column_type_teacher'>
                    <p className='table__text'>{item.author}</p>
                  </div>
                </div>
                <div className='table__column table__column_type_btn'>
                  <button 
                  className='btn btn_type_advertisement btn_margin_right' 
                  type='button'
                  onClick={() => openEditAdvertisementPopup(item)} 
                  >
                </button> 
                  <button 
                  className='btn btn_type_cancel btn_type_cancel_status_active table__btn' 
                  type='button' 
                  onClick={() => openRemoveAdvertisementPopup(item)} 
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

    {
      isOpenEditAdvertisement &&
      <EditAdvertisementPopup 
        isOpen={isOpenEditAdvertisement}
        onClose={closePopup}
        currentAdvertisementId={currentAdvertisement.id}
        onEdit={editAdvertisement}
        isLoadingRequest={isLoadingRequest}
        isShowRequestError={isShowRequestError}
      />
    }

    {
      isOpenRemoveAdvertisement &&
      <ConfirmRemovePopup
        isOpen={isOpenRemoveAdvertisement}
        onClose={closePopup}
        popupName='curator-advertisement-remove'
        onConfirm={removeAdvertisement}
        data={currentAdvertisement}
        isLoadingRequest={isLoadingRequest}
        isShowRequestError={isShowRequestError}
      />
    }

    </>
    
  );
}

export default CuratorAdvertisement; 