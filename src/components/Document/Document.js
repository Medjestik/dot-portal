import React from 'react';
import './Document.css';
import SectionTabs from '../Section/SectionTabs/SectionTabs.js';
import SemesterHeader from '../SemesterHeader/SemesterHeader.js';
import DocumentList from './DocumentList/DocumentList.js';
import MaterialList from './MaterialList/MaterialList.js';
import { Route, Routes, useNavigate } from 'react-router-dom';

function Document() {

  const navigate = useNavigate();

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


  function backToSemester() {
  }

  return (

    <div className='document'> 
      <SemesterHeader isDisciplineOpen={false} backToSemester={backToSemester} />

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