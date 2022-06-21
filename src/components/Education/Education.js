import React from 'react';
import './Education.css';
import { Route, Routes, useLocation, useNavigate, useParams } from 'react-router-dom';
import SemesterHeader from '../SemesterHeader/SemesterHeader.js';
import Section from '../Section/Section.js';
import SemesterTable from '../SemesterTable/SemesterTable.js';
import SemesterCardList from '../SemesterCardList/SemesterCardList.js';
import Discipline from '../Discipline/Discipline.js';
import Calendar from '../Calendar/Calendar.js';
import Notifications from '../Notifications/Notifications.js';
import { CurrentUserContext } from '../../contexts/CurrentUserContext.js';
import * as educationApi from '../../utils/educationApi.js';

function Education({ windowWidth, semesterInfo }) {

  const navigate = useNavigate();
  const location = useLocation();
  const params = useParams();

  const currentUser = React.useContext(CurrentUserContext);
  
  const [disciplines, setDisciplines] = React.useState([]);
  const [currentDiscipline, setCurrentDiscipline] = React.useState({ name: '', });
  const [isDisciplineOpen, setIsDisciplineOpen] = React.useState(location.pathname.includes('discipline') ? true : false);

  const [currentSemester, setCurrentSemester] = React.useState({});

  const [isLoadingDiscipline, setIsLoadingDisciplines] = React.useState(true);

  function chooseSemester(semester) {
    setCurrentSemester(semester);
    disciplineRequest(semester.semesterId);
    navigate('/education/semester/' + semester.semesterId);
  }

  function openDiscipline(discipline) {
    setCurrentDiscipline({ name: '', });
    navigate(location.pathname + '/discipline/' + discipline.discipline_id + '/info');
    setIsDisciplineOpen(true);
  }

  function backToSemester() {
    navigate('/education/semester/' + currentSemester.semesterId);
    setIsDisciplineOpen(false);
  }

  function disciplineRequest(semesterId) {
    setIsLoadingDisciplines(true);
    const token = localStorage.getItem('token');
    educationApi.getDisciplines({ token: token, semesterId: semesterId, currentUserId: currentUser.id })
    .then((res) => {
      console.log('Disciplines', res);
      setDisciplines(res.disciplines);
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

  React.useEffect(() => {
    setCurrentSemester(semesterInfo.find((sem) => sem.semesterId === params.semesterId));
    disciplineRequest(params.semesterId);
    
    return(() => {
      setCurrentDiscipline({ name: '', });
      setCurrentSemester({});
    })
    // eslint-disable-next-line
  }, []);

  return (
    <div className='education'>
      <SemesterHeader 
      semesterInfo={semesterInfo}
      currentSemester={currentSemester}
      chooseSemester={chooseSemester}
      isDisciplineOpen={isDisciplineOpen} 
      backToSemester={backToSemester} 
      />
      
      {
        isLoadingDiscipline 
        ?
        <div></div>
        :

        <>
      <Routes>
        <Route exact path='/'
        element={
          <>
            {
              /*
              <div className='education__container'>
                <Notifications />
  
                <Section title='Вебинары' heightType='content' headerType='small' >
                  <Calendar />
                </Section>
              </div>
              */
            }

            <Section title={currentSemester.position + ' семестр'}  heightType='content' headerType='small' >
              {
              windowWidth <= 833 
              ?
                <SemesterCardList disciplines={disciplines} openDiscipline={openDiscipline} />
              :
                <SemesterTable disciplines={disciplines} openDiscipline={openDiscipline} />
              }
            </Section>
          </> 
        }
        />
      </Routes>

      <Routes>
        <Route exact path={`/discipline/:disciplineId/*`}
        element={
          <Section title={currentDiscipline.name} heightType='page' headerType='large' >
            <Discipline windowWidth={windowWidth} currentSemester={currentSemester} currentDiscipline={currentDiscipline} getDisciplineName={getDisciplineName} />
          </Section>
        }
        />
      </Routes>
      </>
      }
      
    </div>
  );
}

export default Education;  
