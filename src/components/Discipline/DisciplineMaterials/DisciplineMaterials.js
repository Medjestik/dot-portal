import React from 'react';
import './DisciplineMaterials.css';
import { CurrentUserContext } from '../../../contexts/CurrentUserContext.js';
import * as educationApi from '../../../utils/educationApi.js';

function DisciplineMaterials({ disciplineId }) {

  const currentUser = React.useContext(CurrentUserContext);

  const [isLoadingMaterials, setIsLoadingMaterials] = React.useState(true);
  const [materials, setMaterials] = React.useState([]);

  let materialWindow;

  console.log('123')

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
    const materialLink = 'https://api.emiit.ru/course_launch2.html?course_id=' + materials.course_id + '&object_id=' + materials.object_id + '&sid=' + materials.sid + '&part_code=' + item.code;
    viewFile(materialLink)
    //, 'win' + materials.object_id + '','toolbar=no,location=no,status=no,menubar=no,resizable=yes,directories=no,scrollbars=yes,width=1280,height=1024'
    //if (materialWindow != null )
    //materialWindow.moveTo( 0, 0 );
  }

  const viewFile = async (url) => {
    console.log(url);
    const token = localStorage.getItem('token');
    // Change this to use your HTTP client      
    fetch(url, { 
      headers: {
      'Authorization': `Basic ${token}`,
      }
    }) 
    // FETCH BLOB FROM IT        
    .then((response) => response.blob())      
    .then((blob) => { // RETRIEVE THE BLOB AND CREATE LOCAL URL   
      console.log(blob);       
      var _url = window.URL.createObjectURL(blob);
      console.log(_url);
      const windowFeatures = 'toolbar=no,location=no,status=no,menubar=no,resizable=yes,directories=no,scrollbars=yes,width=1280,height=1024'     
      window.open(_url, '_blank', windowFeatures ).focus(); // window.open + focus
    })
    .catch((err) => {        
      console.log(err);      
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
    <div className=''>
      {
        !isLoadingMaterials 
        ?
        <ul>
          {
            materials.parts.part.map((elem, i) => (
              <li onClick={(() => handleOpenMaterial(elem))} key={i}>
                <p>{elem.name} {elem.state_id}</p>
              </li>
            ))
          }
        </ul>
        :
        <div>123</div>
      }

    </div>
  );
}

export default DisciplineMaterials;