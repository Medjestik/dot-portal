import React from 'react';
import './CuratorPracticeScore.css';
import Table from '../../Table/Table.js';

function CuratorPracticeScore({ windowWidth, practice, onEdit }) {

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
    <Table>
      <div ref={containerHeightRef} className='table__container'>
        <div ref={tableHeaderHeightRef} className='table__header'>
          <div className='table__main-column'>
            <div className='table__column table__column_type_header table__column_type_count'>
              <p className='table__text table__text_type_header'>№</p>
            </div>
            <div className='table__column table__column_type_header table__column_type_name'>
              <p className='table__text table__text_type_header'>Студент / Руководитель</p>
            </div>
            <div className='table__column table__column_type_header table__column_type_small'>
              <p className='table__text table__text_type_header'>Файлы</p>
            </div>
            <div className='table__column table__column_type_header table__column_type_medium'>
              <p className='table__text table__text_type_header'>Оценка</p>
            </div>
            <div className='table__column table__column_type_header table__column_type_full'>
              <p className='table__text table__text_type_header'>Комментарий</p>
            </div>
          </div>
          <div className='table__column table__column_type_header table__column_type_btn table__column_type_btn-header'>
            <div className='btn-icon'></div>
          </div>
        </div>
        <ul style={Object.assign({}, tableStyle)} className='table__main scroll'>
        {
          practice.individuals.length < 1 
          ?
          <p className='table__caption_type_empty'>Список студентов пока пуст.</p>
          :
          practice.individuals.map((item, i) => (
          <li className='table__row' key={i}>
            <div className='table__main-column'>
              <div className='table__column table__column_type_count'>
                <p className='table__text'>{i + 1}</p>
              </div>
              <div className='table__column table__column_type_name'>
                <p className='table__text table__text_type_header'>{item.student.name} /</p>
                <p className='table__text'>{item.uni_boss.name}</p>
              </div>
              <div className='table__column table__column_type_small'>
                <p className='table__text'>{item.files.length} шт.</p>
              </div>
              <div className='table__column table__column_type_medium'>
                <p className='table__text'>{item.mark.short_name}</p>
              </div>
              <div className='table__column table__column_type_full'>
                <p className='table__text table__text_type_cut'>{item.komment}</p>
              </div>
            </div>
            <div className='table__column table__column_type_btn'>
              <button className='btn-icon btn-icon_color_accent-blue btn-icon_type_edit' type='button' onClick={(() => onEdit(item))}></button>
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

export default CuratorPracticeScore;