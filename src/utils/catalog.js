import { API_URL } from './config.js';

function handleResponse (res) {
  if (res.ok) {
    return res.json()
  } else {
    return Promise.reject(res)
  }
}

export const getCatalogTutors = ({ token }) => {
  return fetch(`${API_URL}/catalogs/action/get_tutors`, {  
      method: 'GET',
      headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'Authorization': `Basic ${token}`,
      }
  })
  .then(res => handleResponse(res))
};

export const getCatalogCourses = ({ token }) => {
  return fetch(`${API_URL}/catalogs/action/get_courses`, {  
      method: 'GET',
      headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'Authorization': `Basic ${token}`,
      }
  })
  .then(res => handleResponse(res))
};

export const getCatalogControlForms = ({ token }) => {
  return fetch(`${API_URL}/catalogs/action/get_control_forms`, {  
      method: 'GET',
      headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'Authorization': `Basic ${token}`,
      }
  })
  .then(res => handleResponse(res))
};
