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
  };
  allUser: IProps["user"][];
  fetchAllUsers: () => void;
}
const Suggested: React.FC = () => {
  const {
    allUser,
    fetchAllUsers,
  }: { allUser: IProps["user"][]; fetchAllUsers: IProps["fetchAllUsers"] } =
    useAuthStore();

  useEffect(() => {
    fetchAllUsers();
  }, [fetchAllUsers]);

  // if (!allUser) return null;
  return (
    <div className={styles.suggestedUsers}>
      <h3>Suggested accounts</h3>
      {allUser?.slice(0, 6).map((user: IProps["user"]) => {
        const { userName, image, _id } = user;
        return (
          <div key={_id} className={styles.user}>
            <div className={styles.image}>
              <Image
                src={image}
                alt={userName}
                width={30}
                height={30}
                loading="lazy"
                className={styles.img}
              />
            </div>
            <div className={styles.info}>
              <div className={styles.userName}>
                <span>{userName.toLowerCase().replace(" ", "")}</span>
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
