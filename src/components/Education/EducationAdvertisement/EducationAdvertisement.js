import React from 'react';
import './EducationAdvertisement.css';

function EducationAdvertisement({ advertisement, onOpen }) {

  return (
    <li className='education-advertisement'>
      {
        advertisement.authorImg
        ?
        <img className='education-advertisement__author-img' src={advertisement.authorImg} alt='аватар'></img>
        :
        <div className='education-advertisement__author-img'></div>
      }
      <div className='education-advertisement__info'>
        <h5 className='education-advertisement__title' onClick={(() => onOpen(advertisement))}>{advertisement.title}</h5>
        <p className='education-advertisement__caption'>Автор: {advertisement.author}</p>
        <p className='education-advertisement__caption'>Дата публикации: {advertisement.date}</p>
      </div>
    </li>
  )
}

export default EducationAdvertisement; 