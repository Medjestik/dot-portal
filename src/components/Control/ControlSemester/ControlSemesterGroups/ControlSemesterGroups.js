import React from 'react';
import './ControlSemesterGroups.css';
import * as adminApi from '../../../../utils/admin.js';
import { Route, Routes } from 'react-router-dom';
import Preloader from '../../../Preloader/Preloader.js';
import SectionTabs from '../../../Section/SectionTabs/SectionTabs';
import ControlSemesterGroupsTable from './ControlSemesterGroupsTable';

const tabs = [
  { title: 'Бакалавриат', link: '/control/sem/groups/bak' },
  { title: 'Магистратура', link: '/control/sem/groups/mag' },
  { title: 'Переподготовка', link: '/control/sem/groups/pc' },
  { title: 'Другое', link: '/control/sem/groups/other' },
];

function ControlSemesterGroups({ windowWidth }) {
  const [groups, setGroups] = React.useState([]);
  const [isLoadingData, setIsLoadingData] = React.useState(false);

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
            element={<ControlSemesterGroupsTable windowWidth={windowWidth} groups={bakGroups} />}
          />
          <Route
            exact
            path="/mag"
            element={<ControlSemesterGroupsTable windowWidth={windowWidth} groups={magGroups} />}
          />
          <Route
            exact
            path="/pc"
            element={<ControlSemesterGroupsTable windowWidth={windowWidth} groups={pcGroups} />}
          />
          <Route
            exact
            path="/other"
            element={<ControlSemesterGroupsTable windowWidth={windowWidth} groups={otherGroups} />}
          />
        </Routes>
      )}
    </SectionTabs>
  );
}

export default ControlSemesterGroups;
