import React from 'react';
import './SelectSearch.css';
import useOnClickOutside from '../../hooks/useOnClickOutside.js';

function SelectSearch({ options, currentOption, onChooseOption }) {

  const selectRef = React.createRef();

  const [isOpenSelectOptions, setIsOpenSelectOptions] = React.useState(false);

  const [filteredOptions, setFilteredOptions] = React.useState(options);

  const [searchText, setSearchText] = React.useState('');

  function handleChangeOption(option) {
    onChooseOption(option);
    setIsOpenSelectOptions(false);
    setSearchText('');
    setFilteredOptions(options);
  }

  function handleChangeSearchText(e) {
    e.stopPropagation();
    setSearchText(e.target.value);
    setFilteredOptions(options.filter(item => item.name.toLowerCase().includes(e.target.value.toLowerCase())));
  }

  function openSelectOptions() {
    setIsOpenSelectOptions(true);
  }

  function closeSelectOptions() {
    setIsOpenSelectOptions(false);
  }

  React.useEffect(() => {
    setIsOpenSelectOptions(false);
    // eslint-disable-next-line
  }, []);

  useOnClickOutside(selectRef, closeSelectOptions);

  return (
    <div ref={selectRef} className={`select-search ${isOpenSelectOptions ? 'select-search_status_open' : ''}`}>
      <div className='select-search__main' onClick={!isOpenSelectOptions ? openSelectOptions : undefined}>
        {
          isOpenSelectOptions
          ?
          <input autoFocus value={searchText} placeholder={currentOption.name} onChange={(e) => handleChangeSearchText(e)} className='select-search__input'></input>
          :
          <p className={`select-search__text ${currentOption.id === 'placeholder' ? 'select-search__text_type_placeholder' : ''}`}>{currentOption.name}</p>
        }
        <div className={`select-search__arrow ${isOpenSelectOptions ? 'select-search__arrow_status_open' : ''}`} onClick={isOpenSelectOptions ? closeSelectOptions : undefined}></div>
      </div>
      <div className={`select-search__options-container scroll ${isOpenSelectOptions ? 'select-search__options-container_status_open' : ''}`}>
        {
          ((filteredOptions.length === 1) && (filteredOptions[0].id === 'placeholder')) 
          ?
          <ul className='select-search__options-list scroll'>
            <li className='select-search__options-item'>
              <p className='select-search__options-text select-search__options-text_type_empty'>Список доступных вариантов пуст</p>
            </li>
          </ul>
          :
          <ul className='select-search__options-list scroll'>
            {
              filteredOptions.length > 0 
              ?
              <>
              {
                filteredOptions.filter(item => item.id !== currentOption.id && item.id !== 'placeholder').map((item, i) => (
                  <li className='select-search__options-item' key={i} onClick={() => handleChangeOption(item)}>
                    <p className='select-search__options-text'>{item.name}</p>
                  </li>
                ))
              }
              </>
              :
              <li className='select-search__options-item'>
                <p className='select-search__options-text select-search__options-text_type_empty'>Результаты не найдены, измените запрос</p>
              </li>
            }
          </ul>
        }
      </div>
    </div>
  );
}

export default SelectSearch;
