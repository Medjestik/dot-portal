import React from 'react';
import './CuratorAdvertisement.css';
import * as curatorApi from '../../../utils/curatorApi.js';
import * as educationApi from '../../../utils/educationApi.js';
import Search from '../../Search/Search.js';
import Preloader from '../../Preloader/Preloader.js';
import Table from '../../Table/Table.js';
import TableList from '../../Table/TableList/TableList.js';
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

    {
      windowWidth > 833
      ?
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
                <p className='table__text table__text_type_header'></p>
              </div>
              <div className='table__column table__column_type_header table__column_type_teacher'>
                <p className='table__text table__text_type_header'>Автор</p>
              </div>
              <div className='table__column table__column_type_header table__column_type_name'>
                <p className='table__text table__text_type_header'>Заголовок</p>
              </div>
              <div className='table__column table__column_type_header table__column_type_date'>
                <p className='table__text table__text_type_header'>Дата</p>
              </div>
            </div>
            <div className='table__column table__column_type_header table__column_type_btn table__column_type_btn-header'>
              <div className='btn-icon'></div>
              <div className='btn-icon btn-icon_margin_left'></div>
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
                    <div className='table__column table__column_type_count table__column_display_flex table__column_padding_0'>
                      {
                      item.authorImg
                      ?
                        <img className='popup__author-img popup__author-img_size_40' src={item.authorImg} alt='аватар'></img>
                        :
                        <div className='popup__author-img popup__author-img_size_40'></div>
                      }
                    </div>
                    <div className='table__column table__column_type_teacher'>
                      <p className='table__text'>{item.author}</p>
                    </div>
                    <div className='table__column table__column_type_name'>
                      <p className='table__text table__text_type_header'>{item.title}</p>
                    </div>
                    <div className='table__column table__column_type_date'>
                      <p className='table__text'>{item.date}</p>
                    </div>

                  </div>
                  <div className='table__column table__column_type_btn'>
                    <button className='btn-icon btn-icon_color_accent-blue btn-icon_type_edit' type='button' onClick={() => openEditAdvertisementPopup(item)}>
                  </button> 
                    <button className='btn-icon btn-icon_margin_left btn-icon_color_accent-orange btn-icon_type_remove' type='button' onClick={() => openRemoveAdvertisementPopup(item)}></button>
                  </div>
                </li>
              ))
            }
          </ul>
        </div>
      </Table>
      </>
      :
      <>
      <div className='section__header section__header_direction_column'>
        <div className='section__header-item'>
          <Search type='large' id='webinar' data={advertisements.map((elem) => { return {...elem, name: elem.title} })} onSearch={handleSearch} />
        </div>
        <div className='section__header-item'>
          <button className='section__header-btn section__header-btn_type_full' type='button' onClick={() => openAddAdvertisementPopup()}>Создать объявление</button>
        </div>
      </div>
      { 
        searchedAdvertisements.length > 0 
        ?
        <TableList>
        {
          searchedAdvertisements.map((item, i) => (
            <li className='table-list__item' key={i}>
              <span className='table-list__count'>{i + 1}.</span>
              <div className='table-list__info'>
                <h6 className='table-list__info-title'>{item.title || ''}</h6>
                <ul className='table-list__info-list'>
                  <li className='table-list__info-item'>
                    <p className='table-list__info-text'><span className='table-list__info-text_font_bold'>Автор:</span>{item.author || ''}</p>
                    <p className='table-list__info-text'><span className='table-list__info-text_font_bold'>Дата:</span>{item.date || ''}</p>
                  </li>
                </ul>
              </div>
              <button className='btn-icon btn-icon_color_accent-blue btn-icon_type_edit' type='button' onClick={() => openEditAdvertisementPopup(item)}></button>
              <button className='btn-icon btn-icon_margin_left btn-icon_color_accent-orange btn-icon_type_remove' type='button' onClick={() => openRemoveAdvertisementPopup(item)}></button>
            </li>
          ))
        }
        </TableList>
        :
        <p className='table__caption_type_empty'>Объявления пока не загружены.</p>
      }
      </>
    }

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