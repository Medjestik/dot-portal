import React from 'react';
import './Document.css';
import SectionTabs from '../Section/SectionTabs/SectionTabs.js';
import SemesterHeader from '../Education/SemesterHeader/SemesterHeader.js';
import SemesterHeaderBtnBack from '../Education/SemesterHeader/SemesterHeaderBtnBack/SemesterHeaderBtnBack.js';
import DocumentList from './DocumentList/DocumentList.js';
import MaterialList from './MaterialList/MaterialList.js';
import { Route, Routes } from 'react-router-dom';

function Document({ onLogout }) {

  const tabs = [
    {
      title: 'Документы',
      link: '/document'
    },
    {
      title: 'Материалы',
      link: '/document/material'
    },
  ]

  return (

    <div className='document'>
      
      <SemesterHeader onLogout={onLogout}>
        <SemesterHeaderBtnBack onBack={() => {}} isPerformFunction={false} />
      </SemesterHeader>
      
      <div className='document__container'>
        <SectionTabs type='small' tabs={tabs} > 

        <Routes>

          <Route exact path='/' element={ 
              <DocumentList />
            }
          >
          </Route>

          <Route exact path='/material' element={ 
              <MaterialList />
            }
          >
          </Route> 

        </Routes>


        </SectionTabs>
      </div>
    </div>

  );
}

export default Document; 