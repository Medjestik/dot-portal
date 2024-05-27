import React from 'react';
import './Curator.css';
import * as curatorApi from '../../utils/curatorApi.js';
import Preloader from '../Preloader/Preloader.js';
import { Route, Routes, useNavigate } from 'react-router-dom';
import SemesterHeader from '../Education/SemesterHeader/SemesterHeader.js';
import SemesterHeaderBtnBack from '../Education/SemesterHeader/SemesterHeaderBtnBack/SemesterHeaderBtnBack.js';
import SectionTabs from '../Section/SectionTabs/SectionTabs.js';
import CuratorGroupsTable from './CuratorGroupsTable/CuratorGroupsTable.js';
import CuratorGroup from './CuratorGroup/CuratorGroup.js';
import CuratorDiscipline from './CuratorDiscipline/CuratorDiscipline.js';
 
function Curator({ windowWidth, onLogout }) {

  const navigate = useNavigate();

  const tabs = [
    { title: 'Текущие', link: '/curator/groups/current' },
    { title: 'Закончившие', link: '/curator/groups/past' },
  ]

  const [isLoadingGroups, setIsLoadingGroups] = React.useState(true);

  const [groups, setGroups] = React.useState([]);

  function groupsRequest() {
    setIsLoadingGroups(true);
    const token = localStorage.getItem('token');
    curatorApi.getGroups({ token: token })
    .then((res) => {
      //console.log('CuratorGroups', res);
      setGroups(res);
    })
    .catch((err) => {
      console.error(err);
    })
    .finally(() => {  
      setIsLoadingGroups(false);
    });
  }

  function openGroup(item) {
    navigate('/curator/group/' + item.id + '/list');
  }

  React.useEffect(() => {
      groupsRequest();
    return (() => {
      setGroups([]);
    })
    // eslint-disable-next-line
  }, []);

  return (
    <div className='curator'>

      <SemesterHeader onLogout={onLogout}>
        <SemesterHeaderBtnBack onBack={() => {}} isPerformFunction={false} />
      </SemesterHeader>

        <Routes>
          <Route path='/groups/*' element={
            isLoadingGroups 
            ?
            <Preloader /> 
            :
            <div className='curator__container'>
              <SectionTabs type='small' tabs={tabs} > 
                <Routes>
                  <Route exact path='/current' element={ 
                      <CuratorGroupsTable 
                        windowWidth={windowWidth}
                        groups={groups.filter((elem) => !elem.completed)}
                        openGroup={openGroup}
                      /> 
                    }
                  >
                  </Route>
                  <Route exact path='/past' element={ 
                      <CuratorGroupsTable 
                        windowWidth={windowWidth}
                        groups={groups.filter((elem) => elem.completed)}
                        openGroup={openGroup}
                      />
                    }
                  >
                  </Route>
                </Routes>
              </SectionTabs> 
            </div>
            }
          >
          </Route>

          <Route exact path='/group/:groupId/*' element={ 
              <CuratorGroup windowWidth={windowWidth} role='curator' />
            }
          >
          </Route>

          <Route path='/discipline/:disciplineId/*' element={ 
              <CuratorDiscipline windowWidth={windowWidth} role='curator' />
            }
          >
          </Route>

        </Routes>
      
    </div>
  );
}

export default Curator;
