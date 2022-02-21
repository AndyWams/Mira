import { useEffect } from "react";
import styles from "../styles/Inputs.module.scss";
import { useSelector, useDispatch } from "react-redux";
import { bindActionCreators } from "redux";
import { actionCreators } from "../app/index";
import { createPost } from "../services/app-service";
import Spinner from "./Spinner";
function Content() {
  const dispatch = useDispatch();
  const appState = useSelector((state) => state.post);
  const { data, btnStatus, btnLoadingStatus } = appState;
  const { addPost, getAllPosts, setBtnEnabled, setBtnLoader } =
    bindActionCreators(actionCreators, dispatch);

  useEffect(() => {
    getAllPosts();
  }, []);

  const blurHandler = () => {
    if (data.title !== "" && data.body !== "") {
      setBtnEnabled(false);
    } else {
      setBtnEnabled(true);
    }
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    setBtnLoader(true);
    const params = JSON.stringify({
      title: data.title,
      body: data.body,
      userId: 1,
    });
    try {
      if (data !== "") {
        await createPost(params);
        addPost({ title: "", body: "" });
        setBtnLoader(false);
      }
    } catch (e) {
      console.log(e);
    }
  };
  return (
    <div className={styles.container}>
      <div className={styles.title}>Create Post</div>
      <span className={styles.ruler}></span>
      <div className={styles.form_wrap}>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">New Post</div>
          <div className={styles.input}>
            <label>Title</label>
            <input
              type="text"
              value={data.title}
              placeholder="Enter title"
              onChange={(event) =>
                addPost({
                  ...data,
                  title: event.target.value,
                })
              }
              onBlur={blurHandler}
            />
          </div>
          <div className={styles.input}>
            <label>Body</label>
            <input
              type="text"
              value={data.body}
              placeholder="Body"
              onChange={(event) =>
                addPost({
                  ...data,
                  body: event.target.value,
                })
              }
              onBlur={blurHandler}
            />
          </div>
          <button type="submit" disabled={btnStatus}>
            Add Post {btnLoadingStatus ? <Spinner /> : null}
          </button>
        </form>
      </div>
    </div>
  );
}

export default Content;
