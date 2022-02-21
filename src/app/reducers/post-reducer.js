import { actionTypes } from "../index";
const initialState = {
  data: {
    title: "",
    body: "",
  },
  posts: [],
  postData: {},
  limit: 10,
  isOpen: false,
  btnStatus: true,
  btnLoadingStatus: false,
};

const PostReducer = (state = initialState, action) => {
  const { payload } = action;
  switch (action.type) {
    case actionTypes.FETCH_POST:
      return {
        ...state,
        posts: payload,
      };
    case actionTypes.CREATE_POST:
      return {
        ...state,
        data: payload,
      };
    case actionTypes.UPDATE_POST:
      return {
        ...state,
        postData: payload,
      };
    case actionTypes.SET_BUTTON_LOADING_STATUS:
      return {
        ...state,
        btnLoadingStatus: payload,
      };
    case actionTypes.SET_BUTTON_ENABLED:
      return {
        ...state,
        btnStatus: payload,
      };
    case actionTypes.SET_LIMIT:
      return {
        ...state,
        limit: payload,
      };
    case actionTypes.SET_MODAL_OPEN:
      return {
        ...state,
        isOpen: payload,
      };
    case actionTypes.SET_POST_DATA:
      return {
        ...state,
        postData: payload,
      };
    default:
      return state;
  }
};

export default PostReducer;
