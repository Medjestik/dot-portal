import React from 'react';
import './SemesterTeacher.css';
import Preloader from '../../Preloader/Preloader.js';
import { Route, Routes, useLocation, useNavigate, useParams } from 'react-router-dom';
import * as disciplineApi from '../../../utils/disciplineApi.js';
import { CurrentUserContext } from '../../../contexts/CurrentUserContext.js';
import SectionTabs from '../../Section/SectionTabs/SectionTabs.js';
import SemesterHeader from '../SemesterHeader/SemesterHeader.js';
import SemesterHeaderWithOptionsTeacher from '../SemesterHeader/SemesterHeaderWithOptionsTeacher/SemesterHeaderWithOptionsTeacher.js';
import DisciplineTeacherTable from '../DisciplinesTeacherTable/DisciplinesTeacherTable.js';
import PracticeTeacherTable from '../PracticeTeacherTable/PracticeTeacherTable.js';
import DisciplineTeacher from '../DisciplineTeacher/DisciplineTeacher.js';
import PracticeTeacher from '../PracticeTeacher/PracticeTeacher.js';

function SemesterTeacher({ windowWidth, semesterInfo, onLogout }) { 

  const currentUser = React.useContext(CurrentUserContext);

  const navigate = useNavigate();
  const location = useLocation();
  const params = useParams();

  const [currentSemester, setCurrentSemester] = React.useState({});
  const [tabs, setTabs] = React.useState([]);

  const [disciplines, setDisciplines] = React.useState([]);
  const [practice, serPractice] = React.useState([]);
  
  const [isDisciplineOpen, setIsDisciplineOpen] = React.useState(false);

  const [isLoadingDiscipline, setIsLoadingDisciplines] = React.useState(true);

  function disciplineRequest(id) {
    setIsLoadingDisciplines(true);
    const token = localStorage.getItem('token');
    disciplineApi.getDisciplines({ token: token, teacherId: currentUser.id, semesterId: id })
    .then((res) => {
      console.log(res);
      setDisciplines(res.discs);
      serPractice(res.practics);
      if (res.practics.length > 0) {
        setTabs([ 
          { title: 'Дисциплины', link: '/semester/' + id + '/disciplines' },
          { title: 'Практика', link: '/semester/' + id + '/practices' }, 
        ]);
      } else {
        setTabs([ 
          { title: 'Дисциплины', link: '/semester/' + id + '/disciplines' },
        ]);
      }
    })
    .catch((err) => {
      console.error(err);
    })
    .finally(() => {  
      setIsLoadingDisciplines(false);
    });
  }

  function chooseSemester(semester) {
    console.log(semester);
    setCurrentSemester(semester);
    disciplineRequest(semester.id);
    navigate('/semester/' + semester.id + '/disciplines');
  }

  function openDiscipline(discipline) {
    navigate('/semester/' + params.semesterId + '/discipline/' + discipline.discipline_id + '/group');
  }

  function openPractice(practice) {
    navigate('/semester/' + params.semesterId + '/practice/' + practice.practic_id + '/group');
  }

  function backToSemester() {
    if (location.pathname.includes('practice')) {
      navigate('/semester/' + params.semesterId + '/practices');
    } else {
      navigate('/semester/' + params.semesterId + '/disciplines');
    }
  }

  React.useEffect(() => {
    setCurrentSemester(semesterInfo.find((sem) => sem.id === params.semesterId));
    setIsDisciplineOpen(!(location.pathname.includes('disciplines') || location.pathname.includes('practices')));
    disciplineRequest(params.semesterId);

    return(() => {
      setDisciplines([]);
      serPractice([]);
      setCurrentSemester({});
    })
    // eslint-disable-next-line
  }, []);

  React.useEffect(() => {
    setIsDisciplineOpen(!(location.pathname.includes('disciplines') || location.pathname.includes('practices')));
  }, [location]);

  return (
    <div className='education'>
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

        {
          (location.pathname.includes('disciplines') || location.pathname.includes('practices')) &&
          <SectionTabs type='small' tabs={tabs} >
            <Routes>
              <Route exact path='/disciplines'
              element={
                <DisciplineTeacherTable disciplines={disciplines} openDiscipline={openDiscipline} />
              }
              />

              <Route exact path='/practices'
              element={
                <PracticeTeacherTable practice={practice} openDiscipline={openPractice} />
              }
              />
            </Routes>
          </SectionTabs>
        }

        <Routes>
          <Route exact path={`/discipline/:disciplineId/*`}
          element={
            <DisciplineTeacher 
              windowWidth={windowWidth} 
              currentSemester={currentSemester} 
            />
          }
          />
          <Route exact path={`/practice/:practiceId/*`}
          element={
            <PracticeTeacher 
              windowWidth={windowWidth} 
              currentSemester={currentSemester} 
            />
          }
          />
        </Routes>
        </>
      }
    </div>
  );
}

export default SemesterTeacher;