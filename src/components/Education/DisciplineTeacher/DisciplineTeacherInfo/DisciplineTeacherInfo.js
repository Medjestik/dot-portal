import React from 'react';
import './DisciplineTeacherInfo.css';
import Preloader from '../../../Preloader/Preloader.js';

function DisciplineTeacherInfo({ windowWidth, disciplineInfo }) {

  const [isLoadingData, setIsLoadingData] = React.useState(true);

  React.useEffect(() => {

  // eslint-disable-next-line
  }, []);

  return (
    <>
      {
        isLoadingData ?
        <Preloader />
        :
        <div className='discipline-teacher__info'>
         123
        </div>
      }
    </>
  )
}

export default DisciplineTeacherInfo; 