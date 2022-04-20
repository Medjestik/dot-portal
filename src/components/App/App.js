import React from 'react';
import './App.css';
import { Route, Routes, useLocation } from 'react-router-dom';
import * as api from '../../utils/api.js';
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
  const [isLoadingPage, setIsLoadingPage] = React.useState(false);

  const { pathname } = useLocation();

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
    const token = 'bmF2eWRyYWdvbjpFcGlkZW1pYTEy';
    if (token) {
      setIsLoadingPage(true);
      api.getUser({ token: token })
        .then((res) => {
          if (res) {
            console.log(res);
            setLoggedIn(true);
            setCurrentUser(res.data);
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
          setIsLoadingPage(false);
        });
    }
  }

  function handleLogout () {
    localStorage.removeItem('token');
    setLoggedIn(false);
    setCurrentUser({});
    //history.push('/');
  }

  React.useEffect(() => {
    tokenCheck();
    // eslint-disable-next-line
  }, []);

  return (
    <div className='page'>
      <div className='wrapper'>
        <div className='container'>
            <Header />
            <div className='main-container'>

              <Routes>
                <Route 
                exact 
                path='person' 
                element={
                <Person />}
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
      </div>
    </div>
  );
}

export default App; 
