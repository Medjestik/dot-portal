import React from 'react';
import './DisciplineUserMaterials.css';
import { CurrentUserContext } from '../../../../contexts/CurrentUserContext.js';
import * as educationApi from '../../../../utils/educationApi.js';
import Preloader from '../../../Preloader/Preloader.js';
import DisciplineUserMaterialsList from '../DisciplineUserMaterialsList/DisciplineUserMaterialsList.js';

function DisciplineUserMaterials({ windowWidth, disciplineId }) {

  const currentUser = React.useContext(CurrentUserContext);

  const [isLoadingMaterials, setIsLoadingMaterials] = React.useState(true);
  const [materials, setMaterials] = React.useState([]);

  function disciplineMaterialRequest(id) {
    setIsLoadingMaterials(true);
    const token = localStorage.getItem('token');
    educationApi.getDisciplineMaterial({ token: token, disciplineId: id, currentUserId: currentUser.id })
    .then((res) => {
      console.log('DisciplineMaterial', res);
      setMaterials(res);
    })
    .catch((err) => {
      console.error(err);
    })
    .finally(() => {  
      setIsLoadingMaterials(false);
    });
  }

  const handleOpenMaterial = async (item) => {

    const url = 'https://course.emiit.ru/view_doc.html?mode=part_start&course_id=' + materials.course_id + '&object_id=' + materials.object_id + '&sid=' + materials.sid + '&part_code=' + item.code;

    const token = localStorage.getItem('token');
    const data = atob(token);
    const dataArray = data.split(':');

    let formData = new FormData();
    formData.append('user_login', dataArray[0]);
    formData.append('user_password', dataArray[1]);
    formData.append('set_auth', '1');

    const windowFeatures = 'toolbar=no,location=no,status=no,menubar=no,resizable=yes,directories=no,scrollbars=yes,width=1920,height=1024' ;

    fetch(url, {
      method: 'POST',
      body: formData,
    })
    .then(() => {
      window.open(url, '_blank', windowFeatures).focus();
    })
    .catch((err) => {
      console.error(err);
    })
    .finally(() => {
    })
  };

  function updateMaterial() {
    disciplineMaterialRequest(disciplineId);
  }

  React.useEffect(() => {
    window.addEventListener('focus', updateMaterial);
    return () => {
      window.removeEventListener('focus', updateMaterial);
    }
    // eslint-disable-next-line
  }, []);
  
  React.useEffect(() => {
    disciplineMaterialRequest(disciplineId);
    return(() => {
      setMaterials([]);
    })
    // eslint-disable-next-line
  }, [disciplineId]);

  return (
    <div className='discipline-materials'>
      {
        !isLoadingMaterials 
        ?
        <DisciplineUserMaterialsList windowWidth={windowWidth} materials={materials.parts.part} handleOpenMaterial={handleOpenMaterial} />
        :
        <Preloader />
      }

    </div>
  );
}

export default DisciplineUserMaterials;