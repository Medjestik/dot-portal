import React from 'react';
import './PersonCommunication.css';
import Accordion from '../../Accordion/Accordion.js';
import vkIcon from '../../../images/social/vk.svg';
import instagramIcon from '../../../images/social/instagram.svg';
import telegramIcon from '../../../images/social/telegram.svg';
import communicationIcon from '../../../images/accordion/accordion-communication.svg';
import PersonCommunicationInfoPopup from './PersonCommunicationInfoPopup/PersonCommunicationInfoPopup.js';
import PreloaderIcon from '../../Preloader/PreloaderIcon/PreloaderIcon.js';

function PersonCommunication({ windowWidth, studentSocial, onChange, isLoading }) {

  const [isOpenInfoPopup, setIsOpenInfoPopup] = React.useState(false);

  const [sectionHeight, setSectionHeight] = React.useState(0);
  const heightRef = React.createRef();

  const [numberStep, setNumberStep] = React.useState(2);

  const [vkLink, setVkLink] = React.useState('');
  const [instagramLink, setInstagramLink] = React.useState('');
  const [telegramLink, setTelegramLink] = React.useState('');

  function handleChangeVk(e) {
    setVkLink(e.target.value);
  }

  function handleChangeInstagram(e) {
    setInstagramLink(e.target.value);
  }

  function handleChangeTelegram(e) {
    setTelegramLink(e.target.value);
  }

  function handleChangeLink(e, type) {
    e.preventDefault();
    if (type === 'vk') {
      onChange(vkLink, type);
    } else if (type === 'instagram') {
      onChange(instagramLink, type);
    } else {
      onChange(telegramLink, type);
    }
  }

  function openInfoPopup() {
    setIsOpenInfoPopup(true);
  }

  function closeInfoPopup() {
    setIsOpenInfoPopup(false);
  }

  function showMoreClassmates() {
    setNumberStep(studentSocial.mates.length);
  }
  
  React.useEffect(() => {
    setIsOpenInfoPopup(false);
    setNumberStep(2);
    setVkLink(studentSocial.student.vk);
    setInstagramLink(studentSocial.student.instagram);
    setTelegramLink(studentSocial.student.telegram);
  },[studentSocial]);


  function renderClassmatesItem(item, i) {
    return (
      <li className='person-communication__classmates-item' key={i}>
        <h5 className='person-communication__classmates-name'>{item.fullname}</h5>
        <ul className='person-communication__classmates-social-list'>
          <li className='person-communication__classmates-social-item'>
            {
              item.vk.length < 1
              ?
              <>
              <p className='person-communication__classmates-social-empty'>Отсутствует</p>
              <div className='person-communication__classmates-social-vk'></div>
              </>
              :
              <a className='person-communication__classmates-social-link' href={item.vk} target='_blank' rel='noreferrer'>{item.vk}</a>
            }
          </li>
          <li className='person-communication__classmates-social-item'>
            {
              item.instagram.length < 1
              ?
              <>
              <p className='person-communication__classmates-social-empty'>Отсутствует</p>
              <div className='person-communication__classmates-social-inst'></div>
              </>
              :
              <a className='person-communication__classmates-social-link' href={item.instagram} target='_blank' rel='noreferrer'>{item.instagram}</a>
            }
          </li>
          <li className='person-communication__classmates-social-item'>
            {
              item.telegram.length < 1
              ?
              <>
              <p className='person-communication__classmates-social-empty'>Отсутствует</p>
              <div className='person-communication__classmates-social-telegram'></div>
              </>
              :
              <a className='person-communication__classmates-social-link' href={item.telegram} target='_blank' rel='noreferrer'>{item.telegram}</a>
            }
          </li>
        </ul>
      </li>
    )
  }

  React.useEffect(() => {
    setSectionHeight(heightRef.current.clientHeight);
  }, [heightRef, windowWidth]);

  return (
    <>
    <Accordion icon={communicationIcon} name='Общение' height={sectionHeight} openInfoPopup={openInfoPopup}>
      <div ref={heightRef} className='person-communication__container'>
        <div className='person-communication__social'>
          <p className='person-communication__social-title'>Ваши социальные сети</p>
          <ul className='person-communication__social-list'>
            <li className='person-communication__social-item'>
              <div 
              className={`person-communication__social-img 
              ${studentSocial.student.vk.length < 1 ? 'person-communication__social-img_type_empty' : '' }
              `}>
                {
                  isLoading.isShow && isLoading.type === 'vk' 
                  ?
                  <PreloaderIcon />
                  :
                  <img className='person-communication__social-icon' src={vkIcon} alt='Иконка vk'></img>
                }
              </div>
              <form 
              className='person-communication__social-form' 
              id='social-vk-upload' 
              name='social-vk-upload'
              onSubmit={(e) => handleChangeLink(e, 'vk')}
              action='#' 
              noValidate
              >
                <input 
                className='person-communication__social-input' 
                placeholder='vk.com/'
                value={vkLink}
                onChange={handleChangeVk}
                type='text'
                id='social-vk-upload-input'
                name='social-vk-upload-input' 
                autoComplete='off'
                >
                </input>
                <button className='person-communication__social-btn' type='submit'></button>
              </form>
            </li>
            <li className='person-communication__social-item'>
              <div 
              className={`person-communication__social-img 
              ${studentSocial.student.instagram.length < 1 ? 'person-communication__social-img_type_empty' : '' }
              `}>
                {
                  isLoading.isShow && isLoading.type === 'instagram' 
                  ?
                  <PreloaderIcon />
                  :
                  <img className='person-communication__social-icon' src={instagramIcon} alt='Иконка instagram'></img>
                }
              </div>
              <form 
              className='person-communication__social-form' 
              id='social-inst-upload' 
              name='social-inst-upload'
              onSubmit={(e) => handleChangeLink(e, 'instagram')}
              action='#' 
              noValidate
              >
                <input 
                className='person-communication__social-input' 
                placeholder='instagram.com/'
                value={instagramLink}
                onChange={handleChangeInstagram}
                type='text'
                id='social-instagram-upload-input'
                name='social-instagram-upload-input' 
                autoComplete='off'
                >
                </input>
                <button className='person-communication__social-btn' type='submit'></button>
              </form>
            </li>
            <li className='person-communication__social-item'>
              <div 
              className={`person-communication__social-img 
              ${studentSocial.student.telegram.length < 1 ? 'person-communication__social-img_type_empty' : '' }
              `}>
                {
                  isLoading.isShow && isLoading.type === 'telegram' 
                  ?
                  <PreloaderIcon />
                  :
                  <img className='person-communication__social-icon' src={telegramIcon} alt='Иконка telegram'></img>
                }
              </div>
              <form 
              className='person-communication__social-form' 
              id='social-telegram-upload' 
              name='social-telegram-upload'
              onSubmit={(e) => handleChangeLink(e, 'telegram')}
              action='#' 
              noValidate
              >
                <input 
                className='person-communication__social-input' 
                placeholder='web.telegram.org/'
                value={telegramLink}
                onChange={handleChangeTelegram}
                type='text'
                id='social-telegram-upload-input'
                name='social-telegram-upload-input' 
                autoComplete='off'
                >
                </input>
                <button className='person-communication__social-btn' type='submit'></button>
              </form>
            </li>
          </ul>
        </div>
        <div className='person-communication__classmates'>
          <p className='person-communication__classmates-title'>Социальные сети одногруппников</p>
          <div className='person-communication__classmates-container'>
            {
              windowWidth <= 833 
              ?
              <>
              <ul className='person-communication__classmates-list'>
                {
                  studentSocial.mates.slice(0, numberStep).map((item, i) => (
                    renderClassmatesItem(item, i)
                  ))
                }
              </ul>
              {
                (studentSocial.mates.length > numberStep) &&
                <button className='btn-more btn-more_type_show' onClick={showMoreClassmates}>Показать больше</button>
              }
              </>
              :
              <ul className='scroll-inside person-communication__classmates-list'>
                {
                  studentSocial.mates.map((item, i) => (
                    renderClassmatesItem(item, i)
                  ))
                }
              </ul>
            }
          </div>
        </div>
      </div>  
    </Accordion>
    {
      isOpenInfoPopup &&
      <PersonCommunicationInfoPopup
        isOpen={isOpenInfoPopup}
        onClose={closeInfoPopup}
      />
    }
    </>
  );
}

export default PersonCommunication;