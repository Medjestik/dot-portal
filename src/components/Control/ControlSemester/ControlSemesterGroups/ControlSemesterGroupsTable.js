import React from 'react';
import { Link } from 'react-router-dom';
import Table from '../../../Table/Table.js';

function ControlSemesterGroupsTable({ windowWidth, groups }) {

  const containerHeightRef = React.createRef();
  const tableHeaderHeightRef = React.createRef();
  const [tableHeight, setTableHeight] = React.useState(0);

  React.useEffect(() => {
    if ((windowWidth >= 833)) {
      setTableHeight(containerHeightRef.current.clientHeight - tableHeaderHeightRef.current.clientHeight);
    }
  }, [windowWidth, containerHeightRef, tableHeaderHeightRef]);

  const tableStyle = {
    height: tableHeight,
  };

  return (
    <Table>
      <div ref={containerHeightRef} className='table__container'>
        <div ref={tableHeaderHeightRef} className='table__header'>
          <div className='table__main-column table__main-column_type_empty'>
            <div className='table__column table__column_type_header table__column_type_count'>
              <p className='table__text table__text_type_header'>№</p>
            </div>
            <div className='table__column table__column_type_header table__column_type_large'>
              <p className='table__text table__text_type_header'>Группа</p>
            </div>
            <div className='table__column table__column_type_header table__column_type_full'>
              <p className='table__text table__text_type_header'>Учебный план</p>
            </div>
            <div className='table__column table__column_type_header table__column_type_medium'>
              <p className='table__text table__text_type_header'>Семестры</p>
            </div>
          </div>
        </div>
        {
          groups.length > 0 
          ?
          <ul style={Object.assign({}, tableStyle)} className='table__main scroll'>
          {
            groups.map((item, i) => (
              <li className='table__row' key={i}>
                <div className='table__main-column'>
                  <div className='table__column table__column_type_count'>
                    <p className='table__text'>{i + 1}</p>
                  </div>
                  <div className='table__column table__column_type_large'>
                    <Link className='table__text table__text_type_header table__text_type_active' to={`/control/sem/group/${item.id}`}>{item.name || ''}</Link>
                  </div>
                  <div className='table__column table__column_type_full'>
                    <p className='table__text'>{item.yp_name || ''}</p>
                  </div>
                  <div className='table__column table__column_direction_row table__column_type_medium'>
                    {
                      item.ych_sem_count &&
                      <div className='table__icon_type_stats'></div>
                    }
                    <p className='table__text table__text_color_blue'>{item.ych_sem_count || ''}</p>
                  </div>
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
  );
}

export default ControlSemesterGroupsTable;
