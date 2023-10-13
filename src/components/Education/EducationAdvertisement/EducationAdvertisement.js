import React from 'react';
import './EducationAdvertisement.css';

function EducationAdvertisement({ advertisement, onOpen }) {

  return (
    <li key={advertisement.id} className='discipline-info__advertisement-item'>
      <button className={`btn-icon btn-icon_color_accent-blue ${advertisement.type === 'advertisement' ? 'btn-icon_type_users' : 'btn-icon_type_comment'}`} type='button' onClick={(() => onOpen(advertisement))}></button>
      <div className='discipline-info__advertisement-info'>
        <h5 className='discipline-info__advertisement-title'>{advertisement.title}</h5>
        <p className='discipline-info__teacher-text'>
          <span className='discipline-info__teacher-text_weight_bold'>Автор: </span>
          {advertisement.author}
        </p>
        <p className='discipline-info__teacher-text'>
          <span className='discipline-info__teacher-text_weight_bold'>Дата публикации: </span>
          {advertisement.date}
        </p>
      </div>
    </li>
  )
}

export default EducationAdvertisement; 