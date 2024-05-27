import React from 'react';
import Popup from '../../../Popup/Popup.js';
import PopupSelect from '../../../Popup/PopupSelect/PopupSelect.js';

function AdminCheckDiplomaPopup({ isOpen, onClose, currentStudent, onSubmit, isLoadingRequest, isShowRequestError }) {

  const [link, setLink] = React.useState('');
  const [linkError, setLinkError] = React.useState({ isShow: false, text: '' });

  const [percent, setPercent] = React.useState(0);
  const [percentError, setPercentError] = React.useState({ isShow: false, text: '' });

  const [isSend, setIsSend] = React.useState(true);

  const [result, setResult] = React.useState({});
  const resultOptions = [ { name: 'Пройден', id: 'success' }, { name: 'Не пройден', id: 'error' }, ];

  const [isBlockSubmitButton, setIsBlockSubmitButton] = React.useState(true);
 
  function handleSubmit(e) {
    e.preventDefault();
    const data = {
      student_id: currentStudent.student,
      file_id: currentStudent.file,
      report_link: link,
      percent: Number(percent),
      pass: result.id === 'success' ? true : false,
      sm_check: false,
      cm_check: false,
      send_message: isSend,
    } 
    onSubmit(data);
  }

  function handleSetResult(option) {
    setResult(option); 
  }

  function handleChangeLink(e) {
    setLink(e.target.value);
    if (e.target.checkValidity()) {
      setLinkError({ text: '', isShow: false });
    } else {
      setLinkError({ text: 'Укажите корректную ссылку', isShow: true });
    }
  }

  function handleChangePercent(e) {
    setPercent(e.target.value);
    if (e.target.checkValidity()) {
      console.log(e.target.value);
      setPercentError({ text: '', isShow: false });
    } else {
      setPercentError({ text: 'Укажите корректное колличество %', isShow: true });
    }
  }

  React.useEffect(() => {
    if (linkError.isShow || link.length < 1 || percent.isShow || percent.length < 1 || result.id === 'empty') {
      setIsBlockSubmitButton(true);
    } else {
      setIsBlockSubmitButton(false);
    }
  // eslint-disable-next-line
  }, [link, percent, result]);
  
  React.useEffect(() => {
    setLink(currentStudent.report_link || '');
    setPercent(currentStudent.percent || '');
    if (currentStudent.percent) {
      setResult(currentStudent.pass ? { name: 'Пройден', id: 'success' } : { name: 'Не пройден', id: 'error' });
    } else {
      setResult({ name: 'Укажите результат..', id: 'empty' });
    }
    setIsBlockSubmitButton(true);
    return(() => {
      setResult({});
    })
  // eslint-disable-next-line
  }, [isOpen]);

  return (
    <Popup
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
      formWidth={'medium'}
      formName={'admin-check-diploma'}
    >
      <h2 className='popup__title'>Проверка на антиплагиат</h2>
      <p className='popup__author-text'><span className='popup__author-text_weight_bold'>Студент: </span>{currentStudent.name}</p>

      <div className='popup__field'>
        <h4 className='popup__input-caption'>Ссылка на отчет:</h4>
        <div className='popup__input-field'>
          <input 
          className='popup__input'
          type='text'
          id='admin-check-diploma-link'
          value={link}
          onChange={handleChangeLink}
          name='admin-check-diploma-link' 
          placeholder='Укажите ссылку на отчет..'
          minLength={1}
          autoComplete='off'
          required 
          />

        </div>
        <span className={`popup__input-error ${linkError.isShow ? 'popup__input-error_status_show' : ''}`}>
          {linkError.text}
        </span>
      </div>

      <div className='popup__field'>
        <h4 className='popup__input-caption'>Процент антиплагиата:</h4>
        <div className='popup__input-field'>
          <input 
          className='popup__input'
          type='number'
          id='admin-check-diploma-percent'
          value={percent}
          onChange={handleChangePercent}
          name='admin-check-diploma-percent' 
          placeholder='Введите количество процентов..'    
          autoComplete='off'
          minLength={1}
          required 
          />
        </div>
        <span className={`popup__input-error ${percentError.isShow ? 'popup__input-error_status_show' : ''}`}>
          {percentError.text}
        </span>
      </div>

      <div className='popup__field'>
        <h4 className='popup__input-caption'>Результат проверки:</h4>
        <PopupSelect options={resultOptions} currentOption={result} onChooseOption={handleSetResult} />
      </div>

      <label className='checkbox checkbox_margin_top-20'>
        <input 
        name='admin-check-diploma-send'
        type='checkbox'
        id='admin-check-diploma-send'
        value={isSend}
        defaultChecked={isSend}
        onChange={() => setIsSend(!isSend)}
        >
        </input>
        <span>Отправить результат на почту</span>
      </label>

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

export default AdminCheckDiplomaPopup;
