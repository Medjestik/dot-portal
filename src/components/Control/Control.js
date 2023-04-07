import React from 'react';
import './Control.css';
import { Route, Routes, useNavigate } from 'react-router-dom';
import SemesterHeader from '../Education/SemesterHeader/SemesterHeader.js';
import SemesterHeaderBtnBack from '../Education/SemesterHeader/SemesterHeaderBtnBack/SemesterHeaderBtnBack.js';
import Section from '../Section/Section.js';
import ControlList from './ControlList/ControlList.js';
import ControlWebinar from './ControlWebinar/ControlWebinar.js';

function Control({ windowWidth, onLogout, semesterInfo }) {

  const navigate = useNavigate();

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
            <button className='btn btn_type_large' type='button' onClick={() => navigate('/control/webinar/list')}>Вебинары</button>
            <ControlList windowWidth={windowWidth} />
          </div>
        </Section>
        </>
        }
      >
      </Route>

      <Route exact path='/webinar/*' element={
          <ControlWebinar windowWidth={windowWidth} onLogout={onLogout} semesterInfo={semesterInfo} />
        }
      >
      </Route>

      </Routes>
    </div>
  );
}

export default Control; 