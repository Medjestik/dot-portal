import React from 'react';
import './Library.css';
import Section from '../Section/Section.js';
import SemesterHeader from '../SemesterHeader/SemesterHeader.js';
import Search from '../Search/Search.js';
import Month from '../Month/Month.js';
import Table from '../Table/Table.js';

function Library() {

  const library = [
    { name: 'Электронная библиотека ИЭФ', link: 'https://miit-ief.ru/student/elibrary/' },
    { name: 'Электронно-библиотечная система Юрайт', link: 'https://www.biblio-online.ru' },
    { name: 'Единое окно доступа к образовательным ресурсам федерального портала Российское образование', link: 'http://window.edu.ru/' },
    { name: 'Электронная библиотека ИЭФ', link: 'https://miit-ief.ru/student/elibrary/' },
    { name: 'Электронно-библиотечная система Юрайт', link: 'https://www.biblio-online.ru' },
    { name: 'Единое окно доступа к образовательным ресурсам федерального портала Российское образование', link: 'http://window.edu.ru/' },
    { name: 'Электронная библиотека ИЭФ', link: 'https://miit-ief.ru/student/elibrary/' },
    { name: 'Электронно-библиотечная система Юрайт', link: 'https://www.biblio-online.ru' },
    { name: 'Единое окно доступа к образовательным ресурсам федерального портала Российское образование', link: 'http://window.edu.ru/' },
  ]

  const [libraryDocuments, setLibraryDocuments] = React.useState(library);

  const [normativeDocuments, setNormativeDocuments] = React.useState(library);

  function backToSemester() {
  }

  function handleSearchLibraryDocuments(data) {
    setLibraryDocuments(data);
  }

  function handleSearchNormativeDocuments(data) {
    setNormativeDocuments(data);
  }


  return (

    <div className='library'>
      <SemesterHeader isDisciplineOpen={false} backToSemester={backToSemester} />

      <div className='library__container'>
        <Section title='Библиотека' heightType='page' headerType='medium'> 
          <div className='section__header'>
            <Search type='small' id='library' data={library} onSearch={handleSearchLibraryDocuments} />
            <Month />
          </div>
          <Table>
            <div className='table__header'>
              <div className='table__main-column table__main-column_type_empty'>
                <div className='table__column table__column_type_header table__column_type_count'>
                  <p className='table__text table__text_type_header'>№</p>
                </div>
                <div className='table__column table__column_type_header table__column_type_name'>
                  <p className='table__text table__text_type_header'>Наименование</p>
                </div>
                <div className='table__column table__column_type_header table__column_type_link'>
                  <p className='table__text table__text_type_header'>Ссылка</p>
                </div>
              </div>
            </div>
            <ul className='table__main table__main_type_webinar scroll'>
              {
                libraryDocuments.map((item, i) => (
                  <li className='table__row' key={i}>
                    <div className='table__main-column'>
                      <div className='table__column table__column_type_count'>
                        <p className='table__text'>{i + 1}</p>
                      </div>
                      <div className='table__column table__column_type_name'>
                        <p className='table__text'>{item.name}</p>
                      </div>
                      <div className='table__column table__column_type_link'>
                        <a className='table__text table__link' href={item.link} target='_blank' rel='noreferrer'>{item.link}</a>
                      </div>
                    </div>
                  </li>
                ))
              }
            </ul>
          </Table>
        </Section>
        <Section title='Нормативная база' heightType='page' headerType='medium'> 
          <div className='section__header'>
            <Search type='small' id='normative' data={library} onSearch={handleSearchNormativeDocuments} />
            <Month />
          </div>
          <Table>
          <div className='table__header'>
              <div className='table__main-column'>
                <div className='table__column table__column_type_header table__column_type_count'>
                  <p className='table__text table__text_type_header'>№</p>
                </div>
                <div className='table__column table__column_type_header table__column_type_name'>
                  <p className='table__text table__text_type_header'>Наименование</p>
                </div>
              </div>
              <div className='table__column table__column_type_header table__column_type_btn table__column_type_btn-header'>
                <button className='btn btn_type_download btn_type_download_status_active table__btn'></button> 
              </div>
            </div>
            <ul className='table__main table__main_type_webinar scroll'>
              {
                normativeDocuments.map((item, i) => (
                  <li className='table__row' key={i}>
                    <div className='table__main-column'>
                      <div className='table__column table__column_type_count'>
                        <p className='table__text'>{i + 1}</p>
                      </div>
                      <div className='table__column table__column_type_name'>
                        <p className='table__text'>{item.name}</p>
                      </div>
                    </div>
                    <div className='table__column table__column_type_btn'>
                      <button className='btn btn_type_download btn_type_download_status_active table__btn'></button>
                    </div>
                  </li>
                ))
              }
            </ul>
          </Table>
        </Section>
      </div>
    </div>

  );
}

export default Library; 