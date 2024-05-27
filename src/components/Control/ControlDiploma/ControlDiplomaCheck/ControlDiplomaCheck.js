import React from 'react';
import './ControlDiplomaCheck.css';
import * as adminApi from '../../../../utils/admin.js';
import Preloader from '../../../Preloader/Preloader';
import Section from '../../../Section/Section';
import PopupSelect from '../../../Popup/PopupSelect/PopupSelect';
import Search from '../../../Search/Search';
import Table from '../../../Table/Table.js';
import { getYears } from '../../../../shared/getYears';
import AdminCheckDiplomaPopup from '../../../Admin/AdminPopup/AdminCheckDiplomaPopup/AdminCheckDiplomaPopup.js';

function ControlDiplomaCheck({ windowWidth, onLogout }) {

  const containerHeightRef = React.createRef();
  const tableHeaderHeightRef = React.createRef();
  const [tableHeight, setTableHeight] = React.useState(0);

  const [isLoadingData, setIsLoadingData] = React.useState(true);
  const [works, setWorks] = React.useState([]);
  const [searchedWorks, setSearchedWorks] = React.useState([]);

  const [isOpenDiplomaCheckPopup, setIsOpenDiplomaCheckPopup] = React.useState(false);
  const [currentStudent, setCurrentStudent] = React.useState({});

  const yearsArr = getYears(2020);
  const yearsOptions = yearsArr.map((elem, i ) =>  ({ name: elem, id: i + 1 }));
  const [currentYearOption, setCurrentYearOption] = React.useState(yearsOptions[0]);

  const [isLoadingRequest, setIsLoadingRequest] = React.useState(false);
  const [isShowRequestError, setIsShowRequestError] = React.useState({ isShow: false, text: '', });

  function handleSetYear(option) {
    setCurrentYearOption(option);
    dataRequest(option.name);
  }

  function handleSearch(data) {
    setSearchedWorks(data);
  }

  function handleChangeDiplomaCheck(data) {
    setIsShowRequestError({ isShow: false, text: '' });
    setIsLoadingRequest(true);
    const token = localStorage.getItem('token');
    adminApi.checkDiplomaReports({ token: token, workId: currentStudent.vkr_id, data: data })
    .then((res) => {
      const updatedWorks = works.map((elem) => {
        if (elem.file === currentStudent.file) {
          return { ...elem, report_link: res.report_link, percent: res.percent, pass: res.pass };
        }
        return elem;
      });
      const updatedSearchedWorks = searchedWorks.map((elem) => {
        if (elem.file === currentStudent.file) {
          return { ...elem, report_link: res.report_link, percent: res.percent, pass: res.pass };
        }
        return elem;
      });
      setWorks(updatedWorks);
      setSearchedWorks(updatedSearchedWorks);
      closePopup();
    })
    .catch((err) => {
      setIsShowRequestError({ isShow: true, text: 'К сожалению, произошла ошибка!' });
      console.error(err);
    })
    .finally(() => {  
      setIsLoadingRequest(false);
    })
  }

  function openDiplomaCheckPopup(item) {
    setCurrentStudent(item);
    setIsOpenDiplomaCheckPopup(true);
  }

  function closePopup() {
    setIsOpenDiplomaCheckPopup(false);
    setIsShowRequestError({ isShow: false, text: '' });
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

  function renderBestAttempt(item) {
    if (item.percent > 0) {
      return (
        item.pass
        ?
        <>
          <div className='table__column table__column_type_large'>
            <a className='table__text table__text_type_active' href={item.report_link} target='_blanc' rel='noreferrer'>{item.percent}% (отчет)</a>
          </div>
          <div className='table__column table__column_type_large'> 
            <div className='status'>
              <span className='status__icon status__icon_type_planned'></span>
              <p className='table__text'>Пройден</p>
            </div>
          </div>
        </>
        :
        <>
          <div className='table__column table__column_type_large'>
            <a className='table__text table__text_type_active' href={item.report_link} target='_blanc' rel='noreferrer'>{item.percent}% (отчет)</a>
          </div>
          <div className='table__column table__column_type_large'>
            <div className='status'>
              <span className='status__icon status__icon_type_canceled'></span>
              <p className='table__text'>Не пройден</p>
            </div>
          </div>
        </>
      )
    } else {
      return (
        <>
          <div className='table__column table__column_type_large'>
            <p className='table__text table__text_type_empty'>0%</p>
          </div>
          <div className='table__column table__column_type_large'>
            <div className='status'>
              <span className='status__icon status__icon_type_completed'></span>
              <p className='table__text'>Не проверен</p>
            </div>
          </div>
        </>
      )
    } 
  }

  function dataRequest(year) {
    setIsLoadingData(true);
    const token = localStorage.getItem('token');
    adminApi.getDiplomaReports({ token: token, year: year })
    .then((res) => {
      console.log('DiplomaReports', res);
      setWorks(res);
      setSearchedWorks(res);
    })
    .catch((err) => {
      console.error(err);
    })
    .finally(() => {  
      setIsLoadingData(false);
    })
  }

  React.useEffect(() => {
    dataRequest(currentYearOption.name);
  return (() => {
    setWorks([]);
  })
    // eslint-disable-next-line
  }, []);

  React.useEffect(() => {
    if ((windowWidth >= 833) && (!isLoadingData)) {
      setTableHeight(containerHeightRef.current.clientHeight - tableHeaderHeightRef.current.clientHeight);
    }
  }, [windowWidth, isLoadingData, containerHeightRef, tableHeaderHeightRef]);

  const tableStyle = {
    height: tableHeight,
  };

  return (
    <Section title='Проверка на антиплагиат' heightType='page' headerType='large'>
      <div className='section__header'>
        <div className='section__header-item'>
          <span className='section__header-caption'>Выберите год:</span>
          <PopupSelect options={yearsOptions} currentOption={currentYearOption} onChooseOption={handleSetYear} />
        </div>
        <div className='section__header-item'>
          <span className='section__header-caption section__header-caption_margin_bottom'>Поиск по студенту:</span>
          <Search type='large' id='diploma-reports' data={works} onSearch={handleSearch} />
        </div>
      </div>
      { 
        isLoadingData
        ?
        <Preloader />
        :
        <Table>
          <div ref={containerHeightRef} className='table__container'>
            <div ref={tableHeaderHeightRef} className='table__header'>
              <div className='table__main-column'>
                <div className='table__column table__column_type_header table__column_type_count'>
                  <p className='table__text table__text_type_header'>№</p>
                </div>
                <div className='table__column table__column_type_header table__column_type_name'>
                  <p className='table__text table__text_type_header'>ФИО студента</p>
                </div>
                <div className='table__column table__column_type_header table__column_type_full'>
                  <p className='table__text table__text_type_header'>Группа</p>
                </div>
                <div className='table__column table__column_type_header table__column_type_large'>
                  <p className='table__text table__text_type_header'>Оригинальность</p>
                </div>
                <div className='table__column table__column_type_header table__column_type_large'>
                  <p className='table__text table__text_type_header'>Статус</p>
                </div>
              </div>
              <div className='table__column table__column_type_header table__column_type_btn table__column_type_btn-header'>
                <div className='btn-icon'></div>
                <div className='btn-icon btn-icon_margin_left'></div>
              </div>
            </div>
    
            {
              searchedWorks.length > 0 
              ?
              <ul style={Object.assign({}, tableStyle)} className='table__main scroll'>
              {
                searchedWorks.map((item, i) => (
                  <li className='table__row' key={i}>
                    <div className='table__main-column'>
                      <div className='table__column table__column_type_count'>
                        <p className='table__text'>{i + 1}</p>
                      </div>
                      <div className='table__column table__column_type_name'>
                        <p className='table__text table__text_type_header'>{item.name}</p>
                      </div>
                      <div className='table__column table__column_type_full'>
                        <p className='table__text'>{item.group}</p>
                      </div>
                      {
                        renderBestAttempt(item)
                      }
                    </div>
                    <div className='table__column table__column_type_btn'>
                      <button className='btn-icon btn-icon_color_accent-blue btn-icon_type_edit' type='button' onClick={() => openDiplomaCheckPopup(item)}></button>
                      <a 
                        className='btn-icon btn-icon_margin_left btn-icon_color_accent-blue btn-icon_type_download'
                        href={item.load_url} target='_blanc' rel='noreferrer'
                      >
                      </a> 
                    </div>
                  </li>
                ))
              }
              </ul>
              :
              <div className='table__caption_type_empty'>По заданным параметрам ничего не найдено!</div>
            }
          </div>
        </Table>
      }
      {
        isOpenDiplomaCheckPopup &&
        <AdminCheckDiplomaPopup 
          isOpen={isOpenDiplomaCheckPopup}
          onClose={closePopup}
          currentStudent={currentStudent}
          onSubmit={handleChangeDiplomaCheck}
          isLoadingRequest={isLoadingRequest}
          isShowRequestError={isShowRequestError}
        />
      }
    </Section>
  );
}

export default ControlDiplomaCheck;
