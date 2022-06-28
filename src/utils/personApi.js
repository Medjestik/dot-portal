import { API_URL } from './config.js';

function handleResponse (res) {
    if (res.ok) {
      return res.json()
    } else {
      return Promise.reject(res)
    }
}

export const changePassword = ({ token, userId, oldPassword, newPassword }) => {
  return fetch(`${API_URL}/students/id/${userId}/action/update_password`, {
    method: 'PATCH', 
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'Authorization': `Basic ${token}`,
    },
    body: JSON.stringify({ oldPassword, newPassword })
  })
  .then(res => handleResponse(res));
};

export const changePhoto = ({ token, userId, name, file }) => {
  return fetch(`${API_URL}/students/id/${userId}/action/update_photo`, {
    method: 'PATCH', 
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'Authorization': `Basic ${token}`,
    },
    body: JSON.stringify({ name, file })
  })
  .then(res => handleResponse(res));
};


export const changeData = ({ token, userId, data }) => {
  return fetch(`${API_URL}/students/id/${userId}/action/update_personal`, {
    method: 'PATCH', 
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'Authorization': `Basic ${token}`,
    },
    body: JSON.stringify({ data })
  })
  .then(res => handleResponse(res));
};

export const getStudentData = ({ token, userId }) => {
  return fetch(`${API_URL}/students/id/${userId}/action/group`, { 
    method: 'GET',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'Authorization': `Basic ${token}`,
    }
  })
  .then(res => handleResponse(res))
};

export const getStudentEducationInfo = ({ token, userId }) => {
  return fetch(`${API_URL}/students/id/${userId}/action/education_info`, { 
    method: 'GET',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'Authorization': `Basic ${token}`,
    }
  })
  .then(res => handleResponse(res))
};

export const getStudentSocial = ({ token, userId }) => {
  return fetch(`${API_URL}/students/id/${userId}/action/social_info`, { 
    method: 'GET',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'Authorization': `Basic ${token}`,
    }
  })
  .then(res => handleResponse(res))
};

export const changeStudentSocial = ({ token, userId, social }) => {
  return fetch(`${API_URL}/students/id/${userId}/action/update_social`, {
    method: 'PATCH', 
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'Authorization': `Basic ${token}`,
    },
    body: JSON.stringify({ social })
  })
  .then(res => handleResponse(res));
};
