import React from 'react';
import './Section.css';

function Section({ title, heightType, headerType, children }) {

  return (
    <section className={`section__education section__education_type_${heightType}`}>
      <ul className='section__education-list'>
        <li className={`section__education-item section__education-item_type_${headerType}`}>
          <h4 className='section__education-title'>{title}</h4>
        </li>
      </ul>
      <div className={`section section__education-container section__education-container_type_${heightType}`}>
        {children}
      </div>
    </section>
  );
}

export default Section;  