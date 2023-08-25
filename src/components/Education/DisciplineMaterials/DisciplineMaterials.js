import React from 'react';
import './DisciplineMaterials.css';
import { CurrentUserContext } from '../../../contexts/CurrentUserContext.js';
import * as educationApi from '../../../utils/educationApi.js';
import Preloader from '../../Preloader/Preloader.js';
import DisciplineUserMaterialsList from './DisciplineUserMaterialsList/DisciplineUserMaterialsList.js';
import DisciplineTeacherMaterialsList from './DisciplineTeacherMaterialsList/DisciplineTeacherMaterialsList.js';

function DisciplineMaterials({ windowWidth, disciplineId }) {

  const currentUser = React.useContext(CurrentUserContext);

  const [isLoadingMaterials, setIsLoadingMaterials] = React.useState(true);
  const [materials, setMaterials] = React.useState([]);

  function disciplineMaterialRequest(id) {
    setIsLoadingMaterials(true);
    const token = localStorage.getItem('token');
    if (currentUser.access_role === 'user') {
      educationApi.getDisciplineMaterialUser({ token: token, disciplineId: id, currentUserId: currentUser.id })
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
    } else {
      educationApi.getDisciplineMaterialTeacher({ token: token, disciplineId: id })
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
  }

  var windowReference = window.open();



  const handleOpenMaterial = async (item) => {

    const token = localStorage.getItem('token');
    const data = atob(token);
    const dataArray = data.split(':');

    const url = 'https://' + dataArray[0] + ':' + dataArray[1] + '@course.emiit.ru/view_doc.html?mode=part_start&course_id=' + materials.course_id + '&object_id=' + materials.object_id + '&sid=' + materials.sid + '&part_code=' + item.code;

    /*let formData = new FormData();
    formData.append('user_login', dataArray[0]);
    formData.append('user_password', dataArray[1]);
    formData.append('set_auth', '1');*/

    const windowFeatures = 'toolbar=no,location=no,status=no,menubar=no,resizable=yes,directories=no,scrollbars=yes,width=1920,height=1024';

    window.open(url, '_blank', windowFeatures).focus();

    /*fetch(url, {
      method: 'POST',
      body: formData,
    })
    .then((res) => {
      console.log(res);
      window.open(url, '_blank', windowFeatures).focus();
    })
    .catch((err) => {
      console.error(err);
    })
    .finally(() => {
    })*/
  };

  function updateMaterial() {
    disciplineMaterialRequest(disciplineId);
  }

  React.useEffect(() => {
    if (currentUser.access_role === 'user') {
      window.addEventListener('focus', updateMaterial);
    }
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
        <>
         {
          currentUser.access_role === 'user' 
          ?
          <DisciplineUserMaterialsList windowWidth={windowWidth} materials={materials.parts.part} handleOpenMaterial={handleOpenMaterial} />
          :
          <DisciplineTeacherMaterialsList windowWidth={windowWidth} materials={materials.part} />
         }
        </>
        :
        <Preloader />
      }

    </div>
  );
}

export default DisciplineMaterials;