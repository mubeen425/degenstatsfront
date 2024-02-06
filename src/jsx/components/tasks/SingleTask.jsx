import React from "react";
import { Col } from "react-bootstrap";
import { FacebookShareButton } from "react-share";
import { FacebookIcon, TwitterIcon } from "react-share";
import Twitter from "../../../socialShare/Twitter";
import axiosInstance from "../../../services/AxiosInstance";

const SingleTask = ({ taskData }) => {
  return (
    <Col xs={12} md={6}>
      <div className="mb-4 p-4" style={styles.taskContainer}>
        <div style={styles.rewardContainer}>
          <h6 className="heading text-center">{taskData.reward_amount}</h6>
          <p className="text-white text-center text-uppercase">
            {taskData.currency}
          </p>
        </div>
        <div style={styles.taskDetailsContainer}>
          <h6 className="heading text-capitalize">
            {taskData.task_description}
          </h6>
          <div style={styles.timeContainer}>{/* ... */}</div>
          <div style={styles.shareButtonContainer}>
            <FacebookShareButton
              url={"https://peing.net/ja/"}
              quote={"フェイスブックはタイトルが付けれるようです"}
              hashtag={"#hashtag"}
              description={"aiueo "}
              className="Demo__some-network__share-button"
            >
              <FacebookIcon size={32} round />
            </FacebookShareButton>
            <br />
            <Twitter content={taskData.task_description}>
              <TwitterIcon size={32} round />
            </Twitter>
          </div>
          <button className="btn btn-primary">
            <a href={`http://127.0.0.1:4000/oauth`}>Post on a TikTok </a>
          </button>
          {taskData.countOne !== "" && (
            <div>
              <span className="text-capitalize">
                {taskData.countOne}/{taskData.countTwo} USD Testing here
              </span>
            </div>
          )}
        </div>
      </div>
    </Col>
  );
};

const styles = {
  taskContainer: {
    width: "100%",
    background: "#15073a",
    borderRadius: "1.25rem",
    display: "flex",
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
    gap: 15,
    padding: "1rem",
  },
  rewardContainer: {
    width: "25%",
  },
  taskDetailsContainer: {
    width: "75%",
  },

  shareButtonContainer: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
    gap: 15,
  },
};

export default SingleTask;
