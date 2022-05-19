import React from 'react';
import './PersonDocument.css';
import Accordion from '../../Accordion/Accordion.js';
import Carousel from 'react-elastic-carousel';
import PersonDocumentInfoPopup from './PersonDocumentInfoPopup/PersonDocumentInfoPopup.js';
import ConfirmRemovePopup from '../../Popup/ConfirmRemovePopup/ConfirmRemovePopup.js';
import documentIcon from '../../../images/accordion/accordion-document.svg';

function PersonDocument({ windowWidth, userDocuments, userCheck }) { 

  const [isOpenInfoPopup, setIsOpenInfoPopup] = React.useState(false);
  const [sectionHeight, setSectionHeight] = React.useState(0);
  const [isConfirmRemovePopupOpen, setIsConfirmRemovePopupOpen] = React.useState(false);
  const [currentFile, setCurrentFile] = React.useState({});

  const [sliderCheck, setSliderCheck] = React.useState([]);

  const [numberStep, setNumberStep] = React.useState(3);

  const heightRef = React.createRef();

  function openInfoPopup() {
    setIsOpenInfoPopup(true);
  }

  function openConfirmRemovePopup(file) {
    setIsConfirmRemovePopupOpen(true);
    setCurrentFile(file);
  }

  function closePopups() {
    setIsOpenInfoPopup(false);
    setIsConfirmRemovePopupOpen(false);
  }

  function showMoreDocuments() {
    setNumberStep(userDocuments.length);
  }

  function spliceIntoChunks(arr, chunkSize) {
    const res = [];
    while (arr.length > 0) {
        const chunk = arr.splice(0, chunkSize);
        res.push(chunk);
    }
    return res;
  }

  function renderDocumentsItem(item, i) {
    return (
      <li 
        key={i} 
        className={`person-document__download-item ${item.status === 'active' ? 'person-document__download-item_status_active' : ''}`}>
          <button className={`btn_type_download ${item.status === 'active' ? 'btn_type_download_status_active' : ''}`} type='button'></button>
          <p className='person-document__download-text'>{item.name}</p>
      </li>
    )
  }

  React.useEffect(() => {
    setSectionHeight(heightRef.current.clientHeight);
  }, [heightRef, windowWidth]);

  React.useEffect(() => {
    setIsOpenInfoPopup(false);
    setIsConfirmRemovePopupOpen(false);
    setNumberStep(3);
    return(() => {
      setCurrentFile({});
    })
  },[]);

  React.useEffect(() => {
    if (windowWidth <= 833) {
      const sliderCheck = spliceIntoChunks(userCheck, 2);
      setSliderCheck(sliderCheck);
    }
  }, [windowWidth, userCheck]);

  return (
    <>
    <Accordion icon={documentIcon} name='Документы' height={sectionHeight} openInfoPopup={openInfoPopup}>
      <div ref={heightRef} className='person-document'>
        <div className='person-document__download'>
          <p className='person-document__download-title'>Документы об обучении</p>
          <div className='person-document__download-container'>
            {
              windowWidth <= 833 
              ?
              <>
              <ul className='person-document__download-list'>
                {
                  userDocuments.slice(0, numberStep).map((item, i) => (
                    renderDocumentsItem(item, i)
                  ))
                }
              </ul>
              {
                (userDocuments.length > numberStep) &&
                <button className='btn-more btn-more_type_show btn-more_margin_top' onClick={showMoreDocuments}>Показать больше</button>
              }
              </>
              :
              <ul className='scroll-inside person-document__download-list'>
              {
                userDocuments.map((item, i) => (
                  renderDocumentsItem(item, i)
                ))
              }
            </ul>
            }
          </div>
          
        </div>
        <div className='person-document__check'>
          <p className='person-document__check-title'>Чеки об оплате обучения</p>
          <div className='person-document__check-container'>
            {
              windowWidth <= 833 
              ?
              <Carousel showArrows={false} itemsToShow={1} >
                {
                sliderCheck.map((item, i) => (
                  <div className='person-document__slider' key={i}>
                    <div className='person-document__check-item'>
                      <div className='person-document__check-info'>
                        <p className='person-document__check-name'>{item[0].name}</p>
                        <span className='person-document__check-count'>{item[0].count}</span>
                      </div>
                      <div className='person-document__check-control'>
                        {
                          item[0].upload 
                          ?
                          <div className='person-document__check-field person-document__check-field_type_date'>{item[0].date}</div>
                          :
                          <div className='person-document__check-field person-document__check-field_type_empty'>Подгрузите чек</div>
                        }
                        <button className='btn_type_upload btn_type_upload_status_active' type='button'></button>
                        <button className={`btn_type_download ${item[0].upload ? 'btn_type_download_status_active' : ''}`} type='button'></button>
                        <button 
                        className={`btn_type_cancel ${item[0].upload ? 'btn_type_cancel_status_active' : ''}`} 
                        type='button' 
                        onClick={() => openConfirmRemovePopup(item[0])}>
                        </button>
                      </div>
                    </div>
                    <div className='person-document__check-item'>
                      <div className='person-document__check-info'>
                        <p className='person-document__check-name'>{item[1].name}</p>
                        <span className='person-document__check-count'>{item[1].count}</span>
                      </div>
                      <div className='person-document__check-control'>
                        {
                          item[1].upload 
                          ?
                          <div className='person-document__check-field person-document__check-field_type_date'>{item[1].date}</div>
                          :
                          <div className='person-document__check-field person-document__check-field_type_empty'>Подгрузите чек</div>
                        }
                        <button className='btn_type_upload btn_type_upload_status_active' type='button'></button>
                        <button className={`btn_type_download ${item[1].upload ? 'btn_type_download_status_active' : ''}`} type='button'></button>
                        <button 
                        className={`btn_type_cancel ${item[1].upload ? 'btn_type_cancel_status_active' : ''}`} 
                        type='button' 
                        onClick={() => openConfirmRemovePopup(item[1])}>
                        </button>
                      </div>
                    </div>
                  </div>
                ))
                }
              </Carousel>
              :
              <ul className='scroll-inside person-document__check-list'>
                {
                  userCheck.map((item, i) => (
                    <li key={i} className='person-document__check-item'>
                      <div className='person-document__check-info'>
                        <p className='person-document__check-name'>{item.name}</p>
                        <span className='person-document__check-count'>{item.count}</span>
                      </div>
                      <div className='person-document__check-control'>
                        {
                          item.upload 
                          ?
                          <div className='person-document__check-field person-document__check-field_type_date'>{item.date}</div>
                          :
                          <div className='person-document__check-field person-document__check-field_type_empty'>Подгрузите чек</div>
                        }
                        <button className='btn_type_upload btn_type_upload_status_active' type='button'></button>
                        <button className={`btn_type_download ${item.upload ? 'btn_type_download_status_active' : ''}`} type='button'></button>
                        <button 
                        className={`btn_type_cancel ${item.upload ? 'btn_type_cancel_status_active' : ''}`} 
                        type='button' 
                        onClick={() => openConfirmRemovePopup(item)}>
                        </button>
                      </div>
                    </li>
                  ))
                }
              </ul>
            }
          </div>
        </div>
      </div>
    </Accordion>
    {
      isOpenInfoPopup &&
      <PersonDocumentInfoPopup
        isOpen={isOpenInfoPopup}
        onClose={closePopups}
      />
    }
    {
      isConfirmRemovePopupOpen &&
      <ConfirmRemovePopup
        isOpen={isConfirmRemovePopupOpen}
        onClose={closePopups}
        file={currentFile}
      />
    }
    </>

  );
}

export default PersonDocument;