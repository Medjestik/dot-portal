import React from 'react';
import './App.css';
import { Route, Routes, useLocation, useNavigate, Navigate } from 'react-router-dom';
import * as api from '../../utils/api.js';
import { CurrentUserContext } from '../../contexts/CurrentUserContext.js';
import HomePage from '../HomePage/HomePage.js';
import Header from '../Header/Header.js';
import Person from '../Person/Person.js';
import SemesterUser from '../Education/SemesterUser/SemesterUser.js';
import Journal from '../Journal/Journal.js';
import Curator from '../Curator/Curator.js';
import Control from '../Control/Control.js';
import Webinar from '../Webinar/Webinar.js';
import Document from '../Document/Document.js';
import Library from '../Library/Library.js';
import Course from '../Course/Course.js';
import Notifications from '../Notifications/Notifications.js';
import Events from '../Events/Events.js';
import SemesterTeacher from '../Education/SemesterTeacher/SemesterTeacher.js';

function App() { 

  const [currentUser, setCurrentUser] = React.useState({});
  const [loggedIn, setLoggedIn] = React.useState(false);

  const [semesterInfo, setSemesterInfo] = React.useState([]);

  const [requestError, setRequestError] = React.useState(false);
  const [isLoadingRequest, setIsLoadingRequest] = React.useState(false);

  const [isLoadingPage, setIsLoadingPage] = React.useState(true);

  const navigate = useNavigate();
  const { pathname } = useLocation();
  const [windowWidth, setWindowWidth] = React.useState(0);

  function handleLogin(login, password) {
    setIsLoadingRequest(true);
    api.login({ login, password })
      .then((res) => {
        localStorage.setItem('token', res.token);
        tokenCheck();
      })
      .catch((err) => {
        console.log(err);
        setRequestError(true);
      })
      .finally(() => {
        setIsLoadingRequest(false);
      });
  }

  function tokenCheck () {
    const token = localStorage.getItem('token');
    if (token) {
      setIsLoadingPage(true);
      api.getUser({ token: token })
        .then((res) => {
          console.log('UserInfo', res);
          setLoggedIn(true);
          setCurrentUser(res);
          if (res.access_role === 'dot') {
            semesterUserInfoRequest(res.id);
          } else if (res.access_role === 'tutor') {
            semesterTeacherInfoRequest();
          } else if (res.access_role === 'admin') {
            semesterTeacherInfoRequest();
          } else {
            if (pathname === '/') {
              navigate('/person');
              setIsLoadingPage(false);
            } else {
              navigate(pathname);
              setIsLoadingPage(false);
            }
          }
        })
        .catch(() => {
          localStorage.removeItem('token');
          setIsLoadingPage(false);
          navigate('/');
          setLoggedIn(false);
          setCurrentUser({});
        })
    } else {
      setIsLoadingPage(false);
      navigate('/');
      setLoggedIn(false);
      setCurrentUser({});
    }
  }

  function semesterUserInfoRequest(userId) {
    const token = localStorage.getItem('token');
    api.getUserSemesterInfo({ token: token, userId: userId })
    .then((res) => {
      //console.log('SemesterInfo', res);
      const newArr = res.map((item) => {
        return ({ ...item, id: item.semesterId, name: 'Семестр ' + item.position})
      })
      setSemesterInfo(newArr);
      if (pathname === '/') {
        navigate('/person');
      } else {
        navigate(pathname);
      }
    })
    .catch((err) => {
      console.error(err);
    })
    .finally(() => {
      setIsLoadingPage(false);
    });
  }

  function semesterTeacherInfoRequest() {
    const token = localStorage.getItem('token');
    api.getTeacherSemesterInfo({ token: token })
    .then((res) => {
      //console.log('SemesterInfo', res);
      setSemesterInfo(res);
      if (pathname === '/') {
        navigate('/person');
      } else {
        navigate(pathname);
      }
    })
    .catch((err) => {
      console.error(err);
    })
    .finally(() => {
      setIsLoadingPage(false);
    });
  }

  function handleHideRequestError() {
    setRequestError(false);
  }

  function handleLogout() {
    localStorage.removeItem('token');
    setLoggedIn(false);
    setCurrentUser({});
    navigate('/');
  }

  function handleChangeUserPhoto(avatar) {
    setCurrentUser({ ...currentUser, avatar: avatar });
  }

  function handleChangePresonData(data) {
    setCurrentUser({ ...currentUser, birthDate: data.birthDate, snils:  data.snils, phone:  data.phone, email:  data.email, });
  }

  function handleChangeUserData(data) {
    setCurrentUser({ ...currentUser, birthDate: data.birthDate, snils:  data.snils, phone:  data.phone, email:  data.email, pers_data: 'true', edu_level: data.edu_level.name });
  }

  React.useEffect(() => {
    if (pathname === '/webinar.html') {
      window.location.replace('https://pruffme.com/landing/u2634840/7097537877620290081');
    }
  }, [pathname]);

  React.useEffect(() => {
    tokenCheck();

    return(() => {
      setCurrentUser({});
      setSemesterInfo([]);
    })
    // eslint-disable-next-line
  }, []);

  React.useEffect(() => {
      function resizeWindow (evt) {
        setWindowWidth(evt.target.innerWidth);
      }
      window.addEventListener('resize', resizeWindow);
      return () => {
        window.removeEventListener('resize', resizeWindow);
      }
    }, []);

  React.useEffect(() => {
    setWindowWidth(window.innerWidth);
  }, [windowWidth])

  function appHeight() {
    const doc = document.documentElement;
    doc.style.setProperty('--vh', (window.innerHeight*.01) + 'px');
  }

  React.useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  
  window.addEventListener('resize', appHeight);
  appHeight();

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className='page'>
        {
          isLoadingPage ?
          <div></div>
          :
          <Routes>

            <Route exact path='/' element={
              <HomePage 
                onLogin={handleLogin}
                requestError={requestError}
                onHideRequestError={handleHideRequestError}
                isLoadingRequest={isLoadingRequest}
              />
            }/>

            <Route path='/*' element={
              loggedIn === true 
              ? 
              <div className='wrapper'>
                <div className='container'>

                    <Header 
                    windowWidth={windowWidth}
                    pathname={pathname}
                    onLogout={handleLogout}
                    semesterInfo={semesterInfo}
                    />
                    
                    <div className='main-container'>
                      <Routes>

                        <Route exact path='person' element={
                          <Person 
                          windowWidth={windowWidth} 
                          onChangeUserPhoto={handleChangeUserPhoto} 
                          onChangeUserData={handleChangePresonData} 
                          />
                        }/>

                        <Route path='education/semester/:semesterId/*' element={
                          <SemesterUser 
                          windowWidth={windowWidth} 
                          semesterInfo={semesterInfo}
                          onLogout={handleLogout} 
                          />
                        }/>

                        <Route path='journal/*' element={
                          <Journal
                          windowWidth={windowWidth}
                          onLogout={handleLogout}
                          />
                        }/>

                        <Route path='curator/*' element={
                          <Curator
                          windowWidth={windowWidth}
                          onLogout={handleLogout}
                          />
                        }/>

                        <Route path='control/*' element={
                          currentUser.access_role === 'admin' 
                          ? 
                          <Control
                          windowWidth={windowWidth}
                          onLogout={handleLogout}
                          semesterInfo={semesterInfo}
                          />
                          :
                          <Navigate to='/person' />
                        }/>

                        <Route path='webinars' element={
                          <Webinar
                          windowWidth={windowWidth}
                          semesterOptions={[{name: 'Не выбран', id: 'empty'}, ...semesterInfo.map((elem) => { return { name: elem.semesterName, id: elem.semesterId }}), {name: 'Другое', id: ''},]}
                          onLogout={handleLogout}
                          />
                        }/>

                        <Route path='document/*' element={
                          <Document 
                          onLogout={handleLogout}
                          />
                        }/>

                        <Route path='library/*' element={ 
                          <Library 
                          windowWidth={windowWidth}
                          onLogout={handleLogout}
                          />
                        }/>

                        <Route path='courses/*' element={ 
                          <Course
                          windowWidth={windowWidth}
                          onLogout={handleLogout}
                          onChangeUserData={handleChangeUserData} 
                          />
                        }/>

                        <Route path='notifications/*' element={
                          <Notifications
                          windowWidth={windowWidth}
                          onLogout={handleLogout}
                          />
                        }/>

                        <Route path='events/*' element={
                          <Events
                          windowWidth={windowWidth}
                          onLogout={handleLogout}
                          />
                        }/>

                        <Route path='semester/:semesterId/*' element={
                          <SemesterTeacher
                          windowWidth={windowWidth}
                          semesterInfo={semesterInfo}
                          onLogout={handleLogout}
                          />
                        }/>

                      </Routes>
                    </div>    
                  </div>
                </div>
              :
              <Navigate to='/homepage' />
            }/>
          </Routes> 
        }
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App; 
