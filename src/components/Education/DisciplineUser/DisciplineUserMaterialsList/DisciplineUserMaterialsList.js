import React from 'react';
import './DisciplineUserMaterialsList.css';

function DisciplineUserMaterialsList({ windowWidth, materials, handleOpenMaterial }) {

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
              <p className='discipline-materials__item-text'>{elem.name}</p>
            </div>
            <ul className='discipline-materials__list'>
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
              {renderMaterialStatus(elem)}
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
              {renderMaterialStatus(elem)}
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
        <div className='discipline-materials__item-icon discipline-materials__item-icon_type_test'></div>
      )
    } else if (elem.type === 'inline') {
      return (
        <div className='discipline-materials__item-icon discipline-materials__item-icon_type_inline'></div>
      )
    } else {
      return (
        <div className='discipline-materials__item-icon discipline-materials__item-icon_type_content'></div>
      )
    }
  }

  function renderMaterialStatus(elem) {
    if (elem.state_id === 1) {
      return (
        <span className='discipline-materials__item-text discipline-materials__item-status'>В процессе</span>
      )
    } else if (elem.state_id === 2) {
      return (
        <span className='discipline-materials__item-text discipline-materials__item-status'>Завершен</span>
      )
    } else if (elem.state_id === 3) {
      return (
        <span className='discipline-materials__item-text discipline-materials__item-status'>Не пройден</span>
      )
    } else if (elem.state_id === 4) {
      return (
        <span className='discipline-materials__item-text discipline-materials__item-status'>Пройден</span>
      ) 
    } else {
      return (
        <span className='discipline-materials__item-text discipline-materials__item-status'>Не начат</span>
      ) 
    }
  }

  function renderMaterialBtn(elem) {
    if ((elem.state_id === 1) || (elem.state_id === 3)) {
      return (
        <button 
        className='discipline-materials__item-btn discipline-materials__item-btn_type_finish' 
        onClick={(() => handleOpenMaterial(elem))}
        >
          Продолжить
        </button>
      )
    } else if ((elem.state_id === 2) || (elem.state_id === 4)) {
      return (
        <button 
        className='discipline-materials__item-btn discipline-materials__item-btn_type_repeat' 
        onClick={(() => handleOpenMaterial(elem))}
        >
          Повторить
        </button>
      )
    } else {
      return (
        <button 
        className='discipline-materials__item-btn discipline-materials__item-btn_type_start' 
        onClick={(() => handleOpenMaterial(elem))}
        >
          Начать
        </button>
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

export default DisciplineUserMaterialsList;