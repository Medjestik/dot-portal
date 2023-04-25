import React from 'react';
import './SemesterUser.css';
import { Route, Routes, useLocation, useNavigate, useParams } from 'react-router-dom';
import SemesterHeader from '../SemesterHeader/SemesterHeader.js';
import SemesterHeaderWithOptionsUser from '../SemesterHeader/SemesterHeaderWithOptionsUser/SemesterHeaderWithOptionsUser.js';
import Section from '../../Section/Section.js';
import SemesterUserTable from './SemesterUserTable/SemesterUserTable.js';
import SemesterUserCardList from './SemesterUserCardList/SemesterUserCardList.js';
import DisciplineUser from '../DisciplineUser/DisciplineUser.js';
import PracticeUserTable from '../PracticeUser/PracticeUserTable/PracticeUserTable.js';
import { CurrentUserContext } from '../../../contexts/CurrentUserContext.js';
import * as educationApi from '../../../utils/educationApi.js';
import Preloader from '../../Preloader/Preloader.js';
import SectionTabs from '../../Section/SectionTabs/SectionTabs.js';

function SemesterUser({ windowWidth, semesterInfo, onLogout }) {

  const navigate = useNavigate();
  const location = useLocation();
  const params = useParams();

  const currentUser = React.useContext(CurrentUserContext);
  
  const [disciplines, setDisciplines] = React.useState([]);
  const [practices, setPractices] = React.useState([]);
  const [currentDiscipline, setCurrentDiscipline] = React.useState({ name: '', });
  const [isDisciplineOpen, setIsDisciplineOpen] = React.useState(false);

  const [currentSemester, setCurrentSemester] = React.useState({});
  const [tabs, setTabs] = React.useState([]);

  const [isLoadingDiscipline, setIsLoadingDisciplines] = React.useState(true);

  function chooseSemester(semester) {
    setCurrentSemester(semester);
    disciplineRequest(semester.semesterId);
    navigate('/education/semester/' + semester.semesterId + '/disciplines');
  }

  function openDiscipline(discipline) {
    setCurrentDiscipline({ name: '', });
    navigate('/education/semester/' + currentSemester.id + '/discipline/' + discipline.discipline_id + '/info');
    //setIsDisciplineOpen(true);
  }

  function backToSemester() {
    navigate('/education/semester/' + currentSemester.semesterId + '/disciplines');
    //setIsDisciplineOpen(false);
  }

  function disciplineRequest(semesterId) {
    setIsLoadingDisciplines(true);
    const token = localStorage.getItem('token');
    educationApi.getDisciplines({ token: token, semesterId: semesterId, currentUserId: currentUser.id })
    .then((res) => {
      console.log('SemesterData', res);
      setDisciplines(res.disciplines);
      setPractices(res.practics);
      if (res.practics.length > 0) {
        setTabs([ 
          { title: 'Дисциплины', link: '/education/semester/' + semesterId + '/disciplines' },
          { title: 'Практика', link: '/education/semester/' + semesterId + '/practices' }, 
        ]);
      } else {
        setTabs([ 
          { title: 'Дисциплины', link: '/education/semester/' + semesterId + '/disciplines' },
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

  function getDisciplineName(name) {
    setCurrentDiscipline({ ...currentDiscipline, name: name })
  }

  React.useEffect(() => {
    setIsDisciplineOpen(!(location.pathname.includes('disciplines') || location.pathname.includes('practices')));
  }, [location]);

  React.useEffect(() => {
    setCurrentSemester(semesterInfo.find((sem) => sem.semesterId === params.semesterId));
    setIsDisciplineOpen(!(location.pathname.includes('disciplines') || location.pathname.includes('practices')));
    disciplineRequest(params.semesterId);

    return(() => {
      setCurrentDiscipline({ name: '', });
      setCurrentSemester({});
      setTabs([]);
    })
    // eslint-disable-next-line
  }, []);

  return (
    <div className='education'> 
      <SemesterHeader onLogout={onLogout}>
        <SemesterHeaderWithOptionsUser
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
          location.pathname.includes('disciplines') || location.pathname.includes('practices') ?
          <SectionTabs type='small' tabs={tabs} >
            <Routes>
              <Route exact path='/disciplines'
              element={
                windowWidth <= 833 
                ?
                  <SemesterUserCardList disciplines={disciplines} openDiscipline={openDiscipline} />
                :
                  <SemesterUserTable data={disciplines} onOpen={openDiscipline} />
                }
              />

              <Route exact path='/practices'
              element={
                <PracticeUserTable data={practices} onOpen={openDiscipline} /> 
              }
              />
            </Routes>
          </SectionTabs>
          :
          <div></div>
        }


        <Routes>
          <Route exact path={`/discipline/:disciplineId/*`}
          element={
            <Section title={currentDiscipline.name} heightType='page' headerType='large' >
              <DisciplineUser windowWidth={windowWidth} currentSemester={currentSemester} currentDiscipline={currentDiscipline} getDisciplineName={getDisciplineName} />
            </Section>
          }
          />
        </Routes>
        </>
      }
    </div>
  );
}

export default SemesterUser;  
