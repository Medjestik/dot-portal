import React from 'react';
import './PersonTeacherArea.css';
import '../PersonArea/PersonArea.css';
import { photoIcon } from '../PersonArea/PersonIcons/PersonIcons.js';

function PersonArea({ currentUser, openPhotoPopup, openChangePasswordPopup, openDataPopup }) {

  function convertDate(date) {
    return new Date(date).toLocaleString('ru', { month: 'numeric', day: 'numeric', }) + '.' + new Date(date).toLocaleString('sv', { year: 'numeric', });
  }

  return (
    <section className='section person-area'>
      <div className='person-area__container'>
        <div className='person-area__data'>
          {
            currentUser.avatar.link
            ?
              <div className='person-area__photo-container' onClick={openPhotoPopup}>
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
          <p className='person-area__data-login'>{currentUser.login || ''}</p>
          <div className='person-area__data-password'>
            <p className='person-area__data-password-text' onClick={openChangePasswordPopup}>Пароль</p>
            <div className='gear person-area__data-edit' onClick={openChangePasswordPopup}></div>
          </div>

        </div>
        <div className='person-area__info'>
          <div className='person-area__info-container'>
            <h2 className='person-area__name'>{currentUser.fullname || ''}</h2>
            <ul className='person-area__achievements-list'>
              <li className='person-area__achievements-item'><p className='person-area__education-level'>Преподаватель</p></li>
              <li className='person-area__achievements-item'><div className='person-area__achievement person-area__achievement_type_epic'></div></li>
              <li className='person-area__achievements-item'><div className='person-area__achievement person-area__achievement_type_epic'></div></li>
              <li className='person-area__achievements-item'><div className='person-area__achievement person-area__achievement_type_legendary'></div></li>
            </ul>
          </div>
          <ul className='person-area__info-list'>
            <li className='person-area__info-item'>
              <p className='person-area__info-text' onClick={openDataPopup}>{currentUser.birthDate ? convertDate(currentUser.birthDate) : '00.00.0000' }</p>
              <div className='gear person-area__info-edit' onClick={openDataPopup}></div>
            </li>
            <li className='person-area__info-item'>
              <p className='person-area__info-text' onClick={openDataPopup}>{currentUser.snils || '000-000-000 00'}</p>
              <div className='gear person-area__info-edit' onClick={openDataPopup}></div>
            </li>
            <li className='person-area__info-item'>
              <p className='person-area__info-text' onClick={openDataPopup}>{currentUser.phone || '+7 (000) 000-00-00'}</p>
              <div className='gear person-area__info-edit' onClick={openDataPopup}></div>
            </li>
            <li className='person-area__info-item'>
              <p className='person-area__info-text' onClick={openDataPopup}>{currentUser.email || '0000000000000@000000.ru'}</p>
              <div className='gear person-area__info-edit' onClick={openDataPopup}></div>
            </li>
          </ul>
        </div>
      </div>
    </section>
  );
}

export default PersonArea;