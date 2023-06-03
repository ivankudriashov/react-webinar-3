import {memo} from "react";
import PropTypes from 'prop-types';
import {cn as bem} from "@bem-react/classname";
import {Link} from "react-router-dom";
import './style.css';
import SideLayout from "../side-layout";

function LoginTool({onOpen, onExit, userName, exit, enter}) {
  const cn = bem('LoginTool');

  return (
    <div className={cn()}>
      {userName.length ?
      <>
        <Link className={cn('link')} to={'/profile'}>{userName}</Link>
        {/* TODO Сделать перевод */}
        <button onClick={onExit}>{exit}</button>
      </>

      :
        <Link className={cn('button')} to={'/login'} onClick={onOpen}>{enter}</Link>
      }
    </div>
  )
}

LoginTool.propTypes = {
  onOpen: PropTypes.func,
  onExit: PropTypes.func,
  userName: PropTypes.string,
}

LoginTool.defaultProps = {
  onOpen: () => {},
  onExit: () => {}
}

export default memo(LoginTool);
