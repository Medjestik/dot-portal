import React from 'react';
import './Notifications.css';
import SectionOption from '../Section/SectionOption/SectionOption.js';

function Notifications() {

  const options = [
    {
      title: 'Уведомления', status: 'active', id: 1,
    },
    {
      title: 'От боба', status: 'inactive', id: 2,
    },
    {
      title: 'Деканат', status: 'inactive', id: 3,
    },
    {
      title: 'Интститут', status: 'inactive', id: 4,
    },
  ]

  const userNotifications = [
    { unreadNotification: true, date: '00.00.00 00:00', text: 'Новая оценка по текущему контролю «__» по дисциплине «__»' },
    { unreadNotification: true, date: '00.00.00 00:00', text: 'Не подгружен чек об оплате обучения' },
    { unreadNotification: false, date: '00.00.00 00:00', text: 'Поздравляем, Вами успешно завершен «__» курс «__» семестр' },
    { unreadNotification: false, date: '00.00.00 00:00', text: 'Новый комментарий от преподавателя «__» по дисциплине «__» Новый комментарий от преподавателя «__» по дисциплине «__» Новый комментарий от преподавателя «__» по дисциплине «__»' },
    { unreadNotification: false, date: '00.00.00 00:00', text: 'Новый комментарий от преподавателя «__» по дисциплине «__»' },
    { unreadNotification: false, date: '00.00.00 00:00', text: 'Новый комментарий от преподавателя «__» по дисциплине «__»' },
    { unreadNotification: false, date: '00.00.00 00:00', text: 'Новый комментарий от преподавателя «__» по дисциплине «__»' },
    { unreadNotification: false, date: '00.00.00 00:00', text: 'Новый комментарий от преподавателя «__» по дисциплине «__»' },
  ]

  return (
    <div className='notifications'>
      <SectionOption options={options}>
        <div className='notification__container'>
          <ul className='scroll notification__list'>
            {
              userNotifications.map((item, i) => (
                <li key={i} className={`notification__item ${item.unreadNotification ? 'notification__item_type_unread' : ''}`}>
                  <div className='notification__img'>
                    <div className='notification__icon'></div>
                  </div>
                  <div className='notification__info'>
                    <span className='notification__date'>{item.date}</span>
                    <p className='notification__text'>{item.text}</p>
                  </div>
                </li>
              ))
            }
          </ul>
        </div>   
      </SectionOption>
    </div>

  );
}

export default Notifications;