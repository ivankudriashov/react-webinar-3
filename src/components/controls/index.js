import React from "react";
import PropTypes from 'prop-types';
import './style.css';
import {plural} from '../../utils'

function Controls({openCart, count, price}){
  const content = count ? `${count} ${plural(count, {one: 'товар', few: 'товара', many: 'товаров'})} / ${price.toLocaleString('ru-RU')} ₽` : 'пусто'

  return (
    <div className='Controls'>

      <div className='Controls__info'>
        В корзине:
        <span>{content}</span>
      </div>
      <button className='Controls__button' onClick={() => openCart()}>Перейти</button>
    </div>
  )
}

Controls.propTypes = {
  count: PropTypes.number,
  price: PropTypes.number,
  openCart: PropTypes.func
};

Controls.defaultProps = {
  openCart: () => {}
}

export default React.memo(Controls);
