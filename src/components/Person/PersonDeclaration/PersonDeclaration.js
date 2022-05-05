import React from 'react';
import './PersonDeclaration.css';
import Accordion from '../../Accordion/Accordion.js';
import PersonDeclarationInfoPopup from './PersonDeclarationInfoPopup/PersonDeclarationInfoPopup.js';
import ConfirmRemovePopup from '../../Popup/ConfirmRemovePopup/ConfirmRemovePopup.js';
import declarationIcon from '../../../images/accordion/accordion-declaration.svg';

function PersonDeclaration({ user, windowWidth, userDeclaration, declarationTemplate }) { 

  const [isOpenInfoPopup, setIsOpenInfoPopup] = React.useState(false);
  const [isConfirmRemovePopupOpen, setIsConfirmRemovePopupOpen] = React.useState(false);
  const [currentFile, setCurrentFile] = React.useState({});

  const [sectionHeight, setSectionHeight] = React.useState(0);
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

  React.useEffect(() => {
    setSectionHeight(heightRef.current.clientHeight);
  }, [heightRef, windowWidth]);

  React.useEffect(() => {
    setIsOpenInfoPopup(false);
    setIsConfirmRemovePopupOpen(false);

    return(() => {
      setCurrentFile({});
    })
  },[]);

  return (
    <>
    <Accordion icon={declarationIcon} name='Заявления' height={sectionHeight} openInfoPopup={openInfoPopup}>
      <div ref={heightRef} className='person-document'>
        <div className='person-document__download'>
          <p className='person-document__download-title'>Ваши заявления</p>
          <div className='person-document__download-container'>
            <ul className='scroll-inside person-document__download-list'>
              {
                userDeclaration.map((item, i) => (
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
        <div className='person-declaration__template'>
          <p className='person-declaration__template-title'>Шаблоны заявлений</p>
          <div className='person-declaration__template-container'>
            <ul className='scroll-inside person-declaration__template-list'>
              {
                declarationTemplate.map((item, i) => (
                  <li key={i} className='person-declaration__template-item'>
                    {
                      item.upload 
                      ?
                      <div className='person-declaration__template-field person-declaration__template-field_type_name'>{item.name}</div>
                      :
                      <div className='person-declaration__template-field person-declaration__template-field_type_empty'>Подгрузите чек</div>
                    }
                    <button className='btn_type_upload btn_type_upload_status_active' type='button'></button>
                    <button className={`btn_type_download ${item.upload ? 'btn_type_download_status_active' : ''}`} type='button'></button>
                    <button 
                    className={`btn_type_cancel ${item.upload ? 'btn_type_cancel_status_active' : ''}`} 
                    type='button' 
                    onClick={() => openConfirmRemovePopup(item)}>
                    </button>
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
      <PersonDeclarationInfoPopup
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

export default PersonDeclaration;