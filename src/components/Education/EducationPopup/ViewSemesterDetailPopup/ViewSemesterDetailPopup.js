import React from 'react';
import Popup from '../../../Popup/Popup.js';
import * as educationApi from '../../../../utils/educationApi.js';
import PreloaderPopup from '../../../Preloader/PreloaderPopup/PreloaderPopup.js';

function ViewSemesterDetailPopup({ isOpen, onClose, currentSemesterId }) {

  const [isLoadingInfo, setIsLoadingInfo] = React.useState(true);

  const [currentData, setCurrentData] = React.useState({});

  function handleSubmit(e) {
    e.preventDefault();
    onClose();
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

      
      </>
      }
    </Popup>
  )
}

export default ViewSemesterDetailPopup;