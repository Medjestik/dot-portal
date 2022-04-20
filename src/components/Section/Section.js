import React from 'react';
import './Section.css';

function Section({ title, heightType, headerType, children }) {

  return (
    <section className='section__student'>
      <ul className='section__student-list'>
        <li className={`section__student-item section__student-item_type_${headerType}`}>
          <h4 className='section__student-title'>{title}</h4>
        </li>
      </ul>
      <div className={`section section__student-container section__student-container_type_${heightType}`}>
        {children}
      </div>
    </section>
  );
}

export default Section;  