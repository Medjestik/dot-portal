import React from 'react';
import './DisciplineUserInfo.css';
import DisciplineInfo from '../../DisciplineInfo/DisciplineInfo.js';
import Table from '../../../Table/Table.js';
import TableList from '../../../Table/TableList/TableList.js';
import StudentViewAdvertisementPopup from '../../EducationPopup/StudentViewAdvertisementPopup/StudentViewAdvertisementPopup.js';
import StudentViewCommentPopup from '../../EducationPopup/StudentViewCommentPopup/StudentViewCommentPopup.js';
import EducationAdvertisement from '../../EducationAdvertisement/EducationAdvertisement.js';

function DisciplineUserInfo({ windowWidth, disciplineInfo }) {

  const containerHeightRef = React.createRef();
  const tableHeaderHeightRef = React.createRef();

  const [tableHeight, setTableHeight] = React.useState(0);
  const [advertisementHeight, setAdvertisementHeight] = React.useState(0);

  const [currentData, setCurrentData] = React.useState({});

  const [isOpenViewAdvertisementPopup, setIsOpenViewAdvertisementPopup] = React.useState(false);
  const [isOpenViewCommentPopup, setIsOpenViewCommentPopup] = React.useState(false);

  React.useEffect(() => {
    if (windowWidth > 950) {
      setTableHeight(containerHeightRef.current.clientHeight - tableHeaderHeightRef.current.clientHeight);
      setAdvertisementHeight(containerHeightRef.current.clientHeight);
    }
  }, [windowWidth, containerHeightRef, tableHeaderHeightRef]);

  const tableStyle = {
    height: tableHeight,
  };

  const advertisementStyle = {
    height: advertisementHeight,
  };

  function openPopup(data) {
    setCurrentData(data);
    if (data.type === 'advertisement') {
      setIsOpenViewAdvertisementPopup(true);
    } else {
      setIsOpenViewCommentPopup(true);
    }
  }

  function closePopup() {
    setIsOpenViewAdvertisementPopup(false);
    setIsOpenViewCommentPopup(false);
  }

  React.useEffect(() => {
    return(() => {
      setCurrentData({});
    })
  }, []);

  return (
    <>
    <DisciplineInfo type='user'>

      <div className='discipline-info__column'>

        <div className='discipline-info__description'>
            <h3 className='discipline-info__teacher-name'>{disciplineInfo.name}</h3>
            <ul className='data__list data__list_margin_top'>
              <li className='data__item'>
                <p className='data__text'>
                  <span className='data__text data__text_font_bold'>Период: </span>
                  {disciplineInfo.start_data + ' - ' + disciplineInfo.end_date}
                </p>
              </li>
              <li className='data__item'>
                <p className='data__text'>
                  <span className='data__text data__text_font_bold'>Тип: </span>
                  {disciplineInfo.control}
                </p>
              </li>
              <li className='data__item'>
                <p className='data__text'>
                  <span className='data__text data__text_font_bold'>Оценка: </span>
                  {disciplineInfo.mark.name}
                </p>
              </li>
            </ul>
        </div>

        <div className='discipline-info__section discipline-info__materials'>

          {
            windowWidth > 950 ?
            <>
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
                        disciplineInfo.additional_files.length < 1 
                        ?
                        <p className='table__caption_type_empty'>Дополнительные материалы пока не загружены.</p>
                        :
                        [...disciplineInfo.additional_files].reverse().map((item, i) => (
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
            </>
            :
            <>
            {
              disciplineInfo.additional_files.length > 0 ?
              <>
                <h5 className='table__title'>Дополнительные материалы:</h5>
                <TableList>
                  {
                    [...disciplineInfo.additional_files].reverse().map((item, i) => (
                      <li className='table-list__item' key={i}>
                        <span className='table-list__count'>{i + 1}.</span>
                        <div className='table-list__info'>
                          <h6 className='table-list__info-title'>{item.title || ''}</h6>
                          <ul className='table-list__info-list'>
                            <li className='table-list__info-item'>
                              <p className='table-list__info-text'><span className='table-list__info-text_font_bold'>Дата загрузки:</span>{item.date || ''}</p>
                            </li>
                          </ul>
                        </div>
                        <a className='btn_type_link' href={item.link} target='_blank' rel="noreferrer">
                          <div className='btn btn_type_download btn_type_download_status_active discipline-list__btn'></div>
                        </a>
                      </li>
                    ))
                  }
                </TableList>
              </>
              :
              <p className='table__caption_type_empty'>Дополнительные материалы пока не загружены.</p>
            }
            </>
          }
        </div>

      </div>

      {
        windowWidth > 950 && 
      <div className='discipline-info__column'>

        <div className='discipline-info__section'>
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
                <ul className='data__list data__list_margin_top'>
                  <li className='data__item'>
                    <p className='data__text'>
                      <span className='data__text data__text_font_bold'>Дожность: </span>
                      {disciplineInfo.tutor.job}
                    </p>
                  </li>
                  <li className='data__item'>
                    <p className='data__text'>
                      <span className='data__text data__text_font_bold'>Телефон: </span>
                      {disciplineInfo.tutor.phone}
                    </p>
                  </li>
                  <li className='data__item'>
                    <p className='data__text'>
                      <span className='data__text data__text_font_bold'>Почта: </span>
                      {disciplineInfo.tutor.email}
                    </p>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      
        <div className='discipline-info__section discipline-info__advertisement'>
          <div className='discipline-info__section-header'>
            <h4 className='discipline-info__section-title'>Объявления и комментарии</h4>
          </div>
          <ul style={Object.assign({}, advertisementStyle)} className='discipline-info__advertisement-list scroll'>
            {
              disciplineInfo.announces.length < 1 
              ?
              <p className='table__caption_type_empty'>Объявления отстутствуют.</p>
              :
              [...disciplineInfo.announces.map((elem) => ({...elem, title: elem.text, type: 'advertisement'})), ...disciplineInfo.comments.map((elem) => ({...elem, title: elem.text, author: elem.author_fullname, type: 'comment'}))].sort((a,b) => b.seconds - a.seconds).map((elem, i) => (
                <EducationAdvertisement advertisement={elem} key={i} onOpen={() => openPopup(elem)} />
              ))
            }
          </ul>
        </div>
      </div>
      }

    </DisciplineInfo>
    {
      isOpenViewAdvertisementPopup &&
      <StudentViewAdvertisementPopup 
        isOpen={isOpenViewAdvertisementPopup}
        onClose={closePopup}
        currentAdvertisement={currentData}
        isLoading={false}
      />
    }

    {
      isOpenViewCommentPopup &&
      <StudentViewCommentPopup
        isOpen={isOpenViewCommentPopup}
        onClose={closePopup}
        currentAdvertisement={currentData}
        isLoading={false}
      />
    }
    </>
  );
}

export default DisciplineUserInfo; 