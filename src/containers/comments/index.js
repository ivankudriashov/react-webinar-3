import {memo, useCallback, useEffect, useMemo, useState} from 'react';
import {useParams} from "react-router-dom";
import useStore from "../../hooks/use-store";
import useSelector from "../../hooks/use-selector";
import useTranslate from "../../hooks/use-translate";
import useInit from "../../hooks/use-init";
import PageLayout from "../../components/page-layout";
import Head from "../../components/head";
import Navigation from "../../containers/navigation";
import Spinner from "../../components/spinner";
import ArticleCard from "../../components/article-card";
import LocaleSelect from "../../containers/locale-select";
import TopHead from "../../containers/top-head";
import {useDispatch, useSelector as useSelectorRedux} from 'react-redux';
import shallowequal from "shallowequal";
import articleActions from '../../store-redux/article/actions';
import commentsActions from '../../store-redux/comments/actions';
import List from '../../components/list';

function Comments() {
  const params = useParams();

  const dispatch = useDispatch();

  const [commentText, setCommentText] = useState('');
  const [showForm, setShowForm] = useState(false);

  const selectRedux = useSelectorRedux(state => ({
    comments: state.comments.data,
    commentsCount: state.comments.commentsCount,
  }), shallowequal); // Нужно указать функцию для сравнения свойства объекта, так как хуком вернули объект

  const select = useSelector(state => ({
    exists: state.session.exists
  }));

  const onChange = (e) => {
    setCommentText(e.currentTarget.value);
  }

  const onSubmit = (e, id, type, text) => {
    e.preventDefault();
    dispatch(commentsActions.add(id, type, text));
  }

  return (
    <>
    <div className="">Комментариев ({selectRedux.commentsCount})</div>
    {selectRedux.comments.length ? 
      <div className="">
        {selectRedux.comments.map(item =>  
          <div style={{"marginBottom": "20px"}} key={item._id} className="">
            <div className="">
              <div className="">{item.author.profile.name}</div>
              <div className="">{item.dateCreate}</div>
            </div>
            <div className="">{item.text}</div>
            {select.exists ?
              <>
                <div className="">Ответить</div>
                <form onSubmit={(e) => {
                    onSubmit(e, item._id, 'comment', commentText)
                }}>
                  <textarea onChange={onChange} name="comment" id="" cols="30" rows="10"></textarea>
                  <button type='submit'>Отправить</button>
                </form>
              </>

              :
              <div className="">Хуй</div>
            }

          </div>
        )}
      </div>
      : 
      null
    }
    <div className="">

      {select.exists ?
          <>
            <div className="">Ответить</div>
            <form onSubmit={(e) => {
              onSubmit(e, params.id, 'article', commentText)
            }}>
              <textarea onChange={onChange} name="comment" id="" cols="30" rows="10"></textarea>
              <button type='submit'>Отправить</button>
            </form>
          </>

          :
          <div className="">Хуй</div>
        }
    </div>
  </>
  );
}

export default memo(Comments);
