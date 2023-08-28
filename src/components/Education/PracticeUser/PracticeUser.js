import React from 'react';
import './PracticeUser.css';
import { Route, Routes, useNavigate, useParams, useLocation } from 'react-router-dom';
import SectionSelect from '../../Section/SectionSelect/SectionSelect.js';
import * as educationApi from '../../../utils/educationApi.js';
import Preloader from '../../Preloader/Preloader.js';
import PracticeUserInfo from './PracticeUserInfo/PracticeUserInfo.js';
import PracticeUserTasks from './PracticeUserTasks/PracticeUserTasks.js';
import PracticeUserDescription from './PracticeUserDescription/PracticeUserDescription.js';

function PracticeUser({ windowWidth, currentSemester, getDisciplineName }) {

  const navigate = useNavigate();
  const { practiceId } = useParams();
  const location = useLocation();

  const [isLoadingPractice, setIsLoadingPractice] = React.useState(true);

  const [practiceInfo, setPracticeInfo] = React.useState({});

  const sections = [
    { title: 'Информация о практике', id: 1, link: '/info' },
    { title: 'Загрузка заданий', id: 3, link: '/tasks' },
  ];

  const mobileSections = [
    { title: 'Информация о практике', id: 1, link: '/info' },
    { title: 'Описание задания', id: 2, link: '/description' },
    { title: 'Загрузка заданий', id: 3, link: '/tasks' },
  ];

  const [currentSection, setCurrentSection] = React.useState({});

  function chooseSection(option) {
    setCurrentSection(option);
    navigate('/education/semester/' + currentSemester.semesterId + '/practice/' + practiceId + option.link);
  }

  function practiceRequest(practiceId) {
    setIsLoadingPractice(true);
    const token = localStorage.getItem('token');
    educationApi.getPracticeInfo({ token: token, practiceId: practiceId })
    .then((res) => {
      //console.log('PracticeInfo', res);
      setPracticeInfo(res);
      getDisciplineName(res.name);
      if (windowWidth > 832) {
        sections.forEach((section) => {
          if (location.pathname.includes(section.link)) {
            setCurrentSection(section);
          }
        })
      } else {
        mobileSections.forEach((section) => {
          if (location.pathname.includes(section.link)) {
            setCurrentSection(section);
          }
        })
      }

    })
    .catch((err) => {
      console.error(err);
    })
    .finally(() => {  
      setIsLoadingPractice(false);
    });
  }

  function practiceAddTask(task) {
    setPracticeInfo({...practiceInfo, individual: {...practiceInfo.individual, files: [...practiceInfo.individual.files, task ]}});
  }

  React.useEffect(() => {
    practiceRequest(practiceId);
    // eslint-disable-next-line
  }, [practiceId]);

  return (
    <div className='discipline-user'>
      {
      isLoadingPractice
      ?
      <Preloader />
      :
      <>
      <div className='section__header'>
        <div className='section__header-item'>
          <p className='section__header-caption section__header-caption_margin_bottom'>Выберите раздел:</p>
          <SectionSelect sections={windowWidth > 832 ? sections : mobileSections} currentSection={currentSection} onChooseSection={chooseSection} />
        </div>
      </div>

      <Routes>
        <Route exact path={`info`}
        element={
          <PracticeUserInfo 
          windowWidth={windowWidth}
          practiceInfo={practiceInfo}
          /> 
        }
        />
      </Routes>

      <Routes>
        <Route exact path={`description`}
        element={
          <PracticeUserDescription
          windowWidth={windowWidth}
          practiceInfo={practiceInfo}
          /> 
        }
        />
      </Routes>

      <Routes>
        <Route exact path={`tasks`}
        element={
          <PracticeUserTasks 
          windowWidth={windowWidth} 
          practiceInfo={practiceInfo}
          practiceAddTask={practiceAddTask}  
          />
        }
        />
      </Routes>
    </>
    }
    </div>
  );
}

export default PracticeUser; 