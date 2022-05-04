import React from 'react';
import './App.css';
import { Route, Routes, useLocation } from 'react-router-dom';
import * as api from '../../utils/api.js';
import { CurrentUserContext } from '../../contexts/CurrentUserContext.js';
import Header from '../Header/Header.js';
import Person from '../Person/Person.js';
import Education from '../Education/Education.js';
import Webinar from '../Webinar/Webinar.js';
import Document from '../Document/Document.js';
import Library from '../Library/Library.js';

function App() { 

  const [currentUser, setCurrentUser] = React.useState({});
  const [loggedIn, setLoggedIn] = React.useState(false);
  const [loginError, setLoginError] = React.useState(false);
  const [isLoadingPage, setIsLoadingPage] = React.useState(true);

  const [studentData, setStudentData] = React.useState({});

  const { pathname } = useLocation();
  const [windowWidth, setWindowWidth] = React.useState(0);

  function handleLogin ({ email, password }) {

    api.login({ email, password })
      .then((res) => {
        localStorage.setItem('token', res.token);
        tokenCheck();
      })
      .catch((err) => {
        setLoginError(true);
      })
      .finally(() => {

      });
  }

  function tokenCheck () {
    const token = 'ZG90MjAwOTk6NDcwNjcx';
    if (token) {
      setIsLoadingPage(true);
      api.getUser({ token: token })
        .then((res) => {
          if (res) {
            console.log(res);
            setLoggedIn(true);
            setCurrentUser(res);
            getStudentData(res.id);
            if (pathname === '/') {
              //history.push("/main");
            } else {
              //history.push(pathname);
            }
          } else {
            localStorage.removeItem("token");
            setLoggedIn(false);
            setCurrentUser({});
          }
        })
        .catch((err) => {
            console.error(err);
        })
        .finally(() => {
          //setIsLoadingPage(false);
        });
    }
  }

  function handleLogout () {
    localStorage.removeItem('token');
    setLoggedIn(false);
    setCurrentUser({});
    //history.push('/');
  }

  function getStudentData(id) {
    const token = 'ZG90MjAwOTk6NDcwNjcx';
    api.getStudentData({ token: token, userId: id })
      .then((res) => {
        console.log(res);
        setStudentData(res);
      })
      .catch((err) => {
          console.error(err);
      })
      .finally(() => {
        setIsLoadingPage(false);
      });
  }

  React.useEffect(() => {
    tokenCheck();
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
  
  window.addEventListener('resize', appHeight);
  appHeight();

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className='page'>
        <div className='wrapper'>
        {
          isLoadingPage 
          ?
          <div></div>
          :
          <div className='container'>

              <Header windowWidth={windowWidth} pathname={pathname} />
              
              <div className='main-container'>
                <Routes>
                  <Route 
                  exact 
                  path='person' 
                  element={
                  <Person studentData={studentData} windowWidth={windowWidth} />}
                  />
                  <Route 
                  path='education/*' 
                  element={
                  <Education />}
                  />

                  <Route 
                  path='webinars' 
                  element={
                  <Webinar />}
                  />

                  <Route 
                  path='document/*' 
                  element={
                  <Document />}
                  />

                  <Route 
                  path='library' 
                  element={
                  <Library />}
                  />

                </Routes>
              </div>    
            </div>
          }  
        </div>
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App; 
