import Image from "next/image";
import React, { Dispatch, SetStateAction, useEffect, useState } from "react";
import { useAuthStore } from "../store";
import styles from "../styles/postDetails/styles.module.css";
import NoResults from "./NoResults";
import { GoVerified } from "react-icons/go";
interface IProps {
  addComments: (e: React.FormEvent) => void;
  comment: string;
  setComment: Dispatch<SetStateAction<string>>;
  processing: boolean;
  isUserIn: boolean;
  allComments: Comment[];
}
interface Comment {
  comment: string;
  postedBy: {
    _ref?: string;
    // _type: string;
    _id?: string;
  };
  _key: string;
}
interface User {
  image: string;
  userName: string;
  _createdAt: string;
  _id: string;
  _rev: string;
  _type: string;
  _updatedAt: string;
}
const CommentSection = ({
  addComments,
  comment,
  setComment,
  processing,
  isUserIn,
  allComments,
}: IProps) => {
  const { allUser }: any = useAuthStore();
  const [isLength, setIsLength] = useState<boolean>(false);
  useEffect(() => {
    if (allComments?.length > 0) {
      setIsLength(true);
    } else {
      setIsLength(false);
    }
  }, [isLength]);
  return (
    <div className={styles.commentSection}>
      <div className={styles.comments}>
        {isLength ? (
          <div className={styles.allComments}>
            {allComments?.map((eachComment, i: number) => (
              <div key={i}>
                {allUser?.map(
                  (user: User) =>
                    user._id ===
                      (eachComment.postedBy._ref ||
                        eachComment.postedBy._id) && (
                      <div className={styles.comment} key={i}>
                        <div className={styles.userComment}>
                          <Image
                            src={user.image}
                            width={40}
                            height={40}
                            alt={user.userName}
                            className={styles.img}
                          />
                          <div className={styles.commentInfo}>
                            <div className={styles.userInfo}>
                              <span>{user.userName}</span>
                              <span>{<GoVerified />}</span>
                            </div>
                            <p>{eachComment.comment}</p>
                          </div>
                        </div>
                      </div>
                    )
                )}
              </div>
            ))}
          </div>
        ) : (
          <NoResults text="No comments done yet ! You can start commenting..." />
        )}
      </div>
      {isUserIn && (
        <div className={styles.form}>
          <form onSubmit={(e) => addComments(e)}>
            <label htmlFor="comment">
              <input
                type="text"
                id="comment"
                title="comment"
                placeholder="Add Comments..."
                value={comment}
                onChange={(e) => setComment(e.target.value)}
              />
            </label>
            <button type="button">
              {processing ? "Commenting..." : `Comment      `}
            </button>
          </form>
        </div>
      )}
    </div>
  );
};

export default CommentSection;
