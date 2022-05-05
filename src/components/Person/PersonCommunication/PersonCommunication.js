import React from 'react';
import './PersonCommunication.css';
import Accordion from '../../Accordion/Accordion.js';
import vkIcon from '../../../images/social/vk.svg';
import instagramIcon from '../../../images/social/instagram.svg';
import telegramIcon from '../../../images/social/telegram.svg';
import communicationIcon from '../../../images/accordion/accordion-communication.svg';
import PersonCommunicationInfoPopup from './PersonCommunicationInfoPopup/PersonCommunicationInfoPopup.js';

function PersonCommunication({ userSocialClassmates, windowWidth }) {

  const [isOpenInfoPopup, setIsOpenInfoPopup] = React.useState(false);

  const [sectionHeight, setSectionHeight] = React.useState(0);
  const heightRef = React.createRef();

  function openInfoPopup() {
    setIsOpenInfoPopup(true);
  }

  function closeInfoPopup() {
    setIsOpenInfoPopup(false);
  }
  
  React.useEffect(() => {
    setIsOpenInfoPopup(false);
  },[]);

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
              <div className='person-communication__social-img'>
                <img className='person-communication__social-icon' src={vkIcon} alt='Иконка vk'></img>
              </div>
              <form className='person-communication__social-form' id='social-vk-upload' name='social-vk-upload'>
                <input className='person-communication__social-input' placeholder='vk.com/'></input>
                <button className='person-communication__social-btn' type='button'></button>
              </form>
            </li>
            <li className='person-communication__social-item'>
              <div className='person-communication__social-img'>
                <img className='person-communication__social-icon' src={instagramIcon} alt='Иконка inst'></img>
              </div>
              <form className='person-communication__social-form' id='social-inst-upload' name='social-inst-upload'>
                <input className='person-communication__social-input' placeholder='instagram.com/'></input>
                <button className='person-communication__social-btn' type='button'></button>
              </form>
            </li>
            <li className='person-communication__social-item'>
              <div className='person-communication__social-img'>
                <img className='person-communication__social-icon' src={telegramIcon} alt='Иконка telegram'></img>
              </div>
              <form className='person-communication__social-form' id='social-telegram-upload' name='social-telegram-upload'>
                <input className='person-communication__social-input' placeholder='web.telegram.org/'></input>
                <button className='person-communication__social-btn' type='button'></button>
              </form>
            </li>
          </ul>
        </div>
        <div className='person-communication__classmates'>
          <p className='person-communication__classmates-title'>Ваши социальные сети</p>
          <div className='person-communication__classmates-container'>
            <ul className='scroll-inside person-communication__classmates-list'>
              {
                userSocialClassmates.map((item, i) => (
                  <li className='person-communication__classmates-item' key={i}>
                    <h5 className='person-communication__classmates-name'>{item.name}</h5>
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
                          item.inst.length < 1
                          ?
                          <>
                          <p className='person-communication__classmates-social-empty'>Отсутствует</p>
                          <div className='person-communication__classmates-social-inst'></div>
                          </>
                          :
                          <a className='person-communication__classmates-social-link' href={item.inst} target='_blank' rel='noreferrer'>{item.inst}</a>
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
                ))
              }
            </ul>
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