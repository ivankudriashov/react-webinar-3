import {memo} from "react";
import PropTypes from 'prop-types';
import './style.css';
import {cn as bem} from '@bem-react/classname';
import dataChange from '../../utils/date-change'

function Comment(
    {
      list, 
      render, 
      checkedComentId, 
      checkedArticleId, 
      onItemId, 
      userInfo, 
      commentPostWaiting
    }
  ){
  const cn = bem('Comments');

  return (
    commentPostWaiting ? null :
    <div className={cn()}>
      {list.map(comment => {
        return (
          comment._type === 'component' ? 
          <div 
            style={comment.level <= 300 ? {marginLeft: `${comment.level}px`} :  {marginLeft: `300px`}} className={cn('item')} key={comment._id}
          >
            {checkedComentId === '' ?
              render(checkedArticleId, "article", "Новый комментарий")
              :
              render(checkedComentId, "comment", "Новый ответ")
            }
          </div> 
          :
          <div 
            style={comment.level <= 300 ? {marginLeft: `${comment.level}px`} :  {marginLeft: `300px`}} className={cn('item')} key={comment._id}
          >
            <div className={cn('item-info')} >
              <div
               className={cn('item-author')}
               style={userInfo._id === comment.author._id ? {color: `#666666`} :  null}
              >
                {comment.author.profile.name}
              </div>
              <div className={cn('item-date')} >{dataChange(comment.dateCreate)}</div>
            </div>
            <div className={cn('item-text')}>{comment.text}</div>
            <div className={cn('item-action')} onClick={() => {
              onItemId(comment._id);
            }}>
              Ответить
            </div>
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
  checkedArticleId: PropTypes.string,
  userInfo: PropTypes.object,
  commentPostWaiting: PropTypes.bool,
};

Comment.defaultProps = {
  render: () => {},
  onItemId: () => {},
}

export default memo(Comment);