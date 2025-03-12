import React from 'react';
import * as adminApi from '../../../../utils/admin.js';
import { Route, Routes } from 'react-router-dom';
import SectionTabs from '../../../Section/SectionTabs/SectionTabs.js';
import ControlGroupTable from '../ControlGroupTable/ControlGroupTable.js';
import Preloader from '../../../Preloader/Preloader.js';

function ControlGroupActive({ windowWidth }) {

  const tabs = [
    { title: 'Бакалавриат', link: '/control/group/active/bak' },
    { title: 'Магистратура', link: '/control/group/active/mag' },
    { title: 'Переподготовка', link: '/control/group/active/pc' },
    { title: 'Другое', link: '/control/group/active/other' },
  ];

  const [isLoadingData, setIsLoadingData] = React.useState(false);
  const [groups, setGroups] = React.useState([]);

  function dataRequest() {
    setIsLoadingData(true);
    const token = localStorage.getItem('token');
    adminApi.getLearningGroups({ token: token })
      .then((res) => {
        console.log('SemesterGroups', res);
        setGroups(res);
      })
      .catch((err) => {
        console.error(err);
      })
      .finally(() => {
        setIsLoadingData(false);
      });
  }

  React.useEffect(() => {
    dataRequest();
    return () => {
      setGroups([]);
    };
    // eslint-disable-next-line
  }, []);

  // Фильтруем группы по вкладкам
  const bakGroups = groups.filter((group) => group.level === 'бакалавриат' && group.och === 'false');
  const magGroups = groups.filter((group) => group.level === 'магистратура' && group.och === 'false');
  const pcGroups = groups.filter((group) => group.level === 'переподготовка');
  const otherGroups = groups.filter(
    (group) =>
      !bakGroups.includes(group) &&
      !magGroups.includes(group) &&
      !pcGroups.includes(group)
  );

  return (
    <SectionTabs type="small" tabs={tabs}>
      {isLoadingData ? (
        <Preloader />
      ) : (
        <Routes>
          <Route
            exact
            path="/bak"
            element={<ControlGroupTable windowWidth={windowWidth} groups={bakGroups} />}
          />
          <Route
            exact
            path="/mag"
            element={<ControlGroupTable windowWidth={windowWidth} groups={magGroups} />}
          />
          <Route
            exact
            path="/pc"
            element={<ControlGroupTable windowWidth={windowWidth} groups={pcGroups} />}
          />
          <Route
            exact
            path="/other"
            element={<ControlGroupTable windowWidth={windowWidth} groups={otherGroups} />}
          />
        </Routes>
      )}
    </SectionTabs>  
  );
}

export default ControlGroupActive;