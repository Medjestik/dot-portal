import React from 'react';
import './Control.css';
import { Route, Routes } from 'react-router-dom';
import SemesterHeader from '../Education/SemesterHeader/SemesterHeader.js';
import SemesterHeaderBtnBack from '../Education/SemesterHeader/SemesterHeaderBtnBack/SemesterHeaderBtnBack.js';
import Section from '../Section/Section.js';
import ControlNavigate from './ControlNavigate/ControlNavigate.js';
import ControlWebinar from './ControlWebinar/ControlWebinar.js';
import ControlGroup from './ControlGroup/ControlGroup.js';
import CuratorDiscipline from '../Curator/CuratorDiscipline/CuratorDiscipline.js';

function Control({ windowWidth, onLogout, semesterInfo }) {

  return (
    <div className='control'>
      <Routes>
        <Route exact path='/' element={ 
          <>
          <SemesterHeader onLogout={onLogout}>
            <SemesterHeaderBtnBack onBack={() => {}} isPerformFunction={false} />
          </SemesterHeader>
          <Section title='Управление'  heightType='content' headerType='small' >
            <div className='control__container'>
              
            </div>
          </Section>
          <ControlNavigate windowWidth={windowWidth} />
          </>
          }
        >
        </Route>

        <Route exact path='/webinar/*' element={
            <ControlWebinar windowWidth={windowWidth} onLogout={onLogout} semesterInfo={semesterInfo} />
          }
        >
        </Route>

        <Route exact path='/group/*' element={
            <ControlGroup windowWidth={windowWidth} onLogout={onLogout} />
          }
        >
        </Route>

        <Route path='/discipline/:disciplineId/*' element={
            <>
              <SemesterHeader onLogout={onLogout}>
                <SemesterHeaderBtnBack onBack={() => {}} isPerformFunction={false} />
              </SemesterHeader>
              <CuratorDiscipline windowWidth={windowWidth} role='control' />
            </>
          }
        >
        </Route>

      </Routes>
    </div>
  );
}

export default Control;