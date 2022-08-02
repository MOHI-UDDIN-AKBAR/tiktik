import { IpcNetConnectOpts } from "net";
import React, { useEffect, useState } from "react";
import { AiFillHeart } from "react-icons/ai";
import { useAuthStore } from "../store";
import styles from "../styles/postDetails/styles.module.css";

interface IProps {
  likes: any[];
  handleLiked: () => void;
  handleDislike: () => void;
}
const LikeSection = ({ likes, handleLiked, handleDislike }: IProps) => {
  const [isLiked, setIsLiked] = useState(true);
  const { userProfile }: any = useAuthStore();
  const isUserLiked = likes?.filter((item) => item._ref == userProfile?._id);

  useEffect(() => {
    console.log(isUserLiked?.length);

    if (isUserLiked?.length > 0) {
      console.log(isUserLiked);
      setIsLiked(true);
    } else {
      setIsLiked(false);
    }
  }, [likes, isUserLiked]);
  return (
    <div className={styles.likeSection}>
      <div className={styles.icon}>
        {isLiked ? (
          <button
            type="button"
            className={styles.liked}
            onClick={handleDislike}
          >
            {<AiFillHeart />}
          </button>
        ) : (
          <button
            type="button"
            className={styles.notLiked}
            onClick={handleLiked}
          >
            {<AiFillHeart />}
          </button>
        )}
      </div>
      <span>{likes?.length || 0}</span>
    </div>
  );
};

export default LikeSection;
