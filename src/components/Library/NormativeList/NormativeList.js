import React from 'react';
import Search from '../../Search/Search.js';
import Month from '../../Month/Month.js';
import Table from '../../Table/Table.js';

function NormativeList() {

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

  const [normativeDocuments, setNormativeDocuments] = React.useState(library);

  function handleSearchNormativeDocuments(data) {
    setNormativeDocuments(data);
  }

  return (
    <>
    <div className='section__header'>
      <Search type='medium' id='normative' data={library} onSearch={handleSearchNormativeDocuments} />
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
    </>
  )
}

export default NormativeList;