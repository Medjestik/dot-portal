import React from 'react';
import './Webinar.css';
import * as webinarApi from '../../utils/webinarApi.js';
import Preloader from '../Preloader/Preloader.js';
import Section from '../Section/Section.js';
import SemesterHeader from '../Education/SemesterHeader/SemesterHeader.js';
import SemesterHeaderBtnBack from '../Education/SemesterHeader/SemesterHeaderBtnBack/SemesterHeaderBtnBack.js';
import Search from '../Search/Search.js';
import Table from '../Table/Table.js';
import PopupSelect from '../Popup/PopupSelect/PopupSelect.js';
import ViewWebinarPopup from './WebinarPopup/ViewWebinarPopup/ViewWebinarPopup.js';

function Webinar({ windowWidth, semesterOptions, onLogout }) {

  const statusOptions = [
    {
      name: 'Не выбран',
      id: 'empty',
    },
    {
      name: 'Планируется',
      id: 'planned',
    },
    {
      name: 'Отменен',
      id: 'canceled',
    },
    {
      name: 'Завершен',
      id: 'completed',
    },
  ]

  const [isLoadingWebinar, setIsLoadingWebinar] = React.useState(true);

  const [webinars, setWebinars] = React.useState([]);
  const [filteredWebinars, setFilteredWebinars] = React.useState([]);
  const [searchedWebinars, setSearchedWebinars] = React.useState([]);
  const [currentStatusOption, setCurrentStatusOption] = React.useState(statusOptions[0]);
  const [currentSemesterOption, setCurrentSemesterOption] = React.useState(semesterOptions[0]);

  const [currentWebinar, setCurrentWebinar] = React.useState({});

  const [isOpenViewWebinarPopup, setIsOpenViewWebinarPopup] = React.useState(false);

  function handleSearch(data) {
    setSearchedWebinars(data);
    if (currentStatusOption.id === 'empty') {
      if (currentSemesterOption.id === 'empty') {
        setFilteredWebinars(data);
      } else {
        setFilteredWebinars(data.filter((elem) => (elem.semesterId === currentSemesterOption.id)));
      }
    } else {
      if (currentSemesterOption.id === 'empty') {
        setFilteredWebinars(data.filter((elem) => (elem.status === currentStatusOption.id)));
      } else {
        setFilteredWebinars(data.filter((elem) => ((elem.status === currentStatusOption.id) && (elem.semesterId === currentSemesterOption.id))));
      }
    }
  }

  function filterBySemester(option) {
    setCurrentSemesterOption(option);
    if (option.id === 'empty') {
      if (currentStatusOption.id === 'empty') {
        setFilteredWebinars(searchedWebinars);
      } else {
        setFilteredWebinars(searchedWebinars.filter((elem) => (elem.status === currentStatusOption.id)));
      }
    } else {
      if (currentStatusOption.id === 'empty') {
        setFilteredWebinars(searchedWebinars.filter((elem) => (elem.semesterId === option.id)));
      } else {
        setFilteredWebinars(searchedWebinars.filter((elem) => ((elem.status === currentStatusOption.id) && (elem.semesterId === option.id))));
      }
    }
  }

  function filterByStatus(option) {
    setCurrentStatusOption(option);
    if (option.id === 'empty') {
      if (currentSemesterOption.id === 'empty') {
        setFilteredWebinars(searchedWebinars);
      } else {
        setFilteredWebinars(searchedWebinars.filter((elem) => (elem.semesterId === currentSemesterOption.id)));
      }
    } else {
      if (currentSemesterOption.id === 'empty') {
        setFilteredWebinars(searchedWebinars.filter((elem) => (elem.status === option.id)));
      } else {
        setFilteredWebinars(searchedWebinars.filter((elem) => ((elem.status === option.id) && (elem.semesterId === currentSemesterOption.id))));
      }
    }
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

      default:
        return ( 
          <div className='status'>
            <span className='status__icon status__icon_type_planned'></span>
            <p className='table__text'>Планируется</p>
          </div>
        )
    }
  }

  function openViewWebinarPopup(item) {
    setCurrentWebinar(item);
    setIsOpenViewWebinarPopup(true);
  }

  function closePopup() {
    setIsOpenViewWebinarPopup(false);
  }

  function webinarRequest() {
    setIsLoadingWebinar(true);
    const token = localStorage.getItem('token');
    webinarApi.getWebinars({ token: token })
    .then((res) => {
      console.log('Webinars', res);
      setWebinars(res);
      setFilteredWebinars(res);
      setSearchedWebinars(res);
    })
    .catch((err) => {
      console.error(err);
    })
    .finally(() => {  
      setIsLoadingWebinar(false);
    });
  }

  React.useEffect(() => {
    webinarRequest();
    return (() => {
      setWebinars([]);
      setFilteredWebinars([]);
      setSearchedWebinars([]);
      setCurrentWebinar({});
    })
    // eslint-disable-next-line
  }, []);

  return (
    <div className='webinar'>

    { 
      isLoadingWebinar
      ?
      <Preloader />
      :
      <>
      <SemesterHeader onLogout={onLogout}>
        <SemesterHeaderBtnBack onBack={() => {}} isPerformFunction={false} />
      </SemesterHeader>

      <Section title='Вебинары' heightType='page' headerType='small'>

        {
        windowWidth <= 833
        ?
        <>
        <div className='section__header'>
          <div className='section__header-item'>
            <span className='section__header-caption section__header-caption_margin_bottom'>Поиск по названию:</span>
            <Search type='large' id='webinar' data={webinars} onSearch={handleSearch} />
          </div>
        </div>
        <div className='section__header'>
          <div className='section__header-item'>
            <span className='section__header-caption'>Период:</span>
            <PopupSelect options={semesterOptions} currentOption={currentSemesterOption} onChooseOption={filterBySemester} />
          </div>
          <div className='section__header-item'>
            <span className='section__header-caption'>Статус:</span>
            <PopupSelect options={statusOptions} currentOption={currentStatusOption} onChooseOption={filterByStatus} />
          </div>
        </div>
        </>
        :
        <>
        <div className='section__header'>
          <div className='section__header-item'>
            <span className='section__header-caption'>Период:</span>
            <PopupSelect options={semesterOptions} currentOption={currentSemesterOption} onChooseOption={filterBySemester} />
          </div>
          <div className='section__header-item'>
            <span className='section__header-caption'>Статус:</span>
            <PopupSelect options={statusOptions} currentOption={currentStatusOption} onChooseOption={filterByStatus} />
          </div>
          <div className='section__header-item'>
            <span className='section__header-caption section__header-caption_margin_bottom'>Поиск по названию:</span>
            <Search type='medium' id='webinar' data={webinars} onSearch={handleSearch} />
          </div>
        </div>
        </>
        }


        <Table>
          <div className='table__header'>
            <div className='table__main-column table__main-column_type_empty'>
              <div className='table__column table__column_type_header table__column_type_count'>
                <p className='table__text table__text_type_header'>№</p>
              </div>
              <div className='table__column table__column_type_header table__column_type_date'>
                <p className='table__text table__text_type_header'>Дата</p>
              </div>
              <div className='table__column table__column_type_header table__column_type_name'>
                <p className='table__text table__text_type_header'>Наименование</p>
              </div>
              <div className='table__column table__column_type_header table__column_type_teacher'>
                <p className='table__text table__text_type_header'>Спикеры</p>
              </div>
              <div className='table__column table__column_type_header table__column_type_status'>
                <p className='table__text table__text_type_header'>Статус</p>
              </div>
            </div>
          </div>
          {
            filteredWebinars.length < 1 
            ?
            <p className='table__caption_type_empty'>По заданным параметрам вебинаров не найдено.</p>
            :
            <ul className='table__main scroll'>
              {
                [...filteredWebinars].reverse().map((item, i) => (
                  <li className='table__row' key={i}>
                    <div className='table__main-column'>
                      <div className='table__column table__column_type_count'>
                        <p className='table__text'>{i + 1}</p>
                      </div>
                      <div className='table__column table__column_type_date'>
                        <p className='table__text'>{item.date}</p>
                        <p className='table__text'>{item.time}</p>
                      </div>
                      <div className='table__column table__column_type_name' onClick={() => openViewWebinarPopup(item)}>
                        <p className='table__text table__text_type_active table__text_type_header'>{item.name}</p>
                      </div>
                      <div className='table__column table__column_type_teacher'>
                        <p className='table__text'>{item.speakers.join(', ')}</p>
                      </div>
                      <div className='table__column table__column_type_status'>
                        {renderStatus(item.status)}
                      </div>
                    </div>
                  </li>
                ))
              }
            </ul>
          }
        </Table>

      </Section>
      </>
      }

      {
        isOpenViewWebinarPopup &&
        <ViewWebinarPopup
          isOpen={isOpenViewWebinarPopup}
          onClose={closePopup}
          currentWebinarId={currentWebinar.id}
        />
      }
    </div>
  );
}

export default Webinar;