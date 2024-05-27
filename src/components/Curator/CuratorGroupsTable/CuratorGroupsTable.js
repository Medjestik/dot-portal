import React from 'react';
import Table from '../../Table/Table.js';
import TableCard from '../../Table/TableCard/TableCard.js';

function CuratorGroupsTable({ windowWidth, groups, openGroup }) {

  const containerHeightRef = React.createRef();
  const tableHeaderHeightRef = React.createRef();

  const [tableHeight, setTableHeight] = React.useState(0);

  const tableStyle = {
    height: tableHeight,
  };

  React.useEffect(() => {
    if (windowWidth >= 833 & groups.length > 0) {
      setTableHeight(containerHeightRef.current.clientHeight - tableHeaderHeightRef.current.clientHeight);
    }
  }, [groups, windowWidth, containerHeightRef, tableHeaderHeightRef]);

  return (
    <>
    {
      groups.length > 0
      ?
      <>
      {
        windowWidth > 833
        ?
        <Table>
          <div ref={containerHeightRef} className='table__container'>
            <div ref={tableHeaderHeightRef} className='table__header'>
              <div className='table__main-column table__main-column_type_full'>
                <div className='table__column table__column_type_header table__column_type_count'>
                  <p className='table__text table__text_type_header'>№</p>
                </div>
                <div className='table__column table__column_type_header table__column_type_name'>
                  <p className='table__text table__text_type_header'>Наименование группы</p>
                </div>
                <div className='table__column table__column_type_header table__column_type_large'>
                  <p className='table__text table__text_type_header'>Форма обучения</p>
                </div>
                <div className='table__column table__column_type_header table__column_type_large'>
                  <p className='table__text table__text_type_header'>Уровень образования</p>
                </div>
              </div>
            </div>
            <ul style={Object.assign({}, tableStyle)} className='table__main table__main_scroll_auto'>
              {

                groups.map((item, i) => (
                  <li className='table__row' key={i}>
                    <div className='table__main-column table__main-column_type_full'>
                      <div className='table__column table__column_type_count'>
                        <p className='table__text'>{i + 1}</p>
                      </div>
                      <div className='table__column table__column_type_name'>
                        <p className='table__text table__text_type_header table__text_type_active' onClick={() => openGroup(item)}>{item.name}</p>
                      </div>
                      <div className='table__column table__column_type_large'>
                        <p className='table__text'>{item.form}</p>
                      </div>
                      <div className='table__column table__column_type_large'>
                        <p className='table__text'>{item.level}</p>
                      </div>
                    </div>
                  </li>
                ))
              }
            </ul>
          </div>
        </Table> 
        :
        <TableCard>
        {
          groups.map((item, i) => (
            <li className='table-card__item' key={i}>
              <p 
                className='table-card__text table-card__text_weight_bold table-card__text_type_active table-card__title' 
                onClick={() => openGroup(item)}>
                {item.name}
              </p>
              <ul className='data__list data__list_margin_top'>
                  <li className='data__item'>
                    <p className='data__text'>
                      <span className='data__text_font_bold'>Форма обучения:</span>
                      {item.form}
                    </p>
                  </li>
                  <li className='data__item'>
                    <p className='data__text'>
                      <span className='data__text_font_bold'>Уровень образования:</span>
                      {item.level}
                    </p>
                  </li>
              </ul>
            </li>
          ))
        }
        </TableCard>
      }
      </>
      :
      <p className='table__caption_type_empty'>Не найдено групп в которых вы являетесь куратором.</p>
    }
    </>

  );
}

export default CuratorGroupsTable;
