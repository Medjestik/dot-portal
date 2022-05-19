import React from 'react';
import '../PersonArea.css';
import './PersonAreaLaptop.css';
import { photoIcon } from '../PersonIcons/PersonIcons.js';

function PersonAreaLaptop({ currentUser, studentData, openPhotoPopup }) { 

  return (
    <section className='section person-area'>
      <div className='person-area__container'>
        <div className='person-area-laptop__info'>
          <div className='person-area-laptop__info-person'>
            {
              currentUser.avatar.link 
              ?
                <div className='person-area__photo-container person-area-laptop__photo-container' onClick={openPhotoPopup}>
                  <img className='person-area__photo' src={currentUser.avatar.link} alt='' onClick={openPhotoPopup}></img>
                  <div className='person-area__icon-container'>
                    { photoIcon }
                  </div>
                </div>
              :
                <div className='person-area__photo-container' onClick={openPhotoPopup}>
                  <div className='person-area__icon-container'>
                    { photoIcon }
                  </div>
                </div>
            }
            <div className='person-area__info-container'>
              <h2 className='person-area__name'>{currentUser.fullname || ''}</h2>
              <ul className='person-area__achievements-list'>
                <li className='person-area__achievements-item'><p className='person-area__education-level'>{studentData.qualification || ''}</p></li>
                <li className='person-area__achievements-item'><div className='person-area__achievement person-area__achievement_type_epic'></div></li>
                <li className='person-area__achievements-item'><div className='person-area__achievement person-area__achievement_type_epic'></div></li>
                <li className='person-area__achievements-item'><div className='person-area__achievement person-area__achievement_type_legendary'></div></li>
              </ul>
            </div>
          </div>
          <div className='person-area-laptop__info-data'>
            <div className='person-area__group'>
              <h6 className='person-area__group-title'>{studentData.groupName || ''}</h6>
            </div>
            <div className='person-area__education-card person-area__education-card_type_course'>
              <h6 className='person-area__education-title'><span className='person-area__education-count'>{studentData.courseNum || ''}</span> курс</h6>
            </div>
            <div className='person-area__education-card person-area__education-card_type_semester'>
              <h6 className='person-area__education-title'><span className='person-area__education-count'>{studentData.semesterNum || ''}</span> семестр</h6>
            </div>
          </div>
          <div className='person-area__program'>
            <h5 className='person-area__program-direction'>{studentData.direction || ''}</h5>
            <p className='person-area__program-profile'>{studentData.profil || ''}</p>
          </div>

        </div>
        <div className='person-area__separate'></div>
        <div className='person-area__contact'>
          <div className='person-area__contact-info'>
            {
              studentData.curator.pict_url
              ?
                <img className='person-area__contact-photo' src={studentData.curator.pict_url} alt='фотография куратора'></img>
              :
                <div className='person-area__contact-photo-empty'></div>
            }
            <div className='person-area__contact-info-container'>
              <h3 className='person-area__contact-name'>{studentData.curator.fullname || ''}</h3>
              <p className='person-area__contact-caption'>Куратор</p>
              <p className='person-area__contact-phone'>{studentData.curator.phone || '+7 (000) 000-00-00'}</p>
              <p className='person-area__contact-mail'>{studentData.curator.email || '0000000000000@000000.ru'}</p>
            </div>
          </div>
          <div className='person-area__contact-info'>
            {
              studentData.decan.pict_url
              ?
                <img className='person-area__contact-photo' src={studentData.decan.pict_url} alt='фотография декана'></img>
              :
                <div className='person-area__contact-photo-empty'></div>
            }
            <div className='person-area__contact-info-container'>
              <h3 className='person-area__contact-name'>{studentData.decan.fullname || ''}</h3>
              <p className='person-area__contact-caption'>Декан</p>
              <p className='person-area__contact-phone'>{studentData.decan.phone || '+7 (000) 000-00-00'}</p>
              <p className='person-area__contact-mail'>{studentData.decan.email || '0000000000000@000000.ru'}</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default PersonAreaLaptop;