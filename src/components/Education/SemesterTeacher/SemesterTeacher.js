import React from 'react';
import './SemesterTeacher.css';
import Preloader from '../../Preloader/Preloader.js';
import { Route, Routes, useLocation, useNavigate, useParams } from 'react-router-dom';
import * as disciplineApi from '../../../utils/disciplineApi.js';
import { CurrentUserContext } from '../../../contexts/CurrentUserContext.js';
import Section from '../../Section/Section.js';
import SemesterHeader from '../SemesterHeader/SemesterHeader.js';
import SemesterHeaderWithOptionsTeacher from '../SemesterHeader/SemesterHeaderWithOptionsTeacher/SemesterHeaderWithOptionsTeacher.js';
import SemesterTeacherTable from './SemesterTeacherTable/SemesterTeacherTable.js';
import DisciplineTeacher from '../DisciplineTeacher/DisciplineTeacher.js';

function SemesterTeacher({ windowWidth, semesterInfo, onLogout }) { 

  const currentUser = React.useContext(CurrentUserContext);

  const navigate = useNavigate();
  const location = useLocation();
  const params = useParams();

  const [currentSemester, setCurrentSemester] = React.useState({});

  const [disciplines, setDisciplines] = React.useState([]);
  const [currentDiscipline, setCurrentDiscipline] = React.useState({ name: '', });
  const [isDisciplineOpen, setIsDisciplineOpen] = React.useState(location.pathname.includes('discipline') ? true : false);

  const [isLoadingDiscipline, setIsLoadingDisciplines] = React.useState(true);

  function disciplineRequest(id) {
    setIsLoadingDisciplines(true);
    const token = localStorage.getItem('token');
    disciplineApi.getDisciplines({ token: token, teacherId: currentUser.id, semesterId: id })
    .then((res) => {
      console.log('Disciplines', res.discs);
      setDisciplines(res.discs);
    })
    .catch((err) => {
      console.error(err);
    })
    .finally(() => {  
      setIsLoadingDisciplines(false);
    });
  }

  function getDisciplineName(name) {
    setCurrentDiscipline({ ...currentDiscipline, name: name })
  }

  function chooseSemester(semester) {
    setCurrentSemester(semester);
    disciplineRequest(semester.id);
    navigate('/semester/' + semester.id);
  }

  function openDiscipline(discipline) {
    setCurrentDiscipline({ name: '', });
    navigate(location.pathname + '/discipline/' + discipline.discipline_id + '/group');
    setIsDisciplineOpen(true);
  }

  function backToSemester() {
    navigate('/semester/' + currentSemester.id);
    setIsDisciplineOpen(false);
  }

  React.useEffect(() => {
    setCurrentSemester(semesterInfo.find((sem) => sem.id === params.semesterId));
    disciplineRequest(params.semesterId);

    return(() => {
      setDisciplines([]);
    })
    // eslint-disable-next-line
  }, []);

  return (
    <div>
      <SemesterHeader onLogout={onLogout}>
        <SemesterHeaderWithOptionsTeacher
          semesterInfo={semesterInfo}
          currentSemester={currentSemester}
          chooseSemester={chooseSemester}
          isDisciplineOpen={isDisciplineOpen}
          backToSemester={backToSemester}
          />
      </SemesterHeader>
      {
        isLoadingDiscipline
        ?
        <Preloader />
        :
        <>
        <Routes>
          <Route exact path='/'
          element={
            <Section title={currentSemester.name}  heightType='content' headerType='small' >
              <SemesterTeacherTable disciplines={disciplines} openDiscipline={openDiscipline} />
            </Section>
          }
          />
        </Routes>

        <Routes>
          <Route exact path={`/discipline/:disciplineId/*`}
          element={
            <Section title={currentDiscipline.name} heightType='page' headerType='large' >
              <DisciplineTeacher 
              windowWidth={windowWidth} 
              currentSemester={currentSemester} 
              currentDiscipline={currentDiscipline} 
              getDisciplineName={getDisciplineName} 
              />
            </Section>
          }
          />
        </Routes>
        </>
      }
    </div>
  );
}

export default SemesterTeacher;