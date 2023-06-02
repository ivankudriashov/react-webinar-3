import {memo} from "react";
import PropTypes from 'prop-types';
import {cn as bem} from "@bem-react/classname";
import './style.css';

function Form({children, onSubmit}) {
  const cn = bem('Form');

  return (
    <form className={cn()}>
      {children}
      <button onClick={onSubmit} type='submit'>Войти</button>
    </form>
  )
}

Form.propTypes = {
  children: PropTypes.node,
  onSubmit: PropTypes.func,
}

Form.defaultProps = {
  onSubmit: () => {},
}

export default memo(Form);
