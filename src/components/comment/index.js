import {memo} from "react";
import PropTypes from 'prop-types';
import './style.css';
import {cn as bem} from '@bem-react/classname';
import dataChange from "../../utils/date-change";

function Comment({list, render, checkedComentId, onItemId}){
  const cn = bem('Comments');

  return (
    <div className={cn()}>
      {list.map(comment => {
        return (
          <div style={{marginLeft: `${comment.level}px`}} className={cn('item')} key={comment._id}>
            <div className={cn('item-info')} >
              <div className={cn('item-author')} >{comment.author.profile.name}</div>
              <div className={cn('item-date')} >{dataChange(comment.dateCreate)}</div>
            </div>
            <div className={cn('item-text')}>{comment.text}</div>
            <div className={cn('item-action')} onClick={() => {
              onItemId(comment._id);
            }}>
              Ответить
            </div>
              { checkedComentId === comment._id ?
                render(comment._id) 
                :
                null
              }
          </div>
        )
      })}
    </div>
  )
}

Comment.propTypes = {
  render: PropTypes.func,
  onItemId: PropTypes.func,
  checkedComentId: PropTypes.string,
  list: PropTypes.array,

};

export default memo(Comment);