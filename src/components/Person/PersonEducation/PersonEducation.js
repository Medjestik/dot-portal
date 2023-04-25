import React from 'react';
import './PersonEducation.css';
import Accordion from '../../Accordion/Accordion.js';
import PersonEducationInfoPopup from './PersonEducationInfoPopup/PersonEducationInfoPopup.js';
import educationIcon from '../../../images/accordion/accordion-education.svg';
import statusIcon from '../../../images/status-white.svg';
import { NavLink } from "react-router-dom";

function PersonEducation({ studentEducationInfo, windowWidth }) {

  const [isOpenInfoPopup, setIsOpenInfoPopup] = React.useState(false);
  const [sectionHeight, setSectionHeight] = React.useState(0);

  const heightRef = React.createRef();

  function openInfoPopup() {
    setIsOpenInfoPopup(true);
  }

  function closeInfoPopup() {
    setIsOpenInfoPopup(false);
  }
  
  React.useEffect(() => {
    setIsOpenInfoPopup(false);
  },[]);

  function progressSlider(edu, i) {

    const eduPercent = edu.countOver / (edu.countOver + edu.countCredit) * 100;

    const sliderWidth = {
      width: eduPercent + '%'
    }

    return (
      <div className={`person-education__slider-background person-education__slider-background_type_${i === 0 ? 'current' : 'over'}`}>
        <div style={Object.assign({}, sliderWidth)} className={`person-education__slider person-education__slider_type_${i === 0 ? 'current' : 'over'}`}></div>
      </div>
    )
  }

  React.useEffect(() => {
    setSectionHeight(heightRef.current.clientHeight);
  }, [heightRef, windowWidth]);

  return (
    <>
    <Accordion icon={educationIcon} name='Обучение' height={sectionHeight} openInfoPopup={openInfoPopup}>
      <div ref={heightRef} className='person-education__container'>
        <div className='person-education__status'>
          <img className='person-education__status-icon' alt='иконка' src={statusIcon}></img>
          <span className='person-education__status-count'>{studentEducationInfo.status}%</span>
          <p className='person-education__status-text'>Статус обучения</p>
        </div>
        <ul className='scroll person-education__list'>
          {
            studentEducationInfo.semesters.map((sem, i) => (
              <li className='person-education__item' key={i}>
                <NavLink className='person-education__item-link' to={`/education/semester/` + sem.semesterId + '/disciplines'}>
                  <ul className='person-education__indicators'>
                    <li className='person-education__indicator'>
                      <span 
                      className={`person-education__indicator-count person-education__indicator-count_type_${i === 0 ? 'current' : 'over'}`}>
                        {sem.courseNumber}
                      </span>
                      <p 
                      className={`person-education__indicator-text person-education__indicator-text_type_${i === 0 ? 'current' : 'over'}`}>
                        Курс
                      </p>
                    </li>
                    <li className='person-education__indicator'>
                      <span 
                      className={`person-education__indicator-count person-education__indicator-count_type_${i === 0 ? 'current' : 'over'}`}>
                        {sem.semesterNumber}
                      </span>
                      <p 
                      className={`person-education__indicator-text person-education__indicator-text_type_${i === 0 ? 'current' : 'over'}`}>
                        Семестр
                      </p>
                    </li>
                    <li className='person-education__indicator'>
                      <span 
                      className={`person-education__indicator-count person-education__indicator-count_type_${i === 0 ? 'current' : 'over'}`}>
                        {sem.countOver}
                      </span>
                      <p 
                      className={`person-education__indicator-text person-education__indicator-text_type_${i === 0 ? 'current' : 'over'}`}>
                        Сдано
                      </p>
                    </li>
                    <li className='person-education__indicator'>
                      <span 
                      className={`person-education__indicator-count person-education__indicator-count_type_${i === 0 ? 'current' : 'over'}`}>
                        {sem.countCredit}
                      </span>
                      <p 
                      className={`person-education__indicator-text person-education__indicator-text_type_${i === 0 ? 'current' : 'over'}`}>
                        Долг
                      </p>
                    </li>
                  </ul>
                  {progressSlider(sem, i)}
                </NavLink>
              </li>
            ))
          }
        </ul>
      </div>
    </Accordion>
    {
      isOpenInfoPopup &&
      <PersonEducationInfoPopup
        isOpen={isOpenInfoPopup}
        onClose={closeInfoPopup}
      />
    }
    </>

  );
}

export default PersonEducation; 