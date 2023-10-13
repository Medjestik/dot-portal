import React from 'react';
import Search from '../../Search/Search.js';
import Table from '../../Table/Table.js';
import { normative } from '../../../utils/links.js';

function NormativeList({ windowWidth }) {

  const containerHeightRef = React.createRef();
  const headerHeightRef = React.createRef();

  const [tableHeight, setTableHeight] = React.useState(0);

  React.useEffect(() => {
    if (windowWidth >= 833 ) {
      setTableHeight(containerHeightRef.current.clientHeight - headerHeightRef.current.clientHeight);
    }
  }, [windowWidth, containerHeightRef, headerHeightRef]);

  const tableStyle = {
    height: tableHeight, // + mainHeight + marginTop
  };

  const [normativeDocuments, setNormativeDocuments] = React.useState(normative); 

  function handleSearchNormativeDocuments(data) {
    setNormativeDocuments(data);
  }

  return (
    <>
    <div className='section__header'>
      <Search type={windowWidth < 833 ? 'large' : 'medium' } id='normative' data={normative} onSearch={handleSearchNormativeDocuments} />
    </div>

    {
      windowWidth < 833 
      ?
      <ul className='library__list'>
        {
          normativeDocuments.map((item, i) => (
            <li className='library__item' key={i}>
              <a className='btn_type_link' href={item.link} target='_blank' rel="noreferrer">
                <div className='btn-icon btn-icon_color_accent-blue btn-icon_type_download'></div>
              </a>
              <div className='library__item-info'>
                <p className='library__item-name'>{item.name}</p>
              </div>
            </li>
          ))
        }
      </ul>
      :
      <Table>
        <div ref={containerHeightRef} className='table__container'>
          <div ref={headerHeightRef} className='table__header'>
            <div className='table__main-column'>
              <div className='table__column table__column_type_header table__column_type_count'>
                <p className='table__text table__text_type_header'>№</p>
              </div>
              <div className='table__column table__column_type_header table__column_type_name'>
                <p className='table__text table__text_type_header'>Наименование</p>
              </div>
            </div>
            <div className='table__column table__column_type_header table__column_type_btn table__column_type_btn-header'>
              <button className='btn-icon'></button> 
            </div>
          </div>
          <ul style={Object.assign({}, tableStyle)} className='table__main scroll'>
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
                    <a className='btn-icon btn-icon_color_accent-blue btn-icon_type_download' href={item.link} target='_blank' rel="noreferrer"> </a>
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

export default NormativeList;