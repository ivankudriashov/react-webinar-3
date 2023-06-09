import {memo, useState} from "react";
import PropTypes from 'prop-types';
import './style.css';
import { Link } from "react-router-dom";
import {cn as bem} from '@bem-react/classname';

function CommentActions({show, type, title, onSubmit, onExit, id}){
  const cn = bem('Field');

  const [commentText, setCommentText] = useState('');

  const onChange = (e) => {
    setCommentText(e.currentTarget.value);
  }

  return (
    <div className={cn()}>
    { show
      ?
      <form className={cn('form')} onSubmit={(e) => {
        onSubmit(e, id, type, commentText);
      }}>
        <div className={cn('form-title')}>{title}</div>
        <textarea className={cn('form-textarea')} onChange={onChange} name="comment" rows="10"></textarea>
        <div className={cn('form-actions')}>
          <button type='submit'>Отправить</button>
          {type === 'comment' ?
            <button type="button" className={cn('form-exit')} onClick={onExit}>
              Отмена
            </button>
            :
            null
          }
        </div>
      </form>
        :
      <div className={cn('panel')}>
        <Link className={cn('panel-link')} to='/login'>Войти</Link>
        <div className={cn('panel-text')}>
        , чтобы иметь возможность ответить.&nbsp;
        </div>
        {type === 'comment' 
        ?
        <div className={cn('panel-link',{color: 'grey'})} onClick={onExit}>Отмена</div>
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
};

export default memo(CommentActions);
