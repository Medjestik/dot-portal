import React from 'react';
import './DisciplineSectionSelect.css';

function DisciplineSectionSelect({ sections, currentSection, onChooseSection }) {

  const [isOpenSelectOptions, setIsOpenSelectOptions] = React.useState(false);

  function openSelectOptions() {
    setIsOpenSelectOptions(!isOpenSelectOptions);
  }

  function chooseOption(option) {
    onChooseSection(option);
    setIsOpenSelectOptions(false);
  }

  React.useEffect(() => {
    setIsOpenSelectOptions(false);
    return(() => {
    })
    // eslint-disable-next-line
  }, []);

  return (
    <div className={`discipline-section__select ${isOpenSelectOptions ? 'discipline-section__select_status_open' : ''}`}>
      <div className='discipline-section__select-main' onClick={openSelectOptions}>
        <p className='discipline-section__select-text'>{currentSection.title}</p>
        <div className={`discipline-section__select-arrow ${isOpenSelectOptions ? 'discipline-section__select-arrow_status_open' : ''}`}></div>
      </div>
      <div className={`discipline-section__select-options-container ${isOpenSelectOptions ? 'discipline-section__select-options-container_status_open' : ''}`}>
        <ul className='discipline-section__select-options-list'>
          {
            sections.filter(item => item.id !== currentSection.id).map((item, i) => (
              <li className='discipline-section__select-options-item' key={i} onClick={() => chooseOption(item)}>
                <p className='discipline-section__select-options-text'>{item.title}</p>
              </li>
            ))
          }
        </ul>
      </div>
    </div>
  );
}

export default DisciplineSectionSelect; 