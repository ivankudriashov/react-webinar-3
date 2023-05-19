import React from "react";
import PropTypes from 'prop-types';
import Item from "../item";
import './style.css';

function List(props){
  return (
    <div className='List'>{
      props.list.map(item =>
        <div key={item.code} className='List-item'>
          {props.itemRender(item)}
        </div>
      )}
    </div>
  )
}

List.propTypes = {
  list: PropTypes.arrayOf(PropTypes.shape({
    code: PropTypes.number
  })).isRequired,
  itemRender: PropTypes.func
};

List.defaultProps = {
  itemRender: () => {},
}

export default React.memo(List);
