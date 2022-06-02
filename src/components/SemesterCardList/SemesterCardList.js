import React from 'react';
import './SemesterCardList.css';
import SemesterCard from '../SemesterCard/SemesterCard.js';

function SemesterCardList({ disciplines, openDiscipline }) {

  return (
    <div className='semester-card'>

      {
        disciplines.length > 0 
        ?
        <ul className='semester-card__list'>
          {
            disciplines.map((item, i) => (
              <SemesterCard item={item} key={i} openDiscipline={openDiscipline} />
            ))
          }
        </ul>
        :
        <div className='semester-card__text semester-card__text_color_grey'>Дисциплины отсутствуют</div>
      }
      
    </div>
  );
}

export default SemesterCardList;  