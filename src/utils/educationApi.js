import { API_URL } from './config.js';

function handleResponse (res) {
  if (res.ok) {
    return res.json()
  } else {
    return Promise.reject(res)
  }
}

export const getDisciplines = ({ token, semesterId, currentUserId }) => {
  return fetch(`${API_URL}/education/action/semester_info/semester_id/${semesterId}/student_id/${currentUserId}`, { 
    method: 'GET',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'Authorization': `Basic ${token}`,
    }
  })
  .then(res => handleResponse(res))
};

export const getDisciplineInfo = ({ token, disciplineId }) => {
  return fetch(`${API_URL}/education/action/discipline_info/discipline_id/${disciplineId}`, { 
    method: 'GET',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'Authorization': `Basic ${token}`,
    }
  })
  .then(res => handleResponse(res))
};


export const getDisciplineMaterial = ({ token, disciplineId, currentUserId }) => {
  return fetch(`${API_URL}/education/action/discipline_course/discipline_id/${disciplineId}/student_id/${currentUserId}`, { 
    method: 'GET',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'Authorization': `Basic ${token}`,
    }
  })
  .then(res => handleResponse(res))
};
