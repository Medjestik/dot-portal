import React from 'react';
import Popup from '../../../Popup/Popup.js';
import { PieChart } from 'react-minimal-pie-chart';

function CuratorViewReportsPopup({ isOpen, onClose, currentStudent }) {

  function handleSubmit(e) {
    e.preventDefault();
    onClose();
  }

  return (
    <Popup 
      isOpen={isOpen} 
      onClose={onClose}
      onSubmit={handleSubmit}
      formWidth={'medium'}
      formName={'curator-view-reports-popup'}
    >
      <h2 className='popup__title'>Файлы студента ({currentStudent.uploads.length} шт.)</h2>
      <p className='popup__author-text'><span className='popup__author-text_weight_bold'>Студент: </span>{currentStudent.fullname}</p>

      {
        currentStudent.uploads.length > 0 &&
        <ul className='popup__list'>
          {
            currentStudent.uploads.map((elem, i) => (
              <li key={i} className='popup__item'>
                <div className='popup__item-container'>
                  <div className='test-chart'>
                    <PieChart
                      data={[{ value: elem.percent || 0, color: elem.pass ? '#1153FC' : '#FF7B02' }]}
                      totalValue={100}
                      lineWidth={18}
                      paddingAngle={2}
                      rounded
                      background='#F1F3F5'
                      label={({ dataEntry }) => dataEntry.value + '%'}
                      labelStyle={{
                        fontSize: '24px',
                        fontFamily: 'Roboto',
                        fontWeight: 'bold',
                        fill: elem.pass ? '#1153FC' : '#FF7B02',
                      }}
                      labelPosition={0}
                    />
                  </div>
                  <div className='popup__item-info'>
                    <h4 className='popup__item-title text-cut'>{elem.filename}</h4>
                    <p className='popup__item-text'><span className='popup__item-text_weight_bold'>Дата загрузки: </span>{elem.load_date}</p>
                    {
                      elem.percent 
                      ?
                      <p className='popup__item-text'><span className='popup__item-text_weight_bold'>Ссылка на отчет: </span><a className='popup__row-text popup__text_type_link' href={elem.report_link} target='_blank' rel='noreferrer'>Перейти</a></p>
                      :
                      <p className='popup__item-text'><span className='popup__item-text_weight_bold'>Статус: </span>Работа на проверке</p>
                    }
                  </div>
                </div>
              </li>
            ))
          }
        </ul>
      }
      
      <button className='popup__btn-back' type='submit'>Назад</button>
    </Popup>
  )
}

export default CuratorViewReportsPopup;
