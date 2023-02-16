import React from 'react';
import './DisciplineTeacherMaterials.css';
import Preloader from '../../../Preloader/Preloader.js';

function DisciplineTeacherMaterials({ windowWidth }) {

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
        <div className='discipline-teacher__materials'>
         123
        </div>
      }
    </>
  )
}

export default DisciplineTeacherMaterials;