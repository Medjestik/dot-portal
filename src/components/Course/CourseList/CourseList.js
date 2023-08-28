import React from 'react';
import './CourseList.css';
import Table from '../../Table/Table.js';
import TableCard from '../../Table/TableCard/TableCard.js';

function CourseList({ windowWidth, courses, openCourse }) {

  const containerHeightRef = React.createRef();
  const tableHeaderHeightRef = React.createRef();

  const [tableHeight, setTableHeight] = React.useState(0);

  React.useEffect(() => {
    if (windowWidth >= 833) {
      setTableHeight(containerHeightRef.current.clientHeight - tableHeaderHeightRef.current.clientHeight);
    }
  }, [windowWidth, containerHeightRef, tableHeaderHeightRef]);

  const tableStyle = {
    height: tableHeight,
  };

  return (
    <>
    {
      windowWidth >= 833 ?
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
            </div>
          </div>
          {
            courses.length < 1 
            ?
            <p className='table__caption_type_empty'>По заданным параметрам курсов не найдено.</p>
            :
            <ul style={Object.assign({}, tableStyle)} className='table__main scroll'>
              {
                courses.map((item, i) => (
                  <li className='table__row' key={i}>
                    <div className='table__main-column'>
                      <div className='table__column table__column_type_count'>
                        <p className='table__text'>{i + 1}</p>
                      </div>
                      <div className='table__column table__column_type_date'>
                        <p className='table__text'>{item.start_learning_date}</p>
                      </div>
                      <div className='table__column table__column_type_name' onClick={() => openCourse(item)}>
                        <p className='table__text table__text_type_active table__text_type_header'>{item.name}</p>
                      </div>
                    </div>
                  </li>
                ))
              }
            </ul>
          }
        </div>
      </Table>
      :
      <TableCard>
        {
        courses.length < 1 
        ?
        <p className='table__caption_type_empty'>По заданным параметрам курсов не найдено.</p>
        :
        <>
        {
          courses.map((item, i) => (
            <li className='table-card__item' key={i}>
              <p className='table-card__text table-card__text_weight_bold table-card__text_type_active table-card__title' 
                onClick={() => openCourse(item)}>
                {item.name}
              </p>
              <p className='table-card__text table-card__subtitle'>{item.start_learning_date}</p>
            </li>
          ))
        }
        </>
      }
      </TableCard>
      }

    </>
  );
}

export default CourseList; 