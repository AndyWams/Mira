import { useEffect } from "react";
import styles from "../styles/SidePanel.module.scss";
import { useSelector, useDispatch } from "react-redux";
import { bindActionCreators } from "redux";
import { actionCreators } from "../app/index";
import Loader from "./Loader";
import { deletePost, fetchPost } from "../services/app-service";
import CustomModal from "./Modal";

function SidePanel({ isActive, toggleClass }) {
  const dispatch = useDispatch();
  const appState = useSelector((state) => state.post);
  const { posts, limit, isOpen } = appState;
  const { getAllPosts, setLimit, setModalOpen, setPostData } =
    bindActionCreators(actionCreators, dispatch);
  useEffect(() => {
    getAllPosts();
  }, []);

  const showMore = () => {
    setLimit(limit + 5);
  };
  const getPost = async (id) => {
    const res = await fetchPost(id);
    const data = res.data;
    setPostData(data);
    if (data) {
      setModalOpen(true);
    }
  };

  const makeDeleteRequest = async (id) => {
    await deletePost(id);
    console.log("deleted");
  };

  const hideModal = () => {
    setModalOpen(!isOpen);
  };
  return (
    <div className={`${isActive ? styles.mb_res : styles.panel}`}>
      <div className="container pt-4 px-4">
        <div className={styles.close_} onClick={toggleClass}>
          <ion-icon name="close-outline"></ion-icon>
        </div>
        <div className={styles.title}>All Posts</div>
        <span className={styles.ruler}></span>
        {posts.length ? (
          <section>
            <ul className={styles.list_wrap}>
              {posts.slice(0, limit).map((data, index) => {
                return (
                  <li key={index}>
                    <div className="d-flex align-items-center justify-content-between">
                      <span
                        className={styles.usr}
                        onClick={() => getPost(data.id)}
                      >
                        {data.title}
                      </span>
                      <div
                        onClick={() => makeDeleteRequest(data.id)}
                        className="close-icon"
                      >
                        <ion-icon name="close-outline"></ion-icon>
                      </div>
                    </div>
                  </li>
                );
              })}
            </ul>
            <div className="mt-3">
              {limit < posts.length ? (
                <button onClick={showMore}>Show More</button>
              ) : null}
            </div>
          </section>
        ) : (
          <Loader />
        )}
      </div>
      <CustomModal isOpen={isOpen} hideModal={hideModal} />
    </div>
  );
}

export default SidePanel;
