import React from 'react';
import './PersonDocument.css';
import Accordion from '../../Accordion/Accordion.js';
import PersonDocumentInfoPopup from './PersonDocumentInfoPopup/PersonDocumentInfoPopup.js';
import ConfirmRemovePopup from '../../Popup/ConfirmRemovePopup/ConfirmRemovePopup.js';
import documentIcon from '../../../images/accordion/accordion-document.svg';

function PersonDocument({ user, userDocuments, userCheck }) { 

  const [isOpenInfoPopup, setIsOpenInfoPopup] = React.useState(false);
  const [isConfirmRemovePopupOpen, setIsConfirmRemovePopupOpen] = React.useState(false);
  const [currentFile, setCurrentFile] = React.useState({});

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

  React.useEffect(() => {
    setIsOpenInfoPopup(false);
    setIsConfirmRemovePopupOpen(false);

    return(() => {
      setCurrentFile({});
    })
  },[]);

  return (
    <>
    <Accordion icon={documentIcon} name='Документы' height={346} openInfoPopup={openInfoPopup}>
      <div className='person-document'>
        <div className='person-document__download'>
          <p className='person-document__download-title'>Документы об обучении</p>
          <div className='person-document__download-container'>
            <ul className='scroll-inside person-document__download-list'>
              {
                userDocuments.map((item, i) => (
                  <li 
                  key={i} 
                  className={`person-document__download-item ${item.status === 'active' ? 'person-document__download-item_status_active' : ''}`}>
                    <button className={`btn_type_download ${item.status === 'active' ? 'btn_type_download_status_active' : ''}`} type='button'></button>
                    <p className='person-document__download-text'>{item.name}</p>
                  </li>
                ))
              }
            </ul>
          </div>
          
        </div>
        <div className='person-document__check'>
          <p className='person-document__check-title'>Чеки об оплате обучения</p>
          <div className='person-document__check-container'>
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