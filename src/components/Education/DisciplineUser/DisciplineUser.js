import React from 'react';
import './DisciplineUser.css';
import { Route, Routes, useNavigate, useParams, useLocation } from 'react-router-dom';
import DisciplineSectionSelect from '../DisciplineSectionSelect/DisciplineSectionSelect.js';
import DisciplineUserInfo from './DisciplineUserInfo/DisciplineUserInfo.js';
import DisciplineUserMaterials from './DisciplineUserMaterials/DisciplineUserMaterials.js';
import DisciplineUserTasks from './DisciplineUserTasks/DisciplineUserTasks.js';
import * as educationApi from '../../../utils/educationApi.js';
import Preloader from '../../Preloader/Preloader.js';

function Discipline({ windowWidth, currentSemester, getDisciplineName }) {

  const navigate = useNavigate();
  const { disciplineId } = useParams();
  const location = useLocation();

  const [isLoadingDiscipline, setIsLoadingDiscipline] = React.useState(true);

  const [disciplineInfo, setDisciplineInfo] = React.useState({});

  const sections = [
    { title: 'Информация о дисциплине', id: 1, link: '/info' },
    { title: 'Учебные материалы', id: 2, link: '/materials' },
    { title: 'Загрузка заданий', id: 3, link: '/tasks' },
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
      console.log('DisciplineInfo', res);
      setDisciplineInfo(res);
      getDisciplineName(res.name);
      sections.forEach((section) => {
        if (location.pathname.includes(section.link)) {
          setCurrentSection(section);
        }
      })
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
      <div className='discipline-user__header'>
        <p className='discipline-user__header-caption'>Выберите раздел дисциплины:</p>
        <div className='discipline-user__header-container'>
          <DisciplineSectionSelect sections={sections} currentSection={currentSection} onChooseSection={chooseSection} />  
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
        <Route exact path={`materials`}
        element={
          <DisciplineUserMaterials
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

export default Discipline; 