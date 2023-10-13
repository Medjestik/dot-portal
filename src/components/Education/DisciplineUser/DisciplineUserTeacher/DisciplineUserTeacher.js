import React from 'react';
import './DisciplineUserTeacher.css';
import TableList from '../../../Table/TableList/TableList.js';
import StudentViewAdvertisementPopup from '../../EducationPopup/StudentViewAdvertisementPopup/StudentViewAdvertisementPopup.js';
import StudentViewCommentPopup from '../../EducationPopup/StudentViewCommentPopup/StudentViewCommentPopup.js';

function DisciplineUserTeacher({ windowWidth, disciplineInfo }) {

  const [currentData, setCurrentData] = React.useState({});

  const [isOpenViewAdvertisementPopup, setIsOpenViewAdvertisementPopup] = React.useState(false);
  const [isOpenViewCommentPopup, setIsOpenViewCommentPopup] = React.useState(false);

  function openPopup(data) {
    setCurrentData(data);
    if (data.type === 'advertisement') {
      setIsOpenViewAdvertisementPopup(true);
    } else {
      setIsOpenViewCommentPopup(true);
    }
  }

  function closePopup() {
    setIsOpenViewAdvertisementPopup(false);
    setIsOpenViewCommentPopup(false);
  }

  React.useEffect(() => {
    return(() => {
      setCurrentData({});
    })
  }, []);

  return (
    <>
    <div className='discipline-info__section'>
      <div className='discipline-info__teacher'>
        <div className='discipline-info__teacher-container'>
            {
            disciplineInfo.tutor.pict_url 
            ?
            <img className='discipline-info__teacher-img' src={disciplineInfo.tutor.pict_url} alt=''></img>
            :
            <div className='discipline-info__teacher-img'></div>
            }
            <div className='discipline-info__teacher-info'>
            <h3 className='discipline-info__teacher-name'>{disciplineInfo.tutor.fullname}</h3>
            <ul className='data__list data__list_margin_top'>
              <li className='data__item'>
                <p className='data__text'>
                  <span className='data__text data__text_font_bold'>Дожность: </span>
                  {disciplineInfo.tutor.job}
                </p>
                </li>
                <li className='data__item'>
                <p className='data__text'>
                  <span className='data__text data__text_font_bold'>Телефон: </span>
                  {disciplineInfo.tutor.phone}
                </p>
                </li>
                <li className='data__item'>
                <p className='data__text'>
                  <span className='data__text data__text_font_bold'>Почта: </span>
                  {disciplineInfo.tutor.email}
                </p>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
      
    <div className='discipline-info__section discipline-info__advertisement'>

    <>
    {
      disciplineInfo.additional_files.length > 0 ?
      <>
        <h5 className='table__title'>Объявления и комментарии:</h5>
        <TableList>
          {
            [...disciplineInfo.announces.map((elem) => ({...elem, title: elem.text, type: 'advertisement'})), ...disciplineInfo.comments.map((elem) => ({...elem, title: elem.text, author: elem.author_fullname, type: 'comment'}))].sort((a,b) => b.seconds - a.seconds).map((item, i) => (
              <li className='table-list__item' key={i}>
                <span className='table-list__count'>{i + 1}.</span>
                <div className='table-list__info'>
                  <h6 className='table-list__info-title'>{item.title || ''}</h6>
                  <ul className='table-list__info-list'>
                    <li className='table-list__info-item'>
                      <p className='table-list__info-text'><span className='table-list__info-text_font_bold'>Автор:</span>{item.author || ''}</p>
                    </li>
                  </ul>
                  <ul className='table-list__info-list'>
                    <li className='table-list__info-item'>
                      <p className='table-list__info-text'><span className='table-list__info-text_font_bold'>Дата публикации:</span>{item.date || ''}</p>
                    </li>
                  </ul>
                </div>
                <button className={`btn-icon btn-icon_color_accent-blue ${item.type === 'advertisement' ? 'btn-icon_type_users' : 'btn-icon_type_comment'}`} type='button' onClick={(() => openPopup(item))}></button>
              </li>
            ))
          }
        </TableList>
      </>
      :
      <p className='table__caption_type_empty'>Объявления и комментарии отстутствуют.</p>
    }
    </>
    </div>

    {
      isOpenViewAdvertisementPopup &&
      <StudentViewAdvertisementPopup 
        isOpen={isOpenViewAdvertisementPopup}
        onClose={closePopup}
        currentAdvertisement={currentData}
        isLoading={false}
      />
    }

    {
      isOpenViewCommentPopup &&
      <StudentViewCommentPopup
        isOpen={isOpenViewCommentPopup}
        onClose={closePopup}
        currentAdvertisement={currentData}
        isLoading={false}
      />
    }

    </>
  );
}

export default DisciplineUserTeacher;