import React from 'react';
import './Document.css';
import SectionTabs from '../Section/SectionTabs/SectionTabs.js';
import SemesterHeader from '../SemesterHeader/SemesterHeader.js';
import DocumentList from './DocumentList/DocumentList.js';
import MaterialList from './MaterialList/MaterialList.js';
import { Route, Routes } from 'react-router-dom';

function Document({ semesterInfo, onLogout }) {

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
      
      <SemesterHeader semesterInfo={semesterInfo} onLogout={onLogout} />
      
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