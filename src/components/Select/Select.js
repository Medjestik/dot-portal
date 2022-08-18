import React from 'react';
import './Select.css';

function Select({ options, currentOption, onChooseOption }) {

  const [isOpenSelectOptions, setIsOpenSelectOptions] = React.useState(false);

  function openSelectOptions() {
    setIsOpenSelectOptions(!isOpenSelectOptions);
  }

  function chooseOption(option) {
    onChooseOption(option);
    setIsOpenSelectOptions(false);
  }

  React.useEffect(() => {
    setIsOpenSelectOptions(false);
    // eslint-disable-next-line
  }, []);

  return (
    <div className={`select ${isOpenSelectOptions ? 'select_status_open' : ''}`}>
      <div className='select__main' onClick={openSelectOptions}>
        <p className='select__text'>{currentOption.name}</p>
        <div className={`select__arrow ${isOpenSelectOptions ? 'select__arrow_status_open' : ''}`}></div>
      </div>
      <div className={`select__options-container ${isOpenSelectOptions ? 'select__options-container_status_open' : ''}`}>
        <ul className='select__options-list'>
          {
            options.filter(item => item.id !== currentOption.id).map((item, i) => (
              <li className='select__options-item' key={i} onClick={() => chooseOption(item)}>
                <p className='select__options-text'>{item.name}</p>
              </li>
            ))
          }
        </ul>
      </div>
    </div>
  );
}

export default Select;