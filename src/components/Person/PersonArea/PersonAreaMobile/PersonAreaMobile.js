import React from 'react';
import '../PersonArea.css';
import '../PersonAreaLaptop/PersonAreaLaptop.css';
import './PersonAreaMobile.css';
import { photoIcon } from '../PersonIcons/PersonIcons.js';

function PersonAreaMobile({ currentUser, studentData, openPhotoPopup }) { 

  return (
    <section className='section person-area'>
      <div className='person-area__container'>
        <div className='person-area-laptop__info'>
          <div className='person-area-laptop__info-person'>
            {
              currentUser.avatar 
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
      </div>
    </section>
  );
}

export default PersonAreaMobile;