import React from 'react';
import './DisciplineUserInfo.css';
import DisciplineInfo from '../../DisciplineInfo/DisciplineInfo.js';
import EducationAdvertisement from '../../EducationAdvertisement/EducationAdvertisement.js';
import Table from '../../../Table/Table.js';
import StudentViewAdvertisementPopup from '../../EducationPopup/StudentViewAdvertisementPopup/StudentViewAdvertisementPopup.js';

function DisciplineUserInfo({ windowWidth, disciplineInfo }) {

  const containerHeightRef = React.createRef();
  const tableHeaderHeightRef = React.createRef();

  const [tableHeight, setTableHeight] = React.useState(0);
  const [advertisementHeight, setAdvertisementHeight] = React.useState(0);

  const [currentAdvertisement, setCurrentAdvertisement] = React.useState({});

  const [isOpenViewAdvertisementPopup, setIsOpenViewAdvertisementPopup] = React.useState(false);

  React.useEffect(() => {
    if (windowWidth >= 833) {
      setTableHeight(containerHeightRef.current.clientHeight - tableHeaderHeightRef.current.clientHeight);
      setAdvertisementHeight(containerHeightRef.current.clientHeight);
    }
  }, [windowWidth, containerHeightRef, tableHeaderHeightRef]);

  const tableStyle = {
    height: tableHeight,
  };

  const advertisementStyle = {
    height: advertisementHeight + 20, //margin top
  };

  function openViewAdvertisementPopup(data) {
    setCurrentAdvertisement(data);
    setIsOpenViewAdvertisementPopup(true);
  }

  function closePopup() {
    setIsOpenViewAdvertisementPopup(false);
  }

  React.useEffect(() => {
    return(() => {
      setCurrentAdvertisement({});
    })
  }, []);

  return (
    <DisciplineInfo>
      <div className='discipline-info__teacher'>
        <div className='discipline-info__teacher-container'>
          {
            disciplineInfo.tutor.pict_url 
            ?
            <img className='discipline-info__teacher-img' src={disciplineInfo.tutor.pict_url} alt=''></img>
            :
            <div className='discipline-info__teacher-img'></div>
          }
          <div className='discipline-info__teacher-info'>
            <h3 className='discipline-info__teacher-name'>{disciplineInfo.tutor.fullname}</h3>
            <ul className='discipline-info__teacher-info-list'>
              <li className='discipline-info__teacher-info-item'>
                <p className='discipline-info__teacher-text'>
                  <span className='discipline-info__teacher-text_weight_bold'>Дожность: </span>
                  {disciplineInfo.tutor.job}
                </p>
              </li>
              <li className='discipline-info__teacher-info-item'>
                <p className='discipline-info__teacher-text'>
                  <span className='discipline-info__teacher-text_weight_bold'>Телефон: </span>
                  {disciplineInfo.tutor.phone}
                </p>
              </li>
              <li className='discipline-info__teacher-info-item'>
                <p className='discipline-info__teacher-text'>
                  <span className='discipline-info__teacher-text_weight_bold'>Почта: </span>
                  {disciplineInfo.tutor.email}
                </p>
              </li>
            </ul>
          </div>
        </div> 
      </div>

      <div className='discipline-info__section'>
        <div className='discipline-info__materials'>
          <div className='discipline-info__section-header'>
            <h4 className='discipline-info__section-title'>Дополнительные материалы</h4>
          </div>
          <div className='discipline-info__materials-table'>
            <Table>
              <div ref={containerHeightRef} className='table__container'>
                <div ref={tableHeaderHeightRef} className='table__header'>
                  <div className='table__main-column'>
                    <div className='table__column table__column_type_header table__column_type_count'>
                      <p className='table__text table__text_type_header'>№</p>
                    </div>
                    <div className="table__column table__column_type_header table__column_type_date">
                      <p className="table__text table__text_type_header">Дата</p>
                    </div>
                    <div className='table__column table__column_type_header table__column_type_name'>
                      <p className='table__text table__text_type_header'>Наименование</p>
                    </div>
                  </div>
                  <div className='table__column table__column_type_header table__column_type_btn table__column_type_btn-header'>
                    <div className='btn btn_type_download btn_type_download_status_active'></div>
                  </div>
                </div>
                <ul style={Object.assign({}, tableStyle)} className='table__main scroll'>
                  {
                    disciplineInfo.materials.length < 1 
                    ?
                    <p className='table__caption_type_empty'>Дополнительные материалы пока не загружены.</p>
                    :
                    disciplineInfo.materials.map((item, i) => (
                      <li className='table__row' key={i}>
                        <div className='table__main-column'>
                          <div className='table__column table__column_type_count'>
                            <p className='table__text'>{i + 1}</p>
                          </div>
                          <div className="table__column table__column_type_date">
                            <p className="table__text">{item.date}</p>
                          </div>
                          <div className='table__column table__column_type_name'>
                            <p className='table__text'>{item.title}</p>
                          </div>
                        </div>
                        <div className='table__column table__column_type_btn'>
                          <a className='btn btn_type_download btn_type_download_status_active' href={item.link} target='_blank' rel='noreferrer'> </a>
                        </div>
                      </li>
                    ))
                  }
                </ul>
              </div>
            </Table>
          </div>
        </div>

        <div className='discipline-info__advertisement'>
          <div className='discipline-info__section-header'>
            <h4 className='discipline-info__section-title'>Объявления</h4>
          </div>
          <ul style={Object.assign({}, advertisementStyle)} className='discipline-info__advertisement-list scroll'>
            {
              disciplineInfo.announces.length < 1 
              ?
              <p className='table__caption_type_empty'>Объявления отстутствуют.</p>
              :
              disciplineInfo.announces.reverse().map((elem, i) => (
                <EducationAdvertisement onOpen={openViewAdvertisementPopup} advertisement={elem} key={i} />
              ))
            }
          </ul>
        </div>
      </div>

      {
        isOpenViewAdvertisementPopup &&
        <StudentViewAdvertisementPopup 
          isOpen={isOpenViewAdvertisementPopup}
          onClose={closePopup}
          currentAdvertisement={currentAdvertisement}
        />
      }
  
    </DisciplineInfo>
  );
}

export default DisciplineUserInfo; 