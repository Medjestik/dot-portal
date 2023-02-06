import React from 'react';
import './DisciplineTeacherStudent.css';
import { useParams } from 'react-router-dom';
import { CurrentUserContext } from '../../../../contexts/CurrentUserContext.js';
import Preloader from '../../../Preloader/Preloader.js';
import Section from '../../../Section/Section.js';
import TestChart from '../../../TestChart/TestChart.js';

function DisciplineTeacherStudent({ windowWidth, disciplineInfo, getStudent, currentStudent, isLoadingStudent, onAddComment, onEditComment, onChooseMark }) {

  const { studentId } = useParams();

  const currentUser = React.useContext(CurrentUserContext);

  const containerHeightRef = React.createRef();
  const [listHeight, setListHeight] = React.useState(0);

  React.useEffect(() => {
    if (containerHeightRef.current) {
      setListHeight(containerHeightRef.current.clientHeight - 22 - 20 - 48);
    }
  }, [windowWidth, containerHeightRef]);

  const listStyle = {
    height: listHeight,
  };

  function renderComment(comment) {
    if (currentUser.id === comment.author_id) {
      return (
        <h4 className='popup__item-name popup__item-name_type_active' onClick={() => onEditComment(comment)}>{comment.text}</h4>
      )
    } else {
      return (
        <h4 className='popup__item-name'>{comment.text}</h4>
      )
    }
  }

  React.useEffect(() => {
    getStudent(studentId);
  // eslint-disable-next-line
  }, []);

  return (
    <>
      {
        isLoadingStudent ?
        <Preloader />
        :
        <div className='discipline-teacher__student-page'>
          <Section title={disciplineInfo.name} heightType='content' headerType='large'>
            <div className='discipline-teacher__student-info'>
              {
                currentStudent.student.avatar 
                ?
                <img className='discipline-teacher__student-img' src={currentStudent.student.avatar} alt=''></img>
                :
                <div className='discipline-teacher__student-img'></div>
              }
              <div className='discipline-teacher__student-data'>
                <h3 className='discipline-teacher__student-name'>{currentStudent.student.fullname}</h3>
                <p className='discipline-teacher__student-mail'>{currentStudent.student.email}</p>
                <p className='discipline-teacher__student-mail'>{currentStudent.student.phone}</p>
              </div>
              <div className='discipline-teacher__student-marks'>
                <div className='discipline-teacher__student-marks-row'>
                  <div className='discipline-teacher__student-marks-column'>
                    <p className='discipline-teacher__student-mark-title'>Оценка по дисциплине:</p>
                    <span className='discipline-teacher__student-mark'>{currentStudent.mark.name}</span>
                  </div>
                    {
                      disciplineInfo.course_work &&
                      <div className='discipline-teacher__student-marks-column'>
                        <p className='discipline-teacher__student-mark-title'>Оценка за курсовую:</p>
                        <span className='discipline-teacher__student-mark'>{currentStudent.course_mark.name}</span>
                      </div>
                    }
                  </div>
                <button className='discipline-teacher__student-mark-btn' onClick={() => onChooseMark(currentStudent)}>Изменить оценку</button>
              </div>
            </div>
          </Section>
          
          <ul className='discipline-teacher__student-sections'>
            <li className='discipline-teacher__student-section' ref={containerHeightRef}>
              <h5 className='discipline-teacher__student-section-title'>Тестирование ({currentStudent.learning.completed_tests_count}/{currentStudent.learning.total_tests_count})</h5>
              <ul className='discipline-teacher__student-section-list scroll' style={Object.assign({}, listStyle)}>
              {
                currentStudent.learning.tests_info.map((elem, i) => (
                  <li key={i} className='discipline-teacher__student-section-item'>
                    <div className='discipline-teacher__student-section-item-container'>
                      <TestChart test={elem} />
                      <div className='discipline-teacher__student-section-item-info'>
                        <h4 className='discipline-teacher__student-section-item-title'>{elem.name}</h4>
                        <p className='discipline-teacher__student-section-item-text'>Лучшая попытка: {elem.score}/{elem.max_score}</p>
                        <p className='discipline-teacher__student-section-item-text'>Количество попыток: {elem.attempts}</p>
                      </div>
                    </div>
                  </li>
                ))
              }
            </ul>
            </li>
            <li className='discipline-teacher__student-section'>
              <h5 className='discipline-teacher__student-section-title'>Файлы ({currentStudent.files.length})</h5>
              <ul className='discipline-teacher__student-section-list scroll' style={Object.assign({}, listStyle)}>
                {
                  currentStudent.files.map((elem, i) => (
                    <li key={i} className='discipline-teacher__student-section-item'>
                      <a className='btn btn_type_download btn_type_download_status_active' target='_blank' rel='noreferrer' href={elem.link}> </a>
                      <div className='discipline-teacher__student-section-item-container'>
                        <div className='discipline-teacher__student-section-item-info'>
                          <h4 className='discipline-teacher__student-section-item-title'>{elem.name}</h4>
                          <p className='discipline-teacher__student-section-item-text'>Дата загрузки: {elem.date}</p>
                        </div>
                      </div>
                    </li>
                  ))
                }
              </ul>
            </li>
            <li className='discipline-teacher__student-section'>
              <div className='discipline-teacher__student-section-add' onClick={() => onAddComment()}></div>
              <h5 className='discipline-teacher__student-section-title'>Комментарии ({currentStudent.comments.length})</h5>
              <ul className='discipline-teacher__student-section-list scroll' style={Object.assign({}, listStyle)}>
                {
                  currentStudent.comments.slice(0).reverse().map((elem, i) => (
                    <li key={i} className='discipline-teacher__student-section-item'>
                      <div className='discipline-teacher__student-section-item-container'>
                        <img className='discipline-teacher__student-section-item-img' src={elem.author_avatar_link} alt='аватар автора комментария'></img>
                        <div className='discipline-teacher__student-section-item-info'>
                          {renderComment(elem)}
                          <p className='discipline-teacher__student-section-item-text'>{elem.author_fullname}</p>
                          <p className='discipline-teacher__student-section-item-text'>{elem.date}</p>
                        </div>
                      </div>
                    </li>
                  ))
                }
              </ul>
            </li>
          </ul>
        </div>
      }
    </>
  )
}

export default DisciplineTeacherStudent; 