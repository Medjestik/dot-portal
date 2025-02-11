import { API_URL } from './config.js';

function handleResponse (res) {
  if (res.ok) {
    return res.json()
  } else {
    return Promise.reject(res)
  }
}

export const getGroupCourses = ({ token, groupId }) => {
  return fetch(`${API_URL}/reports/action/get_group_courses?group_id=${groupId}`, {  
      method: 'GET',
      headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'Authorization': `Basic ${token}`,
      }
  })
  .then(res => handleResponse(res))
};

export const getGroupCourseData = ({ token, groupId, courseId }) => {
  return fetch(`${API_URL}/reports/action/universal_group_report?group_id=${groupId}&course_id=${courseId}`, {  
      method: 'GET',
      headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'Authorization': `Basic ${token}`,
      }
  })
  .then(res => handleResponse(res))
};

export const getUserCourses = ({ token, userId }) => {
  return fetch(`${API_URL}/reports/action/get_user_courses?user_id=${userId}`, {  
      method: 'GET',
      headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'Authorization': `Basic ${token}`,
      }
  })
  .then(res => handleResponse(res))
};

export const getUserTestData = ({ token, id }) => {
  return fetch(`${API_URL}/reports/action/get_user_tests?active_learning_id=${id}`, {  
      method: 'GET',
      headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'Authorization': `Basic ${token}`,
      }
  })
  .then(res => handleResponse(res))
};

export const getUserCourseData = ({ token, userId, courseId }) => {
  return fetch(`${API_URL}/reports/action/universal_user_report?user_id=${userId}&course_id=${courseId}`, {  
      method: 'GET',
      headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'Authorization': `Basic ${token}`,
      }
  })
  .then(res => handleResponse(res))
};
