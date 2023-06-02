import {memo, useState} from "react";
import PropTypes from 'prop-types';
import {cn as bem} from "@bem-react/classname";
import './style.css';
import Form from "../form";
import Input from "../input";

function LoginForm({onAction, error, title}) {
  const cn = bem('LoginForm');
  const [login, setLogin] = useState('');
  const [password, setPassword] = useState('');
  
  const onSubmit = (e) => {
    e.preventDefault();
    const form = {
      login: login,
      password: password
    }
    onAction(form);
  }

  const onLoginChange = (value) => {
    setLogin(value);
  }

  const onPasswordChange = (value) => {
    setPassword(value);
  }

  return (
    <div className={cn()}>
      <div className={cn('title')}>
        {title}
      </div>
      <Form onSubmit={onSubmit}>
        <Input theme={'login'} label={'Логин'} onChange={onLoginChange} value={login} placeholder={''}/>
        <Input theme={'login'} label={'Пароль'} onChange={onPasswordChange} value={password} placeholder={''}/>
        {error && <div className={cn('error')}>{error}</div>}
      </Form>
    </div>
  )
}

LoginForm.propTypes = {
  onAction: PropTypes.func,
  title: PropTypes.string,
  error: PropTypes.string,
}

LoginForm.defaultProps = {
  onAction: () => {},
}

export default memo(LoginForm);
