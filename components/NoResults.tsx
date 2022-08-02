import React from "react";
import styles from "../styles/postDetails/styles.module.css";
import { FiVideoOff } from "react-icons/fi";
import { BiCommentX } from "react-icons/bi";
const NoResults = ({ text }: { text: string }) => {
  return (
    <div className={styles.noResults}>
      {text === "No comments done yet ! You can start commenting..." ? (
        <span>
          <BiCommentX />
        </span>
      ) : (
        <FiVideoOff />
      )}
      <p>{text}</p>
    </div>
  );
};

export default NoResults;
