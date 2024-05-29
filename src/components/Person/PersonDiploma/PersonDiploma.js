import React from 'react';
import './PersonDiploma.css';
import Accordion from '../../Accordion/Accordion.js';
import { PieChart } from 'react-minimal-pie-chart';
import diplomaIcon from '../../../images/accordion/accordion-diploma.svg';
import PersonDiplomaInfoPopup from './PersonDiplomaInfoPopup/PersonDiplomaInfoPopup.js';
import GetBase64File from '../../../custom/GetBase64File.js';

function PersonDiploma({ windowWidth, diploma, onUpload, isLoadingDiploma }) {

  const [fileName, setFileName] = React.useState({ isShow: false, name: '', });
  const [isShowWrongType, setIsShowWrongType] = React.useState(false);
  const [contentFile, setContentFile] = React.useState({ file: null, });

  const [sectionHeight, setSectionHeight] = React.useState(0);
  const heightRef = React.createRef();

  const formRef = React.createRef();

  const [isOpenInfoPopup, setIsOpenInfoPopup] = React.useState(false);

  function openInfoPopup() {
    setIsOpenInfoPopup(true);
  }

  function closeInfoPopup() {
    setIsOpenInfoPopup(false);
  }

  function onSubmit() {
    onUpload({ file: contentFile.file, fileName: fileName.name });
  }

  function renderStatus(works) {
    if (works.length < 1) {
      return 'Работа не загружена';
    }
    const lastWork = works[works.length - 1];
    if (!lastWork.percent) {
      return 'Работа находится на проверке';
    }
    if (lastWork.percent && lastWork.pass) {
      return 'Работа проверена, вы успешно прошли проверку';
    }
    if (lastWork.percent && !lastWork.pass) {
      return 'Проверка не пройдена, работу необходимо исправить';
    }
    return 'Работа не загружена';
  }

  React.useEffect(() => {
    if (isLoadingDiploma === 'loading') {
      setFileName({ isShow: true, name: 'Загрузка..', });
      cleanForm();
    } else if (isLoadingDiploma === 'success') {
      setFileName({ isShow: true, name: 'Работа успешно загружена!', });
    } else if (isLoadingDiploma === 'error') {
      setFileName({ isShow: true, name: 'К сожалению, произошла ошибка!', });
    }
  }, [isLoadingDiploma]);
  
  React.useEffect(() => {
    setIsOpenInfoPopup(false);
  },[]);

  function cleanForm() {
    setContentFile({ file: null, });
  }

  function handleChangeDiploma(e) {
    setIsShowWrongType(false);
    setFileName({ isShow: false, name: '' });
    if (e.target.files.length > 0) {
      let file = e.target.files[0];
      GetBase64File(file)
      .then(result => {
        file['base64'] = result;
        setFileName({ isShow: true, name: file.name });
        setContentFile({ file: file.base64 });
      })
      .catch(err => {
        console.log(err);
      });
    }
  }

  React.useEffect(() => {
    setSectionHeight(heightRef.current.clientHeight);
  }, [heightRef, windowWidth]);

  return (
    <>
    <Accordion icon={diplomaIcon} name='Выпускная квалификационная работа' height={sectionHeight} openInfoPopup={openInfoPopup}>
      <div ref={heightRef} className='person-diploma__container'>

        {
          <div className='person-diploma__column'>
            <div className='field'>
              <div className='field__item'>
                <h5 className='field__title'>Тема выпускной квалификационной работы</h5>
                <div className='field__row'>
                  <div className='field__row-text-container'>
                    <p className='field__row-textarea scroll-inside'>..</p>
                  </div>
                </div>
              </div>
            </div>
            <div className='field field_mt_20'>
              <div className='field__item'>
                <h5 className='field__title'>Дата предзащиты</h5>
                <div className='field__row'>
                  <div className='field__row-text-container'>
                    <p className='field__row-text'>{diploma.predefence_date || '..'}</p>
                  </div>
                </div>
              </div>
              <div className='field__item'>
                <h5 className='field__title'>Дата защиты</h5>
                <div className='field__row'>
                  <div className='field__row-text-container'>
                  <p className='field__row-text'>{diploma.defence_date || '..'}</p>
                  </div>
                </div>
              </div>
            </div>
            <div className='field field_mt_20'>
              <div className='field__item'>
                <h5 className='field__title'>Научный руководитель</h5>
                <div className='field__row'>
                  <div className='field__row-text-container'>
                    <p className='field__row-text'>..</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        }


          <div className='person-diploma__column'>

          {
          diploma.view_load &&
          <div className='field'>
            <div className='field__item'>
              <h5 className='field__title'>Подгрузить ВКР на антиплагиат</h5>
                <form className='field__row' ref={formRef} name='person-diploma-upload-file' id='person-diploma-upload-file'>
                  <label htmlFor='person-diploma-upload' className='upload-form__field'>
                    <p className='upload-form__text'>{fileName.isShow ? fileName.name : ''}</p>
                    <div className='upload-form__icon'></div>
                  </label>
                  <input onChange={handleChangeDiploma} id='person-diploma-upload' className='upload-form__input' type="file" />
                  <button 
                    className={`btn-icon btn-icon_type_upload btn-icon_margin_left ${contentFile.file !== null ? 'btn-icon_color_accent-blue' : 'btn-icon_status_block'}`}
                    type='button'
                    onClick={onSubmit}
                  >
                  </button>
                </form>
            </div>
          </div>
          }
          <div className='field field_mt_20'>
            <div className='field__item'>
              <h5 className='field__title'>Статус проверки</h5>
              <div className='field__row'>
                <div className='field__row-text-container'>
                  <p className='field__row-text'>{renderStatus(diploma.uploads)}</p>
                </div>
              </div>
            </div>
          </div>
          {
            diploma.uploads.length > 0 
            &&
            <div className='field field_mt_20'>
              <div className='field__item'>
                <h5 className='field__title'>Загруженные работы</h5>
                {
                  diploma.uploads.length > 0 ?
                  <ul className='person-diploma__works scroll'>
                    {
                    [...diploma.uploads].reverse().map((elem, i) => (
                      <li key={i} className='person-diploma__works-item'>
                        <div className='popup__item-container'>
                          <div className='test-chart'>
                            <PieChart
                              data={[{ value: elem.percent || 0, color: elem.pass ? '#1153FC' : '#FF7B02' }]}
                              totalValue={100}
                              lineWidth={18}
                              paddingAngle={2}
                              rounded
                              background='#D9D9D9'
                              label={({ dataEntry }) => dataEntry.value + '%'}
                              labelStyle={{
                                fontSize: '24px',
                                fontFamily: 'Roboto',
                                fontWeight: 'bold',
                                fill: elem.pass ? '#1153FC' : '#FF7B02',
                              }}
                              labelPosition={0}
                            />
                          </div>
                          <div className='popup__item-info'>
                            <h4 className='popup__item-title'>{elem.file_name}</h4>
                            <p className='popup__item-text'><span className='popup__item-text_weight_bold'>Дата загрузки: </span>{elem.load_date}</p>
                            {
                              elem.percent
                              ?
                              <p className='popup__item-text'>
                                <span className='popup__item-text_weight_bold'>Ссылка на отчет: </span>
                                <a className='popup__row-text popup__text_type_link' href={elem.report_link} target='_blank' rel='noreferrer'>Перейти</a>
                              </p>
                              :
                              <div className='status status_mb_8'>
                                <span className='status__icon status__icon_type_canceled'></span>
                                <p className='status__text'>Работа находится на проверке</p>
                              </div>
                            }
                          </div>
                        </div>
                      </li>
                    ))
                    }
                  </ul>
                  :
                  <div></div>
                }
              </div>
            </div>
          }
        </div>

      </div>
    </Accordion>
    {
      isOpenInfoPopup &&
      <PersonDiplomaInfoPopup
        isOpen={isOpenInfoPopup}
        onClose={closeInfoPopup}
      />
    }
    </>
  );
}

export default PersonDiploma;