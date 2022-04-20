import React from 'react';
import Search from '../../Search/Search.js';
import Month from '../../Month/Month.js';
import Table from '../../Table/Table.js';

function MaterialList() {

  const document = [
    { name: 'ГОСТ 7.9 – 77. Реферат и аннотация. – Москва: Изд-во стандартов, 1981. – 6 с.', date: '09.02.2022 10:20', },
    { name: 'Пат. 2187888 Российская Федерация, МПК Н 04 В 1/38, Н 04 J 13/00. Приемопередающее устройство [Текст] / Чугаева В.И.; заявитель и патентообладатель Воронеж. науч.-исслед. ин-т связи. -  № 2000131736/09; заявл. 18.12.00; опубл. 20.08.02, Бюл. № 23 (II ч.). – 3 с.', date: '09.02.2022 10:20', status: 'Загрузить', },
    { name: 'ГОСТ 7.9 – 77. Реферат и аннотация. – Москва: Изд-во стандартов, 1981. – 6 с.', date: '09.02.2022 10:20', },
    { name: 'ГОСТ 7.9 – 77. Реферат и аннотация. – Москва: Изд-во стандартов, 1981. – 6 с.', date: '09.02.2022 10:20', },
    { name: 'ГОСТ 7.9 – 77. Реферат и аннотация. – Москва: Изд-во стандартов, 1981. – 6 с.', date: '09.02.2022 10:20', },
    { name: 'Пат. 2187888 Российская Федерация, МПК Н 04 В 1/38, Н 04 J 13/00. Приемопередающее устройство [Текст] / Чугаева В.И.; заявитель и патентообладатель Воронеж. науч.-исслед. ин-т связи. -  № 2000131736/09; заявл. 18.12.00; опубл. 20.08.02, Бюл. № 23 (II ч.). – 3 с.', date: '09.02.2022 10:20', },
    { name: 'ГОСТ 7.9 – 77. Реферат и аннотация. – Москва: Изд-во стандартов, 1981. – 6 с.', date: '09.02.2022 10:20', },
    { name: 'ГОСТ 7.9 – 77. Реферат и аннотация. – Москва: Изд-во стандартов, 1981. – 6 с.', date: '09.02.2022 10:20', },
  ]


  const [documents, setDocuments] = React.useState(document);

  function handleSearchDocuments(data) {
    setDocuments(data);
  }

  return (
    <>
    <div className='section__header'>
      <Search type='medium' id='document' data={document} onSearch={handleSearchDocuments} />
      <Month />
    </div>
    <Table>
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
          <button className='btn btn_type_download btn_type_download_status_active table__btn'></button> 
        </div>
      </div>
      <ul className='table__main table__main_type_webinar scroll'>
        {
          documents.map((item, i) => (
            <li className='table__row' key={i}>
              <div className='table__main-column'>
                <div className='table__column table__column_type_count'>
                  <p className='table__text'>{i + 1}</p>
                </div>
                <div className='table__column table__column_type_date'>
                  <p className='table__text'>{item.date}</p>
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
  );
}

export default MaterialList; 