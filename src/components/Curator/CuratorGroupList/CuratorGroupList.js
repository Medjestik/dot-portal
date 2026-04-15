import React from 'react';
import * as curatorApi from '../../../utils/curatorApi.js';
import Preloader from '../../Preloader/Preloader.js';
import Table from '../../Table/Table.js';
import TableCard from '../../Table/TableCard/TableCard.js';
import CuratorViewStudentPopup from '../CuratorPopup/CuratorViewStudentPopup.js';
import './CuratorGroupList.css';

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
  const [isSavingStudent, setIsSavingStudent] = React.useState(false);
  const [isLoadingStudentInfo, setIsLoadingStudentInfo] = React.useState(false);

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

  async function openViewStudentPopup(student) {
    if (!student?.id) return;
    if (isLoadingStudentInfo) return;

    const token = localStorage.getItem('token');
    if (!token) return;

    try {
      setIsLoadingStudentInfo(true);
      const detailed = await curatorApi.getStudentInfo({ token, studentId: student.id });
      setCurrentStudent(detailed);
      setIsOpenViewStudentPopup(true);
    } catch (err) {
      console.error(err);
    } finally {
      setIsLoadingStudentInfo(false);
    }
  }

  function closePopup() {
    setIsOpenViewStudentPopup(false);
  }

  function handleStudentUpdated(updated) {
    if (!updated?.id) return;
    setGroupList((prev) =>
      prev.map((s) => (String(s.id) === String(updated.id) ? { ...s, ...updated } : s))
    );
    setCurrentStudent((prev) =>
      String(prev?.id) === String(updated.id) ? { ...prev, ...updated } : prev
    );
  }

  React.useEffect(() => {
    if (windowWidth >= 833 && !isLoadingList) {
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
    {
      windowWidth > 833
      ?
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
            (isLoadingList || isLoadingStudentInfo)
            ?
            <Preloader />
            :
            <>
            {   
              groupList.length > 0 
              ?
              <ul style={Object.assign({}, tableStyle)} className='table__main scroll'>
                {
                  groupList.map((item, i) => (
                    <li className='table__row' key={i}>
                      <div className='table__main-column'>
                        <div className='table__column table__column_type_count'>
                          <p className='table__text'>{i + 1}</p>
                        </div>
                        <div className='table__column table__column_type_name'>
                          <p 
                            className='table__text table__text_type_header table__text_type_active curator-group-list__name' 
                            onClick={() => openViewStudentPopup(item)}
                          >
                            {item.fullname}
                            {
                              item.is_corp === true &&
                              <span className='curator-group-list__corp'>
                                <span className='table__cell-badge table__cell-badge_color_blue'>Корп</span>
                              </span>
                            }
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
              :
              <p className='table__caption_type_empty'>Студенты не найдены.</p>
            }
            </>
          }
        </div>
      </Table>
      :
      <>
      {
        (isLoadingList || isLoadingStudentInfo)
        ?
        <Preloader />
        :
        <>
        {
          groupList.length > 0 
          ?
          <TableCard>
          {
            groupList.map((item, i) => (
              <li className='table-card__item' key={i}>
                <p 
                  className='table-card__text table-card__text_weight_bold table-card__text_type_active table-card__title curator-group-list__name' 
                  onClick={() => openViewStudentPopup(item)}>
                  {item.fullname}
                  {
                    item.is_corp === true &&
                    <span className='curator-group-list__corp'>
                      <span className='table__cell-badge table__cell-badge_color_blue'>Корп</span>
                    </span>
                  }
                </p>
                <ul className='data__list data__list_margin_top'>
                    <li className='data__item'>
                      <p className='data__text'>
                        <span className='data__text_font_bold'>Почта:</span>
                        {item.email || ''}
                      </p>
                    </li>
                    <li className='data__item'>
                      <p className='data__text'>
                        <span className='data__text_font_bold'>Телефон:</span>
                        {item.phone || ''}
                      </p>
                    </li>
                </ul>
              </li>
            ))
          }
          </TableCard>
          :
          <p className='table__caption_type_empty'>Студенты не найдены.</p>
        }
        </>
      }
      </>
    }
    {
      isOpenViewStudentPopup &&
      <CuratorViewStudentPopup 
      isOpen={isOpenViewStudentPopup}
      onClose={closePopup}
      currentStudent={currentStudent}
      onStudentUpdated={handleStudentUpdated}
      isSaving={isSavingStudent}
      setIsSaving={setIsSavingStudent}
      groupId={groupInfo.id}
      />
    }
    </>
  );
}

export default CuratorGroupList; 