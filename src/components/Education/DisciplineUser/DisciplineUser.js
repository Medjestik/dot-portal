import React from 'react';
import './DisciplineUser.css';
import { Route, Routes, useNavigate, useParams, useLocation } from 'react-router-dom';
import SectionSelect from '../../Section/SectionSelect/SectionSelect.js';
import DisciplineUserInfo from './DisciplineUserInfo/DisciplineUserInfo.js';
import DisciplineMaterials from '../DisciplineMaterials/DisciplineMaterials.js';
import DisciplineWebinars from '../DisciplineWebinars/DisciplineWebinars.js';
import DisciplineUserTasks from './DisciplineUserTasks/DisciplineUserTasks.js';
import DisciplineUserTeacher from './DisciplineUserTeacher/DisciplineUserTeacher.js';
import * as educationApi from '../../../utils/educationApi.js';
import Preloader from '../../Preloader/Preloader.js';

function DisciplineUser({ windowWidth, currentSemester, getDisciplineName }) {

  const navigate = useNavigate();
  const { disciplineId } = useParams();
  const location = useLocation();

  const [isLoadingDiscipline, setIsLoadingDiscipline] = React.useState(true);

  const [disciplineInfo, setDisciplineInfo] = React.useState({});

  const sections = [
    { title: 'Информация о дисциплине', id: 1, link: '/info' },
    { title: 'Учебные материалы', id: 2, link: '/materials' },
    { title: 'Вебинары', id: 3, link: '/webinars' },
    { title: 'Загрузка заданий', id: 4, link: '/tasks' },
  ];

  const mobileSections = [
    { title: 'Информация о дисциплине', id: 1, link: '/info' },
    { title: 'Преподаватель', id: 5, link: '/teacher' },
    { title: 'Учебные материалы', id: 2, link: '/materials' },
    { title: 'Вебинары', id: 3, link: '/webinars' },
    { title: 'Загрузка заданий', id: 4, link: '/tasks' },
  ];

  const [currentSection, setCurrentSection] = React.useState({});

  function chooseSection(option) {
    setCurrentSection(option);
    navigate('/education/semester/' + currentSemester.semesterId + '/discipline/' + disciplineId + option.link);
  }

  function disciplineRequest(disciplineId) {
    setIsLoadingDiscipline(true);
    const token = localStorage.getItem('token');
    educationApi.getDisciplineInfo({ token: token, disciplineId: disciplineId })
    .then((res) => {
      //console.log('DisciplineInfo', res);
      setDisciplineInfo(res);
      getDisciplineName(res.name);
      if (windowWidth > 950) {
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
      setIsLoadingDiscipline(false);
    });
  }

  React.useEffect(() => {
    disciplineRequest(disciplineId);
    // eslint-disable-next-line
  }, [disciplineId]);

  return (
    <div className='discipline-user'>
      {
      isLoadingDiscipline 
      ?
      <Preloader />
      :
      <>
      <div className='section__header'>
        <div className='section__header-item'>
          <p className='section__header-caption section__header-caption_margin_bottom'>Выберите раздел:</p>
          <SectionSelect sections={windowWidth > 950 ? sections : mobileSections} currentSection={currentSection} onChooseSection={chooseSection} />
        </div>
      </div>

      <Routes>
        <Route exact path={`info`}
        element={
          <DisciplineUserInfo 
          windowWidth={windowWidth}
          disciplineInfo={disciplineInfo}
          /> 
        }
        />
      </Routes>

      <Routes>
        <Route exact path={`teacher`}
        element={
          <DisciplineUserTeacher 
          windowWidth={windowWidth}
          disciplineInfo={disciplineInfo}
          /> 
        }
        />
      </Routes>

      <Routes>
        <Route exact path={`materials`}
        element={
          <DisciplineMaterials
          windowWidth={windowWidth}
          disciplineId={disciplineId}
          />
        }
        />
      </Routes>

      <Routes>
        <Route exact path={`webinars`}
        element={
          <DisciplineWebinars
          windowWidth={windowWidth}
          disciplineId={disciplineId}
          />
        }
        />
      </Routes>

      <Routes>
        <Route exact path={`tasks`}
        element={
          <DisciplineUserTasks 
          windowWidth={windowWidth} 
          disciplineId={disciplineId}  
          />
        }
        />
      </Routes>
    </>
    }
    </div>
  );
}

export default DisciplineUser; 