import React from 'react';
import './Education.css';
import { Route, Routes, useLocation, useNavigate } from 'react-router-dom';
import SemesterHeader from '../SemesterHeader/SemesterHeader.js';
import Section from '../Section/Section.js';
import SemesterTable from '../SemesterTable/SemesterTable.js';
import Discipline from '../Discipline/Discipline.js';
import Calendar from '../Calendar/Calendar.js';
import Notifications from '../Notifications/Notifications.js';

function Education() {

  const disciplines = [
    {
      disciplineStart: '15.06.2022',
      disciplineEnd: '15.07.2022',
      disciplineName: 'Управление ИТ-сервисом и контентом',
      disciplineTeacher: 'Леонова Анна Владимировна',
      disciplineType: 'ЗаО',
      score: '5 (отл)',
      scoreDate: '10.10.2010',
      comment: 'Текст комментария',
      id: 1,
    },
    {
      disciplineStart: '15.06.2022',
      disciplineEnd: '15.07.2022',
      disciplineName: 'Базы данных',
      disciplineTeacher: 'Гринчар Николай Николаевич',
      disciplineType: 'За',
      score: 'зачет',
      scoreDate: '10.10.2010',
      comment: 'Текст комментария',
      id: 2,
    },
    {
      disciplineStart: '15.06.2022',
      disciplineEnd: '15.07.2022',
      disciplineName: 'Мировая экономика и международные экономические экономики экономические экономики экономические экономики',
      disciplineTeacher: 'Аникеева-Науменко Любовь Олеговна',
      disciplineType: 'За',
      score: 'незачет',
      scoreDate: '10.10.2010',
      comment: 'Текст комментария',
      id: 3,
    },
    {
      disciplineStart: '15.06.2022',
      disciplineEnd: '15.07.2022',
      disciplineName: 'Эконометрика',
      disciplineTeacher: 'Карпенко Надежда Викторовна',
      disciplineType: 'Экз',
      score: '',
      scoreDate: '',
      comment: 'Текст комментария',
      id: 4,
    },
    {
      disciplineStart: '15.06.2022',
      disciplineEnd: '15.07.2022',
      disciplineName: 'Управление ИТ-сервисом и контентом',
      disciplineTeacher: 'Леонова Анна Владимировна',
      disciplineType: 'ЗаО',
      score: '5 (отл)',
      scoreDate: '10.10.2010',
      comment: 'Текст комментария Текст комментария Текст комментария Текст комментария Текст комментария Текст комментария',
      id: 5,
    },
    {
      disciplineStart: '15.06.2022',
      disciplineEnd: '15.07.2022',
      disciplineName: 'Управление ИТ-сервисом и контентом',
      disciplineTeacher: 'Леонова Анна Владимировна',
      disciplineType: 'ЗаО',
      score: '5 (отл)',
      scoreDate: '10.10.2010',
      comment: 'Текст комментария',
      id: 6,
    },
    {
      disciplineStart: '15.06.2022',
      disciplineEnd: '15.07.2022',
      disciplineName: 'Базы данных',
      disciplineTeacher: 'Гринчар Николай Николаевич',
      disciplineType: 'За',
      score: 'зачет',
      scoreDate: '10.10.2010',
      comment: 'Текст комментария',
      id: 7,
    },
    {
      disciplineStart: '15.06.2022',
      disciplineEnd: '15.07.2022',
      disciplineName: 'Мировая экономика и международные экономические экономики экономические экономики экономические экономики',
      disciplineTeacher: 'Аникеева-Науменко Любовь Олеговна',
      disciplineType: 'За',
      score: 'незачет',
      scoreDate: '10.10.2010',
      comment: 'Текст комментария',
      id: 8,
    },
  ]

  const navigate = useNavigate();
  const location = useLocation();
  
  const [currentDiscipline, setCurrentDiscipline] = React.useState({ title: '', });
  const [isDisciplineOpen, setIsDisciplineOpen] = React.useState(location.pathname.includes('discipline') ? true : false);

  function openDiscipline(discipline) {
    setCurrentDiscipline(discipline);
    navigate('/education/semester/discipline/' + discipline.id + '/info');
    setIsDisciplineOpen(true);
  }

  function backToSemester() {
    navigate('/education/semester');
    setIsDisciplineOpen(false);
  }


  return (
    <div className='education'>
      <SemesterHeader isDisciplineOpen={isDisciplineOpen} backToSemester={backToSemester} /> 

      <Routes>
        <Route exact path={`semester`} 
        element={
          <>
          {/*
            <div className='education__container'>
              <Notifications />

              <Section title='Вебинары' heightType='content' headerType='small' >
                <Calendar />
              </Section>
            </div>*/
          }

          <Section title='1 семестр' heightType='content' headerType='small' >
            <SemesterTable disciplines={disciplines} openDiscipline={openDiscipline} />
          </Section>
          </>
        }
        />
      </Routes>

      <Routes>
        <Route exact path={`semester/discipline/:disciplineId/*`}
        element={
          <Section title={currentDiscipline.disciplineName} heightType='content' headerType='large' > 
            <Discipline currentDiscipline={currentDiscipline} />
          </Section>
        }
        />
      </Routes>
      
    </div>
  );
}

export default Education;  
