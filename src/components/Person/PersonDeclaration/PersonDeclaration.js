import React from 'react';
import './PersonDeclaration.css';
import Accordion from '../../Accordion/Accordion.js';
import PersonDeclarationInfoPopup from './PersonDeclarationInfoPopup/PersonDeclarationInfoPopup.js';
import ConfirmRemovePopup from '../../Popup/ConfirmRemovePopup/ConfirmRemovePopup.js';
import declarationIcon from '../../../images/accordion/accordion-declaration.svg';

function PersonDeclaration({ windowWidth, userDeclaration, declarationTemplate }) { 

  const [isOpenInfoPopup, setIsOpenInfoPopup] = React.useState(false);
  const [isConfirmRemovePopupOpen, setIsConfirmRemovePopupOpen] = React.useState(false);
  const [currentFile, setCurrentFile] = React.useState({});

  const [sectionHeight, setSectionHeight] = React.useState(0);
  const heightRef = React.createRef();

  const [numberStep, setNumberStep] = React.useState(3);

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

  function showMoreDeclaration() {
    setNumberStep(userDeclaration.length);
  }

  function renderDeclarationItem(item, i) {
    return (
      <li key={i} className={`person-document__download-item ${item.status === 'active' ? 'person-document__download-item_status_active' : ''}`}>
        <button className={`btn-icon btn-icon_type_download ${item.status === 'active' ? 'btn-icon_color_accent-blue' : 'btn-icon_status_block'}`} type='button'></button>
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

  return (
    <>
    <Accordion icon={declarationIcon} name='Заявления' height={sectionHeight} openInfoPopup={openInfoPopup}>
      <div ref={heightRef} className='person-declaration'>
        <div className='person-document__download'>
          <p className='person-document__download-title'>Ваши заявления</p>
          <div className='person-document__download-container'>
            {
              windowWidth <= 833 
              ?
              <>
              <ul className='person-document__download-list'>
              {
                userDeclaration.slice(0, numberStep).map((item, i) => (
                  renderDeclarationItem(item, i)
                ))
              }
              </ul>
              {
                (userDeclaration.length > numberStep) &&
                <button className='btn-more btn-more_type_show btn-more_margin_top' onClick={showMoreDeclaration}>Показать больше</button>
              }
              </>
              :
              <ul className='scroll-inside person-document__download-list'>
              {
                userDeclaration.map((item, i) => (
                  renderDeclarationItem(item, i)
                ))
              }
              </ul>
            }
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
                    <button className='btn-icon btn-icon_color_accent-blue btn-icon_type_upload' type='button'></button>
                    <button className={`btn-icon btn-icon_type_download ${item.upload ? 'btn-icon_color_accent-blue' : 'btn-icon_status_block'}`} type='button'></button>
                    <button className={`btn-icon btn-icon_type_remove ${item.upload ? 'btn-icon_color_accent-orange' : 'btn-icon_status_block'}`} type='button' onClick={() => openConfirmRemovePopup(item)}></button>
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