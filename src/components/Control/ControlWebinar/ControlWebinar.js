import React from 'react';
import './ControlWebinar.css';
import SectionTabs from '../../Section/SectionTabs/SectionTabs.js';
import { Route, Routes, useNavigate } from 'react-router-dom';
import SemesterHeader from '../../Education/SemesterHeader/SemesterHeader.js';
import SemesterHeaderBtnBack from '../../Education/SemesterHeader/SemesterHeaderBtnBack/SemesterHeaderBtnBack.js';
import ControlWebinarList from './ControlWebinarList/ControlWebinarList.js';
import ControlWebinarDiscipline from './ControlWebinarDiscipline/ControlWebinarDiscipline.js';
import ControlWebinarAdd from './ControlWebinarAdd/ControlWebinarAdd.js';
import ControlWebinarEdit from './ControlWebinarEdit/ControlWebinarEdit.js';
 
function ControlWebinar({ windowWidth, onLogout, semesterInfo }) {

  const navigate = useNavigate();

  const [webinarAction, setWebinarAction] = React.useState('');

  const tabs = [
    {
      title: 'Список вебинаров',
      link: '/control/webinar/list'
    },
    {
      title: 'Вебинары по дисциплинам',
      link: '/control/webinar/discipline'
    },
  ]

  const mobileTabs = [
    {
      title: 'Список',
      link: '/control/webinar/list'
    },
    {
      title: 'По дисциплинам',
      link: '/control/webinar/discipline'
    },
  ]

  function handleOpenAddWebinar(action) {
    setWebinarAction(action);
    navigate('/control/webinar/add');
  }

  return (
    <div className='control-webinar'>

      <SemesterHeader onLogout={onLogout}>
        <SemesterHeaderBtnBack onBack={() => navigate('/control')} isPerformFunction={true} />
      </SemesterHeader>

      <SectionTabs type='small' tabs={windowWidth <= 833 ? mobileTabs : tabs} > 

        <Routes>

          <Route exact path='list' element={ 
              <ControlWebinarList windowWidth={windowWidth} addWebinar={handleOpenAddWebinar} />
            }
          >
          </Route>

          <Route exact path='discipline' element={ 
              <ControlWebinarDiscipline windowWidth={windowWidth} semesterInfo={semesterInfo} addWebinar={handleOpenAddWebinar} />
            }
          >
          </Route>

          <Route exact path='add' element={ 
              <ControlWebinarAdd windowWidth={windowWidth} semesterInfo={semesterInfo} webinarAction={webinarAction} />
            }
          >
          </Route>

          <Route exact path='/:webinarId/*' element={ 
              <ControlWebinarEdit windowWidth={windowWidth} semesterInfo={semesterInfo} />
            }
          >
          </Route>

        </Routes>

      </SectionTabs> 

    </div>
  );
}

export default ControlWebinar;