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
import listToTree from "../../utils/list-to-tree";
import treeToList from "../../utils/tree-to-list";

function Comments() {
  const params = useParams();

  const dispatch = useDispatch();

  const selectRedux = useSelectorRedux(state => ({
    comments: state.comments.data,
    commentsCount: state.comments.commentsCount,
    checkedComentId: state.comments.checkedComentId,
    commentPostWaiting: state.comments.commentPostWaiting,
    waiting: state.comments.waiting
  }), shallowequal); // Нужно указать функцию для сравнения свойства объекта, так как хуком вернули объект

  const select = useSelector(state => ({
    exists: state.session.exists,
    profile: state.session.user,
    waiting: state.session.waiting
  }));

  const callbacks = {
    onSubmit: useCallback((id, type, text) => {
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
    comment: useCallback((itemId, type, title) => (
      <CommentActions
        show={select.exists}
        type={type}
        title={title}
        onSubmit={callbacks.onSubmit}
        onExit={callbacks.onExit}
        id={itemId}
      />
    ), [select.exists])
  }

  return (
    <CommentsLayout>
      <>
        <CommentsTitle text={`Комментариев (${selectRedux.commentsCount})`} />
        {selectRedux.comments.length ?
          <Comment
            userInfo={select.profile}
            list={treeToList(listToTree([
              ...selectRedux.comments, 
              {
                _type: 'component',
                _id: null,
                parent: { _id: selectRedux.checkedComentId}
              }
            ], '_id', 'article'), (item, level) => (
              {...item, level: level * 30} 
            )
            )}
            onItemId={callbacks.onItemId}
            render={renders.comment}
            checkedComentId={selectRedux.checkedComentId}
            commentPostWaiting={selectRedux.commentPostWaiting}
            checkedArticleId={params.id}
          />
        :
        !select.waiting ?
          renders.comment(params.id, "article", "Новый комментарий")
        :
          null
        }
      </>
    </CommentsLayout>
  );
}

export default memo(Comments);
