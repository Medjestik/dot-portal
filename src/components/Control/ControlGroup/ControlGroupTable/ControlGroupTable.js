import React from 'react';
import { Link } from 'react-router-dom';
import Table from '../../../Table/Table.js';

function ControlGroupTable({ windowWidth, groups }) {

  const containerHeightRef = React.createRef();
  const tableHeaderHeightRef = React.createRef();

  const [tableHeight, setTableHeight] = React.useState(0);

  const tableStyle = {
    height: tableHeight,
  };

  React.useEffect(() => {
    if (windowWidth >= 833) {
      setTableHeight(containerHeightRef.current.clientHeight - tableHeaderHeightRef.current.clientHeight);
    }
  }, [windowWidth, containerHeightRef, tableHeaderHeightRef]);

  return (
    <Table>
      <div ref={containerHeightRef} className='table__container'>
        <div ref={tableHeaderHeightRef} className='table__header'>
          <div className='table__main-column table__main-column_type_empty'>
            <div className='table__column table__column_type_header table__column_type_count'>
              <p className='table__text table__text_type_header'>№</p>
            </div>
            <div className='table__column table__column_type_header table__column_type_name'>
              <p className='table__text table__text_type_header'>Наименование группы</p>
            </div>
            <div className='table__column table__column_type_header table__column_type_tag'>
              <p className='table__text table__text_type_header'>Форма обучения</p>
            </div>
            <div className='table__column table__column_type_header table__column_type_small'>
              <p className='table__text table__text_type_header'>Студентов</p>
            </div>
          </div>
        </div>
        <ul style={Object.assign({}, tableStyle)} className='table__main scroll'>
          {
            groups.length < 1 
            ?
            <p className='table__caption_type_empty'>Группы не найдены.</p>
            :
            groups.map((item, i) => (
              <li className='table__row' key={i}>
                <div className='table__main-column'>
                  <div className='table__column table__column_type_count'>
                    <p className='table__text'>{i + 1}</p>
                  </div>
                  <div className='table__column table__column_type_name'>
                    <Link className='table__text table__text_type_header table__text_type_active' to={`/control/group/${item.id}/list`}>{item.name || ''}</Link>
                  </div>
                  <div className='table__column table__column_type_tag'>
                    {
                      item.form &&
                      <div className={`table__tag ${item.form === 'очная' ? 'table__tag_color_green' : 'table__tag_color_yellow'} `}>{item.form}</div>
                    }
                  </div>
                  <div className='table__column table__column_direction_row table__column_type_small'>
                    <div className='table__icon_type_users'></div>
                    <p className='table__text table__text_color_blue'>{item.users_count}</p>
                  </div>
                </div>
              </li>
            ))
          }
        </ul>
      </div>
    </Table> 
  );
}

export default ControlGroupTable; 