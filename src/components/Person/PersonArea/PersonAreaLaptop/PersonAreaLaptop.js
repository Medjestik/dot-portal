import React from 'react';
import '../PersonArea.css';
import './PersonAreaLaptop.css';
import groupIcon from '../../../../images/group.svg';

function PersonAreaLaptop({ currentUser, studentData, openPhotoPopup, openChangePasswordPopup, openDataPopup }) { 

  function convertDate(date) {
    return new Date(date).toLocaleString('ru', { month: 'numeric', day: 'numeric', }) + '.' + new Date(date).toLocaleString('sv', { year: 'numeric', });
  }

  return (
    <section className='section person-area'>
      <div className='person-area__container'>
        <div className='person-area__data'>
          
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

          <ul className='person-area__data-list'>
            <li className='person-area__data-item'>
              <p className='person-area__data-text'><span className='person-area__data-text_font_bold'>Статус:</span>{studentData.qualification || ''}</p>
            </li>
            <li className='person-area__data-item'>
              <p className='person-area__data-text'><span className='person-area__data-text_font_bold'>Логин:</span>{currentUser.login || ''}</p>
            </li>
            <li className='person-area__data-item'>
              <p className='person-area__data-text'><span className='person-area__data-text_font_bold'>Дата рождения:</span>{currentUser.birthDate ? convertDate(currentUser.birthDate) : '00.00.0000' }</p>
            </li>
            <li className='person-area__data-item'>
              <p className='person-area__data-text'><span className='person-area__data-text_font_bold'>СНИЛС:</span>{currentUser.snils || '000-000-000 00'}</p>
            </li>
            <li className='person-area__data-item'>
              <p className='person-area__data-text'><span className='person-area__data-text_font_bold'>Телефон:</span>{currentUser.phone || '+7 (000) 000-00-00'}</p>
            </li>
            <li className='person-area__data-item'>
              <p className='person-area__data-text'><span className='person-area__data-text_font_bold'>Почта:</span>{currentUser.email || '0000000000000@000000.ru'}</p>
            </li>
          </ul>

          <div className='person-area__data-control'>
            <p className='person-area__data-control-text' onClick={openDataPopup}>Изменить данные</p>
            <p className='person-area__data-control-text' onClick={openChangePasswordPopup}>Изменить пароль</p>
          </div>
        </div>
      
        <span className='person-area__separate'></span>

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

          <ul className='person-area__data-list'>
            <li className='person-area__data-item'>
              <p className='person-area__data-text'><span className='person-area__data-text_font_bold'>Направление:</span>{studentData.direction || ''}</p>
            </li>
            <li className='person-area__data-item'>
              <p className='person-area__data-text'><span className='person-area__data-text_font_bold'>Профиль:</span>{studentData.profil || ''}</p>
            </li>
          </ul>

        </div>

        <span className='person-area__separate'></span>
        
      </div>
    </section>
  );
}

export default PersonAreaLaptop;