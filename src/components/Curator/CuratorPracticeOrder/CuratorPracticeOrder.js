import React from 'react';
import './CuratorPracticeOrder.css';
import Table from '../../Table/Table.js';

function CuratorPracticeOrder({ windowWidth, practice, onAssign, onDelete }) {

  const containerHeightRef = React.createRef();
  const tableHeaderHeightRef = React.createRef();

  const [tableHeight, setTableHeight] = React.useState(0);

  React.useEffect(() => {
    if (windowWidth >= 833) {
      setTableHeight(containerHeightRef.current.clientHeight - tableHeaderHeightRef.current.clientHeight);
    }
  }, [windowWidth, containerHeightRef, tableHeaderHeightRef]); 

  const tableStyle = {
    height: tableHeight - 1,
  };

  return (
    <>
    <Table>
      <div ref={containerHeightRef} className='table__container'>
        <div ref={tableHeaderHeightRef} className='table__header'>
          <div className='table__main-column'>
            <div className='table__column table__column_type_header table__column_type_count'>
              <p className='table__text table__text_type_header'>№</p>
            </div>
            <div className='table__column table__column_type_header table__column_type_large'>
              <p className='table__text table__text_type_header'>Номер приказа</p>
            </div>
            <div className='table__column table__column_type_header table__column_type_date'>
              <p className='table__text table__text_type_header'>Дата</p>
            </div>
            <div className='table__column table__column_type_header table__column_type_name'>
              <p className='table__text table__text_type_header'>Описание</p>
            </div>
          </div>
          <div className='table__column table__column_type_header table__column_type_btn table__column_type_btn-header'>
            <div className='btn-icon'></div>
            <div className='btn-icon btn-icon_margin_left '></div>
            <div className='btn-icon btn-icon_margin_left '></div>
          </div>
        </div>
        <ul style={Object.assign({}, tableStyle)} className='table__main scroll'>
        {
          practice.orders.length < 1 
          ?
          <p className='table__caption_type_empty'>Список приказов пока пуст.</p>
          :
          practice.orders.map((order, i) => (
          <li className='table__row' key={i}>
            <div className='table__main-column'>
              <div className='table__column table__column_type_count'>
                <p className='table__text'>{i + 1}</p>
              </div>
              <div className='table__column table__column_type_large'>
                <p className='table__text'>{order.number}</p>
              </div>
              <div className='table__column table__column_type_date'>
                <p className='table__text'>{order.date}</p>
              </div>
              <div className='table__column table__column_type_name'>
                <p className='table__text'>{order.description}</p>
              </div>
            </div>
            <div className='table__column table__column_type_btn'>
              <a className='btn-icon btn-icon_margin_left btn-icon_color_accent-blue btn-icon_type_view' href={order.link} target='_blank' rel='noreferrer'> </a>
              <button className='btn-icon btn-icon_margin_left btn-icon_color_accent-blue btn-icon_type_place' type='button' onClick={(() => onAssign(order))}></button>
              <button className='btn-icon btn-icon_margin_left btn-icon_color_accent-orange btn-icon_type_remove' type='button' onClick={(() => onDelete(order))}></button>
            </div>
          </li>
          ))
        }
        </ul>
      </div>
    </Table>
    </>
  )
}

export default CuratorPracticeOrder;