import React from 'react';
import './PersonWebinar.css';
import { useNavigate } from 'react-router-dom';
import Accordion from '../../Accordion/Accordion.js';
import Carousel from 'react-elastic-carousel';
import PersonWebinarInfoPopup from './PersonWebinarInfoPopup/PersonWebinarInfoPopup.js';
import webinarIcon from '../../../images/accordion/accordion-webinar.svg';
import ViewWebinarPopup from '../../Webinar/WebinarPopup/ViewWebinarPopup/ViewWebinarPopup.js';

function PersonWebinar({ windowWidth, personWebinarsPlanned, personWebinarsCompleted }) {

  const navigate = useNavigate();

  const [isOpenInfoPopup, setIsOpenInfoPopup] = React.useState(false);
  const [sectionHeight, setSectionHeight] = React.useState(0);

  const heightRef = React.createRef();

  const [webinars, setWebinars] = React.useState(personWebinarsPlanned.length > 0 ? personWebinarsPlanned : personWebinarsCompleted);
  const [currentWebinarStatus, setCurrentWebinarStatus] = React.useState(personWebinarsPlanned.length > 0 ? 'planned' : 'completed');
  const [currentWebinar, setCurrentWebinar] = React.useState({});
  const [countCards, setCountCards] = React.useState(0);

  const [isOpenViewWebinarPopup, setIsOpenViewWebinarPopup] = React.useState(false);


  function handleChangeWebinarStatus(status) {
    setCurrentWebinarStatus(status);
    setWebinars(status === 'planned' ? personWebinarsPlanned : personWebinarsCompleted);
  }

  function handleOpenWebinarView(webinar) {
    setCurrentWebinar(webinar);
    setIsOpenViewWebinarPopup(true);
  }

  function openInfoPopup() {
    setIsOpenInfoPopup(true);
  }

  function closePopups() {
    setIsOpenInfoPopup(false);
    setIsOpenViewWebinarPopup(false);
  }

  function renderStatus(status) {
    switch(status) {
      case 'completed':
        return ( 
          <div className='status'>
            <span className='status__icon status__icon_type_completed'></span>
            <p className='table__text'>Завершен</p>
          </div>
        )
      
        case 'canceled':
          return ( 
            <div className='status'>
              <span className='status__icon status__icon_type_canceled'></span>
              <p className='table__text'>Отменен</p>
            </div>
          )

          case 'active':
            return ( 
              <div className='status'>
                <span className='status__icon status__icon_type_canceled'></span>
                <p className='table__text'>Проводится</p>
              </div>
            )

      default:
        return ( 
          <div className='status'>
            <span className='status__icon status__icon_type_planned'></span>
            <p className='table__text'>Планируется</p>
          </div>
        )
    }
  }

  React.useEffect(() => {
    if (windowWidth > 1439) {
      setCountCards(3);
    } else if ((windowWidth <= 1439) && (windowWidth > 833)) {
      setCountCards(2);
    } else {
      setCountCards(1);
    }

  }, [windowWidth])

  React.useEffect(() => {
    setSectionHeight(heightRef.current.clientHeight);
  }, [heightRef, windowWidth]);

  React.useEffect(() => {
    setIsOpenInfoPopup(false);
    setIsOpenViewWebinarPopup(false);
    return(() => {
      setWebinars([]);
      setCurrentWebinar({});
    })
  },[]);

  return (
    <>
    <Accordion icon={webinarIcon} name='Вебинары' height={sectionHeight} openInfoPopup={openInfoPopup}>
      <div ref={heightRef} className='person-webinar'>
        <div className='person-webinar__container'>
          <div className='person-webinar__nav'>
            <div className='person-webinar__nav-container'>
              <div className={`person-webinar__nav-item ${currentWebinarStatus === 'planned' && 'person-webinar__nav-item_type_active'}`} onClick={() => handleChangeWebinarStatus('planned')}>
                <div className={`person-webinar__nav-item-icon ${currentWebinarStatus === 'planned' ? 'person-webinar__nav-item-icon_type_planned-active' : 'person-webinar__nav-item-icon_type_planned'}`}></div>
                <span className={`person-webinar__nav-item-text ${currentWebinarStatus === 'planned' && 'person-webinar__nav-item-text_type_active'}`}>Ближайшие вебинары</span>
              </div>
              <div className={`person-webinar__nav-item ${currentWebinarStatus === 'completed' && 'person-webinar__nav-item_type_active'}`} onClick={() => handleChangeWebinarStatus('completed')}>
                <div className={`person-webinar__nav-item-icon ${currentWebinarStatus === 'completed' ? 'person-webinar__nav-item-icon_type_completed-active' : 'person-webinar__nav-item-icon_type_completed'}`}></div>
                <span className={`person-webinar__nav-item-text ${currentWebinarStatus === 'completed' && 'person-webinar__nav-item-text_type_active'}`}>Последние записи</span>
              </div>
            </div>
            <span className='person-webinar__nav-link' onClick={() => navigate('/webinars')}>Просмотреть все</span>
          </div>
          {
            webinars.length > 0
            ?
            <div className='person-webinar__slider'>
              <Carousel showArrows={false} itemsToShow={countCards}>
                {
                  webinars.map((elem, i) => (
                    <div key={`${elem.id} + id${i}`} className='person-webinar__card'>
                      {renderStatus(elem.status)}
                      <h4 className='table-card__text table-card__text_weight_bold table-card__text_type_cut table-card__title'>{elem.name}</h4>
                      <ul className='data__list data__list_margin_top'>
                        <li className='data__item'>
                          <p className='data__text'><span className='data__text_font_bold'>Спикер:</span> {elem.speakers[0]}</p>
                        </li>
                        <li className='data__item'>
                          <p className='data__text'><span className='data__text_font_bold'>Дата:</span> {elem.date}</p>
                        </li>
                        <li className='data__item'>
                          <p className='data__text'><span className='data__text_font_bold'>Время:</span> {elem.time}</p>
                        </li>
                      </ul>
                      <button className='person-webinar__card-button' type='button' onClick={() => handleOpenWebinarView(elem)}>Подробнее</button>
                    </div>
                  ))
                }
              </Carousel>
            </div>
            :
            <p className={`table__text table__text_type_empty table__text_margin_${windowWidth > 833 ? 'left' : 'top'}`}>{currentWebinarStatus === 'planned' ? 'Ближайшие вебинары пока не назначены' : 'Записи последних вебинаров не найдены!'}</p>

          }

        </div>
      </div>
    </Accordion>
    {
      isOpenInfoPopup &&
      <PersonWebinarInfoPopup
        isOpen={isOpenInfoPopup}
        onClose={closePopups}
      />
    }
    {
      isOpenViewWebinarPopup &&
      <ViewWebinarPopup
        isOpen={isOpenViewWebinarPopup}
        onClose={closePopups}
        currentWebinarId={currentWebinar.id}
      />
    }
    </>
  );
}

export default PersonWebinar;