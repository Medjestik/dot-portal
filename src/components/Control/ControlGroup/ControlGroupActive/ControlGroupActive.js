import React from 'react';
import * as adminApi from '../../../../utils/admin.js';
import { Route, Routes, useNavigate } from 'react-router-dom';
import SectionTabs from '../../../Section/SectionTabs/SectionTabs.js';
import ControlGroupTable from '../ControlGroupTable/ControlGroupTable.js';
import Preloader from '../../../Preloader/Preloader.js';

function ControlGroupActive({ windowWidth }) {

  const navigate = useNavigate();

  const tabs = [
    {
      title: 'Бакалавриат',
      link: '/control/group/active/bac'
    },
    {
      title: 'Магистратура',
      link: '/control/group/active/mag'
    },
    {
        title: 'Другое',
        link: '/control/group/active/pp'
      },
  ]

  const [isLoadingGroups, setIsLoadingGroups] = React.useState(true);
  const [groups, setGroups] = React.useState([]);

  function handleOpenGroup(group) {
    navigate('/control/group/' + group.id + '/list');
  }

  function groupsRequest() {
    setIsLoadingGroups(true);
    const token = localStorage.getItem('token');
    adminApi.getActiveGroups({ token: token })
    .then((res) => {
      console.log('AdminGroups', res);
      setGroups(res);
    })
    .catch((err) => {
      console.error(err);
    })
    .finally(() => {  
      setIsLoadingGroups(false);
    });
  }

  React.useEffect(() => {
    groupsRequest();
  return (() => {
    setGroups([]);
  })
    // eslint-disable-next-line
  }, []);

  return (
    isLoadingGroups 
    ?
    <Preloader /> 
    :
    <SectionTabs type='small' tabs={tabs} > 

      <Routes>

        <Route exact path='bac' element={ 
            <ControlGroupTable windowWidth={windowWidth} groups={groups.bac} openGroup={handleOpenGroup} />
          }
        >
        </Route>

        <Route exact path='mag' element={ 
            <ControlGroupTable windowWidth={windowWidth} groups={groups.mag} openGroup={handleOpenGroup} />
          }
        >
        </Route>

        <Route exact path='pp' element={ 
            <ControlGroupTable windowWidth={windowWidth} groups={groups.pp} openGroup={handleOpenGroup} />
          }
        >
        </Route>
 
      </Routes>

    </SectionTabs>   

  );
}

export default ControlGroupActive;