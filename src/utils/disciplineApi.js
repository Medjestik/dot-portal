import { API_URL } from './config.js';

function handleResponse (res) {
  if (res.ok) {
    return res.json()
  } else {
    return Promise.reject(res)
  }
}

export const getDisciplines = ({ token, teacherId, semesterId }) => {
  return fetch(`${API_URL}/tutors/id/${teacherId}/action/semester_work/semester_id/${semesterId}`, { 
    method: 'GET',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'Authorization': `Basic ${token}`,
    }
  })
  .then(res => handleResponse(res))
};
