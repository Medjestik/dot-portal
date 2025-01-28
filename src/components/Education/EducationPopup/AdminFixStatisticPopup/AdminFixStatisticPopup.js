import React from 'react';
import Popup from '../../../Popup/Popup.js';
import Table from '../../../Table/Table.js';

function AdminFixStatisticPopup({ isOpen, onClose, currentStudent, disciplines, onFix, isLoadingRequest, isShowRequestError }) {

  const [data, setData] = React.useState(disciplines.map((elem) => ({...elem, active: false })));

  const [isBlockSubmitButton, setIsBlockSubmitButton] = React.useState(true);

  function handleSubmit(e) {
    e.preventDefault();
    const disciplinesId = data.filter((item) => item.active === true).map(elem => elem.id);
    onFix(currentStudent, disciplinesId);
  }

  function handleChangeActive(item) {
    setIsBlockSubmitButton(false);
    setData((prevData) =>
      prevData.map((elem) =>
        elem.name === item.name
          ? { ...elem, active: !elem.active }
          : elem
      )
    );
  }

  React.useEffect(() => {
    setIsBlockSubmitButton(true);

    return(() => {
    })
  }, []);

  return (
    <Popup
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
      formWidth={'full'}
      formName={'admin-fix-statistic-popup'}
    >
      <h2 className='popup__title'>Изменение статистики</h2>
      <p className='popup__author-text'><span className='popup__author-text_weight_bold'>Студент: </span>{currentStudent?.fullname || ''}</p>

      <Table>
        <div className='table__container table__container_margin_top'>
          <div className='table__header'>
            <div className='table__main-column'>
              <div className='table__column table__column_type_header table__column_type_checkbox'>
                <p className='table__text table__text_type_header'></p>
              </div>
              <div className='table__column table__column_type_header table__column_type_full'>
                <p className='table__text table__text_type_header'>Дисциплина</p>
              </div>
              <div className='table__column table__column_type_header table__column_type_teacher'>
                <p className='table__text table__text_type_header'>Преподаватель</p>
              </div>
              <div className='table__column table__column_type_header table__column_type_medium'>
                <p className='table__text table__text_type_header'>Контроль</p>
              </div>
            </div>
          </div>
          {
            data.length < 1 
            ?
            <p className='table__caption_type_empty'>По заданным параметрам ничего не найдено.</p>
            :
            <ul className='table__main table__main_scroll_auto'>
              {
                data.map((item, i) => (
                  <li className={`table__row ${item.active && 'table__row_type_complete'}`} key={i}>
                    <div className='table__main-column'>
                      <div className='table__column table__column_type_checkbox'>
                        <label className='checkbox checkbox_width_small'>
                          <input 
                            name={`admin-discipline-fix-${item.id}`}
                            type='checkbox'
                            id={`admin-discipline-fix-${item.id}`}
                            value={item.active}
                            defaultChecked={item.active}
                            onChange={() => handleChangeActive(item)}
                            >
                          </input>
                          <span></span>
                        </label>
                      </div>
                      <div className='table__column table__column_type_full'>
                        <p className={`table__text table__text_type_header`}>{item.name}</p>
                      </div>
                      <div className='table__column table__column_type_teacher'>
                        <p className={`table__text`}>{item.lector}</p>
                      </div>
                      <div className='table__column table__column_type_medium'>
                        <p className={`table__text`}>{item.control}</p>
                      </div>
                    </div>
                  </li>
                ))
              }
            </ul>
          }
        </div>
      </Table>

      <div className='popup__btn-container'>
        <button className='popup__btn-cancel' type='button' onClick={() => onClose()}>Назад</button>
        {
          isLoadingRequest ? 
          <button className='popup__btn-save popup__btn-save_type_loading' disabled type='button'>Сохранение..</button>
          :
          <button className={`popup__btn-save ${isBlockSubmitButton ? 'popup__btn-save_type_block' : ''}`} type='submit'>Сохранить</button>
        }
      </div>
      <span className={`popup__input-error ${isShowRequestError.isShow && 'popup__input-error_status_show'}`}>{isShowRequestError.text}</span>
    </Popup>
  )
}

export default AdminFixStatisticPopup;