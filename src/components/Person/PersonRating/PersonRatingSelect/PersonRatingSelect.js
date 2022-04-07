import React from 'react';
import './PersonRatingSelect.css';
import arrow from '../../../../images/arrow-color.png';
import useOnClickOutside from '../../../../hooks/useOnClickOutside.js';

function PersonRatingSelect({ id, options, placeholder, icon, onSelect }) {

  const [searchOption, setSearchOption] = React.useState('');
  const [filteredOptions, setFilteredOptions] = React.useState(options);
  const [isShowOptions, setIsShowOptions] = React.useState(false);
  const [isChooseOption, setIsChooseOption] = React.useState({ isChoose: false, option: {} });

  const sensitive = React.useRef(null);
  const searchInput = React.useRef(null);
  
  function handleSearchOptions(e) {
    setSearchOption(e.target.value);
    onSelect({ isChoose: false, option: {} });
    setIsChooseOption({ isChoose: false, option: {} });
    setIsShowOptions(true);
  }

  function handleChooseOptions(item) {
    searchInput.current.blur();
    onSelect({ isChoose: true, option: item });
    setIsChooseOption({ isChoose: true, option: item });
    setSearchOption(item.label);
    setIsShowOptions(false);
  }

  function handleToggleOptions() {
    searchInput.current.focus();
    if (isShowOptions) {
      setIsShowOptions(false);
    } else {
      setSearchOption('');
      onSelect({ isChoose: false, option: {} });
      setIsChooseOption({ isChoose: false, option: {} });
      setIsShowOptions(true);
    }
  }

  useOnClickOutside(sensitive, () => {
    setIsShowOptions(false);
    if (!isChooseOption.isChoose) {
      setSearchOption('');
    }
  });

  React.useEffect(() => {
    return(() => {
      setSearchOption('');
      setFilteredOptions([]);
      setIsChooseOption({ isChoose: false, option: {} });
      setIsShowOptions(false)
    })
  }, []);
 
  React.useEffect(() => {
    const newOptions = options.filter((item) => {
      return item.label.toLowerCase().includes(searchOption.toLowerCase());
    })
    setFilteredOptions(newOptions);
  }, [options, searchOption]);

  return (
    <div className='person-rating__select' onClick={handleToggleOptions} ref={sensitive}>
      {
        isChooseOption.isChoose 
        ? 
          <span className='person-rating__select-number'>{isChooseOption.option.id}</span>
        :
          <img className='person-rating__select-icon' src={icon} alt='иконка выбора'></img>
      }
      <input 
      className='person-rating__select-input' 
      name={`person-rating-select-${id}`}
      id={`person-rating-select-${id}`}
      type='text'
      value={searchOption}
      onChange={handleSearchOptions}
      placeholder={placeholder}
      autoComplete='off'
      ref={searchInput}>   
      </input>
      <div className={`person-rating__select-option-container ${isShowOptions ? 'person-rating__select-option-container_type_show' : ''}`}>
        <ul className='person-rating__select-option-list scroll-inside'>
          {
            filteredOptions.length > 0 
            ?
            filteredOptions.map((item, i) => (
              <li className='person-rating__select-option-item' key={i} onClick={() => handleChooseOptions(item)}>
                <span className='person-rating__select-option-count'>{item.id}</span>
                <p className='person-rating__select-option-text'>{item.label}</p>
              </li>
            ))
            :
            <li className='person-rating__select-option-item'>
              <p className='person-rating__select-option-text person-rating__select-option-text_type_block'>Нет результатов</p>
            </li>
          }
        </ul>
      </div>
      <img className={`person-rating__select-arrow ${isShowOptions ? 'person-rating__select-arrow_type_show' : '' }`} src={arrow} alt='стрелочка'></img>
    </div>
  );
}

export default PersonRatingSelect;
