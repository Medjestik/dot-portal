import React from 'react';
import './PersonAchievement.css';
import Accordion from '../../Accordion/Accordion.js';
import achievementIcon from '../../../images/accordion/accordion-achievement.png';
import groupRating from '../../../images/group-rating.png';
import mainRating from '../../../images/main-rating.png';
import PersonAchievementInfoPopup from './PersonAchievementInfoPopup/PersonAchievementInfoPopup.js';

function PersonAchievement({ user }) {

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

  return (
    <>
    <Accordion icon={achievementIcon} name='Рейтинг и достижения' height={322} openInfoPopup={openInfoPopup}>
      <div className='person-achievement'>
        <div className='person-achievement__rating'>
          <p className='person-achievement__subtitle'>Ваша оценка достижений среди обучающихся.</p>
          <div className='person-achievement__container'>
            <div className='person-achievement__group-rating'>
              <img className='person-achievement__group-rating-img' src={groupRating} alt="иконка место в группе"></img>
              <span className='person-achievement__group-rating-count'>{user.groupRating}</span>
              <p className='person-achievement__group-rating-text'>Место в&nbsp;группе</p>
            </div>
            <div className='person-achievement__main-rating'>
              <img className='person-achievement__main-rating-img' src={mainRating} alt="иконка место на бакалавре"></img>
              <span className='person-achievement__main-rating-count'>{user.mainRating}</span>
              <p className='person-achievement__main-rating-text'>Место на&nbsp;бакалавре</p>
            </div>
            <ul className='person-achievement__achievement-list'>
              {user.achievements.map((item, i) => (
                <li className='person-achievement__achievement-item' key={i}>
                  <div className='person-achievement__achievement-img'></div>
                  <p className='person-achievement__achievement-text'>{item}</p>
                </li>
              ))}
            </ul>
          </div>
          
        </div>
        <div className='person-achievement__classmates'>
          <p className='person-achievement__subtitle'>Топ-3 одногруппников</p>
          <ul className='person-achievement__classmates-list'>
            {user.achievementsClassmates.map((item, i) => (
              <li className='person-achievement__classmates-item' key={i}>
                <div className='person-achievement__classmates-img'></div>
                <p className='person-achievement__classmates-text'>{item}</p>
              </li>
            ))}
          </ul>
        </div>
      </div> 
    </Accordion>
    {
      isOpenInfoPopup &&
      <PersonAchievementInfoPopup
        isOpen={isOpenInfoPopup}
        onClose={closeInfoPopup}
      />
    }
    </>

  );
}

export default PersonAchievement;