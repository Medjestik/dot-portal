import { API_URL } from './config.js';

function handleResponse (res) {
  if (res.ok) {
    return res.json()
  } else {
    return Promise.reject(res)
  }
}

export const getActiveGroups = ({ token }) => {
  return fetch(`${API_URL}/admin/action/get_groups/completed/false`, {  
      method: 'GET',
      headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'Authorization': `Basic ${token}`,
      }
  })
  .then(res => handleResponse(res))
};

export const getCompletedGroups = ({ token }) => {
  return fetch(`${API_URL}/admin/action/get_groups/completed/true`, {  
      method: 'GET',
      headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'Authorization': `Basic ${token}`,
      }
  })
  .then(res => handleResponse(res))
};

export const getPractice = ({ token, practiceId }) => {
    return fetch(`${API_URL}/admin_practic/action/get_practic/practic_id/${practiceId}`, {  
        method: 'GET',
        headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': `Basic ${token}`,
        }
    })
    .then(res => handleResponse(res))
};

export const editPractice = ({ token, info }) => {
    console.log(info);
    return fetch(`${API_URL}/admin_practic/action/update_practic_parameters/practic_id/${info.id}`, { 
      method: 'PATCH',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': `Basic ${token}`,
      },
      body: JSON.stringify({ info })
    })
    .then(res => handleResponse(res))
};


export const addPracticeFile = ({ token, practiceId, file }) => {
    return fetch(`${API_URL}/admin_practic/action/create_practic_file/practic_id/${practiceId}`, { 
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': `Basic ${token}`,
      },
      body: JSON.stringify({ file })
    })
    .then(res => handleResponse(res))
};

export const deletePracticeFile = ({ token, practiceId, fileId }) => {
    return fetch(`${API_URL}/admin_practic/action/delete_practic_file/practic_id/${practiceId}/file_id/${fileId}`, { 
      method: 'DELETE',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': `Basic ${token}`,
      },
    })
    .then(res => handleResponse(res))
};

export const addPracticeOrder = ({ token, practiceId, order }) => {
    return fetch(`${API_URL}/admin_practic/action/create_order/practic_id/${practiceId}`, { 
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': `Basic ${token}`,
      },
      body: JSON.stringify({ order })
    })
    .then(res => handleResponse(res))
};

export const assignPracticeOrder = ({ token, practiceId, orderId }) => {
    return fetch(`${API_URL}/admin_practic/action/set_order_to_free/practic_id/${practiceId}/order_id/${orderId}`, { 
      method: 'PATCH',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': `Basic ${token}`,
      },
    })
    .then(res => handleResponse(res))
};

export const deletePracticeOrder = ({ token, practiceId, orderId }) => {
    return fetch(`${API_URL}/admin_practic/action/delete_order/practic_id/${practiceId}/order_id/${orderId}`, { 
      method: 'DELETE',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': `Basic ${token}`,
      },
    })
    .then(res => handleResponse(res))
};

export const addPracticeGroupDataPlace = ({ token, practiceId, place }) => {
    return fetch(`${API_URL}/admin_practic/action/set_same_place/practic_id/${practiceId}`, { 
      method: 'PATCH',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': `Basic ${token}`,
      },
      body: JSON.stringify({ place })
    })
    .then(res => handleResponse(res))
};

export const addPracticeGroupDataManager = ({ token, practiceId, uni_boss}) => {
    return fetch(`${API_URL}/admin_practic/action/set_same_tutor/practic_id/${practiceId}`, { 
      method: 'PATCH',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': `Basic ${token}`,
      },
      body: JSON.stringify({ uni_boss })
    })
    .then(res => handleResponse(res))
};

export const addPracticeGroupDataTask = ({ token, practiceId, task }) => {
    return fetch(`${API_URL}/admin_practic/action/set_same_task/practic_id/${practiceId}`, { 
      method: 'PATCH',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': `Basic ${token}`,
      },
      body: JSON.stringify({ task })
    })
    .then(res => handleResponse(res))
};

export const editPracticeStudentData = ({ token, practiceId, studentId, parameters }) => {
  return fetch(`${API_URL}/admin_practic/action/update_student_parameters/practic_id/${practiceId}/student_id/${studentId}`, { 
    method: 'PATCH',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'Authorization': `Basic ${token}`,
    },
    body: JSON.stringify({ parameters })
  })
  .then(res => handleResponse(res))
};

export const editPracticeStudentScore = ({ token, practiceId, studentId, parameters }) => {
  return fetch(`${API_URL}/admin_practic/action/update_student_mark/practic_id/${practiceId}/student_id/${studentId}`, { 
    method: 'PATCH',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'Authorization': `Basic ${token}`,
    },
    body: JSON.stringify({ parameters })
  })
  .then(res => handleResponse(res))
};

export const getDiplomaReports = ({ token, year }) => {
  return fetch(`${API_URL}/admin/action/vkr_uploads/year/${year}`, {  
      method: 'GET',
      headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'Authorization': `Basic ${token}`,
      }
  })
  .then(res => handleResponse(res))
};

export const checkDiplomaReports = ({ token, workId, data }) => {
  return fetch(`${API_URL}/admin/action/rate_vkr/vkr_id/${workId}`, {  
      method: 'PATCH',
      headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'Authorization': `Basic ${token}`,
      },
      body: JSON.stringify({ data })
  })
  .then(res => handleResponse(res))
};


export const setMark = ({ token, activity_id, student_id, type, mark_id, comment }) => {
  console.log(student_id);
  return fetch(`${API_URL}/curators/action/expanded_report_update_mark/`, { 
    method: 'PATCH',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'Authorization': `Basic ${token}`,
    },
    body: JSON.stringify({ activity_id, student_id, mark_id, type, comment })
  })
  .then(res => handleResponse(res))
};