import React from 'react';
import './DisciplineTeacherInfo.css';
import * as educationApi from '../../../../utils/educationApi.js';
import Preloader from '../../../Preloader/Preloader.js';
import DisciplineInfo from '../../DisciplineInfo/DisciplineInfo.js';
import EducationChart from '../../EducationChart/EducationChart.js';
import EducationAdvertisement from '../../EducationAdvertisement/EducationAdvertisement.js';
import AddAdvertisementPopup from '../../EducationPopup/AddAdvertisementPopup/AddAdvertisementPopup';
import EditAdvertisementPopup from '../../EducationPopup/EditAdvertisementPopup/EditAdvertisementPopup.js';
import Table from '../../../Table/Table.js';
import TableList from '../../../Table/TableList/TableList.js';
import UploadFilePopup from '../../../Popup/UploadFilePopup/UploadFilePopup.js';
import ConfirmRemovePopup from '../../../Popup/ConfirmRemovePopup/ConfirmRemovePopup.js';

function DisciplineTeacherInfo({ windowWidth, disciplineId }) {

  const [isLoadingData, setIsLoadingData] = React.useState(true);

  const [isOpenTeacherAddMaterial, setIsOpenTeacherAddMaterial] = React.useState(false);
  const [isOpenTeacherRemoveMaterial, setIsOpenTeacherRemoveMaterial] = React.useState(false);

  const [isOpenTeacherAddAdvertisement, setIsOpenTeacherAddAdvertisement] = React.useState(false);
  const [isOpenTeacherEditAdvertisement, setIsOpenTeacherEditAdvertisement] = React.useState(false);

  const [isLoadingRequest, setIsLoadingRequest] = React.useState(false);
  const [isShowRequestError, setIsShowRequestError] = React.useState({ isShow: false, text: '', });

  const [disciplineStat, setDisciplineStat] = React.useState({});

  const [advertisement, setAdvertisement] = React.useState([]);
  const [currentAdvertisement, setCurrentAdvertisement] = React.useState({});

  const [materials, setMaterials] = React.useState([]);
  const [currentMaterial, setCurrentMaterial] = React.useState({});

  const containerHeightRef = React.createRef();
  const tableHeaderHeightRef = React.createRef();

  const [tableHeight, setTableHeight] = React.useState(0);
  const [advertisementHeight, setAdvertisementHeight] = React.useState(0);

  React.useEffect(() => {
    if ((windowWidth >= 833) && (!isLoadingData)) {
      setTableHeight(containerHeightRef.current.clientHeight - tableHeaderHeightRef.current.clientHeight);
      setAdvertisementHeight(containerHeightRef.current.clientHeight);
    }
  }, [isLoadingData, windowWidth, containerHeightRef, tableHeaderHeightRef]); 

  const tableStyle = {
    height: tableHeight - 1,
  };

  const advertisementStyle = {
    height: advertisementHeight - 1,
  };

  function openAddMaterialPopup() {
    setIsOpenTeacherAddMaterial(true);
  }

  function openRemoveMaterialPopup(data) {
    setCurrentMaterial(data);
    setIsOpenTeacherRemoveMaterial(true);
  }

  function openAddAdvertisementPopup() {
    setIsOpenTeacherAddAdvertisement(true);
  }

  function openEditAdvertisementPopup(data) {
    setCurrentAdvertisement(data);
    setIsOpenTeacherEditAdvertisement(true);
  }

  function closePopup() {
    setIsShowRequestError({ isShow: false, text: '', });
    setIsOpenTeacherAddAdvertisement(false);
    setIsOpenTeacherEditAdvertisement(false);
    setIsOpenTeacherAddMaterial(false);
    setIsOpenTeacherRemoveMaterial(false);
  }

  function disciplineInfoRequest(disciplineId) {
    setIsLoadingData(true);
    const token = localStorage.getItem('token');
    educationApi.getDisciplineInfoTeacher({ token: token, disciplineId: disciplineId })
    .then((res) => {
      console.log('DisciplineInfo', res);
      setAdvertisement([...res.announces].reverse());
      setMaterials(res.files);
      setDisciplineStat(res.stat);
    })
    .catch((err) => {
      console.error(err);
    })
    .finally(() => {  
      setIsLoadingData(false);
    });
  }

  function addMaterial(data) {
    setIsShowRequestError({ isShow: false, text: '', });
    setIsLoadingRequest(true);
    const token = localStorage.getItem('token');
    educationApi.uploadDisciplineMaterial({
      token: token,
      disciplineId: disciplineId,
      material: data,
    })
    .then((res) => {
      setMaterials([res, ...materials]);
      closePopup();
    })
    .catch((err) => {
      setIsShowRequestError({ isShow: true, text: 'К сожалению, произошла ошибка', });
      console.error(err);
    })
    .finally(() => {  
      setIsLoadingRequest(false);
    });
  }

  function removeMaterial(data) {
    setIsShowRequestError({ isShow: false, text: '', });
    setIsLoadingRequest(true);
    const token = localStorage.getItem('token');
    educationApi.removeDisciplineMaterial({
      token: token,
      material: data,
    })
    .then(() => {
      const filteredMaterials = materials.filter((elem) => data.id !== elem.id);
      setMaterials(filteredMaterials);
      closePopup();
    })
    .catch((err) => {
      setIsShowRequestError({ isShow: true, text: 'К сожалению, произошла ошибка', });
      console.error(err);
    })
    .finally(() => {
      setIsLoadingRequest(false);
    });
  }

  function addAdvertisement(data) {
    setIsShowRequestError({ isShow: false, text: '', });
    setIsLoadingRequest(true);
    const token = localStorage.getItem('token');
    educationApi.teacherAddAdvertisement({
      token: token,
      disciplineId: disciplineId,
      advertisement: data,
    })
    .then((res) => {
      setAdvertisement([res, ...advertisement]);
      closePopup();
    })
    .catch((err) => {
      setIsShowRequestError({ isShow: true, text: 'К сожалению, произошла ошибка', });
      console.error(err);
    })
    .finally(() => {  
      setIsLoadingRequest(false);
    });
  }

  function editAdvertisement(data) {
    setIsShowRequestError({ isShow: false, text: '', });
    setIsLoadingRequest(true);
    const token = localStorage.getItem('token');
    educationApi.editAdvertisement({
      token: token,
      advertisement: data,
    })
    .then((res) => {
      const index = advertisement.indexOf(advertisement.find((elem) => (elem.id === data.id)));
      setAdvertisement([ ...advertisement.slice(0, index), res, ...advertisement.slice(index + 1)]);
      closePopup();
    })
    .catch((err) => {
      setIsShowRequestError({ isShow: true, text: 'К сожалению, произошла ошибка', });
      console.error(err);
    })
    .finally(() => {  
      setIsLoadingRequest(false);
    });
  }

  React.useEffect(() => {
    disciplineInfoRequest(disciplineId);
  
    return (() => {      
      setDisciplineStat({});
      setAdvertisement([]);
      setMaterials([]);
      setCurrentAdvertisement({});
      setCurrentMaterial({});
  })
  // eslint-disable-next-line
  }, []);

  return (
    <>
      {
        isLoadingData ?
        <Preloader />
        :
        <DisciplineInfo type='teacher'>
          {
            windowWidth > 833 
            ?
            <div className='discipline-info__chart'>
              <ul className='discipline-info__chart-list'>
                <li className='discipline-info__chart-item'>
                  <span className='discipline-info__chart-caption'>
                    Всего студентов:
                  </span>
                  <EducationChart 
                  totalValue={disciplineStat.total}
                  value={disciplineStat.total}
                  label={disciplineStat.total}
                  color='#1153FC'
                  />
                </li>
                <li className='discipline-info__chart-item'>
                  <span className='discipline-info__chart-caption'>
                    Получили оценку:
                  </span>
                  <EducationChart 
                  totalValue={disciplineStat.total}
                  value={disciplineStat.passed}
                  label={disciplineStat.passed} 
                  color='#1153FC'
                  />
                </li>
                <li className='discipline-info__chart-item'>
                  <span className='discipline-info__chart-caption'>
                    Не аттестованы:
                  </span>
                  <EducationChart 
                  totalValue={disciplineStat.total}
                  value={disciplineStat.unpassed}
                  label={disciplineStat.unpassed} 
                  color='#FF7B02'
                  />
                </li>
                <li className='discipline-info__chart-item'>
                  <span className='discipline-info__chart-caption'>
                    Без оценки:
                  </span>
                  <EducationChart 
                  totalValue={disciplineStat.total}
                  value={disciplineStat.noData}
                  label={disciplineStat.noData} 
                  color='#D9D9D9'
                  />
                </li>
              </ul>
            </div>
            :
            <ul className='data__list data__list_margin_top'>
              <li className='data__item'>
                <p className='data__text'><span className='data__text_font_bold'>Всего студентов:</span>{disciplineStat.total || ''}</p>
              </li>
              <li className='data__item'>
                <p className='data__text'><span className='data__text_font_bold'>Получили оценку:</span>{disciplineStat.passed || ''}</p>
              </li>
              <li className='data__item'>
                <p className='data__text'><span className='data__text_font_bold'>Не аттестованы:</span>{disciplineStat.unpassed || ''}</p>
              </li>
              <li className='data__item'>
                <p className='data__text'><span className='data__text_font_bold'>Без оценки:</span>{disciplineStat.noData || ''}</p>
              </li>
            </ul>
          }

          {
            windowWidth > 833
            ?
            <>
            <div className='discipline-info'>
              <div className='discipline-info__column'>
                <div className='discipline-info__materials'>
                  <div className='discipline-info__section-header'>
                    <h4 className='discipline-info__section-title'>Дополнительные материалы</h4>
                    <button className='btn-add-round' type='button' onClick={() => openAddMaterialPopup()}></button>
                  </div>
                  <div className='discipline-info__materials-table'>
                    <Table>
                      <div ref={containerHeightRef} className='table__container'>
                        <div ref={tableHeaderHeightRef} className='table__header'>
                          <div className='table__main-column'>
                            <div className='table__column table__column_type_header table__column_type_count'>
                              <p className='table__text table__text_type_header'>№</p>
                            </div>
                            <div className="table__column table__column_type_header table__column_type_date">
                              <p className="table__text table__text_type_header">Дата</p>
                            </div>
                            <div className='table__column table__column_type_header table__column_type_name'>
                              <p className='table__text table__text_type_header'>Наименование</p>
                            </div>
                          </div>
                          <div className='table__column table__column_type_header table__column_type_btn table__column_type_btn-header'>
                            <div className='btn-icon'></div>
                            <div className='btn-icon btn-icon_margin_left'></div>
                          </div>
                        </div>
                        <ul style={Object.assign({}, tableStyle)} className='table__main scroll'>
                          {
                            materials.length < 1 
                            ?
                            <p className='table__caption_type_empty'>Дополнительные материалы пока не загружены.</p>
                            :
                            materials.map((item, i) => (
                              <li className='table__row' key={i}>
                                <div className='table__main-column'>
                                  <div className='table__column table__column_type_count'>
                                    <p className='table__text'>{i + 1}</p>
                                  </div>
                                  <div className="table__column table__column_type_date">
                                    <p className="table__text">{item.date}</p>
                                  </div>
                                  <div className='table__column table__column_type_name'>
                                    <p className='table__text'>{item.title}</p>
                                  </div>
                                </div>
                                <div className='table__column table__column_type_btn'>
                                  <a className='btn-icon btn-icon_color_accent-blue btn-icon_type_download' href={item.link} target='_blank' rel='noreferrer'> </a>
                                  <button className='btn-icon btn-icon_margin_left btn-icon_color_accent-orange btn-icon_type_remove' type='button' onClick={(() => openRemoveMaterialPopup(item))}></button>
                                </div>
                              </li>
                            ))
                          }
                        </ul>
                      </div>
                    </Table>
                  </div>
                </div>
              </div>

              <div className='discipline-info__column'>             
                <div className='discipline-info__advertisement'>
                  <div className='discipline-info__section-header'>
                    <h4 className='discipline-info__section-title'>Объявления</h4>
                    <button className='btn-add-round' type='button' onClick={() => openAddAdvertisementPopup()}></button>
                  </div>
                  <ul style={Object.assign({}, advertisementStyle)} className='discipline-info__advertisement-list scroll'>
                    {
                      advertisement.length < 1 
                      ?
                      <p className='table__caption_type_empty'>Объявления отстутствуют.</p>
                      :
                      advertisement.map((elem) => ({...elem, type: 'advertisement'})).map((elem, i) => (
                        <li key={elem.id} className='discipline-info__advertisement-item'>
                          <button className='btn-icon btn-icon_color_accent-blue btn-icon_type_edit' type='button' onClick={(() => openEditAdvertisementPopup(elem))}></button>
                          <div className='discipline-info__advertisement-info'>
                            <h5 className='discipline-info__advertisement-title'>{elem.title}</h5>
                            <p className='discipline-info__teacher-text'>
                              <span className='discipline-info__teacher-text_weight_bold'>Автор: </span>
                              {elem.author}
                            </p>
                            <p className='discipline-info__teacher-text'>
                              <span className='discipline-info__teacher-text_weight_bold'>Дата публикации: </span>
                              {elem.date}
                            </p>
                          </div>
                        </li>
                      ))
                    }
                  </ul>
                </div>
              </div>
            </div>
            </>
            :
            <>
            <div className='discipline-info__section discipline-info__materials'>
              <div className='discipline-info__section-header'>
                <h4 className='discipline-info__section-title'>Дополнительные материалы</h4>
                <button className='btn-add-round' type='button' onClick={() => openAddMaterialPopup()}></button>
              </div>
              {
                materials.length < 1 
                ?
                <p className='table__caption_type_empty'>Дополнительные материалы пока не загружены.</p>
                :
                <TableList>
                {
                  materials.map((item, i) => (
                    <li className='table-list__item' key={i}>
                      <span className='table-list__count'>{i + 1}.</span>
                      <div className='table-list__info'>
                        <h6 className='table-list__info-title'>{item.title || ''}</h6>
                        <ul className='table-list__info-list'>
                          <li className='table-list__info-item'>
                            <p className='table-list__info-text'><span className='table-list__info-text_font_bold'>Дата загрузки:</span>{item.date || ''}</p>
                          </li>
                        </ul>
                      </div>
                      <a className='btn-icon btn-icon_color_accent-blue btn-icon_type_download' href={item.link} target='_blank' rel='noreferrer'> </a>
                      <button className='btn-icon btn-icon_margin_left btn-icon_color_accent-orange btn-icon_type_remove' type='button' onClick={(() => openRemoveMaterialPopup(item))}></button>
                    </li>
                  ))
                }
                </TableList>
              }
            </div>
            <div className='discipline-info__section discipline-info__advertisement'>
              <div className='discipline-info__section-header'>
                <h4 className='discipline-info__section-title'>Объявления</h4>
                <button className='btn-add-round' type='button' onClick={() => openAddAdvertisementPopup()}></button>
              </div>
              {
                advertisement.length < 1 
                ?
                <p className='table__caption_type_empty'>Дополнительные материалы пока не загружены.</p>
                :
                <TableList>
                {
                  advertisement.map((item, i) => (
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
                      <button className={`btn-icon btn-icon_type_edit btn-icon_color_accent-blue`} type='button' onClick={(() => openEditAdvertisementPopup(item))}></button>
                    </li>
                  ))
                }
              </TableList>
              }
            </div>
            </>
          }



        </DisciplineInfo>
      }

      {
        isOpenTeacherAddMaterial &&
        <UploadFilePopup
          isOpen={isOpenTeacherAddMaterial}
          onClose={closePopup}
          popupName='teacher-add-material'
          onAdd={addMaterial}
          isLoadingRequest={isLoadingRequest}
          isShowRequestError={isShowRequestError}
        />
      }

      {
        isOpenTeacherRemoveMaterial &&
        <ConfirmRemovePopup
          isOpen={isOpenTeacherRemoveMaterial}
          onClose={closePopup}
          popupName='teacher-confirm-remove-material'
          onConfirm={removeMaterial}
          data={currentMaterial}
          isLoadingRequest={isLoadingRequest}
          isShowRequestError={isShowRequestError}
        />
      }

      {
        isOpenTeacherAddAdvertisement &&
        <AddAdvertisementPopup
          isOpen={isOpenTeacherAddAdvertisement}
          onClose={closePopup}
          onAdd={addAdvertisement}
          isLoadingRequest={isLoadingRequest}
          isShowRequestError={isShowRequestError}
        />
      }

      {
        isOpenTeacherEditAdvertisement &&
        <EditAdvertisementPopup 
          isOpen={isOpenTeacherEditAdvertisement}
          onClose={closePopup}
          currentAdvertisementId={currentAdvertisement.id}
          onEdit={editAdvertisement}
          isLoadingRequest={isLoadingRequest}
          isShowRequestError={isShowRequestError}
        />
      }

    </>
  )
}

export default DisciplineTeacherInfo;