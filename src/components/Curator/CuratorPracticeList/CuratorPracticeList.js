import React from 'react';
import './CuratorPracticeList.css';
import * as curatorApi from '../../../utils/curatorApi.js';
import Preloader from '../../Preloader/Preloader.js';
import Table from '../../Table/Table.js';

function CuratorPracticeList({ windowWidth, groupInfo, openPractice }) {

  const [practiceList, setPracticeList] = React.useState([]);

  const containerHeightRef = React.createRef();
  const tableHeaderHeightRef = React.createRef();

  const [tableHeight, setTableHeight] = React.useState(0);

  const [isLoadingData, setIsLoadingData] = React.useState(true);

  React.useEffect(() => {
    if ((windowWidth >= 833) && (!isLoadingData)) {
      setTableHeight(containerHeightRef.current.clientHeight - tableHeaderHeightRef.current.clientHeight);
    }
  }, [isLoadingData, windowWidth, containerHeightRef, tableHeaderHeightRef]);

  const tableStyle = {
    height: tableHeight,
  };

  function dataRequest() {
    setIsLoadingData(true);
    const token = localStorage.getItem('token');
    curatorApi.getGroupPractice({ token: token, groupId: groupInfo.id })
    .then((res) => {
      console.log('GroupPracticeList', res);
      setPracticeList(res);
    })
    .catch((err) => {
      console.error(err);
    })
    .finally(() => {  
      setIsLoadingData(false);
    });
  }

  React.useEffect(() => {
    dataRequest();
    return (() => {
        setPracticeList([]);
    })
    // eslint-disable-next-line
  }, []);

  return (
    isLoadingData
    ?
    <Preloader />
    :
    <>
    <Table>
      <div ref={containerHeightRef} className='table__container'>
        <div ref={tableHeaderHeightRef} className='table__header'>
          <div className='table__main-column table__main-column_type_empty'>
            <div className='table__column table__column_type_header table__column_type_count'>
              <p className='table__text table__text_type_header'>№</p>
            </div>
            <div className='table__column table__column_type_header table__column_type_date'>
              <p className='table__text table__text_type_header'>Период</p>
            </div>
            <div className='table__column table__column_type_header table__column_type_full'>
              <p className='table__text table__text_type_header'>Наименование</p>
            </div>
            <div className='table__column table__column_type_header table__column_type_small'>
              <p className='table__text table__text_type_header'>Тип</p>
            </div>
            <div className='table__column table__column_type_header table__column_type_small'>
              <p className='table__text table__text_type_header'>Семестр</p>
            </div>
          </div>
        </div>

        {
          practiceList.length > 0 
          ?
          <ul style={Object.assign({}, tableStyle)} className='table__main scroll'>
          {
            practiceList.map((item, i) => (
              <li className='table__row' key={i}>
                <div className='table__main-column'>
                  <div className='table__column table__column_type_count'>
                    <p className='table__text'>{i + 1}</p>
                  </div>
                  <div className='table__column table__column_type_date'>
                    <p className='table__text'>{item.start_date} - {item.end_date}</p>
                  </div>
                  <div className='table__column table__column_type_full'>
                    <p 
                    className='table__text table__text_type_header table__text_type_active'
                    onClick={() => openPractice(item.id)}
                    >
                      {item.name}
                    </p>
                  </div>
                  <div className='table__column table__column_type_small'>
                    <p className='table__text'>ЗаО</p>
                  </div>
                  <div className='table__column table__column_type_small'>
                    <p className='table__text'>{item.semestr}</p>
                  </div>
                </div>
              </li>
            ))
          }
          </ul>
          :
          <div className='table__caption_type_empty'>Практика пока не открыта!</div>
        }
      </div>
    </Table>
    </>
  );
}

export default CuratorPracticeList;  