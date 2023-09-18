import React from 'react';
import './CourseItem.css';
import { CurrentUserContext } from '../../../contexts/CurrentUserContext.js';
import * as courseApi from '../../../utils/course.js';
import { useNavigate, useParams } from 'react-router-dom';
import Preloader from '../../Preloader/Preloader.js';
import Section from '../../Section/Section.js';
import CourseMaterials from '../CourseMaterials/CourseMaterials.js';
import UserDataPopup from '../../Popup/UserDataPopup/UserDataPopup.js';

function CourseItem({ windowWidth, onChangeUserData }) {

  const { courseId } = useParams();
  const navigate = useNavigate();

  const currentUser = React.useContext(CurrentUserContext);

  const [isLoadingMaterials, setIsLoadingMaterials] = React.useState(true);
  const [materials, setMaterials] = React.useState([]);

  const [isOpenDataPopup, setIsOpenDataPopup] = React.useState(false);

  const [isLoadingRequest, setIsLoadingRequest] = React.useState(false);
  const [isShowRequestError, setIsShowRequestError] = React.useState({ isShow: false, text: '' });

  function disciplineMaterialRequest(id) {
    setIsLoadingMaterials(true);
    const token = localStorage.getItem('token');
    courseApi.getCourseMaterials({ token: token, courseId: id })
    .then((res) => {
      console.log('CourseMaterial', res);
      if (res.check_pk_data === 'true') {
        if (currentUser.birthDate.length < 1 || currentUser.snils.length < 1 || currentUser.phone.length < 1 || currentUser.email.length < 1 || currentUser.edu_level.length < 1 || currentUser.pers_data !== 'true') {
          setIsOpenDataPopup(true);
        }
      }
      setMaterials(res);
    })
    .catch((err) => {
      console.error(err);
    })
    .finally(() => {  
      setIsLoadingMaterials(false);
    });
  }

  function handleChangeUserData(data) {
    setIsShowRequestError({ isShow: false, text: '' });
    setIsLoadingRequest(true);
    const userId = currentUser.id;
    const token = localStorage.getItem('token');

    courseApi.changeData({ token, userId, data })
      .then((res) => {
        //console.log(res);
        onChangeUserData(data);
        setIsOpenDataPopup(false);
      })
      .catch((err) => {
        console.log(err);
        setIsShowRequestError({ isShow: true, text: 'К сожалению, произошла ошибка!' })
      })
      .finally(() => {
        setIsLoadingRequest(false);
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
    //disciplineMaterialRequest(courseId);
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
        <>
        <Section title={materials.name} heightType='page' headerType='large' >
          <CourseMaterials windowWidth={windowWidth} materials={materials.parts.part} handleOpenMaterial={handleOpenMaterial} />
        </Section>
        {
          isOpenDataPopup &&
          <UserDataPopup
            isOpen={isOpenDataPopup}
            onClose={() => navigate('/courses')}
            currentUser={currentUser}
            onChangeData={handleChangeUserData}
            isLoadingRequest={isLoadingRequest}
            isShowRequestError={isShowRequestError}
          />
        }
        </>
      }
    </div>
  );
}

export default CourseItem;