import React from 'react';
import './App.css';
import { Route, Routes, useLocation, useNavigate, Navigate } from 'react-router-dom';
import * as api from '../../utils/api.js';
import { CurrentUserContext } from '../../contexts/CurrentUserContext.js';
import HomePage from '../HomePage/HomePage.js';
import Header from '../Header/Header.js';
import Person from '../Person/Person.js';
import Education from '../Education/Education.js';
import Webinar from '../Webinar/Webinar.js';
import Document from '../Document/Document.js';
import Library from '../Library/Library.js';

function App() { 

  const [currentUser, setCurrentUser] = React.useState({});
  
  const [loggedIn, setLoggedIn] = React.useState(false);
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
          if (res) {
            console.log('UserInfo', res);
            setLoggedIn(true);
            setCurrentUser(res);
            if (pathname === '/') {
              navigate('/person');
            } else {
              navigate(pathname);
            }
          } else {
            localStorage.removeItem('token');
            navigate('/');
            setLoggedIn(false);
            setCurrentUser({});
          }
        })
        .catch((err) => {
            console.error(err);
        })
        .finally(() => {
          setIsLoadingPage(false);
        });
    } else {
      setIsLoadingPage(false);
      navigate('/');
      setLoggedIn(false);
      setCurrentUser({});
    }
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
    console.log(avatar);
    console.log({ ...currentUser, avatar: avatar })
    setCurrentUser({ ...currentUser, avatar: avatar });
  }

  function handleChangeUserData(data) {
    setCurrentUser({ ...currentUser, birthDate: data.birthDate, snils:  data.snils, phone:  data.phone, email:  data.email, });
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
              loggedIn === true ? 
              <div className='wrapper'>
                <div className='container'>

                    <Header windowWidth={windowWidth} pathname={pathname} onLogout={handleLogout} />
                    
                    <div className='main-container'>
                      <Routes>

                        <Route exact path='person' element={
                          <Person 
                          windowWidth={windowWidth} 
                          onChangeUserPhoto={handleChangeUserPhoto}
                          onChangeUserData={handleChangeUserData}
                          />
                        }/>

                        <Route path='education/*' element={
                          <Education />
                        }/>

                        <Route path='webinars' element={
                          <Webinar />
                        }/>

                        <Route path='document/*' element={
                        <Document />
                        }/>

                        <Route path='library' element={
                        <Library />
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
