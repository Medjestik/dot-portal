import React from 'react';
import './Discipline.css';
import { Route, Routes, useNavigate, useParams, useLocation } from 'react-router-dom';
import DisciplineInfo from './DisciplineInfo/DisciplineInfo.js';
import DisciplineMaterials from './DisciplineMaterials/DisciplineMaterials.js';
import DisciplineTasks from './DisciplineTasks/DisciplineTasks.js';
import Month from '../Month/Month.js';
import { CurrentUserContext } from '../../contexts/CurrentUserContext.js';
import * as educationApi from '../../utils/educationApi.js';
import Preloader from '../Preloader/Preloader.js';

function Discipline({ windowWidth, currentSemester, currentDiscipline, getDisciplineName }) {

  const navigate = useNavigate();
  const { disciplineId } = useParams();
  const location = useLocation();

  const currentUser = React.useContext(CurrentUserContext);

  const [isShowMonth, setIsShowMonth] = React.useState(true);
  const [isLoadingDiscipline, setIsLoadingDiscipline] = React.useState(true);

  const [disciplineInfo, setDisciplineInfo] = React.useState({});

  const chapters = [
    { title: 'Информация о дисциплине', id: 1, link: '/info' },
    { title: 'Учебные материалы', id: 2, link: '/materials' },
    { title: 'Загрузка заданий', id: 3, link: '/tasks' },
  ];

  const documents = [
    { title: 'ГОСТ 1759. 5 – 87. Гайки. Механические свойства и методы ГОСТ 1759. 5 – 87. Гайки. Механические свойства и методы', id: 1, date: '09.03.22 12:20' },
    { title: 'ГОСТ 7.53 – 2001. Издания. Международная стандартная нумерация книг [Текст]. – Взамен ГОСТ 7.53 – 86; введ. 2002 – 07 – 01. – Минск: Межгос. Совет по стандартизации, метрологии и сертификации; Москва: Изд-во стандартов, 2002. – 3 с.', id: 2, date: '09.03.22 12:20' },
    { title: 'ГОСТ 1759. 5 – 87. Гайки. Механические свойства и методы', id: 3, date: '09.03.22 12:20' },
    { title: 'ГОСТ 1759. 5 – 87. Гайки. Механические свойства и методы', id: 4, date: '09.03.22 12:20' },
    { title: 'ГОСТ 7.53 – 2001. Издания. Международная стандартная нумерация книг [Текст]. – Взамен ГОСТ 7.53 – 86; введ. 2002 – 07 – 01. – Минск: Межгос. Совет по стандартизации, метрологии и сертификации; Москва: Изд-во стандартов, 2002. – 3 с.', id: 5, date: '09.03.22 12:20' },
    { title: 'ГОСТ 1759. 5 – 87. Гайки. Механические свойства и методы', id: 6, date: '09.03.22 12:20' },
    { title: 'ГОСТ 1759. 5 – 87. Гайки. Механические свойства и методы ГОСТ 1759. 5 – 87. Гайки. Механические свойства и методы', id: 1, date: '09.03.22 12:20' },
    { title: 'ГОСТ 1759. 5 – 87. Гайки. Механические свойства и методы ГОСТ 1759. 5 – 87. Гайки. Механические свойства и методы', id: 1, date: '09.03.22 12:20' },
    { title: 'ГОСТ 1759. 5 – 87. Гайки. Механические свойства и методы', id: 2, date: '09.03.22 12:20' },
    { title: 'ГОСТ 7.53 – 2001. Издания. Международная стандартная нумерация книг [Текст]. – Взамен ГОСТ 7.53 – 86; введ. 2002 – 07 – 01. – Минск: Межгос. Совет по стандартизации, метрологии и сертификации; Москва: Изд-во стандартов, 2002. – 3 с.', id: 3, date: '09.03.22 12:20' },
    { title: 'ГОСТ 1759. 5 – 87. Гайки. Механические свойства и методы', id: 4, date: '09.03.22 12:20' },
    { title: 'ГОСТ 1759. 5 – 87. Гайки. Механические свойства и методы', id: 5, date: '09.03.22 12:20' },
    { title: 'ГОСТ 1759. 5 – 87. Гайки. Механические свойства и методы', id: 6, date: '09.03.22 12:20' },
    { title: 'ГОСТ 1759. 5 – 87. Гайки. Механические свойства и методы ГОСТ 1759. 5 – 87. Гайки. Механические свойства и методы', id: 1, date: '09.03.22 12:20' },
    { title: 'ГОСТ 1759. 5 – 87. Гайки. Механические свойства и методы ГОСТ 1759. 5 – 87. Гайки. Механические свойства и методы', id: 1, date: '09.03.22 12:20' },
    { title: 'ГОСТ 1759. 5 – 87. Гайки. Механические свойства и методы', id: 2, date: '09.03.22 12:20' },
    { title: 'ГОСТ 1759. 5 – 87. Гайки. Механические свойства и методы', id: 3, date: '09.03.22 12:20' },
    { title: 'ГОСТ 1759. 5 – 87. Гайки. Механические свойства и методы', id: 4, date: '09.03.22 12:20' },
    { title: 'ГОСТ 1759. 5 – 87. Гайки. Механические свойства и методы', id: 5, date: '09.03.22 12:20' },
    { title: 'ГОСТ 1759. 5 – 87. Гайки. Механические свойства и методы', id: 6, date: '09.03.22 12:20' },
    { title: 'ГОСТ 1759. 5 – 87. Гайки. Механические свойства и методы ГОСТ 1759. 5 – 87. Гайки. Механические свойства и методы', id: 1, date: '09.03.22 12:20' },
  ];

  const [currentChapter, setCurrentChapter] = React.useState({});
  const [isOpenSelectOptions, setIsOpenSelectOptions] = React.useState(false);

  function openSelectOptions() {
    setIsOpenSelectOptions(!isOpenSelectOptions);
  }

  function chooseOption(option) {
    /*if (option.link === '/info') {
      setIsShowMonth(true);
    } else {
      setIsShowMonth(false);
    }*/
    setCurrentChapter(option);
    setIsOpenSelectOptions(false);
    navigate('/education/semester/' + currentSemester.semesterId + '/discipline/' + disciplineId + option.link);
  }

  function disciplineRequest(disciplineId) {
    setIsLoadingDiscipline(true);
    const token = localStorage.getItem('token');
    educationApi.getDisciplineMaterial({ token: token, disciplineId: disciplineId, currentUserId: currentUser.id })
    .then((res) => {
      console.log('DisciplineInfo', res);
      setDisciplineInfo(res);
      getDisciplineName(res.object_id);
      chapters.forEach((chap) => {
        if (location.pathname.includes(chap.link)) {
          setCurrentChapter(chap);
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

  React.useEffect(() => {
    disciplineRequest(disciplineId);
    // eslint-disable-next-line
  }, [disciplineId]);

  return (
    <div className='discipline'>
      {
      isLoadingDiscipline 
      ?
      <Preloader />
      :
      <>
      <div className='discipline__header'>
        <p className='discipline__header-caption'>Выберите раздел дисциплины:</p>
        <div className='discipline__header-container'>
          <div className={`discipline__header-select ${isOpenSelectOptions ? 'discipline__header-select_status_open' : ''}`}>
            <div className='discipline__header-select-main' onClick={openSelectOptions}>
              <p className='discipline__header-select-text'>{currentChapter.title}</p>
              <div className={`discipline__header-select-arrow ${isOpenSelectOptions ? 'discipline__header-select-arrow_status_open' : ''}`}></div>
            </div>
            <div className={`discipline__header-select-options-container ${isOpenSelectOptions ? 'discipline__header-select-options-container_status_open' : ''}`}>
              <ul className='discipline__header-select-options-list'>
                {
                  chapters.filter(item => item.id !== currentChapter.id).map((item, i) => (
                    <li className='discipline__header-select-options-item' key={i} onClick={() => chooseOption(item)}>
                      <p className='discipline__header-select-options-text'>{item.title}</p>
                    </li>
                  ))
                }
              </ul>
            </div>
          </div>

          { /*
            isShowMonth &&
            <Month />
            */
          }
          
        </div>
      </div>

      <Routes>
        <Route exact path={`info`}
        element={
          <DisciplineInfo windowWidth={windowWidth} currentDiscipline={currentDiscipline} documents={documents} /> 
        }
        />
      </Routes>

      <Routes>
        <Route exact path={`materials`}
        element={
          <DisciplineMaterials disciplineId={disciplineId} />
        }
        />
      </Routes>

      <Routes>
        <Route exact path={`tasks`}
        element={
          <DisciplineTasks windowWidth={windowWidth} currentDiscipline={currentDiscipline} documents={documents} />
        }
        />
      </Routes>
    </>
    }
    </div>
  );
}

export default Discipline; 