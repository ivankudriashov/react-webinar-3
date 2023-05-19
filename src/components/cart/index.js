import React, { useEffect, useCallback } from "react";
import PropTypes from "prop-types";
import './style.css';
import List from "../list";
import Item from "../item";
import Head from "../head";
import Modal from '../modal';

function Cart({onClose, list, total, actionFunction}){
  useEffect(() => {
    // Закрытие модального окна по нажатию на клавишу Esc
      const close = (e) => {
        if(e.key === "Escape"){
          onClose();
        }
      }
      window.addEventListener('keydown', close)
    return () => window.removeEventListener('keydown', close)
  },[onClose]);

  const callbacks = {
    itemsListRender: useCallback((item) => {
      return <Item actionFunction={actionFunction} item={item} button={'Удалить'}/>
    }, []),
  }

  return (
    <div className="Cart">
        <Modal onClose={onClose}>
            <Head title='Корзина' />
            {list.length ?
              <>
                <List list={list} itemRender={callbacks.itemsListRender} />
                <div className="Cart__total">Итого <span>{total} ₽</span> </div>
              </>
              :
              <div className="Cart__empty">Корзина пуста</div>
            }
        </Modal>
    </div>
  )
}

Cart.propTypes = {
  onClose: PropTypes.func,
  list: PropTypes.arrayOf(PropTypes.shape({
    code: PropTypes.number
  })).isRequired,
  total: PropTypes.number,
  actionFunction: PropTypes.func,
};

Cart.defaultProps = {
  onClose: () => {},
  actionFunction: () => {},
};

export default React.memo(Cart);