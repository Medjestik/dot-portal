import React from 'react';
import './CuratorPracticeInfo.css';
import Table from '../../Table/Table.js';

function CuratorPracticeInfo({ windowWidth, practice, onDelete }) {

    function convertDate(date) {
      return new Date(date).toLocaleString('ru', { month: 'numeric', day: 'numeric', }) + '.' + new Date(date).toLocaleString('sv', { year: 'numeric', });
    }

    return (
      <>
      <ul className='data__list'>
        <li className='data__item'>
          <p className='data__text'><span className='data__text_font_bold'>Название:</span>{practice.name || ''}</p>
        </li>
        <li className='data__item'>
          <p className='data__text'><span className='data__text_font_bold'>Тип:</span>{practice.type || ''}</p>
        </li>
        <li className='data__item'>
          <p className='data__text'><span className='data__text_font_bold'>Дата начала:</span>{practice.start_date ? convertDate(practice.start_date) : '00.00.0000' }</p>
        </li>
        <li className='data__item'>
          <p className='data__text'><span className='data__text_font_bold'>Дата окончания:</span>{practice.end_date ? convertDate(practice.end_date) : '00.00.0000' }</p>
        </li>
        <li className='data__item'>
          <p className='data__text'><span className='data__text_font_bold'>Описание:</span>{practice.description || ''}</p>
        </li>
      </ul>

      <h5 className='section__header-title section__header-title_size_14 section__header-title_margin_top section__header-title_margin_bottom'>Загруженные файлы:</h5>

      <Table>
        <div className='table__container'>
          <div className='table__header'>
            <div className='table__main-column'>
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
            <div className='table__column table__column_type_header table__column_type_btn table__column_type_btn-header'>
              <div className='btn btn_type_download btn_type_download_status_active'></div>
              <div className='btn btn_type_download btn_type_download_status_active table__btn'></div>
            </div>
          </div>
          <ul className='table__main scroll'>
          {
            practice.files.length < 1 
            ?
            <p className='table__caption_type_empty'>Файлы пока не загружены.</p>
            :
            practice.files.map((file, i) => (
            <li className='table__row' key={i}>
              <div className='table__main-column'>
                <div className='table__column table__column_type_count'>
                  <p className='table__text'>{i + 1}</p>
                </div>
                <div className='table__column table__column_type_date'>
                  <p className='table__text'>{file.date ? convertDate(file.date) : '00.00.0000' }</p>
                </div>
                <div className='table__column table__column_type_name'>
                  <p className='table__text'>{file.title}</p>
                </div>
              </div>
              <div className='table__column table__column_type_btn'>
                <a className='btn btn_type_download btn_type_download_status_active' href={file.link} target='_blank' rel='noreferrer'> </a>
                <button 
                className='btn btn_type_cancel btn_type_cancel_status_active table__btn' 
                type='button' 
                onClick={(() => onDelete(file))}
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

export default CuratorPracticeInfo;