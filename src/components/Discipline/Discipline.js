import React from 'react';
import './Discipline.css';
import { Route, Routes, useNavigate, useParams } from 'react-router-dom';
import DisciplineInfo from './DisciplineInfo/DisciplineInfo.js';
import DisciplineMaterials from './DisciplineMaterials/DisciplineMaterials.js';
import DisciplineTasks from './DisciplineTasks/DisciplineTasks.js';
import Month from '../Month/Month.js';

function Discipline({ currentDiscipline }) {

  const navigate = useNavigate();
  const { disciplineId } = useParams();

  const [isShowMonth, setIsShowMonth] = React.useState(true);

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

  const folders = [
    { name: 'Теоретический материал', type: 'theory', materials: [{ name: 'Глава 1. Теоретический материал', type: 'theory', status: 'empty' }] },
    { name: 'Практические задания', type: 'practice', 
    materials: [
    { name: 'Практическое задание № 1', type: 'practice', status: 'empty' },
    { name: 'Практическое задание № 2 с очень-очень-очень-очень-очень-очень-очень-очень-очень длинным названием', type: 'practice', status: 'progress' }, 
    { name: 'Практическое задание № 3 с очень-очень-очень-очень-очень-очень-очень-очень-очень длинным названием длинным названием длинным названием', type: 'practice', status: 'success' }, 
    ] 
    },
  ]

  const [currentChapter, setCurrentChapter] = React.useState(chapters[0]);
  const [isOpenSelectOptions, setIsOpenSelectOptions] = React.useState(false);

  function openSelectOptions() {
    setIsOpenSelectOptions(!isOpenSelectOptions);
  }

  function chooseOption(option) {
    if (option.link === '/info') {
      setIsShowMonth(true);
    } else {
      setIsShowMonth(false);
    }
    setCurrentChapter(option);
    setIsOpenSelectOptions(false);
    navigate('/education/semester/discipline/' + disciplineId + option.link);
  }

  return (
    <div className='discipline'>
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

          {
            isShowMonth &&
            <Month />
          }
          

        </div>
      </div>

      <Routes>
        <Route exact path={`info`} 
        element={
          <DisciplineInfo currentDiscipline={currentDiscipline} documents={documents} /> 
        }
        />
      </Routes>

      <Routes>
        <Route exact path={`materials`} 
        element={
          <DisciplineMaterials folders={folders} />
        }
        />
      </Routes>

      <Routes>
        <Route exact path={`tasks`} 
        element={
          <DisciplineTasks currentDiscipline={currentDiscipline} documents={documents} />
        }
        />
      </Routes>


    </div>
  );
}

export default Discipline; 