import React from 'react';
import './Course.css';
import { Route, Routes, useNavigate } from 'react-router-dom';
import * as courseApi from '../../utils/course.js';
import Preloader from '../Preloader/Preloader.js';
import Section from '../Section/Section.js';
import Search from '../Search/Search.js';
import CourseList from './CourseList/CourseList.js';
import CourseItem from './CourseItem/CourseItem.js';
import SemesterHeader from '../Education/SemesterHeader/SemesterHeader.js';
import SemesterHeaderBtnBack from '../Education/SemesterHeader/SemesterHeaderBtnBack/SemesterHeaderBtnBack.js';
 
function Course({ windowWidth, onLogout }) {

  const navigate = useNavigate();

  const [isLoadingData, setIsLoadingData] = React.useState(true);
  const [courseList, setCourseList] = React.useState([]);
  const [filteredCourse, setFilteredCourse] = React.useState([]);

  function handleOpenCourse(course) {
    navigate('/courses/' + course.id);
  }

  function handleSearch(data) {
    setFilteredCourse(data);
  }

  function dataRequest() {
    setIsLoadingData(true);
    const token = localStorage.getItem('token');
    courseApi.getCourse({ token: token })
    .then((res) => {
      console.log('Course', res);
      setCourseList(res);
      setFilteredCourse(res);
    })
    .catch((err) => {
      console.error(err);
    })
    .finally(() => {  
      setIsLoadingData(false);
    });
  }

  React.useEffect(() => {
    dataRequest();

    return(() => {
      setCourseList([]);
      setFilteredCourse([]);
    })
    // eslint-disable-next-line
  }, []);

  return (
    <div className='course'>

      <SemesterHeader onLogout={onLogout}>
        <SemesterHeaderBtnBack onBack={() => {}} isPerformFunction={false} />
      </SemesterHeader>

      <Routes>
        <Route exact path='/' element={ 
          <Section title='Курсы' heightType='page' headerType='small' >
            {
              isLoadingData 
              ?
              <Preloader />
              :
              <>
              <div className='section__header'>
                <div className='section__header-item'>
                  <span className='section__header-caption section__header-caption_margin_bottom'>Поиск по названию:</span>
                  <Search type='large' id='webinar' data={courseList} onSearch={handleSearch} />
                </div>
              </div>
              <CourseList windowWidth={windowWidth} courses={filteredCourse} openCourse={handleOpenCourse} />
              </>
            }
          </Section>
          }
        >
        </Route>
        <Route exact path={`/:courseId/*`}
          element={
            <CourseItem windowWidth={windowWidth}  />
          }
          />
      </Routes>
    </div>
  );
}

export default Course; 