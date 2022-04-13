import React from 'react';
import './PersonEducation.css';
import Accordion from '../../Accordion/Accordion.js';
import PersonEducationInfoPopup from './PersonEducationInfoPopup/PersonEducationInfoPopup.js';
import educationIcon from '../../../images/accordion/accordion-education.svg';
import statusIcon from '../../../images/status-white.svg';

function PersonEducation({ user, userEducation }) {

  const [isOpenInfoPopup, setIsOpenInfoPopup] = React.useState(false);

  function openInfoPopup() {
    setIsOpenInfoPopup(true);
  }

  function closeInfoPopup() {
    setIsOpenInfoPopup(false);
  }
  
  React.useEffect(() => {
    setIsOpenInfoPopup(false);
  },[]);

  function progressSlider(edu) {

    const eduPercent = edu.over / (edu.over + edu.credit) * 100;

    const sliderWidth = {
      width: eduPercent + '%'
    }

    return (
      <div className={`person-education__slider-background person-education__slider-background_type_${edu.status}`}>
        <div style={Object.assign({}, sliderWidth)} className={`person-education__slider person-education__slider_type_${edu.status}`}></div>
      </div>
    )
  }

  return (
    <>
    <Accordion icon={educationIcon} name='Обучение' height={296} openInfoPopup={openInfoPopup}>
      <div className='person-education__container'>
        <div className='person-education__status'>
          <img className='person-education__status-icon' alt='иконка' src={statusIcon}></img>
          <span className='person-education__status-count'>{user.educationStatus}%</span>
          <p className='person-education__status-text'>Статус обучения</p>
        </div>
        <ul className='scroll person-education__list'>
          {
            userEducation.map((edu, i) => (
              <li className='person-education__item' key={i}>
                <ul className='person-education__indicators'>
                  <li className='person-education__indicator'>
                    <span className={`person-education__indicator-count person-education__indicator-count_type_${edu.status}`}>{edu.course}</span>
                    <p className={`person-education__indicator-text person-education__indicator-text_type_${edu.status}`}>Курс</p>
                  </li>
                  <li className='person-education__indicator'>
                    <span className={`person-education__indicator-count person-education__indicator-count_type_${edu.status}`}>{edu.semester}</span>
                    <p className={`person-education__indicator-text person-education__indicator-text_type_${edu.status}`}>Семестр</p>
                  </li>
                  <li className='person-education__indicator'>
                    <span className={`person-education__indicator-count person-education__indicator-count_type_${edu.status}`}>{edu.over}</span>
                    <p className={`person-education__indicator-text person-education__indicator-text_type_${edu.status}`}>Сдано</p>
                  </li>
                  <li className='person-education__indicator'>
                    <span className={`person-education__indicator-count person-education__indicator-count_type_${edu.status}`}>{edu.credit}</span>
                    <p className={`person-education__indicator-text person-education__indicator-text_type_${edu.status}`}>Долг</p>
                  </li>
                </ul>
                {progressSlider(edu)}
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