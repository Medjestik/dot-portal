import React from 'react';
import './PersonRating.css';
import Accordion from '../../Accordion/Accordion.js';
import PersonRatingInfoPopup from './PersonRatingInfoPopup/PersonRatingInfoPopup.js';
import StarRating from '../../StarRating/StarRating.js';
import PersonRatingSelect from './PersonRatingSelect/PersonRatingSelect.js';
import disciplineIcon from '../../../images/form/discipline-color.svg';
import teacherIcon from '../../../images/form/teacher-color.svg';
import ratingIcon from '../../../images/accordion/accordion-rating.svg';

function PersonRating({ scores, windowWidth }) {

  const [isOpenInfoPopup, setIsOpenInfoPopup] = React.useState(false);
  const [sectionHeight, setSectionHeight] = React.useState(0);

  const [disciplineSelect, setDisciplineSelect] = React.useState({ isChoose: false, discipline: {}, });
  const [disciplineFeedback, setDisciplineFeedback] = React.useState('');
  const [disciplineStarsRating, setDisciplineStarsRating] = React.useState(0);
  const [isBlockDisciplineFeedbackForm, setIsBlockDisciplineFeedbackForm] = React.useState(true);
  const [teacherSelect, setTeacherSelect] = React.useState({ isChoose: false, teacher: {}, });
  const [teacherFeedback, setTeacherFeedback] = React.useState('');
  const [teacherStarsRating, setTeacherStarsRating] = React.useState(0);
  const [isBlockTeacherFeedbackForm, setIsBlockTeacherFeedbackForm] = React.useState(true);

  const discipline = [
    { value: '1', label: 'Русский язык', id: '1', },
    { value: '2', label: 'Математика', id: '2', },
    { value: '3', label: 'Физика', id: '3', },
    { value: '4', label: 'Экономика', id: '4', },
    { value: '5', label: 'Элективные курсы по физической культуре и спорту', id: '5', },
    { value: '6', label: 'Макроэкономическое планирование и прогнозирование', id: '6', },
    { value: '7', label: 'Экономические методы управления жизненным циклом производственных и социальных систем', id: '7', },
    { value: '8', label: 'Управление затратами и себестоимостью', id: '8', },
    { value: '9', label: 'Управление инновациями на железнодорожном транспорте', id: '9', },
  ];

  const teachers = [
    { value: '1', label: 'Мельникова Ксения Витальевна', id: '1', },
    { value: '2', label: 'Иванова София Ивановна', id: '2', },
    { value: '3', label: 'Буракшаева Юлия Сергеевна', id: '3', },
    { value: '4', label: 'Фурсова Елизавета Владимировна', id: '4', },
    { value: '5', label: 'Сапсай Иван Алексеевич', id: '5', },
    { value: '6', label: 'Богословский Артем Михайлович', id: '6', },
    { value: '7', label: 'Самбикина Юлия Владимировна', id: '7', },
    { value: '8', label: 'Пименов Максим Евгеньевич', id: '8', },
    { value: '9', label: 'Миронова Елизавета Валерьевна', id: '9', },
  ];

  function openInfoPopup() {
    setIsOpenInfoPopup(true);
  }

  function closeInfoPopup() {
    setIsOpenInfoPopup(false);
  }

  function handleChangeDisciplineSelect(discipline) {
    setDisciplineSelect({ isChoose: discipline.isChoose, discipline: discipline.option, });
  }

  function handleChangeDisciplineFeedback(e) {
    setDisciplineFeedback(e.target.value);
  }

  function handleChangeDisciplineStarsRating(stars) {
    setDisciplineStarsRating(stars);
  }

  function sendDisciplineFeedback(e) {
    e.preventDefault();
    const feedback = {
      discipline: disciplineSelect,
      stars: disciplineStarsRating,
      text: disciplineFeedback,
    }
    console.log(feedback);
  }

  function handleChangeTeacherSelect(teacher) {
    setTeacherSelect({ isChoose: teacher.isChoose, teacher: teacher.option, });
  }

  function handleChangeTeacherFeedback(e) {
    setTeacherFeedback(e.target.value);
  }

  function handleChangeTeacherStarsRating(stars) {
    setTeacherStarsRating(stars);
  }

  function sendTeacherFeedback(e) {
    e.preventDefault();
    const feedback = {
      teacher: teacherSelect,
      stars: teacherStarsRating,
      text: teacherFeedback,
    }
    console.log(feedback);
  }

  React.useEffect(() => {
    if (!disciplineSelect.isChoose || disciplineFeedback.length < 1 || disciplineStarsRating < 1) {
      setIsBlockDisciplineFeedbackForm(true);
    } else {
      setIsBlockDisciplineFeedbackForm(false);
    }
  }, [disciplineSelect, disciplineFeedback, disciplineStarsRating]);

  React.useEffect(() => {
    if (!teacherSelect.isChoose || teacherFeedback.length < 1 || teacherStarsRating < 1) {
      setIsBlockTeacherFeedbackForm(true);
    } else {
      setIsBlockTeacherFeedbackForm(false);
    }
  }, [teacherSelect, teacherFeedback, teacherStarsRating]);

  
  React.useEffect(() => {
    setIsOpenInfoPopup(false); 
  },[]);

  React.useEffect(() => {
    if (windowWidth > 1439) {
      setSectionHeight(354);
    } else if (windowWidth > 1279) {
      setSectionHeight(612);
    } else {
      setSectionHeight(612);
    }
  }, [windowWidth]);

  return (
    <>
    <Accordion icon={ratingIcon} name='Оценка дисциплин и преподавателей' height={sectionHeight} openInfoPopup={openInfoPopup}>
      <div className='person-rating__container'>
        <div className='person-rating__stars-container'>
          <div className='person-rating__section-discipline'>
            <PersonRatingSelect 
              id='discipline' 
              options={discipline} 
              placeholder={'Выберите дисциплину'} 
              icon={disciplineIcon} 
              onSelect={handleChangeDisciplineSelect} 
            />
            <div className='person-rating__star-container'>
              <StarRating onChange={handleChangeDisciplineStarsRating} />
            </div>
            <form 
            className='person-rating__form' 
            name='person-rating__form-discipline' 
            id='person-rating__form-discipline' 
            onSubmit={sendDisciplineFeedback}
            >
              <textarea 
              className='person-rating__textarea scroll'
              name='person-rating__textarea-discipline'
              id='person-rating__textarea-discipline'
              placeholder='Напишите отзыв...'
              value={disciplineFeedback}
              onChange={handleChangeDisciplineFeedback}
              minLength='1'
              required
              >
              </textarea>
              <div className='person-rating__form-separator'></div>
              <button 
              className={`btn_type_upload person-rating__button ${isBlockDisciplineFeedbackForm ? '' : 'btn_type_upload_status_active'}`} 
              type='submit'>
              </button>
            </form>
          </div>
          <div className='person-rating__section-teacher'>
            <PersonRatingSelect 
            id='teacher' 
            options={teachers} 
            placeholder={'Выберите преподавателя'} 
            icon={teacherIcon}
            onSelect={handleChangeTeacherSelect} 
            />
            <div className='person-rating__star-container'>
              <StarRating onChange={handleChangeTeacherStarsRating} />
            </div>
            <form 
            className='person-rating__form' 
            name='person-rating__form-teacher' 
            id='person-rating__form-teacher'
            onSubmit={sendTeacherFeedback}
            >
              <textarea 
              className='person-rating__textarea scroll'
              name='person-rating__textarea-teacher'
              id='person-rating__textarea-teacher'
              placeholder='Напишите отзыв...'
              value={teacherFeedback}
              onChange={handleChangeTeacherFeedback}
              minLength='1'
              required
              >
              </textarea>
              <div className='person-rating__form-separator'></div>
              <button 
              className={`btn_type_upload person-rating__button ${isBlockTeacherFeedbackForm ? '' : 'btn_type_upload_status_active'}`} 
              type='submit'>
              </button>
            </form>
          </div>

        </div>

        <div className='person-rating__section-score'>
          <h6 className='person-rating__score-title'>Оценки</h6>
          <div className='person-rating__score-container scroll-inside'>
            <ul className='person-rating__score-list'>
              {
                scores.map((item, i) => (
                  <li className='person-rating__score-item' key={i}>
                    <span className='person-rating__score-count'>{item.count}</span>
                    <p className='person-rating__score-text'>{item.text}</p>
                  </li>
                ))
              }
            </ul>
          </div>
        </div>
      </div>    
    </Accordion>
    {
      isOpenInfoPopup &&
      <PersonRatingInfoPopup
        isOpen={isOpenInfoPopup}
        onClose={closeInfoPopup}
      />
    }
    </>

  );
}

export default PersonRating;  