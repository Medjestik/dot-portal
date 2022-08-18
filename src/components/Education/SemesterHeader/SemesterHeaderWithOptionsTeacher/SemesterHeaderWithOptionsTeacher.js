import React from 'react';
import '../SemesterHeader.css';
import Select from '../../../Select/Select.js';
import SemesterHeaderBtnBack from '../SemesterHeaderBtnBack/SemesterHeaderBtnBack.js';

function SemesterHeaderWithOptionsTeacher({ semesterInfo, currentSemester, chooseSemester, isDisciplineOpen, backToSemester }) {

  return (
    isDisciplineOpen 
    ?
    <SemesterHeaderBtnBack onBack={backToSemester} isPerformFunction={true} />
    :
    <Select options={semesterInfo} currentOption={currentSemester} onChooseOption={chooseSemester} />
  );
}

export default SemesterHeaderWithOptionsTeacher;