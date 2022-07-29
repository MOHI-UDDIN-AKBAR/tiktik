import React, { useEffect } from "react";
import { useAuthStore } from "../store";
import styles from "../styles/indexPage/index.module.css";
import { GoVerified } from "react-icons/go";
import Image from "next/image";
interface IProps {
  user: {
    image: string;
    userName: string;
    _createdAt: string;
    _id: string;
    _rev: string;
    _type: string;
    _updatedAt: string;
  }[];
}
const Suggested: React.FC = () => {
  const { allUser }: { allUser: IProps["user"] } = useAuthStore();
  useEffect(() => {
    console.log(allUser);
  }, [allUser]);
  return (
    <div className={styles.suggestedUsers}>
      <h3>Suggested accounts</h3>
      {allUser?.map((user, i) => {
        const { userName, image, _id } = user;
        return (
          <div key={i} className={styles.user}>
            <div className={styles.image}>
              <Image
                src={image}
                alt={userName}
                width={40}
                height={40}
                loading="lazy"
                className={styles.img}
              />
            </div>
            <div className={styles.info}>
              <div className={styles.userName}>
                <span>{userName}</span>
                <span className={styles.icon}>
                  <GoVerified />
                </span>
              </div>
              <small>{userName}</small>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default Suggested;
