import React from 'react';
import './PersonArea.css';
import { CurrentUserContext } from '../../../contexts/CurrentUserContext.js';
import groupIcon from '../../../images/group.svg';
import { photoIcon } from './PersonIcons/PersonIcons.js';
import PersonAreaPhotoPopup from './PersonAreaPhotoPopup/PersonAreaPhotoPopup.js';
import PersonAreaChangePasswordPopup from './PersonAreaChangePasswordPopup/PersonAreaChangePasswordPopup.js';
import PersonAreaDatePopup from './PersonAreaDatePopup/PersonAreaDatePopup.js';
import PersonAreaIdentifierPopup from './PersonAreaIdentifierPopup/PersonAreaIdentifierPopup.js';
import PersonAreaPhonePopup from './PersonAreaPhonePopup/PersonAreaPhonePopup.js';
import PersonAreaMailPopup from './PersonAreaMailPopup/PersonAreaMailPopup.js';
import adminPhoto from '../../../images/photo/dekan.png';

function PersonArea({ user, studentData }) { 

  const [isPhotoPopupOpen, setIsPhotoPopupOpen] = React.useState(false);
  const [isChangePasswordPopupOpen, setIsChangePasswordPopupOpen] = React.useState(false); 
  const [isDatePopupOpen, setIsDatePopupOpen] = React.useState(false);
  const [isIdentifierPopupOpen, setIsIdentifierPopupOpen] = React.useState(false);
  const [isPhonePopupOpen, setIsPhonePopupOpen] = React.useState(false);
  const [isMailPopupOpen, setIsMailPopupOpen] = React.useState(false);

  const currentUser = React.useContext(CurrentUserContext);

  function openPhotoPopup() {
    setIsPhotoPopupOpen(true);
  }

  function openChangePasswordPopup() {
    setIsChangePasswordPopupOpen(true);
  }

  function openDatePopup() {
    setIsDatePopupOpen(true);
  }

  function openIdentifierPopup() {
    setIsIdentifierPopupOpen(true);
  }

  function openPhonePopup() {
    setIsPhonePopupOpen(true);
  }

  function openMailPopup() {
    setIsMailPopupOpen(true);
  }

  function closePersonAreaPopup() { 
    setIsPhotoPopupOpen(false);
    setIsChangePasswordPopupOpen(false);
    setIsDatePopupOpen(false);
    setIsIdentifierPopupOpen(false);
    setIsPhonePopupOpen(false);
    setIsMailPopupOpen(false);
  }
  
  React.useEffect(() => {
    setIsPhotoPopupOpen(false);
    setIsChangePasswordPopupOpen(false);
    setIsDatePopupOpen(false);
  },[]);

  return (
    <>
    <section className='section person-area'>
      <div className='person-area__container'>
        <div className='person-area__data'>
          {
            currentUser.avatar 
            ?
              <div className='person-area__photo-container' onClick={openPhotoPopup}>
                <img className='person-area__photo' src={currentUser.avatar } alt='' onClick={openPhotoPopup}></img>
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
            <p className='person-area__data-password-text'>Пароль</p>
            <div className='gear person-area__data-edit' onClick={openChangePasswordPopup}></div>
          </div>

        </div>
        <div className='person-area__info'>
          <div className='person-area__info-container'>
            <h2 className='person-area__name'>{currentUser.fullname || ''}</h2>
            <ul className='person-area__achievements-list'>
              <li className='person-area__achievements-item'><p className='person-area__education-level'>{studentData.qualification || ''}</p></li>
              <li className='person-area__achievements-item'><div className='person-area__achievement person-area__achievement_type_epic'></div></li>
              <li className='person-area__achievements-item'><div className='person-area__achievement person-area__achievement_type_epic'></div></li>
              <li className='person-area__achievements-item'><div className='person-area__achievement person-area__achievement_type_epic'></div></li>
              <li className='person-area__achievements-item'><div className='person-area__achievement person-area__achievement_type_legendary'></div></li>
            </ul>
          </div>
          <ul className='person-area__info-list'>
            <li className='person-area__info-item'>
              <p className='person-area__info-text'>{currentUser.birthDate || '00.00.0000'}</p>
              <div className='gear person-area__info-edit' onClick={openDatePopup}></div>
            </li>
            <li className='person-area__info-item'>
              <p className='person-area__info-text'>{currentUser.inn || '000-000-000 00'}</p>
              <div className='gear person-area__info-edit' onClick={openIdentifierPopup}></div>
            </li>
            <li className='person-area__info-item'>
              <p className='person-area__info-text'>{currentUser.phone || '+7 (000) 000-00-00'}</p>
              <div className='gear person-area__info-edit' onClick={openPhonePopup}></div>
            </li>
            <li className='person-area__info-item'>
              <p className='person-area__info-text'>{currentUser.email || '0000000000000@000000.ru'}</p>
              <div className='gear person-area__info-edit' onClick={openMailPopup}></div>
            </li>
          </ul>

        </div>
        <div className='person-area__separate'></div>
        <div className='person-area__contact'>
          <div className='person-area__contact-info'>
            {
              studentData.curator.pict_url
              ?
                <img className='person-area__contact-photo' src={studentData.curator.pict_url} alt='фотография куратора'></img>
              :
                <div className='person-area__contact-photo-empty'>{user.curatorPhoto}</div>
            }
            <div className='person-area__contact-info-container'>
              <h3 className='person-area__contact-name'>{studentData.curator.fullname || ''}</h3>
              <p className='person-area__contact-caption'>Куратор</p>
            </div>
          </div>
          <p className='person-area__contact-phone'>{studentData.curator.phone || '+7 (000) 000-00-00'}</p>
          <p className='person-area__contact-mail'>{studentData.curator.email || '0000000000000@000000.ru'}</p>
          <div className='person-area__education'>
            <div className='person-area__group'>
              <img className='person-area__group-icon' src={groupIcon} alt='иконка'></img>
              <h6 className='person-area__group-title'>{studentData.groupName || ''}</h6>
            </div>
            <div className='person-area__education-card person-area__education-card_type_course'>
              <h6 className='person-area__education-title'><span className='person-area__education-count'>{studentData.courseNum || ''}</span> курс</h6>
            </div>
            <div className='person-area__education-card person-area__education-card_type_semester'>
              <h6 className='person-area__education-title'><span className='person-area__education-count'>{studentData.semesterNum || ''}</span> семестр</h6>
            </div>
          </div>
  
        </div>
        <div className='person-area__contact'>
          <div className='person-area__contact-info'>
            {
              studentData.decan.pict_url
              ?
                <img className='person-area__contact-photo' src={studentData.decan.pict_url} alt='фотография декана'></img>
              :
                <div className='person-area__contact-photo-empty'>{user.curatorPhoto}</div>
            }
            <div className='person-area__contact-info-container'>
              <h3 className='person-area__contact-name'>{studentData.decan.fullname || ''}</h3>
              <p className='person-area__contact-caption'>Декан</p>
            </div>
          </div>
          <p className='person-area__contact-phone'>{studentData.decan.phone || '+7 (000) 000-00-00'}</p>
          <p className='person-area__contact-mail'>{studentData.decan.email || '0000000000000@000000.ru'}</p>
          <div className='person-area__program'>
            <h5 className='person-area__program-direction'>{studentData.direction || ''}</h5>
            <p className='person-area__program-profile'>{studentData.profil || ''}</p>
          </div>
          
        </div>

      </div>
    </section>
    {
      isPhotoPopupOpen &&
      <PersonAreaPhotoPopup
        isOpen={isPhotoPopupOpen}
        onClose={closePersonAreaPopup}
        currentUser={currentUser}
      />
    }
    {
      isChangePasswordPopupOpen &&
      <PersonAreaChangePasswordPopup
        isOpen={isChangePasswordPopupOpen}
        onClose={closePersonAreaPopup}
      />
    }
    {
      isDatePopupOpen &&
      <PersonAreaDatePopup
        isOpen={isDatePopupOpen}
        onClose={closePersonAreaPopup}
      />
    }
    {
      isIdentifierPopupOpen &&
      <PersonAreaIdentifierPopup
        isOpen={isIdentifierPopupOpen}
        onClose={closePersonAreaPopup}
      />
    }
    {
      isPhonePopupOpen &&
      <PersonAreaPhonePopup
      isOpen={isPhonePopupOpen}
      onClose={closePersonAreaPopup} 
      />
    }
    {
      isMailPopupOpen &&
      <PersonAreaMailPopup
      isOpen={isMailPopupOpen}
      onClose={closePersonAreaPopup}
      />
    }
    </>
  );
}

export default PersonArea;