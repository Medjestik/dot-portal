import React from 'react';

function DisciplineTeacherMaterialsList({ windowWidth, materials }) {

  const [convertMaterials, setConvertMaterials] = React.useState([]);

  function convertArr(arr) {
    const newArr = arr.filter(item => item.parent_part_code === '').map((item) => {
      if (item.parent_part_code === '') {
        if (item.type === 'folder') {
          return { ...item, children: getChildren(arr, item) };
        } else {
          return item;
        }
      } else {
        return false;
      }
    })
    setConvertMaterials(newArr);
  }

  function getChildren(arr, item) {
    const children = arr.filter(elem => elem.parent_part_code === item.code);
    return children.map((elem) => {
      if (elem.type === 'folder') {
        return { ...elem, children: getChildren(arr, elem) };
      } else {
        return elem;
      }
    })
  }
  
  function renderMaterials(arr) {
    return arr.map((elem) => {
      if (elem.children) {
        return (
          <li key={elem.code} className='discipline-materials__item discipline-materials__item_type_folder'>
            <div className='discipline-materials__item-info'>
              {renderMaterialIcon(elem)}
              <p className='discipline-materials__item-text discipline-materials__item-text_weight_bold'>{elem.name}</p>
            </div>
            <ul className='discipline-materials__list discipline-materials__list_type_nested'>
              {renderMaterials(elem.children)}
            </ul>
          </li>
        )
      } else {
        return (         
          windowWidth >= 833 ?
          <li key={elem.code} className='discipline-materials__item'>
            <div className='discipline-materials__item-info'>
              {renderMaterialIcon(elem)}
              <p className='discipline-materials__item-text'>{elem.name}</p>
            </div>
            {renderMaterialBtn(elem)}
          </li>
          :
          <li key={elem.code} className='discipline-materials__item'>
            <div className='discipline-materials__item-info'>
              {renderMaterialIcon(elem)}
              <p className='discipline-materials__item-text'>{elem.name}</p>
            </div>
            <div className='discipline-materials__item-mobile'>
              {renderMaterialBtn(elem)}
            </div>
          </li>
        )
      }
    })
  }

  function renderMaterialIcon(elem) {
    if (elem.type === 'folder') {
      return (
        <div className='discipline-materials__item-icon discipline-materials__item-icon_type_folder'></div>
      )
    } else if (elem.type === 'test') {
      return (
        <div className='discipline-materials__item-icon discipline-materials__item-icon_type_test-blue'></div>
      )
    } else if (elem.type === 'inline') {
      return (
        <div className='discipline-materials__item-icon discipline-materials__item-icon_type_file-blue'></div>
      )
    } else {
      return (
        <div className='discipline-materials__item-icon discipline-materials__item-icon_type_content-blue'></div>
      )
    }
  }

  function renderMaterialBtn(elem) {
    if (elem.type === 'test') {
      return (
        <a 
        href={`https://course.emiit.ru/view_doc.html?mode=export_test&test_id=${elem.assessment_id}`}
        target='_blank'
        rel='noreferrer'
        className='discipline-materials__item-btn discipline-materials__item-btn_type_start' 
        >
          Октрыть
        </a>
      ) 
    } else {
      return (
        <a 
        href={`https://course.emiit.ru/${elem.url}`}
        target='_blank'
        rel='noreferrer'
        className='discipline-materials__item-btn discipline-materials__item-btn_type_start' 
        >
          Октрыть
        </a>
      ) 
    }
  }

  React.useEffect(() => {
    convertArr(materials);
    return(() => {
      setConvertMaterials([]);
    })
    // eslint-disable-next-line
  }, [materials]);
  
  return (
    <ul className='discipline-materials__list discipline-materials__list_type_initial'>
      {
        convertMaterials.length > 0 &&
        renderMaterials(convertMaterials)
      }
    </ul>
  );
}

export default DisciplineTeacherMaterialsList;