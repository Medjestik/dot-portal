import React from 'react';
import './Webinar.css';
import Section from '../Section/Section.js';
import SemesterHeader from '../SemesterHeader/SemesterHeader.js';
import Search from '../Search/Search.js';
import Month from '../Month/Month.js';
import Table from '../Table/Table.js';

function Webinar() {

  const webinars = [
    { date: '09.02.2022', time: '10:20', name: 'Управление ИТ-сервисом и контентом', teacher: 'Леонова Анна Владимировна', status: 'Пройден', link: 'https://dot1', room: 'dot1', record: 'https://www.youtube.com/watch?v=G8pYMLeW7jI'  },
    { date: '09.02.2022', time: '10:20', name: 'Управление ИТ-сервисом и контентом', teacher: 'Леонова Анна Владимировна', status: 'В процессе', link: 'https://dot1', room: 'dot1', record: 'https://www.youtube.com/watch?v=G8pYMLeW7jI'  },
    { date: '09.02.2022', time: '10:20', name: 'Управление ИТ-сервисом и контентом', teacher: 'Леонова Анна Владимировна', status: 'Завершен', link: 'https://dot1', room: 'dot1', record: ''  },
    { date: '09.02.2022', time: '10:20', name: 'Управление ИТ-сервисом и контентом', teacher: 'Леонова Анна Владимировна', status: 'Отменен', link: 'https://dot1', room: 'dot1', record: ''  },
    { date: '09.02.2022', time: '10:20', name: 'Управление ИТ-сервисом и контентом', teacher: 'Леонова Анна Владимировна', status: 'Пройден', link: 'https://dot1', room: 'dot1', record: ''  },
    { date: '09.02.2022', time: '10:20', name: 'Управление ИТ-сервисом и контентом', teacher: 'Леонова Анна Владимировна', status: 'Пройден', link: 'https://dot1', room: 'dot1', record: 'youtube.com/...'  },
    { date: '09.02.2022', time: '10:20', name: '123', teacher: 'Леонова Анна Владимировна', status: 'Пройден', link: 'https://dot1', room: 'dot1', record: 'youtube.com/...'  },
    { date: '09.02.2022', time: '10:20', name: 'Управление ИТ-сервисом и контентом', teacher: 'Леонова Анна Владимировна', status: 'Пройден', link: 'https://dot1', room: 'dot1', record: 'youtube.com/...'  },
    { date: '09.02.2022', time: '10:20', name: 'Управление ИТ-сервисом и контентом', teacher: 'Леонова Анна Владимировна', status: 'Пройден', link: 'https://dot1', room: 'dot1', record: 'youtube.com/...'  },
  ]

  const [filteredWebinars, setFilteredWebinars] = React.useState(webinars);

  function backToSemester() {
  }

  function handleSearch(data) {
    setFilteredWebinars(data);
  }

  return (

    <div className='webinar'>
      <SemesterHeader isDisciplineOpen={false} backToSemester={backToSemester} />

      <Section title='Вебинары' heightType='page' headerType='small'>
        <div className='section__header'>
          <Search type='small' id='webinar' data={webinars} onSearch={handleSearch} />
          <Month />
        </div>
        <Table>
          <div className='table__header'>
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
              <div className='table__column table__column_type_header table__column_type_teacher'>
                <p className='table__text table__text_type_header'>ФИО преподавателя</p>
              </div>
              <div className='table__column table__column_type_header table__column_type_status'>
                <p className='table__text table__text_type_header'>Статус</p>
              </div>
              <div className='table__column table__column_type_header table__column_type_link'>
                <p className='table__text table__text_type_header'>Ссылка</p>
              </div>
              <div className='table__column table__column_type_header table__column_type_record'>
                <p className='table__text table__text_type_header'>Видеозапись</p>
              </div>
            </div>
          </div>
          <ul className='table__main table__main_type_webinar scroll'>
            {
              filteredWebinars.map((item, i) => (
                <li className='table__row' key={i}>
                  <div className='table__main-column'>
                    <div className='table__column table__column_type_count'>
                      <p className='table__text'>{i + 1}</p>
                    </div>
                    <div className='table__column table__column_type_date'>
                      <p className='table__text'>{item.date}</p>
                      <p className='table__text'>{item.time}</p>
                    </div>
                    <div className='table__column table__column_type_name'>
                      <p className='table__text'>{item.name}</p>
                    </div>
                    <div className='table__column table__column_type_teacher'>
                      <p className='table__text'>{item.teacher}</p>
                    </div>
                    <div className='table__column table__column_type_status'>
                      <p className='table__text'>{item.status}</p>
                    </div>
                    <div className='table__column table__column_type_link'>
                      <a className='table__text table__link' href={item.link} target='_blank' rel='noreferrer'>{item.room}</a>
                    </div>
                    <div className='table__column table__column_type_record'>
                      {
                        item.record 
                        ?
                        <a className='table__text table__link' href={item.record} target='_blank' rel='noreferrer'>{item.record}</a>
                        :
                        <p className='table__text table__text_type_empty'>Отсутствует</p>
                      }
                    </div>
                  </div>
                </li>
              ))
            }
          </ul>
        </Table>
      </Section>

    </div>

  );
}

export default Webinar; 