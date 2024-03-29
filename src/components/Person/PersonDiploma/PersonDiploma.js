import React from 'react';
import './PersonDiploma.css';
import Accordion from '../../Accordion/Accordion.js';
import searchIcon from '../../../images/search.svg';
import diplomaIcon from '../../../images/accordion/accordion-diploma.svg';
import PersonDiplomaInfoPopup from './PersonDiplomaInfoPopup/PersonDiplomaInfoPopup.js';

function PersonDiploma({ windowWidth }) {

  const [fileName, setFileName] = React.useState({ isShow: false, name: '', });
  const [isShowWrongType, setIsShowWrongType] = React.useState(false);
  const [contentFile, setContentFile] = React.useState({ file: null, });

  const [sectionHeight, setSectionHeight] = React.useState(0);
  const heightRef = React.createRef();

  const formRef = React.createRef();

  const [isOpenInfoPopup, setIsOpenInfoPopup] = React.useState(false);

  function openInfoPopup() {
    setIsOpenInfoPopup(true);
  }

  function closeInfoPopup() {
    setIsOpenInfoPopup(false);
  }
  
  React.useEffect(() => {
    setIsOpenInfoPopup(false);
  },[]);

  function handleChangeDiploma(e) {
    setIsShowWrongType(false);
    setFileName({ isShow: false, name: '' });
    if (e.target.files.length > 0) {
      if (e.target.files[0].name.match(/.(docx|doc|pdf)$/i)) {
        setContentFile({ file: e.target.files[0] });
        setFileName({ isShow: true, name: e.target.files[0].name });
      } else {
        setFileName({ isShow: false, name: e.target.files[0].name });
        setIsShowWrongType(true);
        setContentFile({ file: null, });
      }
      formRef.current.reset();
    } else {
      setContentFile({ file: null, });
    }
  }

  React.useEffect(() => {
    setSectionHeight(heightRef.current.clientHeight);
  }, [heightRef, windowWidth]);

  return (
    <>
    <Accordion icon={diplomaIcon} name='Выпускная квалификационная работа' height={sectionHeight} openInfoPopup={openInfoPopup}>
      <div ref={heightRef} className='person-diploma__container'>
        <div className='person-diploma__info'>
          <div className='person-diploma__theme'>
            <div className='person-diploma__theme-container'>
              <p className='scroll-inside person-diploma__theme-text'>Тема выпускной квалификационной работы Тема выпускной квалификационной работы Тема выпускной квалификационной работы Тема выпускной квалификационной работы Тема выпускной квалификационной работы Тема выпускной квалификационной работы Тема выпускной квалификационной работы Тема выпускной квалификационной работы</p>
            </div>
            <div className='person-diploma__plagiarism'>
              <img className='person-diploma__plagiarism-img' src={searchIcon} alt='иконка'></img>
              <span className='person-diploma__plagiarism-count'>100%</span>
            </div>
          </div>
          <div className='person-diploma__director'>
            <div className='person-diploma__director-img'></div>
            <div className='person-diploma__director-info'>
              <h4 className='person-diploma__director-name'>Иванова Елена Алексеевна</h4>
              <div className='person-diploma__director-info-line'>
                <p className='person-diploma__director-text'>Руководитель</p>
                <span className='person-diploma__director-phone'>+7 (000) 000-00-00</span>
              </div>
              <div className='person-diploma__director-info-line'>
                <p className='person-diploma__director-text'>Доцент</p>
                <span className='person-diploma__director-mail'>0000000000000@000000.ru</span>
              </div>
            </div>

          </div>
        </div>
        <div className='person-diploma__upload'>
          <h5 className='person-diploma__upload-title'>Подгрузить ВКР на антиплагиат</h5>
          <form className='upload-form' ref={formRef} name='person-diploma-upload-file' id='person-diploma-upload-file'>
            <label htmlFor='person-diploma-upload' className='upload-form__field'>
              <p className='upload-form__text'>{fileName.isShow ? fileName.name : ''}</p>
              <div className='upload-form__icon'></div>
            </label>
            <input onChange={handleChangeDiploma} id='person-diploma-upload' className='upload-form__input' type="file" />
            <button className={`btn-icon btn-icon_type_upload ${contentFile.file !== null ? 'btn-icon_color_accent-blue' : 'btn-icon_status_block'}`}></button>
          </form>
          <ul className='person-diploma__upload-date-list'>
            <li className='person-diploma__upload-date-item'>
              <h5 className='person-diploma__upload-title'>Дата предзащиты</h5>
              <div className='person-diploma__upload-date-container'>
                <span className='person-diploma__upload-date-text'>00.00.00 00:00</span>
              </div>
            </li>
            <li className='person-diploma__upload-date-item'>
              <h5 className='person-diploma__upload-title'>Дата защиты</h5>
              <div className='person-diploma__upload-date-container'>
                <span className='person-diploma__upload-date-text'>00.00.00 00:00</span>
              </div>
            </li>
          </ul>
          <div className='person-diploma__download'>
            <ul className='scroll-inside person-diploma__download-list'>
              <li className='person-diploma__download-item'>
                <button className='btn-icon btn-icon_color_accent-blue btn-icon_type_download'></button>
                <div className='person-diploma__download-text-container'>
                  <p className='person-diploma__download-text'>Методические материалы Методические материалы Методические материалы Методические материалы</p>
                </div>
              </li>
              <li className='person-diploma__download-item'>
                <button className='btn-icon btn-icon_color_accent-blue btn-icon_type_download'></button>
                <div className='person-diploma__download-text-container'>
                  <p className='person-diploma__download-text'>Методические материалы</p>
                </div>
              </li>
              <li className='person-diploma__download-item'>
                <button className='btn-icon btn-icon_color_accent-blue btn-icon_type_download'></button>
                <div className='person-diploma__download-text-container'>
                  <p className='person-diploma__download-text'>Методические материалы</p>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </Accordion>
    {
      isOpenInfoPopup &&
      <PersonDiplomaInfoPopup
        isOpen={isOpenInfoPopup}
        onClose={closeInfoPopup}
      />
    }
    </>
  );
}

export default PersonDiploma;