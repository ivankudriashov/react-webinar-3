import {memo, useState} from "react";
import PropTypes from "prop-types";
import {cn as bem} from '@bem-react/classname';
import {numberFormat} from "../../utils";
import './style.css';
import { Link } from "react-router-dom";

function ProductCard(props){

  const cn = bem('ProductCard');

  const callbacks = {
    onAdd: (e) => props.onAdd(props.item._id)
  }

  return (
    <div className={cn()}>
      <p className={cn('text')}>
        {props.item.description}
      </p>
      <p className={cn('text')}>
        Страна производитель: <span>{props.item.madeIn.title} ({props.item.madeIn.code})</span>
      </p>
      <p className={cn('text')}>
        Категория: <span>{props.item.category.title}</span>
      </p>
      <p className={cn('text')}>
        Год выпуска: <span>{props.item.edition}</span>
      </p>
      <p className={cn('text-bold')}>
        Цена: {numberFormat(props.item.price)} ₽
      </p>

      <div className={cn('actions')}>
        <button onClick={callbacks.onAdd}>Добавить</button>
      </div>
    </div>
  );
}

ProductCard.propTypes = {
  item: PropTypes.shape({
    _id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    price: PropTypes.number
  }).isRequired,
  onAdd: PropTypes.func,
};

ProductCard.defaultProps = {
  onAdd: () => {},
}

export default memo(ProductCard);
