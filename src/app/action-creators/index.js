import { fetchPosts } from "../../services/app-service";
import { actionTypes } from "../index";

//Action creators

const setActionCall = (actiontype, payload) => {
  return {
    type: actiontype,
    payload,
  };
};

const getPosts = (payload) => setActionCall(actionTypes.FETCH_POST, payload);

export const getAllPosts = () => {
  return async (dispatch) => {
    try {
      await fetchPosts()
        .then((res) => {
          const { data } = res;
          return dispatch(getPosts(data.slice(0, 20)));
        })
        .then();
    } catch (e) {
      console.log(e);
    }
  };
};
export const addPost = (payload) =>
  setActionCall(actionTypes.CREATE_POST, payload);

export const setBtnEnabled = (payload) =>
  setActionCall(actionTypes.SET_BUTTON_ENABLED, payload);

export const setBtnLoader = (payload) =>
  setActionCall(actionTypes.SET_BUTTON_LOADING_STATUS, payload);

export const setLimit = (payload) =>
  setActionCall(actionTypes.SET_LIMIT, payload);

export const setModalOpen = (payload) =>
  setActionCall(actionTypes.SET_MODAL_OPEN, payload);
export const setPostData = (payload) =>
  setActionCall(actionTypes.SET_POST_DATA, payload);

export const setUpdatePost = (payload) =>
  setActionCall(actionTypes.UPDATE_POST, payload);
