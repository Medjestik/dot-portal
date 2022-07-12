import React from 'react';
import './Events.css';
import SemesterHeader from '../SemesterHeader/SemesterHeader.js';
import Calendar from '../Calendar/Calendar.js';
import Section from '../Section/Section.js';

function Events({ windowWidth, semesterInfo, onLogout }) {

  return (
    <div className='events'>

      <SemesterHeader semesterInfo={semesterInfo} onLogout={onLogout} />

      <Section title='Расписание' heightType='page' headerType='small'>
        <Calendar />
      </Section>
      

    </div>
  );
}

export default Events;