import {memo} from "react";
import PropTypes from "prop-types";
import {cn as bem} from '@bem-react/classname';
import './style.css';
import NavMenu from "../nav-menu";
import BasketTool from "../basket-tool";

function HeaddingMenu(props){

  const cn = bem('HeaddingMenu');

  return (
    <div className={cn()}>
      <NavMenu title={'Главная'} to="/"></NavMenu>
      <BasketTool onOpen={props.onOpen} amount={props.amount}
                  sum={props.sum}/>
    </div>
  );
}

HeaddingMenu.propTypes = {
  sum: PropTypes.number,
  amount: PropTypes.number,
  onOpen: PropTypes.func,
};

HeaddingMenu.defaultProps = {
  onOpen: () => {},
}

export default memo(HeaddingMenu);
