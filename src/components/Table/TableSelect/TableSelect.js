import React from 'react';
import './TableSelect.css';
import SelectSearch from '../../SelectSearch/SelectSearch.js';
import useOnClickOutside from '../../../hooks/useOnClickOutside.js';

function TableSelect({ isOpen, onClose, title, onSave, options, currentOption, onClickOutside = true }) {

  const formRef = React.createRef();

  const [currentSelectOption, setCurrentSelectOption] = React.useState(currentOption);

  const handleChangeOption = (option) => {
    setCurrentSelectOption(option);
  }

  useOnClickOutside(formRef, onClickOutside ? onClose : undefined);

  return (
    <div className={`popup ${isOpen ? 'popup_opened' : ''}`}>
      <div className='scroll popup__container'>
        <div ref={formRef} className={`popup__form popup__form_width_medium table-select__form_height_min`}>
          <h2 className='table-select__title'>{title || ''}</h2>
          <SelectSearch options={options} currentOption={currentSelectOption} onChooseOption={handleChangeOption} />
          <div className='table-select__btn-container'>
            {
              currentSelectOption.id === 'placeholder'
              ?
              <button className='popup__btn-save popup__btn-save_type_block' type='button'>Сохранить</button>
              :
              <button className={`popup__btn-save`} type='button' onClick={() => onSave(currentSelectOption)}>Сохранить</button>
            }
          </div>
        </div>
      </div>
    </div>
  )
}

export default TableSelect;
