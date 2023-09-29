import React from 'react';
import './CuratorPracticeStudent.css';
import Table from '../../Table/Table.js';

function CuratorPracticeStudent({ windowWidth, practice, onEdit }) {

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
                    <div className='table__column table__column_type_header table__column_type_full'>
                        <p className='table__text table__text_type_header'>Место</p>
                    </div>
                    <div className='table__column table__column_type_header table__column_type_full'>
                        <p className='table__text table__text_type_header'>Задание</p>
                    </div>
                </div>
                <div className='table__column table__column_type_header table__column_type_btn table__column_type_btn-header'>
                    <div className='btn btn_type_edit btn_type_edit_status_active table__btn'></div>
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
                            <div className='table__column table__column_type_full'>
                                <p className='table__text'>{item.place}</p>
                            </div>
                            <div className='table__column table__column_type_full'>
                                <p className='table__text table__text_type_cut'>{item.task}</p>
                            </div>
                        </div>
                        <div className='table__column table__column_type_btn'>
                            <button 
                            className='btn btn_type_edit btn_type_edit_status_active table__btn' 
                            type='button' 
                            onClick={(() => onEdit(item))}
                        >
                        </button>
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

export default CuratorPracticeStudent;