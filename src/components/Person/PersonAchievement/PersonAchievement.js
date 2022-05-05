import React from 'react';
import './PersonAchievement.css';
import Accordion from '../../Accordion/Accordion.js';
import achievementIcon from '../../../images/accordion/accordion-achievement.svg';
import groupRatingIcon from '../../../images/group-rating.svg';
import mainRatingIcon from '../../../images/main-rating.svg';
import PersonAchievementInfoPopup from './PersonAchievementInfoPopup/PersonAchievementInfoPopup.js';


function PersonAchievement({ user, windowWidth }) {

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
    setSectionHeight(heightRef.current.clientHeight);
  }, [heightRef, windowWidth]);
  
  React.useEffect(() => {
    setIsOpenInfoPopup(false);
  }, []);

  return (
    <>
    <Accordion icon={achievementIcon} name={windowWidth > 833 ? 'Рейтинг и достижения' : 'Рейтинг'} height={sectionHeight} openInfoPopup={openInfoPopup}>
      <div ref={heightRef} className='person-achievement'>
        <div className='person-achievement__rating'>
          {
            windowWidth > 1400 && 
            <p className='person-achievement__subtitle'>Ваша оценка достижений</p>
          }
          <div className='person-achievement__container'>
            <div className='person-achievement__group-rating'>
              <img className='person-achievement__group-rating-img' src={groupRatingIcon} alt='иконка'></img>
              <span className='person-achievement__group-rating-count'>{user.groupRating}</span>
              <p className='person-achievement__group-rating-text'>Место в&nbsp;группе</p>
            </div>
            <div className='person-achievement__main-rating'>
              <img className='person-achievement__main-rating-img' src={mainRatingIcon} alt='иконка'></img>
              <span className='person-achievement__main-rating-count'>{user.mainRating}</span>
              <p className='person-achievement__main-rating-text'>Место на&nbsp;бакалавре</p>
            </div>
          </div>
        </div>

        <div className='person-achievement__achievement-list'>
          <p className='person-achievement__subtitle'>Ваши достижения</p>
          <ul className='person-achievement__achievement-list-container'>
              {user.achievements.map((item, i) => (
                <li className='person-achievement__achievement-item' key={i}>
                  <div className='person-achievement__achievement-img'></div>
                  <p className='person-achievement__achievement-text'>{item}</p>
                </li>
              ))}
          </ul>          
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