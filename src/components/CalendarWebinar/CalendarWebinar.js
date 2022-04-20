import React from 'react';
import './CalendarWebinar.css';
import {
  format,
  startOfWeek,
  addDays,
  startOfMonth,
  endOfMonth,
  endOfWeek,
  isSameMonth,
  isSameDay,
  subMonths,
  addMonths
} from 'date-fns';
const { ru } = require('date-fns/locale');

function CalendarWebinar() {


  const [selectedDate, setSelectedDate] = React.useState(new Date());
  const [activeDate, setActiveDate] = React.useState(new Date());

  const getHeader = () => {
    return (
      <div className='calendar__header'>
        <h2 className='calendar__header-month'>{format(activeDate, 'LLLL', { locale: ru })}</h2>
        <button
          className='calendar__nav-btn calendar__nav-btn_type_prev'
          onClick={() => setActiveDate(subMonths(activeDate, 1))}
        />
        <button
          className='calendar__nav-btn calendar__nav-btn_type_next'
          onClick={() => setActiveDate(addMonths(activeDate, 1))}
        />
      </div>
    );
  };

  const getWeekDaysNames = () => {
    const weekStartDate = startOfWeek(activeDate);
    const weekDays = [];
    for (let day = 1; day < 8; day++) {
      weekDays.push(
        <div className='calendar__day calendar__day_type_week' id={addDays(weekStartDate, day)} key={addDays(weekStartDate, day)}>
          {format(addDays(weekStartDate, day), 'eeeeee', { locale: ru })}
        </div>
      );
    }
    return <div className='calendar__section_type_month' id={'month'} key={'month'}>{weekDays}</div>;
  };

  const generateDatesForCurrentWeek = (date, selectedDate, activeDate) => {
    let currentDate = date;
    const week = [];
    for (let day = 0; day < 7; day++) {
      const cloneDate = currentDate;
      week.push(
        <div
          id={currentDate} key={currentDate}
          className={`calendar__day 
          ${isSameMonth(currentDate, activeDate) ? '' : 'calendar__day_type_inactive'} 
          ${isSameDay(currentDate, selectedDate) ? 'calendar__day_type_selected' : ''}
          ${isSameDay(currentDate, new Date()) ? 'calendar__day_type_current' : ''}`}
          onClick={() => {
            setSelectedDate(cloneDate);
          }}
        >
          {format(currentDate, 'd')}
        </div>
      );
      currentDate = addDays(currentDate, 1);
    }
    return <>{week}</>;
  };

  const getDates = () => {
    const startOfTheSelectedMonth = startOfMonth(activeDate);
    const endOfTheSelectedMonth = endOfMonth(activeDate);
    const startDate = startOfWeek(startOfTheSelectedMonth, { locale: ru, weekStartsOn: 1 });
    const endDate = endOfWeek(endOfTheSelectedMonth);

    let currentDate = startDate;

    const allWeeks = [];

    while (currentDate <= endDate) {
      allWeeks.push(
        <div className='calendar__row' key={currentDate}>
          {generateDatesForCurrentWeek(currentDate, selectedDate, activeDate)}
        </div>
      );
      currentDate = addDays(currentDate, 7);
    }

    return <div className='calendar__section_type_days' id={'day'} key={'day'}>{allWeeks}</div>;
  };

  return (
    <div className='calendar' >
      {getHeader()}
      {getWeekDaysNames()}
      {getDates()}
    </div>
  )
}

export default CalendarWebinar;  