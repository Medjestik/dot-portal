import { API_URL } from './config.js';

function handleResponse (res) {
  if (res.ok) {
    return res.json()
  } else {
    return Promise.reject(res)
  }
}

export const getSemesterData = ({ token, semesterId, currentUserId }) => {
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

export const getDisciplineTask = ({ token, disciplineId, currentUserId }) => {
  return fetch(`${API_URL}/education/action/discipline_uploads/discipline_id/${disciplineId}/student_id/${currentUserId}`, { 
    method: 'GET',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'Authorization': `Basic ${token}`,
    }
  })
  .then(res => handleResponse(res))
};

export const uploadDisciplineTask = ({ token, disciplineId, currentUserId, task }) => {
  return fetch(`${API_URL}/education/action/upload_student_work/discipline_id/${disciplineId}/student_id/${currentUserId}`, { 
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'Authorization': `Basic ${token}`,
    },
    body: JSON.stringify({ task })
  })
  .then(res => handleResponse(res))
};

export const getDisciplineMaterialUser = ({ token, disciplineId, currentUserId }) => {
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

export const getDisciplineMaterialTeacher = ({ token, disciplineId }) => {
  return fetch(`${API_URL}/tutors/action/view_course/discipline_id/${disciplineId}`, { 
    method: 'GET',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'Authorization': `Basic ${token}`,
    }
  })
  .then(res => handleResponse(res))
};

export const getDisciplineTeacher = ({ token, teacherId, disciplineId }) => {
  return fetch(`${API_URL}/tutors/id/${teacherId}/action/discipline/discipline_id/${disciplineId}`, {
    method: 'GET',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'Authorization': `Basic ${token}`,
    }
  })
  .then(res => handleResponse(res))
};

export const teacherSetMark = ({ token, discipline_id, student_id, mark_id, kr_mark_id, comment }) => {
  return fetch(`${API_URL}/tutors/action/set_mark`, { 
    method: 'PATCH',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'Authorization': `Basic ${token}`,
    },
    body: JSON.stringify({ discipline_id, student_id, mark_id, kr_mark_id, comment })
  })
  .then(res => handleResponse(res))
};

export const teacherAddComment = ({ token, discipline_id, student_id, comment }) => {
  return fetch(`${API_URL}/tutors/action/add_comment`, { 
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'Authorization': `Basic ${token}`,
    },
    body: JSON.stringify({ discipline_id, student_id, comment })
  })
  .then(res => handleResponse(res))
};

export const teacherEditComment = ({ token, discipline_id, student_id, comment_id, comment }) => {
  return fetch(`${API_URL}/tutors/action/update_comment/id/${comment_id}`, { 
    method: 'PATCH',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'Authorization': `Basic ${token}`,
    },
    body: JSON.stringify({ discipline_id, student_id, comment })
  })
  .then(res => handleResponse(res))
};

export const teacherAddAdvertisement = ({ token, disciplineId, advertisement }) => {
  return fetch(`${API_URL}/tutors/action/add_announcement_to_discipline/discipline_id/${disciplineId}`, { 
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'Authorization': `Basic ${token}`,
    },
    body: JSON.stringify({ title: advertisement.title, text: advertisement.text, })
  })
  .then(res => handleResponse(res))
};

export const getAdvertisementInfo = ({ token, advertisementId }) => {
  return fetch(`${API_URL}/tutors/action/announcement/announcement_id/${advertisementId}`, {
    method: 'GET',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'Authorization': `Basic ${token}`,
    }
  })
  .then(res => handleResponse(res))
};

export const editAdvertisement = ({ token, advertisement }) => {
  return fetch(`${API_URL}/tutors/action/update_announcement/announcement_id/${advertisement.id}`, { 
    method: 'PATCH',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'Authorization': `Basic ${token}`,
    },
    body: JSON.stringify({ title: advertisement.title, text: advertisement.text, })
  })
  .then(res => handleResponse(res))
};

export const getDisciplineInfoTeacher = ({ token, disciplineId }) => {
  return fetch(`${API_URL}/tutors/action/get_discipline_info/discipline_id/${disciplineId}`, {
    method: 'GET',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'Authorization': `Basic ${token}`,
    }
  })
  .then(res => handleResponse(res))
};

export const uploadDisciplineMaterial = ({ token, disciplineId, material }) => {
  return fetch(`${API_URL}/tutors/action/add_file_to_discipline/discipline_id/${disciplineId}`, { 
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'Authorization': `Basic ${token}`,
    },
    body: JSON.stringify({ material })
  })
  .then(res => handleResponse(res))
};

export const removeDisciplineMaterial = ({ token, material }) => {
  return fetch(`${API_URL}/tutors/action/delete_file_from_discipline/file_id/${material.id}`, { 
    method: 'DELETE',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'Authorization': `Basic ${token}`,
    }
  })
  .then(res => handleResponse(res))
};

export const getPracticeInfo = ({ token, practiceId }) => {
  return fetch(`${API_URL}/education/action/practic_info/practic_id/${practiceId}`, {
    method: 'GET',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'Authorization': `Basic ${token}`,
    }
  })
  .then(res => handleResponse(res))
};

export const uploadPracticeTask = ({ token, practiceId, currentUserId, task }) => {
  return fetch(`${API_URL}/education/action/upload_student_practice/practic_id/${practiceId}/student_id/${currentUserId}`, { 
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'Authorization': `Basic ${token}`,
    },
    body: JSON.stringify({ task })
  })
  .then(res => handleResponse(res))
};

export const getPracticeTeacher = ({ token, practiceId }) => {
  return fetch(`${API_URL}/tutors/action/get_practic/practic_id/${practiceId}`, { 
    method: 'GET',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'Authorization': `Basic ${token}`,
    }
  })
  .then(res => handleResponse(res))
};

export const editPracticeTeacher = ({ token, practiceId, studentId, parameters }) => {
  return fetch(`${API_URL}/tutors/action/update_student_mark/practic_id/${practiceId}/student_id/${studentId}`, { 
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
