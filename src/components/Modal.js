import { useState } from "react";
import Modal from "react-bootstrap/Modal";
import styles from "../styles/Inputs.module.scss";
import Loader from "./Loader";
import { useSelector, useDispatch } from "react-redux";
import { bindActionCreators } from "redux";
import { actionCreators } from "../app/index";
import { updatePost } from "../services/app-service";

function CustomModal({ isOpen, hideModal }) {
  const [btnStatus, setBtnEnabled] = useState(false);
  const dispatch = useDispatch();
  const appState = useSelector((state) => state.post);
  const { data, postData } = appState;
  const { setUpdatePost } = bindActionCreators(actionCreators, dispatch);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const params = JSON.stringify({
      title: postData.title,
      body: postData.body,
      userId: 1,
    });
    try {
      if (data !== "") {
        await updatePost(postData.id, params);
        hideModal();
      }
    } catch (e) {
      console.log(e);
    }
  };
  const blurHandler = () => {
    if (postData.title !== "" && postData.body !== "") {
      setBtnEnabled(false);
    } else {
      setBtnEnabled(true);
    }
  };

  return (
    <div>
      <Modal show={isOpen} onHide={hideModal}>
        <Modal.Header className="d-flex justify-content-between align-items-center">
          <div className="modal_title">Update Post</div>
          <div onClick={hideModal} className="close-icon">
            <ion-icon name="close-outline"></ion-icon>
          </div>
        </Modal.Header>
        <Modal.Body>
          <section>
            <div className={styles.modal_form_wrap}>
              <form onSubmit={handleSubmit}>
                <div className={styles.input}>
                  <label>Title</label>
                  <input
                    type="text"
                    value={postData.title}
                    placeholder="Enter title"
                    onChange={(event) =>
                      setUpdatePost({
                        ...postData,
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
                    placeholder="Enter body"
                    value={postData.body}
                    onChange={(event) =>
                      setUpdatePost({
                        ...postData,
                        body: event.target.value,
                      })
                    }
                    onBlur={blurHandler}
                  />
                </div>
                <button type="submit" disabled={btnStatus}>
                  Update
                </button>
              </form>
            </div>
          </section>
        </Modal.Body>
      </Modal>
    </div>
  );
}

export default CustomModal;
