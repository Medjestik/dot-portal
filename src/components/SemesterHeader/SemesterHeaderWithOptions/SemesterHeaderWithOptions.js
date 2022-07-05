import React from 'react';
import '../SemesterHeader.css';
import SemesterHeaderNav from '../SemesterHeaderNav/SemesterHeaderNav.js';

function SemesterHeaderWithOptions({ semesterInfo, currentSemester, chooseSemester, isDisciplineOpen, backToSemester, onLogout }) {

  const [isOpenSelectOptions, setIsOpenSelectOptions] = React.useState(false);

  function openSelectOptions() {
    setIsOpenSelectOptions(!isOpenSelectOptions);
  }

  function handleBackBtn() {
    setIsOpenSelectOptions(false);
    backToSemester();
  }

  function chooseOption(option) {
    chooseSemester(option);
    setIsOpenSelectOptions(false);
  }

  React.useEffect(() => {
    setIsOpenSelectOptions(false);
    // eslint-disable-next-line
  }, []);

  return (
    <div className='semester-header'>

      {
        isDisciplineOpen 
        ?
        <button className='semester-header__btn-back' type='button' onClick={handleBackBtn}> 
          <p className='semester-header__btn-back-text'>Назад</p>
          <div className='semester-header__btn-back-arrow'></div>
        </button>
        :
        <div className={`semester-header__select ${isOpenSelectOptions ? 'semester-header__select_status_open' : ''}`}>
          <div className='semester-header__select-main' onClick={openSelectOptions}>
            <p className='semester-header__select-text'>Семестр {currentSemester.position}</p>
            <div className={`semester-header__select-arrow ${isOpenSelectOptions ? 'semester-header__select-arrow_status_open' : ''}`}></div>
          </div>
          <div className={`semester-header__select-options-container ${isOpenSelectOptions ? 'semester-header__select-options-container_status_open' : ''}`}>
            <ul className='semester-header__select-options-list'>
              {
                semesterInfo.filter(item => item.semesterId !== currentSemester.semesterId).map((item, i) => (
                  <li className='semester-header__select-options-item' key={i} onClick={() => chooseOption(item)}>
                    <p className='semester-header__select-options-text'>Семестр {item.position}</p>
                  </li>
                ))
              }
            </ul>
          </div>
        </div>
      }

      <SemesterHeaderNav onLogout={onLogout} />

    </div>
  );
}

export default SemesterHeaderWithOptions;