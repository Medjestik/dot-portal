import React from 'react';
import Popup from '../../../Popup/Popup.js';
import './StudentViewAdvertisementPopup.css';
import * as educationApi from '../../../../utils/educationApi.js';
import PreloaderPopup from '../../../Preloader/PreloaderPopup/PreloaderPopup.js';
import Table from '../../../Table/Table.js';

function StudentViewAdvertisementPopup({ isOpen, onClose, currentAdvertisementId }) {

  const [isLoadingInfo, setIsLoadingInfo] = React.useState(true);

  const [currentAdvertisement, setCurrentAdvertisement] = React.useState({});

  function handleSubmit(e) {
    e.preventDefault();
    onClose();
  }

  function getAdvertisementInfo() {
    setIsLoadingInfo(true);
    const token = localStorage.getItem('token');
    educationApi.getAdvertisementInfo({ token: token, advertisementId: currentAdvertisementId })
    .then((res) => {
      console.log('AdvertisementInfo', res);
      setCurrentAdvertisement(res);
    })
    .catch((err) => {
      console.error(err);
    })
    .finally(() => {  
      setIsLoadingInfo(false);
    });
  }
  
  React.useEffect(() => {
    setIsLoadingInfo(true);
    getAdvertisementInfo();

    return(() => {
      setCurrentAdvertisement({});
    })

  // eslint-disable-next-line
  }, [isOpen]);

  return (
    <Popup
    isOpen={isOpen}
    onClose={onClose}
    onSubmit={handleSubmit}
    formWidth={'medium'}
    formName={'education-student-view-advertisement-popup'}
    >

    {
      isLoadingInfo ?
      <PreloaderPopup />
      :
      <>

      <h2 className='popup__title popup__title_margin_bottom'>Объявление для группы</h2>

      <div className='popup__author'>
        {
        currentAdvertisement.authorImg
        ?
        <img className='popup__author-img' src={currentAdvertisement.authorImg} alt='аватар'></img>
        :
        <div className='popup__author-img'></div>
        }
        <div className='popup__author-info'>
          <h4 className='popup__author-title'>{currentAdvertisement.title}</h4>
          <p className='popup__author-text'><span className='popup__author-text_weight_bold'>Автор: </span>{currentAdvertisement.author}</p>
          <p className='popup__author-text'><span className='popup__author-text_weight_bold'>Дата публикации: </span>{currentAdvertisement.date}</p>
        </div>
      </div>

      <textarea 
        className='popup__textarea popup__textarea_height_medium scroll-inside'
        defaultValue={currentAdvertisement.text}
        id='student-view-advertisement-text' 
        name='student-view-advertisement-text' 
        disabled
      >
      </textarea>

      <div className='popup__field'>
        <p className='popup__input-caption'>Прикрепленные файлы:</p>
        <Table>
          <div className='table__container table__container_margin_top'>
            <div className='table__header'>
              <div className='table__main-column'>
                <div className='table__column table__column_type_header table__column_type_count'>
                  <p className='table__text table__text_type_header'>№</p>
                </div>
                <div className='table__column table__column_type_header table__column_type_name'>
                  <p className='table__text table__text_type_header'>Наименование</p>
                </div>
              </div>
              <div className='table__column table__column_type_header table__column_type_btn table__column_type_btn-header'>
                <div className='btn-icon'></div> 
              </div>
            </div>
            <ul className={`table__main table__main_height_smallest scroll`}>
            {
            currentAdvertisement.files.length > 0
            ?
              <>
              {
                currentAdvertisement.files.map((item, i) => (
                  <li className='table__row' key={i}>
                    <div className='table__main-column'>
                      <div className='table__column table__column_type_count'>
                        <p className='table__text'>{i + 1}</p>
                      </div>
                      <div className='table__column table__column_type_name'>
                        <p className='table__text table__text_type_cut'>{item.name}</p>
                      </div>
                    </div>
                    <div className='table__column table__column_type_btn'>
                      <a className='btn-icon btn-icon_color_accent-blue btn-icon_type_download' href={item.link} target='_blank' rel='noreferrer'> </a>
                    </div>
                  </li>
                ))
              }
              </>
              :
              <p className='table__caption_type_empty'>Список пока пуст.</p>
            }
            </ul>
          </div>
        </Table>
      </div>
      
      <div className='popup__btn_margin_top'></div>
      
      <button className='popup__btn-back' type='submit'>Назад</button>

      </>
      }

    </Popup>
  )
}

export default StudentViewAdvertisementPopup;