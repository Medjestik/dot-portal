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

export const getSemesters = ({ token }) => {
  return fetch(`${API_URL}/admin_semesters/action/get_semesters`, {  
      method: 'GET',
      headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'Authorization': `Basic ${token}`,
      }
  })
  .then(res => handleResponse(res))
};

export const getSemesterItems = ({ token, semester }) => {
  return fetch(`${API_URL}/admin_semesters/action/get_semester_disciplines?semester_id=${semester}`, {  
      method: 'GET',
      headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'Authorization': `Basic ${token}`,
      }
  })
  .then(res => handleResponse(res))
};

export const getSemesterData = ({ token, semester }) => {
  return fetch(`${API_URL}/admin_semesters/action/get_ych_semester?ych_semester_id=${semester}`, {  
      method: 'GET',
      headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'Authorization': `Basic ${token}`,
      }
  })
  .then(res => handleResponse(res))
};

export const getSemesterGroups = ({ token, semester }) => {
  return fetch(`${API_URL}/admin_semesters/action/get_semester_groups?semester_id=${semester}`, {  
      method: 'GET',
      headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'Authorization': `Basic ${token}`,
      }
  })
  .then(res => handleResponse(res))
};

export const addSemesterItem = ({ token, data }) => {
  return fetch(`${API_URL}/admin_semesters/action/add_discipline`, { 
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'Authorization': `Basic ${token}`,
    },
    body: JSON.stringify(
      { 
        ych_sem: data.ych_sem,
        name: data.name,
        control: data.control,
        course_id: data.course_id,
        start_date: data.start_date,
        end_date: data.end_date,
        lector: data.lector,
        vedomost_lector: data.vedomost_lector,
      }
    )
  })
  .then(res => handleResponse(res))
};

export const editSemesterItem = ({ token, data }) => {
  return fetch(`${API_URL}/admin_semesters/action/update_discipline`, { 
    method: 'PATCH',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'Authorization': `Basic ${token}`,
    },
    body: JSON.stringify(
      { 
        id: data.id,
        name: data.name,
        control: data.control,
        course_id: data.course_id,
        start_date: data.start_date,
        end_date: data.end_date,
        lector: data.lector,
        vedomost_lector: data.vedomost_lector,
      }
    )
  })
  .then(res => handleResponse(res))
};

export const removeSemesterItem = ({ token, id }) => {
  return fetch(`${API_URL}/admin_semesters/action/delete_discipline`, { 
    method: 'DELETE',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'Authorization': `Basic ${token}`,
    },
    body: JSON.stringify({ id }
    )
  })
  .then(res => handleResponse(res))
};

export const getLearningGroups = ({ token }) => {
  return fetch(`${API_URL}/admin_semesters/action/get_learning_groups?completed=false`, {  
      method: 'GET',
      headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'Authorization': `Basic ${token}`,
      }
  })
  .then(res => handleResponse(res))
};

export const getLearningGroupSemesters = ({ token, id }) => {
  return fetch(`${API_URL}/admin_semesters/action/get_ych_semesters?group_id=${id}`, {  
      method: 'GET',
      headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'Authorization': `Basic ${token}`,
      }
  })
  .then(res => handleResponse(res))
};

export const getSemesterPlanData = ({ token, groupId, semesterNumber, semesterId }) => {
  return fetch(`${API_URL}/admin_semesters/action/get_plan_semester?group_id=${groupId}&number=${semesterNumber}&semester_id=${semesterId}`, {  
      method: 'GET',
      headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'Authorization': `Basic ${token}`,
      }
  })
  .then(res => handleResponse(res))
};

export const createGroupSemester = ({ token, data }) => {
  return fetch(`${API_URL}/admin_semesters/action/create_ych_sem/`, {  
      method: 'POST',
      headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'Authorization': `Basic ${token}`,
      },
      body: JSON.stringify({ group_id: data.group_id, semester_id: data.semester_id, semester_number: data.semester_number, disciplines: data.disciplines, practics: data.practics })
  })
  .then(res => handleResponse(res))
};

export const createDotStudent = ({ token, data }) => {
  return fetch(`${API_URL}/admin/action/create_dot_student/`, {  
      method: 'POST',
      headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'Authorization': `Basic ${token}`,
      },
      body: JSON.stringify({ 
        group_id: data.group_id, 
        firstname: data.firstname, 
        lastname: data.lastname, 
        middlename: data.middlename, 
        email: data.email,
        phone: data.phone,
        login: data.login,
        transfer: data.transfer,
        transfer_doc: data.transfer_doc,
        sem_num: data.sem_num,
      })
  })
  .then(res => handleResponse(res))
};

export const fixStatistic = ({ token, user_id, disciplines }) => {
  return fetch(`${API_URL}/admin/action/fix_student_disciplines`, {  
      method: 'PATCH',
      headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'Authorization': `Basic ${token}`,
      },
      body: JSON.stringify({ user_id, disciplines })
  })
  .then(res => handleResponse(res))
};

export const dropTestAttempts = ({ token, code, active_learning_id }) => {
  return fetch(`${API_URL}/admin/action/drop_test_attempts`, {  
      method: 'POST',
      headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'Authorization': `Basic ${token}`,
      },
      body: JSON.stringify({ code, active_learning_id })
  })
  .then(res => handleResponse(res))
};
