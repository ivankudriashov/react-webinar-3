import {memo, useEffect, useRef} from "react";
import PropTypes from "prop-types";
import './style.css';
import { Link } from "react-router-dom";

function NavMenu({title, to}) {
  return (
    <Link className={'MenuItem'} to={to}>{title}</Link>
  );
}

NavMenu.propTypes = {
  title: PropTypes.string,
  to: PropTypes.string
};

export default memo(NavMenu);
