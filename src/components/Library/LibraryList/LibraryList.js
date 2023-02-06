import React from 'react';
import Search from '../../Search/Search.js';
import Table from '../../Table/Table.js';
import { library } from '../../../utils/links.js';

function LibraryList({ windowWidth }) {

  const containerHeightRef = React.createRef();
  const headerHeightRef = React.createRef();

  const [tableHeight, setTableHeight] = React.useState(0);

  React.useEffect(() => {
    console.log(containerHeightRef);
    if (windowWidth >= 833 ) {
      setTableHeight(containerHeightRef.current.clientHeight - headerHeightRef.current.clientHeight);
    }
  }, [windowWidth, containerHeightRef, headerHeightRef]);

  const tableStyle = {
    height: tableHeight,
  };

  const [libraryDocuments, setLibraryDocuments] = React.useState(library);

  function handleSearchLibraryDocuments(data) {
    setLibraryDocuments(data);
  }

  return (
    <>
    <div className='section__header'>
      <Search type={windowWidth < 833 ? 'large' : 'medium' } id='library' data={library} onSearch={handleSearchLibraryDocuments} />
    </div>

      {
        windowWidth < 833 
        ?
        <ul className='library__list'>
          {
            libraryDocuments.map((item, i) => (
              <li className='library__item' key={i}>
                <span className='library__count'>{i + 1}.</span>
                <div className='library__item-info'>
                  <p className='library__item-name'>{item.name}</p>
                  <a className='library__item-link' href={item.link} target='_blank' rel='noreferrer'>{item.link}</a>
                </div>
              </li>
            ))
          }
        </ul>
        :
        <Table>
          <div ref={containerHeightRef} className='table__container'>
            <div ref={headerHeightRef} className='table__header'>
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
            <ul style={Object.assign({}, tableStyle)} className='table__main scroll'>
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
          </div>
        </Table>
      }
    </>
  )
}

export default LibraryList;