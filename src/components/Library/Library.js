import React from 'react';
import './Library.css';
import SectionTabs from '../Section/SectionTabs/SectionTabs.js';
import SemesterHeader from '../SemesterHeader/SemesterHeader.js';
import { Route, Routes } from 'react-router-dom';
import LibraryList from './LibraryList/LibraryList.js';
import NormativeList from './NormativeList/NormativeList.js';

function Library() {

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
      {
        //<SemesterHeader isDisciplineOpen={false} backToSemester={() => {}} />
      }
      
      
      <div className='library__container'>
        <SectionTabs type='small' tabs={tabs} > 

          <Routes>

            <Route exact path='/' element={ 
                <LibraryList />
              }
            >
            </Route>

            <Route exact path='/normative' element={ 
                <NormativeList />
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