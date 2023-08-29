import React from 'react';
import './CuratorDiscipline.css';
import { Route, Routes, useNavigate, useParams, useLocation } from 'react-router-dom';
import * as educationApi from '../../../utils/educationApi.js';
import { CurrentUserContext } from '../../../contexts/CurrentUserContext.js';
import Preloader from '../../Preloader/Preloader.js';
import Section from '../../Section/Section.js';
import SectionSelect from '../../Section/SectionSelect/SectionSelect.js';
import DisciplineTeacherGroup from '../../Education/DisciplineTeacher/DisciplineTeacherGroup/DisciplineTeacherGroup.js';
import DisciplineTeacherStudent from '../../Education/DisciplineTeacher/DisciplineTeacherStudent/DisciplineTeacherStudent.js';
import DisciplineTeacherInfo from '../../Education/DisciplineTeacher/DisciplineTeacherInfo/DisciplineTeacherInfo.js';
import DisciplineMaterials from '../../Education/DisciplineMaterials/DisciplineMaterials.js';
import TeacherChooseMarkPopup from '../../Education/EducationPopup/TeacherChooseMarkPopup/TeacherChooseMarkPopup.js';
import TeacherViewFilesPopup from '../../Education/EducationPopup/TeacherViewFilesPopup/TeacherViewFilesPopup.js';
import TeacherViewTestsPopup from '../../Education/EducationPopup/TeacherViewTestsPopup/TeacherViewTestsPopup.js';
import TeacherViewCommentsPopup from '../../Education/EducationPopup/TeacherViewCommentsPopup/TeacherViewCommentsPopup.js';
import TeacherAddCommentPopup from '../../Education/EducationPopup/TeacherAddCommentPopup/TeacherAddCommentPopup.js';
import TeacherEditCommentPopup from '../../Education/EducationPopup/TeacherEditCommentPopup/TeacherEditCommentPopup.js';

function CuratorDiscipline({ windowWidth }) {

  const currentUser = React.useContext(CurrentUserContext);

  const navigate = useNavigate();
  const { disciplineId } = useParams();
  const location = useLocation();

  const [isLoadingDiscipline, setIsLoadingDiscipline] = React.useState(true);
  const [isLoadingStudent, setIsLoadingStudent] = React.useState(true);
  const [isLoadingRequest, setIsLoadingRequest] = React.useState(false);
  const [isShowRequestError, setIsShowRequestError] = React.useState({ isShow: false, text: '', });

  const [groupInfo, setGroupInfo] = React.useState({});
  const [disciplineInfo, setDisciplineInfo] = React.useState({});
  const [disciplineStudents, setDisciplineStudents] = React.useState([]);

  const [isOpenTeacherChooseMark, setIsOpenTeacherChooseMark] = React.useState(false);
  const [isOpenTeacherViewFiles, setIsOpenTeacherViewFiles] = React.useState(false);
  const [isOpenTeacherViewTests, setIsOpenTeacherViewTests] = React.useState(false);
  const [isOpenTeacherViewComments, setIsOpenTeacherViewComments] = React.useState(false);
  const [isOpenTeacherAddComment, setIsOpenTeacherAddComment] = React.useState(false);
  const [isOpenTeacherEditComment, setIsOpenTeacherEditComment] = React.useState(false);

  const sections = [
    { title: 'Список студентов', id: 1, link: '/group' },
    { title: 'Информация о дисциплине', id: 2, link: '/info' },
    { title: 'Учебные материалы', id: 3, link: '/materials' },
  ];

  const [currentSection, setCurrentSection] = React.useState({});
  const [currentStudent, setCurrentStudent] = React.useState({});
  const [currentComment, setCurrentComment] = React.useState({});

  function chooseSection(option) {
    navigate('/curator/discipline/' + disciplineId + option.link);
  }

  function disciplineRequest(disciplineId) {
    setIsLoadingDiscipline(true);
    const token = localStorage.getItem('token');
    educationApi.getDisciplineTeacher({ token: token, teacherId: currentUser.id, disciplineId: disciplineId })
    .then((res) => {
      console.log('Discipline', res);
      setGroupInfo(res.group);
      setDisciplineInfo(res.discipline);
      setDisciplineStudents(res.students.filter((item) => (item.student.fullname !== null)));
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
      const index = disciplineStudents.indexOf(disciplineStudents.find((elem) => (elem.student.id === res.student.id)));
      const student = {
        ...disciplineStudents[index],
        mark: res.mark,
        course_mark: res.course_mark,
        comments: res.new_comment ? [...disciplineStudents[index].comments, res.new_comment ] :  disciplineStudents[index].comments,
      };
      setCurrentStudent(student);
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

  function addComment(data) {
    setIsLoadingRequest(true);
    const token = localStorage.getItem('token');
    educationApi.teacherAddComment({
      token: token,
      discipline_id: disciplineInfo.id,
      student_id: currentStudent.student.id,
      comment: data.text
    })
    .then((res) => {
      const index = disciplineStudents.indexOf(disciplineStudents.find((elem) => (elem.student.id === currentStudent.student.id)));
      const student = {
        ...disciplineStudents[index],
        comments: [...disciplineStudents[index].comments, res],
      };
      setCurrentStudent(student);
      setDisciplineStudents([ ...disciplineStudents.slice(0, index), student, ...disciplineStudents.slice(index + 1)]);
      closeCommentPopup();
    })
    .catch((err) => {
      console.error(err);
    })
    .finally(() => {  
      setIsLoadingRequest(false);
    });
  }

  function editComment(data) {
    setIsLoadingRequest(true);
    const token = localStorage.getItem('token');
    educationApi.teacherEditComment({
      token: token,
      discipline_id: disciplineInfo.id,
      student_id: currentStudent.student.id,
      comment_id: data.id,
      comment: data.text
    })
    .then((res) => {
      const index = disciplineStudents.indexOf(disciplineStudents.find((elem) => (elem.student.id === currentStudent.student.id)));
      const indexComment = disciplineStudents[index].comments.indexOf(disciplineStudents[index].comments.find((elem) => (elem.id === res.id)));
      const comments = ([ 
        ...disciplineStudents[index].comments.slice(0, indexComment), 
        res, 
        ...disciplineStudents[index].comments.slice(indexComment + 1) 
      ]);
      const student = { ...disciplineStudents[index], comments: comments, };
      setCurrentStudent(student);
      setDisciplineStudents([ ...disciplineStudents.slice(0, index), student, ...disciplineStudents.slice(index + 1) ]);
      closeCommentPopup();

    })
    .catch((err) => {
      console.error(err);
    })
    .finally(() => {  
      setIsLoadingRequest(false);
    });
  }

  function openStudent(item) {
    navigate('/curator/discipline/' + disciplineId + '/student/' + item.student.id);
  }

  function getStudent(id) {
    const student = disciplineStudents.find((item) => (item.student.id === id));
    console.log(student);
    setCurrentStudent(student);
    setIsLoadingStudent(false);
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

  function openAddCommentPopup() {
    setIsOpenTeacherAddComment(true);
  }

  function openEditCommentPopup(comment) {
    setCurrentComment(comment);
    setIsOpenTeacherEditComment(true);
  }

  function closeCommentPopup() {
    setIsOpenTeacherAddComment(false);
    setIsOpenTeacherEditComment(false);
  }

  function closeTeacherPopup() {
    setIsOpenTeacherChooseMark(false);
    setIsOpenTeacherViewFiles(false);
    setIsOpenTeacherViewTests(false);
    setIsOpenTeacherViewComments(false);
    setIsShowRequestError({ isShow: false, text: '', })
  }

  function renderDisciplineSection(children) {
    return (
      <Section title={disciplineInfo.name} heightType='page' headerType='large'>
        <div className='discipline-teacher'> 
          <div className='section__header'>
            <div className='section__header-item'>
              <p className='section__header-caption section__header-caption_margin_bottom'>Выберите раздел:</p>
              <SectionSelect sections={sections} currentSection={currentSection} onChooseSection={chooseSection} />
            </div>
            <div className='section__header-item section__header-item_type_content'>
              <p className='section__header-caption section__header-caption_margin_bottom'>Группа:</p>
              <div className='discipline-teacher__header-group'>{groupInfo.name}</div>
            </div>
          </div>
        </div>
        {children}
      </Section>
    )
  }

  React.useEffect(() => {
    disciplineRequest(disciplineId);

    return(() => {
      setDisciplineInfo({});
      setDisciplineStudents([]);
      setCurrentSection({});
      setCurrentStudent({});
      setCurrentComment({});
    })
    // eslint-disable-next-line
  }, [disciplineId]);

  React.useEffect(() => {
    if (!location.pathname.includes('student')) {
      sections.forEach((section) => {
        if (location.pathname.includes(section.link)) {
          setCurrentSection(section);
        }
      });
    }
    // eslint-disable-next-line
  }, [location]);

  return (
    <>
      {
      isLoadingDiscipline 
      ?
      <Preloader />
      :
      <>

      <Routes>
        <Route exact path={`group`}
          element={
            renderDisciplineSection(
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
            )
          }
        />

        <Route exact path={`info`}
          element={
            renderDisciplineSection(
              <DisciplineTeacherInfo
                windowWidth={windowWidth}
                disciplineId={disciplineId}
              /> 
            )
          }
        />

        <Route exact path={`materials`}
          element={
            renderDisciplineSection(
              <DisciplineMaterials
                windowWidth={windowWidth}
                disciplineId={disciplineId}
              /> 
            )
          }
        />

        <Route exact path={`/student/:studentId/*`}
          element={
            <DisciplineTeacherStudent 
              windowWidth={windowWidth}
              disciplineInfo={disciplineInfo}
              getStudent={getStudent}
              currentStudent={currentStudent}
              isLoadingStudent={isLoadingStudent}
              onAddComment={openAddCommentPopup}
              onEditComment={openEditCommentPopup}
              onChooseMark={openChooseMarkPopup}
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
          onAddComment={openAddCommentPopup}
          onEditComment={openEditCommentPopup}
          currentStudent={currentStudent}
        />
      }

      {
        isOpenTeacherAddComment &&
        <TeacherAddCommentPopup
          isOpen={isOpenTeacherAddComment}
          onClose={closeCommentPopup}
          onAdd={addComment}
          currentStudent={currentStudent}
          isLoadingRequest={isLoadingRequest}
          isShowRequestError={isShowRequestError}
        />
      }

      {
        isOpenTeacherEditComment &&
        <TeacherEditCommentPopup 
          isOpen={isOpenTeacherEditComment}
          onClose={closeCommentPopup}
          onEdit={editComment}
          currentStudent={currentStudent}
          currentComment={currentComment}
          isLoadingRequest={isLoadingRequest}
          isShowRequestError={isShowRequestError}
        />
      }

      </>
      }
    </>
  );
}

export default CuratorDiscipline; 