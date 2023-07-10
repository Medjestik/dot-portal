import React from 'react';
import Popup from '../../../Popup/Popup.js';
import * as educationApi from '../../../../utils/educationApi.js';
import PreloaderPopup from '../../../Preloader/PreloaderPopup/PreloaderPopup.js';
import PopupSelect from '../../../Popup/PopupSelect/PopupSelect.js';

function ViewSemesterDetailPopup({ isOpen, onClose, semesterOptions, currentSemesterId }) {

  console.log(semesterOptions)

  const [isLoadingInfo, setIsLoadingInfo] = React.useState(true);
  const [semesterOptionsPopup, setSemesterOptionsPopup] = React.useState(semesterOptions);
  const [currentSemesterOption, setCurrentSemesterOption] = React.useState(semesterOptions[0]);

  const [currentData, setCurrentData] = React.useState({});

  function handleSubmit(e) {
    e.preventDefault();
    onClose();
  }

  function filterBySemester(option) {
    /*setCurrentSemesterOption(option);
    if (option.id === 'empty') {
      setFilteredDisciplines(searchedDisciplines);
    } else {
      setFilteredDisciplines(searchedDisciplines.filter((elem) => (elem.semestr === option.id)));
    }*/
  }

  function getSemesterDetail() {
    setIsLoadingInfo(true);
    const token = localStorage.getItem('token');
    educationApi.getAdvertisementInfo({ token: token, advertisementId: currentSemesterId })
    .then((res) => {
      console.log('SemesterDetail', res);
      setCurrentData(res);
    })
    .catch((err) => {
      console.error(err);
    })
    .finally(() => {  
      setIsLoadingInfo(false);
    });
  }

  React.useEffect(() => {
    setIsLoadingInfo(false);
    //getSemesterDetail();

    return(() => {
      setCurrentData({});
    })

  // eslint-disable-next-line
  }, [isOpen]);

  return (
    <Popup
      isOpen={isOpen}
      onSubmit={handleSubmit}
      formWidth={'1440'}
      formName={'view-semester-detail-popup'}
    >
      {
      isLoadingInfo 
      ?
      <PreloaderPopup />
      :
      <>
      <h2 className='popup__title popup__title_margin_bottom'>Развернутая ведомость</h2>

      <div className='section__header'>
        <div className='section__header-item'>
          <span className='section__header-caption'>Выберите семестр:</span>
          <PopupSelect options={semesterOptions} currentOption={currentSemesterOption} onChooseOption={filterBySemester} />
        </div>
        <div className='section__header-item'>
          <span className='section__header-caption section__header-caption_margin_bottom'></span>
          <button 
          className={`section__header-btn section__header-btn_type_full`} type='button'>
            Экспорт в Excel
          </button>
        </div>
        <div className='section__header-item'>
          <span className='section__header-caption section__header-caption_margin_bottom'></span>
          <button 
          className={`section__header-btn section__header-btn_type_full`} type='button' onClick={() => onClose()}>
            Назад
          </button>
        </div>
      </div>

      
      </>
      }
    </Popup>
  )
}

export default ViewSemesterDetailPopup;