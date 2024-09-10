import React from 'react';
import '../../Webinar/Webinar.css';
import * as curatorApi from '../../../utils/curatorApi.js';
import Preloader from '../../Preloader/Preloader.js';
import Table from '../../Table/Table.js';
import TableCard from '../../Table/TableCard/TableCard.js';
import ViewWebinarPopup from '../../Webinar/WebinarPopup/ViewWebinarPopup/ViewWebinarPopup.js';

function CuratorWebinar({ windowWidth, groupInfo }) {

  const containerHeightRef = React.createRef();
  const tableHeaderHeightRef = React.createRef();

  const [tableHeight, setTableHeight] = React.useState(0);

  const [webinars, setWebinars] = React.useState([]);
  const [currentWebinar, setCurrentWebinar] = React.useState({});

  const [isOpenViewWebinarPopup, setIsOpenViewWebinarPopup] = React.useState(false);

  const [isLoadingData, setIsLoadingData] = React.useState(true);

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

  function openViewWebinarPopup(item) {
    setCurrentWebinar(item);
    setIsOpenViewWebinarPopup(true);
  }

  function closePopup() {
    setIsOpenViewWebinarPopup(false);
  }

  function webinarRequest() {
    setIsLoadingData(true);
    const token = localStorage.getItem('token');
    curatorApi.getGroupWebinar({ token: token, groupId: groupInfo.id })
    .then((res) => {
      //console.log('Webinars', res);
      const ActiveWebinars = res.filter(elem => elem.status === 'active');
      const PlannedWebinars = res.filter(elem => elem.status === 'planned');
      const CompletedWebinars = res.filter(elem => elem.status === 'completed').reverse();
      setWebinars([...ActiveWebinars, ...PlannedWebinars, ...CompletedWebinars]);
    })
    .catch((err) => {
      console.error(err);
    })
    .finally(() => {  
      setIsLoadingData(false);
    });
  }

  React.useEffect(() => {
    webinarRequest();
    return (() => {
      setWebinars([]);
      setCurrentWebinar({});
    })
    // eslint-disable-next-line
  }, []);

  React.useEffect(() => {
    if ((windowWidth >= 833) && (!isLoadingData)) {
      setTableHeight(containerHeightRef.current.clientHeight - tableHeaderHeightRef.current.clientHeight);
    }
  }, [isLoadingData, windowWidth, containerHeightRef, tableHeaderHeightRef]);

  const tableStyle = {
    height: tableHeight,
  };

  return (
    <>
    { 
      isLoadingData
      ?
      <Preloader />
      :
      <>

        {
        windowWidth <= 833
        ?
        <TableCard>
          {
            webinars.length < 1 
            ?
            <p className='table__caption_type_empty'>По заданным параметрам вебинаров не найдено.</p>
            :
            <>
            {
              webinars.map((item, i) => (
                <li className='table-card__item' key={i}>
                  {renderStatus(item.status)}
                  
                  <p className='table-card__text table-card__text_weight_bold table-card__text_type_active table-card__title' 
                    onClick={() => openViewWebinarPopup(item)}>
                    {item.name}
                  </p>

                  <p className='table-card__text table-card__subtitle'>{item.speakers.join(', ')}</p>

                  <div className='table-card__info'>
                    <ul className='table-card__info-list'>
                      <li className='table-card__info-item'>
                        <p className='data__text'><span className='data__text_font_bold'>Дата:</span>{item.date || ''}</p>
                      </li>
                      <li className='table-card__info-item'>
                        <p className='data__text'><span className='data__text_font_bold'>Время:</span>{item.time || ''}</p>
                      </li>
                    </ul>
                  </div>
                  <div className='table-card__info'>
                    <ul className='table-card__info-list'>
                      <li className='table-card__info-item'>
                        {
                          item.groups.length > 0
                          ?
                            <p className='data__text'><span className='data__text_font_bold'>Группа:</span>{item.groups.map((elem) => elem.name).join(', ')}</p>
                          :
                            <p className='data__text'><span className='data__text_font_bold'>Группа:</span> </p>
                        }
                        
                      </li>
                    </ul>
                  </div>
                </li>
              ))
            }
            </>
          }
        </TableCard>
        :
        <Table>
          <div ref={containerHeightRef} className='table__container'>
            <div ref={tableHeaderHeightRef} className='table__header'>
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
                <div className='table__column table__column_type_header table__column_type_large'>
                  <p className='table__text table__text_type_header'>Группа</p>
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
              webinars.length < 1 
              ?
              <p className='table__caption_type_empty'>По заданным параметрам вебинаров не найдено.</p>
              :
              <ul style={Object.assign({}, tableStyle)} className='table__main scroll'>
                {
                  webinars.map((item, i) => (
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
                        <div className='table__column table__column_type_large'>
                          {
                            item.groups.length > 0
                            ?
                              <p className='table__text'>{item.groups.length > 2 ? item.groups[0].name + ' (и еще ' + (item.groups.length - 1) + ')' : item.groups.map((elem) => elem.name).join(', ')}</p>
                            :
                              <p className='table__text'> </p>
                          } 
                        </div>
                        <div className='table__column table__column_type_teacher'>
                          {
                            item.speakers.length > 0
                            ?
                              <p className='table__text'>{item.speakers.join(', ')}</p>
                            :
                              <p className='table__text'> </p>
                          } 
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
          </div>
        </Table>
        }

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
    </>
  );
}

export default CuratorWebinar;
