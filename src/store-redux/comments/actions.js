import listToTree from "../../utils/list-to-tree";
import treeToList from "../../utils/tree-to-list";

export default {
  /**
   * Загрузка комментариев
   * @param id
   * @return {Function}
   */
  load: (id) => {
    return async (dispatch, getState, services) => {
      dispatch({type: 'comments/load-start'});

      try {
        const res = await services.api.request({
          url: `/api/v1/comments?search[parent]=${id}&limit=*&fields=items(_id,text,dateCreate,author(profile(name)),parent(_id,_type)),count`
        });

        dispatch({type: 'comments/load-success', payload: {data: treeToList(listToTree(res.data.result.items), (item, level) => (
          {...item, level: level * 30} 
        )
        )}});

      } catch (e) {
        dispatch({type: 'comments/load-error'});
      }
    }
  },

  add: (id, type, text) => {
    return async (dispatch, getState, services) => {
      dispatch({type: 'comment/load-start'});

      try {
        const res = await services.api.request({
          url: `/api/v1/comments`,
          body: JSON.stringify({
            parent: { _id: id, _type: type },
            text,
          }),
          method: "POST",
        });

        dispatch({type: 'comment/load-success'});

      } catch (e) {
        dispatch({type: 'comment/load-error'});
      }
    }
  },

  checkedCommentId: (id) => {
    return async (dispatch, getState, services) => {
      dispatch({type: 'comment/checked', payload: id});
    }
  },

  closeCommentTextaria: () => {
    return async (dispatch, getState, services) => {
      dispatch({type: 'comment/checked', payload: ''});
    }
  },
}
