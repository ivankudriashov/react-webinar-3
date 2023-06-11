// Начальное состояние
const initialState = {
  data: [],
  commentsCount: 0,
  waiting: false, // признак ожидания загрузки комментариев
  commentPostWaiting: false, // признак ожидания загрузки комментария на сервер
  checkedComentId: ''
}

// Обработчик действий
function reducer(state = initialState, action) {
  switch (action.type) {
    case "comments/load-start":
      return { ...state, data: {}, commentsCount: 0, waiting: true};

    case "comments/load-success":
      return { ...state, data: action.payload.data, commentsCount: action.payload.data.length, waiting: false};

    case "comments/load-error":
      return { ...state, data: {}, commentsCount: 0, waiting: false}; //@todo текст ошибки сохранить?

    case "comment/load-start":
      return { ...state,  commentPostWaiting: true};

    case "comment/load-to-state":
      return { ...state,  data: [...state.data, action.payload.data], commentsCount: state.commentsCount + 1};

    case "comment/load-success":
      return { ...state,  commentPostWaiting: false };

    case "comment/load-error":
      return { ...state,  commentPostWaiting: false};

    case "comment/checked":
      return { ...state,  checkedComentId: action.payload};

    default:
      // Нет изменений
      return state;
  }
}

export default reducer;
