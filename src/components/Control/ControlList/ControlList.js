import React from 'react';
import './ControlList.css';
import { useNavigate } from 'react-router-dom';

function ControlList({ windowWidth }) {

  const navigate = useNavigate();

  return (
    <div className='control-list'>
      <button className='btn btn_type_large' type='button' onClick={() => navigate('/control/webinar/list')}>Вебинары</button>
      
    </div>
  );
}

export default ControlList; 