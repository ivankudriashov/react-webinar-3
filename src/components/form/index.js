import {memo} from "react";
import PropTypes from 'prop-types';
import {cn as bem} from "@bem-react/classname";
import './style.css';

function Form({children, onSubmit, buttonText}) {
  const cn = bem('Form');

  return (
    <form className={cn()}>
      {children}
      <button onClick={onSubmit} type='submit'>{buttonText}</button>
    </form>
  )
}

Form.propTypes = {
  children: PropTypes.node,
  onSubmit: PropTypes.func,
  buttonText: PropTypes.string
}

Form.defaultProps = {
  onSubmit: () => {},
}

export default memo(Form);
