import React from 'react';
import Table from '../../../Table/Table.js';

function ControlGroupTable({ windowWidth, groups, openGroup }) {

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
            <div className='table__column table__column_type_header table__column_type_large'>
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
                    <p className='table__text table__text_type_header table__text_type_active' onClick={() => openGroup(item)}>{item.name}</p>
                  </div>
                  <div className='table__column table__column_type_large'>
                    <p className='table__text'>{item.form}</p>
                  </div>
                  <div className='table__column table__column_type_small'>
                    <p className='table__text'>{item.users_count}</p>
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