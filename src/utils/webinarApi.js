import { API_URL } from './config.js';

function handleResponse (res) {
  if (res.ok) {
    return res.json()
  } else {
    return Promise.reject(res)
  }
}

export const getWebinars = ({ token }) => {
  return fetch(`${API_URL}/webinars/action/my_webinars`, { 
    method: 'GET',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'Authorization': `Basic ${token}`,
    }
  })
  .then(res => handleResponse(res))
};

export const getAdminWebinarsList = ({ token }) => {
  return fetch(`${API_URL}/webinars/action/admin_get_webinars`, { 
    method: 'GET',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'Authorization': `Basic ${token}`,
    }
  })
  .then(res => handleResponse(res))
};

export const getWebinarInfo = ({ token, webinarId }) => {
  return fetch(`${API_URL}/webinars/action/get_webinar/webinar_id/${webinarId}`, { 
    method: 'GET',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'Authorization': `Basic ${token}`,
    }
  })
  .then(res => handleResponse(res))
};

export const getWebinarsDiscipline = ({ token, disciplineId }) => {
  return fetch(`${API_URL}/webinars/action/get_discipline_webinars/discipline_id/${disciplineId}`, { 
    method: 'GET',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'Authorization': `Basic ${token}`,
    }
  })
  .then(res => handleResponse(res))
};

export const findWebinarsGroup = ({ token, searchText }) => {
  return fetch(`${API_URL}/webinars/action/search_groups?search=${searchText}`, { 
    method: 'GET',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'Authorization': `Basic ${token}`,
    }
  })
  .then(res => handleResponse(res))
};

export const findWebinarsUser = ({ token, searchText }) => {
  return fetch(`${API_URL}/webinars/action/search_persons?search=${searchText}`, { 
    method: 'GET',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'Authorization': `Basic ${token}`,
    }
  })
  .then(res => handleResponse(res))
};

export const findWebinarsDiscipline = ({ token, semesterId, searchText }) => {
  return fetch(`${API_URL}/webinars/action/search_activities/semester_id/${semesterId}?search=${searchText}`, { 
    method: 'GET',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'Authorization': `Basic ${token}`,
    }
  })
  .then(res => handleResponse(res))
};

export const findWebinarsDate = ({ token, searchText }) => {
  return fetch(`${API_URL}/webinars/action/search_webinars?date=${searchText}`, { 
    method: 'GET',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'Authorization': `Basic ${token}`,
    }
  })
  .then(res => handleResponse(res))
};

export const addWebinar = ({ token, data }) => {
  return fetch(`${API_URL}/webinars/action/create_webinar`, { 
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'Authorization': `Basic ${token}`,
    },
    body: JSON.stringify(data),
  })
  .then(res => handleResponse(res))
};

export const editWebinar = ({ token, data }) => {
  return fetch(`${API_URL}/webinars/action/update_webinar/webinar_id/${data.id}`, { 
    method: 'PATCH',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'Authorization': `Basic ${token}`,
    },
    body: JSON.stringify(data),
  })
  .then(res => handleResponse(res))
};

export const getWebinarItem = ({ token, webinarId }) => {
  return fetch(`${API_URL}/webinars/action/admin_get_webinar/webinar_id/${webinarId}`, { 
    method: 'GET',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'Authorization': `Basic ${token}`,
    }
  })
  .then(res => handleResponse(res))
};

export const removeWebinar = ({ token, webinarId }) => {
  return fetch(`${API_URL}/webinars/action/admin_delete_webinar/webinar_id/${webinarId}`, { 
    method: 'DELETE',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'Authorization': `Basic ${token}`,
    }
  })
  .then(res => handleResponse(res))
};

export const getDisciplinesWithWebinars = ({ token, semesterId }) => {
  return fetch(`${API_URL}/webinars/action/search_activities/semester_id/${semesterId}?search=`, { 
    method: 'GET',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'Authorization': `Basic ${token}`,
    }
  })
  .then(res => handleResponse(res))
};
