import React from 'react';
import './Popup.css';

function Popup({ isOpen, onSubmit, formWidth, formName, children }) {

  const height = React.createRef();
  const [formHeight, setFormHeight] = React.useState(false);

  React.useEffect(() => {
    if (height.current.clientHeight < 420) {
      setFormHeight(true);
    }
  }, [height]);


  return (
    <div className={`popup ${isOpen ? 'popup_opened' : ''}`}>
      <div className='scroll popup__container'>
        <form
          ref={height}
          className={`popup__form popup__form_width_${formWidth} ${formHeight ? 'popup__form_height_min' : ''}`}
          name={formName}
          action='#'
          noValidate
          onSubmit={onSubmit}
        >
          {children}
        </form>
      </div>
    </div>
  )
}

export default Popup;