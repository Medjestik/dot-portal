import { API_URL } from './config.js';

function handleResponse (res) {
  if (res.ok) {
    return res.json()
  } else {
    return Promise.reject(res)
  }
}

export const getCourse = ({ token }) => {
  return fetch(`${API_URL}/users/action/my_courses`, {  
    method: 'GET',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'Authorization': `Basic ${token}`,
      }
    })
  .then(res => handleResponse(res))
};

export const getCourseMaterials = ({ token, courseId }) => {
  return fetch(`${API_URL}/users/action/active_course/active_course_id/${courseId}`, {  
    method: 'GET',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'Authorization': `Basic ${token}`,
      }
    })
  .then(res => handleResponse(res))
};

export const changeData = ({ token, data }) => {
  return fetch(`${API_URL}/users/action/save_pk_data`, {
    method: 'POST', 
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'Authorization': `Basic ${token}`,
    },
    body: JSON.stringify({ data })
  })
  .then(res => handleResponse(res));
};
