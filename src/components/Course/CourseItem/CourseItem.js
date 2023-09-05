import React from 'react';
import './CourseItem.css';
import * as courseApi from '../../../utils/course.js';
import { useParams } from 'react-router-dom';
import Preloader from '../../Preloader/Preloader.js';
import Section from '../../Section/Section.js';
import CourseMaterials from '../CourseMaterials/CourseMaterials.js';

function CourseItem({ windowWidth }) {

  const { courseId } = useParams();

  const [isLoadingMaterials, setIsLoadingMaterials] = React.useState(true);
  const [materials, setMaterials] = React.useState([]);

  function disciplineMaterialRequest(id) {
    setIsLoadingMaterials(true);
    const token = localStorage.getItem('token');
    courseApi.getCourseMaterials({ token: token, courseId: id })
    .then((res) => {
    //console.log('CourseMaterial', res);
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

    const token = localStorage.getItem('token');
    const data = atob(token);
    const dataArray = data.split(':');

    const url = 'https://' + dataArray[0] + ':' + dataArray[1] + '@course.emiit.ru/view_doc.html?mode=part_start&course_id=' + materials.course_id + '&object_id=' + materials.object_id + '&sid=' + materials.sid + '&part_code=' + item.code;

    const windowFeatures = 'toolbar=no,location=no,status=no,menubar=no,resizable=yes,directories=no,scrollbars=yes,width=1920,height=1024';

    window.open(url, '_blank', windowFeatures).focus();
    
  };

  function updateMaterial() {
    disciplineMaterialRequest(courseId);
  }

  React.useEffect(() => {

    window.addEventListener('focus', updateMaterial);

    return () => {
      window.removeEventListener('focus', updateMaterial);
    }
    // eslint-disable-next-line
  }, []);
  
  React.useEffect(() => {
    disciplineMaterialRequest(courseId);
    return(() => {
      setMaterials([]);
    })
    // eslint-disable-next-line
  }, [courseId]);

  return (
    <div className=''>
      {
        isLoadingMaterials 
        ?
        <Preloader />
        :
        <Section title={materials.name} heightType='page' headerType='large' >
          <CourseMaterials windowWidth={windowWidth} materials={materials.parts.part} handleOpenMaterial={handleOpenMaterial} />
        </Section>
        
      }
    </div>
  );
}

export default CourseItem;