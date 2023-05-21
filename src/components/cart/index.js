import React, {useCallback} from "react";
import PropTypes from "prop-types";
import './style.css';
import List from "../list";
import Item from "../item";
import Head from "../head";

function Cart({list, total, actionFunction}){
  const callbacks = {
    itemsListRender: useCallback((item) => {
      return <Item actionFunction={actionFunction} item={item} button={'Удалить'}/>
    }, []),
  }

  return (
    <div className="Cart">
      <Head title='Корзина' />
      {list.length ?
        <>
          <List list={list} itemRender={callbacks.itemsListRender} />
          <div className="Cart__total">Итого <span>{total.toLocaleString('ru-RU')} ₽</span> </div>
        </>
        :
        <div className="Cart__empty">Корзина пуста</div>
      }
    </div>
  )
}

Cart.propTypes = {
  list: PropTypes.arrayOf(PropTypes.shape({
    code: PropTypes.number
  })).isRequired,
  total: PropTypes.number,
  actionFunction: PropTypes.func,
};

Cart.defaultProps = {
  actionFunction: () => {},
};

export default React.memo(Cart);