import React from 'react';
import './PopupSelect.css';

function PopupSelect({ options, currentOption, onChooseOption }) {

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
    <div className={`select-popup ${isOpenSelectOptions ? 'select-popup_status_open' : ''}`}>
      <div className='select-popup__main' onClick={openSelectOptions}>
        <p className='select-popup__text'>{currentOption.name}</p>
        <div className={`select-popup__arrow ${isOpenSelectOptions ? 'select-popup__arrow_status_open' : ''}`}></div>
      </div>
      <div className={`select-popup__options-container ${isOpenSelectOptions ? 'select-popup__options-container_status_open' : ''}`}>
        <ul className='select-popup__options-list'>
          {
            options.filter(item => item.id !== currentOption.id).map((item, i) => (
              <li className='select-popup__options-item' key={i} onClick={() => chooseOption(item)}>
                <p className='select-popup__options-text'>{item.name}</p>
              </li>
            ))
          }
        </ul>
      </div>
    </div>
  );
}

export default PopupSelect;