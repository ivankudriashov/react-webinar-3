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

        dispatch({type: 'comments/load-success', payload: {data: res.data.result.items}});

      } catch (e) {
        dispatch({type: 'comments/load-error'});
      }
    }
  },

  add: (id, type, text) => {
    return async (dispatch, getState, services) => {
      dispatch({type: 'comment/load-start'});

      if(!text || !text.trim()) {
        dispatch({type: 'comment/load-error'});
        return
      }

      try {
        const res = await services.api.request({
          url: `/api/v1/comments?lang=all&fields=author(profile(name)),dateCreate,text,parent(_id,_type)`,
          body: JSON.stringify({
            parent: { _id: id, _type: type },
            text,
          }),
          method: "POST",
        });

        dispatch({type: 'comment/load-to-state', payload: {data: res.data.result}});

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
