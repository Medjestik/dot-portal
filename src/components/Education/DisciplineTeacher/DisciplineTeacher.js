import React from 'react';
import './DisciplineTeacher.css';
import { Route, Routes, useNavigate, useParams, useLocation } from 'react-router-dom';
import * as educationApi from '../../../utils/educationApi.js';
import { CurrentUserContext } from '../../../contexts/CurrentUserContext.js';
import Preloader from '../../Preloader/Preloader.js';
import DisciplineSectionSelect from '../DisciplineSectionSelect/DisciplineSectionSelect.js';
import DisciplineTeacherGroup from './DisciplineTeacherGroup/DisciplineTeacherGroup.js';
import TeacherChooseMarkPopup from '../EducationPopup/TeacherChooseMarkPopup/TeacherChooseMarkPopup.js';
import TeacherViewFilesPopup from '../EducationPopup/TeacherViewFilesPopup/TeacherViewFilesPopup.js';
import TeacherViewTestsPopup from '../EducationPopup/TeacherViewTestsPopup/TeacherViewTestsPopup.js';
import TeacherViewCommentsPopup from '../EducationPopup/TeacherViewCommentsPopup/TeacherViewCommentsPopup.js';

function DisciplineTeacher({ windowWidth, currentSemester, getDisciplineName }) {

  const currentUser = React.useContext(CurrentUserContext);

  const navigate = useNavigate();
  const { disciplineId } = useParams();
  const location = useLocation();

  const [isLoadingDiscipline, setIsLoadingDiscipline] = React.useState(true);
  const [isLoadingRequest, setIsLoadingRequest] = React.useState(false);
  const [isShowRequestError, setIsShowRequestError] = React.useState({ isShow: false, text: '', });

  const [groupInfo, setGroupInfo] = React.useState({});
  const [disciplineInfo, setDisciplineInfo] = React.useState({});
  const [disciplineStudents, setDisciplineStudents] = React.useState([]);

  const [isOpenTeacherChooseMark, setIsOpenTeacherChooseMark] = React.useState(false);
  const [isOpenTeacherViewFiles, setIsOpenTeacherViewFiles] = React.useState(false);
  const [isOpenTeacherViewTests, setIsOpenTeacherViewTests] = React.useState(false);
  const [isOpenTeacherViewComments, setIsOpenTeacherViewComments] = React.useState(false);

  const sections = [
    { title: 'Список студентов', id: 1, link: '/group' },
    { title: 'Учебные материалы', id: 2, link: '/materials' },
    { title: 'Загрузка заданий', id: 3, link: '/tasks' },
  ];

  const [currentSection, setCurrentSection] = React.useState({});
  const [currentStudent, setCurrentStudent] = React.useState({});

  function chooseSection(option) {
    setCurrentSection(option);
    navigate('/education/semester/' + currentSemester.semesterId + '/discipline/' + disciplineId + option.link);
  }

  function disciplineRequest(disciplineId) {
    setIsLoadingDiscipline(true);
    const token = localStorage.getItem('token');
    educationApi.getDisciplineInfoTeacher({ token: token, teacherId: currentUser.id, disciplineId: disciplineId })
    .then((res) => {
      console.log('DisciplineInfo', res);
      setGroupInfo(res.group);
      setDisciplineInfo(res.discipline);
      setDisciplineStudents(res.students.filter((item) => (item.student.fullname !== null)));
      getDisciplineName(res.discipline.name);
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

  function setMark(data) {
    setIsLoadingRequest(true);
    const token = localStorage.getItem('token');
    educationApi.teacherSetMark({
      token: token,
      discipline_id: disciplineInfo.id,
      student_id: currentStudent.student.id,
      mark_id: data.mark.id, 
      kr_mark_id: data.courseMark.id,
      comment: data.text
    })
    .then((res) => {
      console.log('New Mark', res);
      const index = disciplineStudents.indexOf(disciplineStudents.find((elem) => (elem.student.id === res.student.id)));
      const student = {
        ...disciplineStudents[index],
        mark: res.mark,
        course_mark: res.course_mark,
        comments: res.new_comment ? [...disciplineStudents[index].comments, res.new_comment ] :  disciplineStudents[index].comments,
      };
      setDisciplineStudents([ ...disciplineStudents.slice(0, index), student, ...disciplineStudents.slice(index + 1) ]);
      closeTeacherPopup();
    })
    .catch((err) => {
      console.error(err);
    })
    .finally(() => {  
      setIsLoadingRequest(false);
    });
  }

  function openStudent(student) {
    setCurrentStudent(student);
  }

  function openChooseMarkPopup(student) {
    setCurrentStudent(student);
    setIsOpenTeacherChooseMark(true);
  }

  function openViewFilesPopup(student) {
    setCurrentStudent(student);
    setIsOpenTeacherViewFiles(true);
  }

  function openViewTestsPopup(student) {
    setCurrentStudent(student);
    setIsOpenTeacherViewTests(true);
  }

  function openViewCommentsPopup(student) {
    setCurrentStudent(student);
    setIsOpenTeacherViewComments(true);
  }

  function closeTeacherPopup() {
    setIsOpenTeacherChooseMark(false);
    setIsOpenTeacherViewFiles(false);
    setIsOpenTeacherViewTests(false);
    setIsOpenTeacherViewComments(false);
    setIsShowRequestError({ isShow: false, text: '', })
  }

  React.useEffect(() => {
    disciplineRequest(disciplineId);

    return(() => {
      setDisciplineInfo({});
      setDisciplineStudents([]);
    })
    // eslint-disable-next-line
  }, [disciplineId]);

  return (
    <div className='discipline-teacher'>
      {
      isLoadingDiscipline 
      ?
      <Preloader />
      :
      <>
      <div className='discipline-teacher__header'>
        <p className='discipline-teacher__header-caption'>Выберите раздел дисциплины:</p>
        <div className='discipline-teacher__header-container'>
          <DisciplineSectionSelect sections={sections} currentSection={currentSection} onChooseSection={chooseSection} />
          <div className='discipline-teacher__header-group'>Группа: {groupInfo.current_name}</div>
        </div>
      </div>

      <Routes>
        <Route exact path={`group`}
        element={
          <DisciplineTeacherGroup 
            windowWidth={windowWidth}
            disciplineInfo={disciplineInfo}
            disciplineStudents={disciplineStudents}
            onOpenStudent={openStudent}
            onChooseMark={openChooseMarkPopup}
            onViewFiles={openViewFilesPopup}
            onViewTests={openViewTestsPopup}
            onViewComments={openViewCommentsPopup}
          /> 
        }
        />
      </Routes>

      {
        isOpenTeacherChooseMark &&
        <TeacherChooseMarkPopup 
          isOpen={isOpenTeacherChooseMark}
          onClose={closeTeacherPopup}
          currentStudent={currentStudent}
          disciplineInfo={disciplineInfo}
          setMark={setMark}
          isLoadingRequest={isLoadingRequest}
          isShowRequestError={isShowRequestError}
        />
      }

      {
        isOpenTeacherViewFiles &&
        <TeacherViewFilesPopup 
          isOpen={isOpenTeacherViewFiles}
          onClose={closeTeacherPopup}
          currentStudent={currentStudent}
        />
      }

      {
        isOpenTeacherViewTests &&
        <TeacherViewTestsPopup 
          isOpen={isOpenTeacherViewTests}
          onClose={closeTeacherPopup}
          currentStudent={currentStudent}
        />
      }

      {
        isOpenTeacherViewComments &&
        <TeacherViewCommentsPopup 
          isOpen={isOpenTeacherViewComments}
          onClose={closeTeacherPopup}
          currentStudent={currentStudent}
        />
      }

    </>
    }
    </div>
  );
}

export default DisciplineTeacher; 