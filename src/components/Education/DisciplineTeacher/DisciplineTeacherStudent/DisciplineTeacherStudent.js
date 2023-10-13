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
        <h4 className='popup__author-title popup__author-title_font_small popup__author-title_type_active' onClick={() => onEditComment(comment)}>{comment.text}</h4>
      )
    } else {
      return (
        <h4 className='popup__author-title popup__author-title_font_small'>{comment.text}</h4>
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
                <p className='popup__item-text'><span className='popup__item-text_weight_bold'>Почта: </span>{currentStudent.student.email}</p>
                <p className='popup__item-text'><span className='popup__item-text_weight_bold'>Телефон: </span>{currentStudent.student.phone}</p>
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
              <div className='section__header-title-container'>
                <h5 className='section__header-title'>Тестирование ({currentStudent.learning.completed_tests_count}/{currentStudent.learning.total_tests_count})</h5>
              </div>
              <ul className='discipline-teacher__student-section-list scroll' style={Object.assign({}, listStyle)}>
              {
                currentStudent.learning.tests_info.map((elem, i) => (
                  <li key={i} className='popup__item popup__item_type_scroll'>
                    <div className='popup__item-container'>
                      <TestChart test={elem} />
                      <div className='popup__item-info'>
                        <h4 className='popup__item-title'>{elem.name}</h4>
                        <p className='popup__item-text'><span className='popup__item-text_weight_bold'>Лучшая попытка: </span>{elem.score}/{elem.max_score}</p>
                        <p className='popup__item-text'><span className='popup__item-text_weight_bold'>Количество попыток: </span>{elem.attempts}</p>
                      </div>
                    </div>
                  </li>
                ))
              }
            </ul>
            </li>
            <li className='discipline-teacher__student-section'>
              <div className='section__header-title-container'>
                <h5 className='section__header-title'>Файлы ({currentStudent.files.length})</h5>
              </div>
              <ul className='discipline-teacher__student-section-list scroll' style={Object.assign({}, listStyle)}>
                {
                  [...currentStudent.files].reverse().map((elem, i) => (
                    <li key={i} className='popup__item popup__item_type_scroll'>
                      <div className='popup__item-container'>
                      <a className='btn-icon btn-icon_color_accent-blue btn-icon_type_download' target='_blank' rel='noreferrer' href={elem.link}> </a>
                        <div className='popup__item-info'>
                          <h4 className='popup__item-title'>{elem.name}</h4>
                          <p className='popup__item-text'><span className='popup__item-text_weight_bold'>Дата загрузки: </span>{elem.date}</p>
                        </div>
                      </div>
                    </li>
                  ))
                }
              </ul>
            </li>
            <li className='discipline-teacher__student-section'>
              <div className='section__header-title-container'>
                <h5 className='section__header-title'>Комментарии ({currentStudent.comments.length})</h5>
                <button className='btn-add-round btn-add-round_margin_auto' type='button' onClick={() => onAddComment()}></button>
              </div>

              <ul className='discipline-teacher__student-section-list scroll' style={Object.assign({}, listStyle)}>
                {
                  currentStudent.comments.slice(0).reverse().map((elem, i) => (
                    <li key={i} className='popup__item popup__item_type_scroll'>
                      <div className='popup__author'>
                        <div className='popup__author-info'>
                          {renderComment(elem)}
                          <p className='popup__author-text'><span className='popup__item-text_weight_bold'>Автор: </span>{elem.author_fullname}</p>
                          <p className='popup__author-text'><span className='popup__item-text_weight_bold'>Дата публикации: </span>{elem.date}</p>
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