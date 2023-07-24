import React from 'react';
import './PracticeTeacher.css';
import { Route, Routes, useParams } from 'react-router-dom';
import * as educationApi from '../../../utils/educationApi.js';
import Preloader from '../../Preloader/Preloader.js';
import Section from '../../Section/Section.js';
import PracticeTeacherGroup from './PracticeTeacherGroup/PracticeTeacherGroup.js';
import EditPracticePopup from '../EducationPopup/EditPracticePopup/EditPracticePopup.js';

function PracticeTeacher({ windowWidth }) {

    const { practiceId } = useParams();
 
    const [practice, setPractice] = React.useState({});
    const [currentStudent, setCurrentStudent] = React.useState({});

    const [isOpenTeacherEditPractice, setIsOpenTeacherEditPractice] = React.useState(false);
  
    const [isLoadingPractice, setIsLoadingPractice] = React.useState(true);
    const [isLoadingRequest, setIsLoadingRequest] = React.useState(false);
    const [isShowRequestError, setIsShowRequestError] = React.useState({ isShow: false, text: '', });


    function practiceRequest(practiceId) {
        setIsLoadingPractice(true);
        const token = localStorage.getItem('token');
        educationApi.getPracticeTeacher({ token: token, practiceId: practiceId })
        .then((res) => {
          console.log('Practice', res);
          setPractice(res);
        })
        .catch((err) => {
          console.error(err);
        })
        .finally(() => {  
            setIsLoadingPractice(false);
        });
    }

    function handleEditPractice(data) {
        setIsShowRequestError({ isShow: false, text: '' });
        setIsLoadingRequest(true);
        const token = localStorage.getItem('token');
        educationApi.editPracticeTeacher({ 
            token: token,
            practiceId: practice.id,
            studentId: currentStudent.student.id,
            parameters: data,
            })
            .then((res) => {
              const index = practice.individuals.indexOf(practice.individuals.find((elem) => (elem.student.id === currentStudent.student.id)));
              const individuals = ([ 
                ...practice.individuals.slice(0, index), 
                res, 
                ...practice.individuals.slice(index + 1)
            ]);
            setPractice({...practice, individuals: individuals});
            closePopup();
            })
            .catch((err) => {
            console.log(err);
            setIsShowRequestError({ isShow: true, text: 'К сожалению, произошла ошибка!' });
            })
            .finally(() => {
            setIsLoadingRequest(false);
            });
    }

    function openEditPracticePopup(data) {
        setCurrentStudent(data);
        setIsOpenTeacherEditPractice(true);
    }
    
    function closePopup() {
        setIsOpenTeacherEditPractice(false);
        setIsLoadingRequest(false);
        setIsShowRequestError({ isShow: false, text: '', })
    }


    React.useEffect(() => {
        practiceRequest(practiceId);
    
        return(() => {
          setPractice({});
          setCurrentStudent({});
        })
        // eslint-disable-next-line
    }, [practiceId]);


    return (
        <>
        {
        isLoadingPractice
        ?
        <Preloader />
        :
        <>
        <Routes>
            <Route exact path={`group`}
              element={
                <Section title={practice.name} heightType='page' headerType='large'>
                  <PracticeTeacherGroup
                    windowWidth={windowWidth}
                    practice={practice}
                    onEdit={openEditPracticePopup}
                  /> 
              </Section>
              }
            />
        </Routes>

        {
        isOpenTeacherEditPractice &&
        <EditPracticePopup 
          isOpen={isOpenTeacherEditPractice}
          onClose={closePopup}
          practice={practice}
          currentStudent={currentStudent}
          onEdit={handleEditPractice}
          isLoadingRequest={isLoadingRequest}
          isShowRequestError={isShowRequestError}
        />
        }
        </>
        }
        </>
    )

}

export default PracticeTeacher; 