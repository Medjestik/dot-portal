import React from 'react';
import './DisciplineMaterials.css';
import { CurrentUserContext } from '../../../contexts/CurrentUserContext.js';
import * as educationApi from '../../../utils/educationApi.js';
import Preloader from '../../Preloader/Preloader.js';

function DisciplineMaterials({ disciplineId }) {

  const currentUser = React.useContext(CurrentUserContext);

  const [isLoadingMaterials, setIsLoadingMaterials] = React.useState(true);
  const [materials, setMaterials] = React.useState([]);

  function disciplineMaterialRequest(disciplineId) {
    setIsLoadingMaterials(true);
    const token = localStorage.getItem('token');
    educationApi.getDisciplineMaterial({ token: token, disciplineId: disciplineId, currentUserId: currentUser.id })
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

  function handleOpenMaterial(item) {
    const materialLink = 'https://course.emiit.ru/view_doc.html?mode=part_start&course_id=' + materials.course_id + '&object_id=' + materials.object_id + '&sid=' + materials.sid + '&part_code=' + item.code;
    fetchForm(materialLink);
  }

  const fetchForm = async (url) => {

    const token = localStorage.getItem('token');
    const data = atob(token);
    const dataArray = data.split(':');

    let formData = new FormData();
    formData.append('user_login', dataArray[0]);
    formData.append('user_password', dataArray[1]);
    formData.append('set_auth', '1');

    fetch(url, {
      method: 'POST',
      body: formData,
    })
    .then(() => {
      const windowFeatures = 'toolbar=no,location=no,status=no,menubar=no,resizable=yes,directories=no,scrollbars=yes,width=1920,height=1024'     
      window.open(url, '_blank', windowFeatures).focus();
    })
    .catch((err) => {
      console.error(err);
    });
  };

  React.useEffect(() => {
    disciplineMaterialRequest(disciplineId);
    return(() => {
      setMaterials([]);
    })
    // eslint-disable-next-line
  }, [disciplineId]);

  return (
    <div  className=''>
      {
        !isLoadingMaterials 
        ?
        <>
        <ul>
          {
            materials.parts.part.map((elem, i) => (
              <li key={i}>
                  <p onClick={(() => handleOpenMaterial(elem))}>{elem.name} {elem.state_id}</p>

              </li>
            ))
          }
        </ul>
        </>
        :
        <Preloader />
      }

    </div>
  );
}

export default DisciplineMaterials;