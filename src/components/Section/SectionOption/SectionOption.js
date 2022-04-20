import React from 'react';
import './SectionOption.css';

function SectionOption({ type, options, children }) {

  return (
    <section className='section__options'>
      <ul className='section__options-list'>
        {
          options.map((item, i) => (
            <li key={i} className={`section__options-item section__options-item_type_${type} ${item.status ? 'section__options-item_type_active' : ''}`}>
              <h4 className='section__options-title'>{item.title}</h4>
            </li>
          ))
        }
      </ul>
      <div className='section section__options-container'>
        {children}
      </div>
    </section>

  );
}

export default SectionOption;