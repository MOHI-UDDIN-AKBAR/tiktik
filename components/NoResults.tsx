import React from "react";
import styles from "../styles/noResults/styles.module.css";
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
        <span>
          <FiVideoOff />
        </span>
      )}
      <p>{text}</p>
    </div>
  );
};

export default NoResults;
