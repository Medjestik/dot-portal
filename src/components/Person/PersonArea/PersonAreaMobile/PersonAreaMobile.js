import React from 'react';
import '../PersonArea.css';
import '../PersonAreaLaptop/PersonAreaLaptop.css';
import './PersonAreaMobile.css';
import groupIcon from '../../../../images/group.svg';

function PersonAreaMobile({ currentUser, studentData, openPhotoPopup }) { 

  return (
    <section className='section person-area'>
      <div className='person-area__data-mobile'>
        
        <div className='person-area__data-container'>
          {
            currentUser.avatar.link
            ?
            <div className='person-area__photo-container' onClick={openPhotoPopup}>
              <img className='person-area__photo' src={currentUser.avatar.link} alt='' onClick={openPhotoPopup}></img>
              <div className='person-area__icon-container'>
                <div className='person-area__photo-icon'></div>
              </div>
            </div>
            :
            <div className='person-area__photo-container' onClick={openPhotoPopup}>
              <div className='person-area__icon-container'>
                <div className='person-area__photo-icon'></div>
              </div>
            </div>
          }

          <div className='person-area__info-container'>
            <h2 className='person-area__name'>{currentUser.fullname || ''}</h2>
            <ul className='person-area__achievements-list'>
              <li className='person-area__achievements-item'><div className='person-area__achievement person-area__achievement_type_epic'></div></li>
              <li className='person-area__achievements-item'><div className='person-area__achievement person-area__achievement_type_epic'></div></li>
              <li className='person-area__achievements-item'><div className='person-area__achievement person-area__achievement_type_epic'></div></li>
              <li className='person-area__achievements-item'><div className='person-area__achievement person-area__achievement_type_legendary'></div></li>
            </ul>
          </div>
        </div>

        <div className='person-area__education'>
          <div className='person-area__education-container'>
            <div className='person-area__education-group'>
              <img className='person-area__education-group-icon' src={groupIcon} alt='иконка'></img>
              <h6 className='person-area__education-group-title'>{studentData.groupName || ''}</h6>
            </div>
            <div className='person-area__education-card person-area__education-card_type_course'>
              <h6 className='person-area__education-title'><span className='person-area__education-count person-area__education-count_margin_right'>{studentData.courseNum || ''}</span> курс</h6>
            </div>
            <div className='person-area__education-card person-area__education-card_type_semester'>
              <h6 className='person-area__education-title'><span className='person-area__education-count person-area__education-count_margin_right'>{studentData.semesterNum || ''}</span> семестр</h6>
            </div>
            <div className='person-area__education-card person-area__education-card_type_count'>
              <h6 className='person-area__education-title'>Порядковый номер в группе: <span className='person-area__education-count person-area__education-count_margin_left'>{studentData.groupPosition || '—'}</span></h6>
            </div>
          </div>
        </div>

        <ul className='data__list data__list_margin_top'>
          <li className='data__item'>
            <p className='data__text'><span className='data__text_font_bold'>Направление:</span>{studentData.direction || ''}</p>
          </li>
          <li className='data__item'>
            <p className='data__text'><span className='data__text_font_bold'>Профиль:</span>{studentData.profil || ''}</p>
          </li>
        </ul>

      </div>
    </section>
  );
}

export default PersonAreaMobile;