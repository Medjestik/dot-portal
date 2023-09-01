import React from 'react';
import Popup from '../../../Popup/Popup.js';
import * as curatorApi from '../../../../utils/curatorApi.js';
import TableHorizontal from '../../../Table/TableHorizontal/TableHorizontal.js';
import PreloaderPopup from '../../../Preloader/PreloaderPopup/PreloaderPopup.js';
import PopupSelect from '../../../Popup/PopupSelect/PopupSelect.js';

function ViewSemesterDetailPopup({ isOpen, onClose, semesterOptions, currentSemesterId }) {

  const [isLoadingInfo, setIsLoadingInfo] = React.useState(true);
  const [semesterOptionsPopup, setSemesterOptionsPopup] = React.useState(semesterOptions);
  const [currentSemesterOption, setCurrentSemesterOption] = React.useState(semesterOptions[0]);

  const [currentData, setCurrentData] = React.useState({});

  const tableWidthRef = React.createRef();

  const [tableWidth, setTableWidth] = React.useState(0);

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
    curatorApi.getSemesterDetail({ token: token, semesterId: currentSemesterId })
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

  const tableStyle = {
    width: tableWidth,
  };

  React.useEffect(() => {
    if (!isLoadingInfo) {
      setTableWidth(tableWidthRef.current.scrollWidth);
    }
  }, [isLoadingInfo, tableWidthRef]); 

  React.useEffect(() => {
    setIsLoadingInfo(false);
    getSemesterDetail();

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

        <TableHorizontal>
          <div className='table-horizontal__header' style={Object.assign({}, tableStyle)}>
            <div className='table-horizontal__main-row' ref={tableWidthRef}>
              <div className='table-horizontal__column table-horizontal__column_type_header table-horizontal__column_type_name table-horizontal__column_type_main'>
                <p className='table-horizontal__text table-horizontal__text_weight_bold'>ФИО</p>
              </div>
              {
                currentData.activities.map((elem, i) => (
                  <div key={i} className='table-horizontal__column table-horizontal__column_type_header table-horizontal__column_type_text'>
                    <p className='table-horizontal__text table-horizontal__text_weight_bold'>{elem.name}({elem.control})</p>
                    <p className='table-horizontal__text'>{elem.lector}</p>
                  </div>
                ))
              }
            </div>
          </div>

          <ul className='table-horizontal__main' style={Object.assign({}, tableStyle)}>
            {
              currentData.students.map((item, i) => (
                <li className='table-horizontal__row' key={i}>
                  <div className='table-horizontal__main-row'>
                    <div className='table-horizontal__column table-horizontal__column_type_name'>
                      <p className='table-horizontal__text table-horizontal__text_weight_bold'>{item.fullname}</p>
                    </div>
                    {
                      currentData.activities.map((elem, i) => (
                        <div className='table-horizontal__column table-horizontal__column_type_text' key={i}>
                          <p className='table-horizontal__text'>1</p>
                        </div>
                      ))
                    }
                  </div>
                </li>
              ))
            }
          </ul>

        </TableHorizontal>
      </>
      }
    </Popup>
  )
}

export default ViewSemesterDetailPopup;