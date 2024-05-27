import React from 'react';
import './CuratorDiploma.css';
import { Route, Routes } from 'react-router-dom';
import * as curatorApi from '../../../utils/curatorApi.js';
import Preloader from '../../Preloader/Preloader';
import Tabs from '../../Tabs/Tabs';
import CuratorDiplomaCheck from './CuratorDiplomaCheck/CuratorDiplomaCheck';

function CuratorDiploma({ windowWidth, groupInfo }) {

  const diplomaTabs = [
    { name: 'Выбор тем', location: 'theme', },
    { name: 'Проверка работ', location: 'check', },
    { name: 'Настройки', location: 'settings', },
  ];
  const path = '/curator/group/' + groupInfo.id + '/diploma';

  const [diploma, setDiploma] = React.useState({});
  const [isLoadingData, setIsLoadingData] = React.useState(true);

  function dataRequest() {
    setIsLoadingData(true);
    const token = localStorage.getItem('token');
    curatorApi.getGroupDiploma({ token: token,groupId: groupInfo.id })
    .then((res) => {
      console.log('Diploma', res);
      setDiploma(res);
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
    return (() => {
      setDiploma({});
    });
    // eslint-disable-next-line
  }, []);

  return (
    isLoadingData
    ?
    <Preloader />
    :
    <>
      <Tabs 
        tabs={diplomaTabs}
        path={path}
      />
      <Routes>
        <Route exact path={`check`} element={<CuratorDiplomaCheck windowWidth={windowWidth} diploma={diploma} />}></Route>
      </Routes>
    </>
  );
}

export default CuratorDiploma; 