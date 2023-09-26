import React from 'react';
import Table from '../../Table/Table.js';
import * as curatorApi from '../../../utils/curatorApi.js';
import Preloader from '../../Preloader/Preloader.js';
import CuratorViewStudentPopup from '../CuratorPopup/CuratorViewStudentPopup.js';

function CuratorGroupList({ windowWidth, groupInfo }) {

  const containerHeightRef = React.createRef();
  const tableHeaderHeightRef = React.createRef();

  const [tableHeight, setTableHeight] = React.useState(0);

  const tableStyle = {
    height: tableHeight,
  };

  const [isLoadingList, setIsLoadingList] = React.useState(true); 

  const [groupList, setGroupList] = React.useState([]);
  const [currentStudent, setCurrentStudent] = React.useState({});

  const [isOpenViewStudentPopup, setIsOpenViewStudentPopup] = React.useState(false);

  function groupListRequest() {
    setIsLoadingList(true);
    const token = localStorage.getItem('token');
    curatorApi.getGroupList({ token: token, groupId: groupInfo.id }) 
    .then((res) => {
      console.log('GroupList', res);
      setGroupList(res);
    })
    .catch((err) => {
      console.error(err);
    })
    .finally(() => {  
      setIsLoadingList(false);
    });
  }

  function openViewStudentPopup(student) {
    setCurrentStudent(student);
    setIsOpenViewStudentPopup(true);
  }

  function closePopup() {
    setIsOpenViewStudentPopup(false);
  }

  React.useEffect(() => {
    if (windowWidth >= 833 || !isLoadingList) {
      setTableHeight(containerHeightRef.current.clientHeight - tableHeaderHeightRef.current.clientHeight);
    }
  }, [windowWidth, isLoadingList, containerHeightRef, tableHeaderHeightRef]);
  
  React.useEffect(() => {
    groupListRequest();
    return (() => {
      setGroupList([]);
      setCurrentStudent({})
    })
    // eslint-disable-next-line
  }, []);

  return (
    <>
    <Table>
      <div ref={containerHeightRef} className='table__container'>
        <div ref={tableHeaderHeightRef} className='table__header'>
          <div className='table__main-column table__main-column_type_empty'>
            <div className='table__column table__column_type_header table__column_type_count'>
              <p className='table__text table__text_type_header'>№</p>
            </div>
            <div className='table__column table__column_type_header table__column_type_name'>
              <p className='table__text table__text_type_header'>Студент</p>
            </div>
            <div className='table__column table__column_type_header table__column_type_full'>
              <p className='table__text table__text_type_header'>Почта</p>
            </div>
            <div className='table__column table__column_type_header table__column_type_large'>
              <p className='table__text table__text_type_header'>Телефон</p>
            </div>
            <div className='table__column table__column_type_header table__column_type_date'>
              <p className='table__text table__text_type_header'>Первое посещение</p>
            </div>
            <div className='table__column table__column_type_header table__column_type_date'>
              <p className='table__text table__text_type_header'>Последнее посещение</p>
            </div>
          </div>
        </div>
        {
          isLoadingList 
          ?
          <Preloader />
          :
          <ul style={Object.assign({}, tableStyle)} className='table__main scroll'>
            {
              groupList.length < 1 
              ?
              <p className='table__caption_type_empty'>Не найдено групп в которых вы являетесь куратором.</p>
              :
              groupList.map((item, i) => (
                <li className='table__row' key={i}>
                  <div className='table__main-column'>
                    <div className='table__column table__column_type_count'>
                      <p className='table__text'>{i + 1}</p>
                    </div>
                    <div className='table__column table__column_type_name'>
                      <p 
                        className='table__text table__text_type_header table__text_type_active' 
                        onClick={() => openViewStudentPopup(item)}
                      >
                        {item.fullname}
                      </p>
                    </div>
                    <div className='table__column table__column_type_full'>
                      <p className='table__text'>{item.email || ''}</p>
                    </div>
                    <div className='table__column table__column_type_large'>
                      <p className='table__text'>{item.phone || ''}</p>
                    </div>
                    <div className='table__column table__column_type_date'>
                      <p className='table__text'>{item.first_login || ''}</p>
                    </div>
                    <div className='table__column table__column_type_date'>
                      <p className='table__text'>{item.last_login || ''}</p>
                    </div>
                  </div>
                </li>
              ))
            }
          </ul>
        }
      </div>
    </Table>
    {
      isOpenViewStudentPopup &&
      <CuratorViewStudentPopup 
      isOpen={isOpenViewStudentPopup}
      onClose={closePopup}
      currentStudent={currentStudent}
      />
    }
    </>
  );
}

export default CuratorGroupList; 