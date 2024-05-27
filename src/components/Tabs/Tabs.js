import React from 'react';
import './Tabs.css';
import { useLocation, useNavigate } from 'react-router-dom';

function Tabs({ tabs, path }) {

  const location = useLocation();
  const navigate = useNavigate();

  function switchTab(tab) {
    navigate(path + '/' + tab.location);
  }

  return (
    <ul className='tabs'>
      {
        tabs.map((elem, i) => (
          location.pathname.includes(elem.location)
          ?
          <li key={i} className={`tabs__item tabs__item_type_current`}>{elem.name}</li>
          :
          <li key={i} onClick={() => switchTab(elem)} className={`tabs__item tabs__item_type_active`}>{elem.name}</li>
        ))
      }
    </ul>
  )
}

export default Tabs;
