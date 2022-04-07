import React from 'react';
import './Section.css';

function Section({ title, type, children }) {

  return (
    <section className='section__student'>
      <ul className='section__student-list'>
        <li className={`section__student-item section__student-item_type_${type}`}>
          <h4 className='section__student-title'>{title}</h4>
        </li>
      </ul>
      <div className='section section__student-container'>
        {children}
      </div>
    </section>
  );
}

export default Section; 