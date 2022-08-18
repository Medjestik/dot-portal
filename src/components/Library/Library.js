import React from 'react';
import './Library.css';
import SectionTabs from '../Section/SectionTabs/SectionTabs.js';
import { Route, Routes } from 'react-router-dom';
import LibraryList from './LibraryList/LibraryList.js';
import NormativeList from './NormativeList/NormativeList.js';
import SemesterHeader from '../Education/SemesterHeader/SemesterHeader.js';
import SemesterHeaderBtnBack from '../Education/SemesterHeader/SemesterHeaderBtnBack/SemesterHeaderBtnBack.js';
 
function Library({ windowWidth, onLogout }) {

  const tabs = [
    {
      title: 'Библиотека',
      link: '/library'
    },
    {
      title: 'Нормативная база',
      link: '/library/normative'
    },
  ]

  return (
    <div className='library'>

      <SemesterHeader onLogout={onLogout}>
        <SemesterHeaderBtnBack onBack={() => {}} isPerformFunction={false} />
      </SemesterHeader>

      <div className='library__container'>
        <SectionTabs type='small' tabs={tabs} > 

          <Routes>

            <Route exact path='/' element={ 
                <LibraryList windowWidth={windowWidth} />
              }
            >
            </Route>

            <Route exact path='/normative' element={ 
                <NormativeList windowWidth={windowWidth} />
              }
            >
            </Route>

          </Routes>

        </SectionTabs> 
      </div>
    </div>
  );
}

export default Library; 