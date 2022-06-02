import React from 'react';
import './SemesterHeader.css';
import { notificationIcon, homeIcon, errorIcon, exitIcon } from './SemesterHeaderIcons/SemesterHeaderIcons.js'

function SemesterHeader({ isDisciplineOpen, backToSemester }) {

  const chapters = [
    { title: 'Семестр 1', id: 1, link: '/info' },
    { title: 'Семестр 2', id: 2, link: '/materials' },
    { title: 'Семестр 3', id: 3, link: '/tasks' },
  ]

  const [currentSemester, setCurrentSemester] = React.useState(chapters[0]);
  const [isOpenSelectOptions, setIsOpenSelectOptions] = React.useState(false);

  function openSelectOptions() {
    setIsOpenSelectOptions(!isOpenSelectOptions);
  }

  function handleBackBtn() {
    setIsOpenSelectOptions(false);
    backToSemester();
  }

  function chooseOption(option) {
    setCurrentSemester(option);
    setIsOpenSelectOptions(false);
    //navigate('/education/semester/discipline/' + disciplineId + option.link);
  }

  React.useEffect(() => {
    setIsOpenSelectOptions(false);
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
            <p className='semester-header__select-text'>{currentSemester.title}</p>
            <div className={`semester-header__select-arrow ${isOpenSelectOptions ? 'semester-header__select-arrow_status_open' : ''}`}></div>
          </div>
          <div className={`semester-header__select-options-container ${isOpenSelectOptions ? 'semester-header__select-options-container_status_open' : ''}`}>
            <ul className='semester-header__select-options-list'>
              {
                chapters.filter(item => item.id !== currentSemester.id).map((item, i) => (
                  <li className='semester-header__select-options-item' key={i} onClick={() => chooseOption(item)}>
                    <p className='semester-header__select-options-text'>{item.title}</p>
                  </li>
                ))
              }
            </ul>
          </div>
        </div>
      }
      <ul className='semester-header__control-list'>
        <li className='semester-header__control-item'>
          <div className='semester-header__control-item-container'>
            { notificationIcon }
          </div>
        </li>
        <li className='semester-header__control-item'>
          <div className='semester-header__control-item-container'>
            { homeIcon }
          </div>
        </li>
        <li className='semester-header__control-item'>
          <div className='semester-header__control-item-container'>
            { errorIcon }
          </div>
        </li>
        <li className='semester-header__control-item'>
          <div className='semester-header__control-item-container'>
            { exitIcon }
          </div>
        </li>
      </ul>
    </div>
  );
}

export default SemesterHeader;