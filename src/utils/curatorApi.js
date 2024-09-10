import { API_URL } from './config.js';

function handleResponse (res) {
  if (res.ok) {
    return res.json()
  } else {
    return Promise.reject(res)
  }
}

export const getGroups = ({ token }) => {
  return fetch(`${API_URL}/curators/action/my_groups`, { 
    method: 'GET',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'Authorization': `Basic ${token}`,
    }
  })
  .then(res => handleResponse(res))
};

export const getGroupInfo = ({ token, groupId }) => {
  return fetch(`${API_URL}/curators/action/group_info/group_id/${groupId}`, { 
    method: 'GET',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'Authorization': `Basic ${token}`,
    }
  })
  .then(res => handleResponse(res))
};

export const getGroupList = ({ token, groupId }) => {
  return fetch(`${API_URL}/curators/action/students/group_id/${groupId}`, {  
    method: 'GET',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'Authorization': `Basic ${token}`,
    }
  })
  .then(res => handleResponse(res))
};

export const getGroupAdvertisement = ({ token, groupId }) => {
  return fetch(`${API_URL}/curators/action/announcements/group_id/${groupId}`, {  
    method: 'GET',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'Authorization': `Basic ${token}`,
    }
  })
  .then(res => handleResponse(res))
};

export const curatorAddAdvertisement = ({ token, groupId, advertisement }) => {
  return fetch(`${API_URL}/curators/action/add_announcement/group_id/${groupId}`, { 
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'Authorization': `Basic ${token}`,
    },
    body: JSON.stringify({ title: advertisement.title, text: advertisement.text, files: advertisement.files, })
  })
  .then(res => handleResponse(res))
};

export const removeAdvertisement = ({ token, advertisementId }) => {
  return fetch(`${API_URL}/curators/action/delete_announcement/announcement_id/${advertisementId}`, { 
    method: 'DELETE',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'Authorization': `Basic ${token}`,
    },
  })
  .then(res => handleResponse(res))
};

export const getGroupDisciplines = ({ token, groupId }) => {
  return fetch(`${API_URL}/curators/action/disciplines/group_id/${groupId}`, {  
    method: 'GET',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'Authorization': `Basic ${token}`,
    }
  })
  .then(res => handleResponse(res))
};


export const getGroupPractice = ({ token, groupId }) => {
  return fetch(`${API_URL}/curators/action/practics/group_id/${groupId}`, {  
    method: 'GET',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'Authorization': `Basic ${token}`,
    }
  })
  .then(res => handleResponse(res))
};

export const getSemesterDetail = ({ token, semesterId }) => {
  return fetch(`${API_URL}/curators/action/expanded_report/semester_id/${semesterId}`, { 
    method: 'GET',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'Authorization': `Basic ${token}`,
    }
  })
  .then(res => handleResponse(res))
};

export const getGroupDiploma = ({ token, groupId }) => {
  return fetch(`${API_URL}/curators/action/vkr/group_id/${groupId}`, {  
    method: 'GET',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'Authorization': `Basic ${token}`,
    }
  })
  .then(res => handleResponse(res))
};

export const editDiplomaSettings = ({ token, diplomaId, data }) => {
  return fetch(`${API_URL}/curators/action/update_vkr_parameters/vkr_id/${diplomaId}`, {  
    method: 'PATCH',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'Authorization': `Basic ${token}`,
    },
    body: JSON.stringify({ data: data })
  })
  .then(res => handleResponse(res))
};

export const addDiplomaFile = ({ token, data }) => {
  return fetch(`${API_URL}/curators/action/curator_vkr_load`, {  
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'Authorization': `Basic ${token}`,
    },
    body: JSON.stringify({ data: data })
  })
  .then(res => handleResponse(res))
};

export const getGroupWebinar = ({ token, groupId }) => {
  return fetch(`${API_URL}/webinars/action/group_webinars/group_id/${groupId}`, {  
    method: 'GET',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'Authorization': `Basic ${token}`,
    }
  })
  .then(res => handleResponse(res))
};
