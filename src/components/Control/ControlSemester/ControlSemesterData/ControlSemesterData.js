import React from 'react';
import { useParams } from 'react-router-dom';
import './ControlSemesterData.css';
import * as adminApi from '../../../../utils/admin.js';
import * as catalogApi from '../../../../utils/catalog.js';
import Preloader from '../../../Preloader/Preloader';
import Section from '../../../Section/Section';
import Table from '../../../Table/Table.js';

function ControlSemesterData({ windowWidth }) {

  const { semesterId } = useParams();
 
  const containerHeightRef = React.createRef();
  const tableHeaderHeightRef = React.createRef();
  const [tableHeight, setTableHeight] = React.useState(0);

  const [data, setData] = React.useState([]);

  const [isLoadingData, setIsLoadingData] = React.useState(true);

  function initialRequest() {
    setIsLoadingData(true);
    const token = localStorage.getItem('token');
  
    Promise.all([
      adminApi.getSemesterData({ token: token, semester: semesterId }),
      catalogApi.getCatalogTutors({ token: token }),
      catalogApi.getCatalogCourses({ token: token }),
      catalogApi.getCatalogControlForms({ token: token }),
    ])
      .then(([semesterData, tutors, courses, controlForms]) => {
        console.log('Semester Data:', semesterData);
        console.log('Tutors:', tutors);
        console.log('Courses:', courses);
        console.log('Control Forms:', controlForms);
  
        setData(semesterData);
      })
      .catch((err) => {
        console.error(err);
      })
      .finally(() => {
        setIsLoadingData(false);
      });
  }

  React.useEffect(() => {
    initialRequest();
    return () => {
      setData([]);
    };
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
    <Section title='Учебный семестр' heightType='page' headerType='large'>
      {
        isLoadingData
        ?
        <Preloader />
        :
        <>
        <Table>
          <div ref={containerHeightRef} className='table__container'>
            <div ref={tableHeaderHeightRef} className='table__header'>
              <div className='table__main-column'>
                <div className='table__column table__column_type_header table__column_type_count'>
                  <p className='table__text table__text_type_header'>№</p>
                </div>
                <div className='table__column table__column_type_header table__column_type_name'>
                  <p className='table__text table__text_type_header'>Группа</p>
                </div>
                <div className='table__column table__column_type_header table__column_type_full'>
                  <p className='table__text table__text_type_header'>Контент</p>
                </div>
                <div className='table__column table__column_type_header table__column_type_full'>
                  <p className='table__text table__text_type_header'>Преподаватель</p>
                </div>
                <div className='table__column table__column_type_header table__column_type_date'>
                  <p className='table__text table__text_type_header'>Период</p>
                </div>
                <div className='table__column table__column_type_header table__column_type_medium'>
                  <p className='table__text table__text_type_header table__text_align_center'>Контроль</p>
                </div>
              </div>
              <div className='table__column table__column_type_header table__column_type_btn table__column_type_btn-header'>
                <div className='btn-icon'></div>
              </div>
            </div>
            {
              data.disciplines.length > 0 
              ?
              <ul style={Object.assign({}, tableStyle)} className='table__main scroll'>
              {
                data.disciplines.map((item, i) => (
                  <li className='table__row' key={i}>
                    <div className='table__main-column'>
                      <div className='table__column table__column_type_count'>
                        <p className='table__text'>{i + 1}</p>
                      </div>
                      <div className='table__column table__column_type_name'>
                        <p className='table__text table__text_type_header'>{item.name || ''}</p>
                      </div>
                      <div className='table__column table__column_type_full'>
                        <p className='table__text'>{item.course?.name || ''}</p>
                      </div>
                      <div className='table__column table__column_type_full'>
                        <p className='table__text'>{item.lector?.fullname || ''} / {item.vedomost_lector?.fullname || ''}</p>
                        <p className='table__text'></p>
                      </div>
                      <div className='table__column table__column_type_date'>
                        <p className='table__text table__text_align_center'>{item.start_date || 0} {item.end_date || 0}</p>
                      </div>
                      <div className='table__column table__column_type_medium'>
                        <p className='table__text table__text_align_center'>{item.control?.name || 0}</p>
                      </div>
                    </div>
                    <div className='table__column table__column_type_btn'>
                      <button className='btn-icon btn-icon_color_accent-blue btn-icon_type_edit' type='button' onClick={() => {}}></button>
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
        </>
      }
    </Section>
  );
}

export default ControlSemesterData;
