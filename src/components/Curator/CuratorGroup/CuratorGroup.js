import React from 'react';
import './CuratorGroup.css';
import { Route, Routes, useParams, useNavigate, useLocation } from 'react-router-dom';
import * as curatorApi from '../../../utils/curatorApi.js';
import Preloader from '../../Preloader/Preloader.js';
import Section from '../../Section/Section.js';
import SectionSelect from '../../Section/SectionSelect/SectionSelect.js';
import CuratorGroupList from '../CuratorGroupList/CuratorGroupList.js';
import CuratorAdvertisement from '../CuratorAdvertisement/CuratorAdvertisement.js';

function CuratorGroup({ windowWidth }) {

  const { groupId } = useParams();
  const navigate = useNavigate();
  const location = useLocation();

  const [isLoadingGroup, setIsLoadingGroup] = React.useState(true);

  const [groupInfo, setGroupInfo] = React.useState([]);
  const [currentSection, setCurrentSection] = React.useState({});

  const sections = [
    { title: 'Список студентов', id: 1, link: '/list' },
    { title: 'Объявления', id: 2, link: '/advertisement' },
    { title: 'Дисциплины', id: 3, link: '/disciplines' },
    { title: 'Практика', id: 4, link: '/practice' },
    { title: 'ВКР', id: 5, link: '/diploma' },
  ];

  function chooseSection(option) {
    navigate('/curator/group/' + groupId + option.link);
  }
  
  function groupRequest() {
    setIsLoadingGroup(true);
    const token = localStorage.getItem('token');
    curatorApi.getGroupInfo({ token: token, groupId: groupId })
    .then((res) => {
      console.log('GroupInfo', res);
      setGroupInfo(res);
    })
    .catch((err) => {
      console.error(err);
    })
    .finally(() => {  
      setIsLoadingGroup(false);
    });
  }

  React.useEffect(() => {
    groupRequest();
    return (() => {

    })
    // eslint-disable-next-line
  }, []);

  React.useEffect(() => {
    sections.forEach((section) => {
      if (location.pathname.includes(section.link)) {
        setCurrentSection(section);
      }
    });
    // eslint-disable-next-line
  }, [location]);

  return (
    isLoadingGroup
    ?
    <Preloader />
    :
    <Section title={groupInfo.name} heightType='page' headerType='large'>

      <div className='section__header'>
        <div className='section__header-item'>
          <p className='section__header-caption section__header-caption_margin_bottom'>Выберите раздел:</p>
          <SectionSelect sections={sections} currentSection={currentSection} onChooseSection={chooseSection} />
        </div>
      </div>

      <Routes>
        <Route exact path={`list`}
          element={
          <CuratorGroupList 
            windowWidth={windowWidth} 
            groupInfo={groupInfo} 
          />
          }
        />
        <Route exact path={`advertisement`}
          element={
          <CuratorAdvertisement
            windowWidth={windowWidth} 
            groupInfo={groupInfo} 
          />
          }
        />
      </Routes>

    </Section>
  );
}

export default CuratorGroup; 