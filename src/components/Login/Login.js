import React from 'react';
import './Login.css';

function Login({ onLogin }) {

  const [login, setLogin] = React.useState('');
  const [loginError, setLoginError] = React.useState({ isShow: false, text: '' });
  const [password, setPassword] = React.useState('');
  const [isShowPassword, setIsShowPassword] = React.useState(false);
  const [passwordError, setPasswordError] = React.useState({ isShow: false, text: '' });

  const [isBlockSubmitButton, setIsBlockSubmitButton] = React.useState(true);

  const isLoadingRequest = false;
  const isShowRequestError = { isShow: false, text: '' }

  function handleChangeLogin(e) {
    setLogin(e.target.value);
    if (e.target.checkValidity()) {
      setLoginError({ text: '', isShow: false });
    } else {
      setLoginError({ text: 'Логин должен содержать более 6 символов', isShow: true });
    }
  }

  function handleChangePassword(e) {
    setPassword(e.target.value);
    if (e.target.checkValidity()) {
      setPasswordError({ text: '', isShow: false });
    } else {
      setPasswordError({ text: 'Пароль должен содержать более 6 символов', isShow: true });
    }
  }

  function handleSubmit(e) {
    e.preventDefault();
    console.log(login, password)
    onLogin(login, password);
  }

  React.useEffect(() => {
    if (login.length < 1 || password.length < 1 || loginError.isShow || passwordError.isShow) {
      setIsBlockSubmitButton(true);
    } else {
      setIsBlockSubmitButton(false);
    }
  // eslint-disable-next-line
  }, [login, password]);

  React.useEffect(() => {
    setLogin('');
    setLoginError({ text: '', isShow: false });
    setPassword('');
    setIsShowPassword(false);
    setPasswordError({ text: '', isShow: false });
  }, []);

  return (
    <div className='login'>
      <form className='login__form' name='login-form' action='#' noValidate onSubmit={handleSubmit}>
        <h1 className='login__title'>Вход на Учебный портал ИЭФ</h1>
        <label className='popup__field'>
          <h4 className='popup__input-caption'>Логин:</h4>

          <div className='popup__input-field'>
            <input 
            className='popup__input popup__input_with_icon'
            type='text'
            id='login'
            value={login}
            onChange={handleChangeLogin}
            name='login' 
            placeholder='Введите логин...' 
            minLength='6'
            autoComplete='off'
            required 
            />
          </div>
          <span className={`popup__input-error ${loginError.isShow ? 'popup__input-error_status_show' : ''}`}>
            {loginError.text}
          </span>
        </label>

        <label className='popup__field'>
          <h4 className='popup__input-caption'>Новый пароль:</h4>
          <div className='popup__input-field'>
            <input 
            className='popup__input popup__input_with_icon'
            type={isShowPassword ? 'text' : 'password'} 
            id='password'
            value={password}
            onChange={handleChangePassword}
            name='password' 
            placeholder='Введите пароль...' 
            minLength='6'
            autoComplete='off'
            required 
            />
            <div 
            className={`popup__input-icon 
            ${isShowPassword ? 'popup__input-icon-password_type_hide' : 'popup__input-icon-password_type_show' } 
            `} 
            onClick={() => setIsShowPassword(!isShowPassword)}>
            </div>
          </div>
          <span className={`popup__input-error ${passwordError.isShow ? 'popup__input-error_status_show' : ''}`}>
            {passwordError.text}
          </span>
        </label>

        <div className='login__btn-container'>
          <button className='login__btn-forgot' type='button'>Забыли пароль?</button>
          {
            isLoadingRequest ? 
            <button className='popup__btn-save popup__btn-save_type_loading' disabled type='button'>Вход..</button>
            :
            <button className={`popup__btn-save ${isBlockSubmitButton ? 'popup__btn-save_type_block' : ''}`} type='submit'>Войти</button>
          }
        </div>
        <span className={`popup__input-error ${isShowRequestError.isShow && 'popup__input-error_status_show'}`}>{isShowRequestError.text}</span>

      </form>
    </div>
  );
}

export default Login;