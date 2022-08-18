import React from 'react';
import './Events.css';
import SemesterHeader from '../Education/SemesterHeader/SemesterHeader.js';
import SemesterHeaderBtnBack from '../Education/SemesterHeader/SemesterHeaderBtnBack/SemesterHeaderBtnBack.js';
import Calendar from '../Calendar/Calendar.js';
import Section from '../Section/Section.js';

function Events({ windowWidth, onLogout }) {

  return (
    <div className='events'>

      <SemesterHeader onLogout={onLogout}>
        <SemesterHeaderBtnBack onBack={() => {}} isPerformFunction={false} />
      </SemesterHeader>

      <Section title='Расписание' heightType='page' headerType='small'>
        <Calendar />
      </Section>
      

    </div>
  );
}

export default Events;