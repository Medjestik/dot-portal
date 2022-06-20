import React from 'react';
import './DisciplineMaterials.css';
import { CurrentUserContext } from '../../../contexts/CurrentUserContext.js';
import * as educationApi from '../../../utils/educationApi.js';

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
    const materialLink = 'https://edu.emiit.ru/course_launch2.html?course_id=' + materials.course_id + '&object_id=' + materials.object_id + '&sid=' + materials.sid + '&part_code=' + item.code;
    viewFile(materialLink)
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

  function handleClick(elem) {
    var mapForm = document.createElement("form");
    mapForm.target = "Map";
    mapForm.method = "POST"; // or "post" if appropriate
    mapForm.action = 'https://edu.emiit.ru/view_doc.html?mode=part_start?course_id=' + materials.course_id + '&object_id=' + materials.object_id + '&sid=' + materials.sid + '&part_code=' + elem.code;

    var mapInput = document.createElement("input");
    mapInput.type = "text";
    mapInput.name = "user_login";
    mapInput.value = 'dot22001';
    mapForm.appendChild(mapInput);

    var mapInput2 = document.createElement("input");
    mapInput2.type = "text";
    mapInput2.name = "user_password";
    mapInput2.value = '211211';
    mapForm.appendChild(mapInput2);

    var mapInput3 = document.createElement("input");
    mapInput3.type = "text";
    mapInput3.name = "set_auth";
    mapInput3.value = '1';
    mapForm.appendChild(mapInput3);

    document.body.appendChild(mapForm);

    let map = window.open("", "Map", "status=0,title=0,height=600,width=800,scrollbars=1");

    if (map) {
        mapForm.submit();
    } else {
        alert('You must allow popups for this map to work.');
    }
  }

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
              <li key={i}>
                  <p onClick={(() => handleOpenMaterial(elem))}>{elem.name} {elem.state_id}</p>
                  <button type="button" onClick={() => handleClick(elem)}>CLICK</button>
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