import React from 'react';

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
              { 
                elem.type === 'test'
                ?
                <div className='discipline-materials__item-test-info'>
                  <p className='discipline-materials__item-text'>{elem.name}</p>
                  <div className='discipline-materials__item-test-info-container'>
                    <p className='discipline-materials__item-test-text'><span className='discipline-materials__item-test-text_font_bold'>Попытки: </span>{elem.cur_attempt_num - 1}/{elem.attempts_num}</p>
                    <p className='discipline-materials__item-test-text'><span className='discipline-materials__item-test-text_font_bold'>Вопросы: </span>{elem.score}/{elem.max_score}</p>
                  </div>
                </div>
                :
                <p className='discipline-materials__item-text'>{elem.name}</p>
              }
              {renderMaterialStatus(elem)}
            </div>
            {renderMaterialBtn(elem)}
          </li>
          :
          <li key={elem.code} className='discipline-materials__item'>
            <div className='discipline-materials__item-info'>
              {renderMaterialIcon(elem)}
              { 
                elem.type === 'test'
                ?
                <div className='discipline-materials__item-test-info'>
                  <p className='discipline-materials__item-text'>{elem.name}</p>
                  <div className='discipline-materials__item-test-info-container'>
                    <p className='discipline-materials__item-test-text'><span className='discipline-materials__item-test-text_font_bold'>Попытки: </span>{elem.cur_attempt_num - 1}/{elem.attempts_num}</p>
                    <p className='discipline-materials__item-test-text'><span className='discipline-materials__item-test-text_font_bold'>Вопросы: </span>{elem.score}/{elem.max_score}</p>
                  </div>
                </div>
                :
                <p className='discipline-materials__item-text'>{elem.name}</p>
              }
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
      if ((elem.state_id === 1) || (elem.state_id === 3)) {
        return (
          <div className='discipline-materials__item-icon discipline-materials__item-icon_type_test-orange'></div>
        )
      } else if ((elem.state_id === 2) || (elem.state_id === 4)) {
        return (
          <div className='discipline-materials__item-icon discipline-materials__item-icon_type_test-grey'></div>
        )
      } else {
        return (
          <div className='discipline-materials__item-icon discipline-materials__item-icon_type_test-blue'></div>
        )
      }
    } else if (elem.type === 'inline') {
      if ((elem.state_id === 1) || (elem.state_id === 3)) {
        return (
          <div className='discipline-materials__item-icon discipline-materials__item-icon_type_file-orange'></div>
        )
      } else if ((elem.state_id === 2) || (elem.state_id === 4)) {
        return (
          <div className='discipline-materials__item-icon discipline-materials__item-icon_type_file-grey'></div>
        )
      } else {
        return (
          <div className='discipline-materials__item-icon discipline-materials__item-icon_type_file-blue'></div>
        )
      }
    } else {
      if ((elem.state_id === 1) || (elem.state_id === 3)) {
        return (
          <div className='discipline-materials__item-icon discipline-materials__item-icon_type_content-orange'></div>
        )
      } else if ((elem.state_id === 2) || (elem.state_id === 4)) {
        return (
          <div className='discipline-materials__item-icon discipline-materials__item-icon_type_content-grey'></div>
        )
      } else {
        return (
          <div className='discipline-materials__item-icon discipline-materials__item-icon_type_content-blue'></div>
        )
      }
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