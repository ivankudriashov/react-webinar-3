import {memo, useEffect, useState} from "react";
import PropTypes from 'prop-types';
import './style.css';
import { Link } from "react-router-dom";
import {cn as bem} from '@bem-react/classname';



function CommentActions({show, type, title, onSubmit, onExit, id, t}){
  const cn = bem('Field-tetxaria');
  const [commentText, setCommentText] = useState('');

  const onChange = (e) => {
    setCommentText(e.currentTarget.value);
  }

  useEffect(() => {
    setCommentText('');
  }, [id])

  return (
    <div className={cn()}>
    { show
      ?
      <form className={cn('form')} onSubmit={(e) => {
        e.preventDefault();
        onSubmit(id, type, commentText);
      }}>
        <div className={cn('form-title')}>{title}</div>
        <textarea value={commentText} className={cn('form-textarea')} onChange={onChange} name="comment" rows="10"></textarea>
        <div className={cn('form-actions')}>
          <button type='submit'>{t('comments.send')}</button>
          {type === 'comment' ?
            <button type="button" className={cn('form-exit')} onClick={() => {
              onExit();
            }}>
              {t('comments.cancel')}
            </button>
            :
            null
          }
        </div>
      </form>
        :
      <div className={cn('panel')}>
        <Link className={cn('panel-link')} to='/login'>{t('comments.signIn')}</Link>
        <div className={cn('panel-text')}>
          &nbsp;{t('comments.message')}&nbsp;
        </div>
        {type === 'comment' 
        ?
        <div className={cn('panel-link',{color: 'grey'})} onClick={onExit}>{t('comments.cancel')}</div>
        : null}
      </div> }
    </div>
  )
}

CommentActions.propTypes = {
  onSubmit: PropTypes.func,
  onExit: PropTypes.func,
  show: PropTypes.bool,
  type: PropTypes.string,
  title: PropTypes.string,
  id: PropTypes.string,
  t: PropTypes.func
};

CommentActions.defaultProps = {
  onSubmit: () => {},
  onExit: () => {},
  t: (text) => text
}


export default memo(CommentActions);
