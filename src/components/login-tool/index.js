import {memo} from "react";
import PropTypes from 'prop-types';
import {cn as bem} from "@bem-react/classname";
import {Link} from "react-router-dom";
import './style.css';
import SideLayout from "../side-layout";

function LoginTool({onOpen, onExit, isUser, userName}) {
  const cn = bem('LoginTool');

  return (
    <div className={cn()}>
      {userName.length ?
      <>
        <Link className={cn('link')} to={'/profile'}>{userName}</Link>
        {/* TODO Сделать перевод */}
        <button onClick={onExit}>Выход</button>
      </>

      :
        <Link className={cn('button')} to={'/login'} onClick={onOpen}>Вход</Link>
      }
    </div>
  )
}

LoginTool.propTypes = {
  onOpen: PropTypes.func,
  onExit: PropTypes.func,
  isUser: PropTypes.bool,
  userName: PropTypes.string,
}

LoginTool.defaultProps = {
  onOpen: () => {},
  onExit: () => {}
}

export default memo(LoginTool);
