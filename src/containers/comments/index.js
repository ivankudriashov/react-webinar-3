import {memo, useCallback} from 'react';
import {useParams} from "react-router-dom";
import useSelector from "../../hooks/use-selector";
import {useDispatch, useSelector as useSelectorRedux} from 'react-redux';
import shallowequal from "shallowequal";
import commentsActions from '../../store-redux/comments/actions';
import CommentActions from '../../components/comment-textaria';
import CommentsTitle from '../../components/comments-title';
import Comment from '../../components/comment';
import CommentsLayout from '../../components/comments-layout';

function Comments() {
  const params = useParams();

  const dispatch = useDispatch();

  const selectRedux = useSelectorRedux(state => ({
    comments: state.comments.data,
    commentsCount: state.comments.commentsCount,
    checkedComentId: state.comments.checkedComentId,
  }), shallowequal); // Нужно указать функцию для сравнения свойства объекта, так как хуком вернули объект

  const select = useSelector(state => ({
    exists: state.session.exists
  }));

  const callbacks = {
    onSubmit: useCallback((e, id, type, text) => {
      e.preventDefault();
      dispatch(commentsActions.add(id, type, text));
      dispatch(commentsActions.closeCommentTextaria());
    }, []),
    onExit: useCallback(() => {
      dispatch(commentsActions.closeCommentTextaria());
    }, []),
    onItemId: useCallback((id) => {
      dispatch(commentsActions.checkedCommentId(id));
    }, []),
  }

  const renders = {
    comment: useCallback((itemId) => (
      <CommentActions
        show={select.exists}
        type="comment"
        title="Новый ответ"
        onSubmit={callbacks.onSubmit}
        onExit={callbacks.onExit}
        id={itemId}
      />
    ), [])
  }

  return (
    <CommentsLayout>
      <>
        <CommentsTitle text={`Комментариев (${selectRedux.commentsCount})`} />
        {selectRedux.comments.length ?
          <Comment 
            list={selectRedux.comments}
            onItemId={callbacks.onItemId}
            render={renders.comment}
            checkedComentId={selectRedux.checkedComentId}
          />
          : 
          null
        }

        { selectRedux.checkedComentId ===  '' ?
          <CommentActions 
            show={select.exists}
            type="article"
            title="Новый комментарий"
            onSubmit={callbacks.onSubmit}
            onExit={callbacks.onExit}
            id={params.id}
          />
          :
          null
        }
      </>
    </CommentsLayout>
  );
}

export default memo(Comments);
