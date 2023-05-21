import React, {useState} from "react";
import PropTypes from "prop-types";
import './style.css';

function Item(props){
  const callbacks = {
    onActionFunction: (e) => {
      e.stopPropagation();
      props.actionFunction(props.item.code);
    }
  }

  return (
    <div className={'Item' + (props.item.selected ? ' Item_selected' : '')}>
      <div className='Item-code'>{props.item.code}</div>
      <div className='Item-title'>
        {props.item.title}
      </div>
      <div className='Item-price'>
        {props.item.price.toLocaleString('ru-RU') + ' ₽'}
      </div>
      {props.item.count &&
				<div className='Item-count'>{`${props.item.count} шт`}</div>
			}
      <div className='Item-actions'>
        <button onClick={callbacks.onActionFunction}>
          {props.button}
        </button>
      </div>
    </div>
  );
}

Item.propTypes = {
  item: PropTypes.shape({
    code: PropTypes.number,
    title: PropTypes.string,
    selected: PropTypes.bool,
    count: PropTypes.number
  }).isRequired,
  onActionFunction: PropTypes.func
};

Item.defaultProps = {
  onActionFunction: () => {},
}

export default React.memo(Item);
