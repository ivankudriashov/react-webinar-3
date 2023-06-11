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
      commentPostWaiting,
      t
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
              render(checkedArticleId, "article", t('comments.replyArtirle'))
              :
              render(checkedComentId, "comment",  t('comments.replyTitle'))
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
              <div className={cn('item-date')} >{dataChange(comment.dateCreate, t('comments.date'))}</div>
            </div>
            <div className={cn('item-text')}>{comment.text}</div>
            <div className={cn('item-action')} onClick={() => {
              onItemId(comment._id);
            }}>
              {t('comments.reply')}
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
  t: PropTypes.func,
};

Comment.defaultProps = {
  render: () => {},
  onItemId: () => {},
  t: (text) => text
}

export default memo(Comment);