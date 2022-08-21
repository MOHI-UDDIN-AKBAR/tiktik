import React, { useEffect, useState } from "react";
import { server } from "../../config/index";
import Image from "next/image";
import styles from "../../styles/userAccount/styles.module.css";
import { IProps } from "../../types";
import { GoVerified } from "react-icons/go";
import UserVideo from "../../components/UserVideo";
import NoResults from "../../components/NoResults";
interface User {
  image: string;
  userName: string;
  _id: string;
}
const UserAccountDetails = ({ userProfileInfo }: any) => {
  const {
    user,
    userLikedVideos,
    userVideos,
  }: {
    user: User;
    userLikedVideos: IProps["post"][];
    userVideos: IProps["post"][];
  } = userProfileInfo;

  const [show, setShow] = useState(false);
  const [isUserHaveVideos, setIsUserHaveVideos] = useState(false);
  const [isUserHaveLinkedVideos, setIsUserHaveLikedVideos] = useState(false);
  useEffect(() => {
    if (userVideos?.length > 0) {
      setIsUserHaveVideos(true);
    }
    if (userLikedVideos?.length > 0) {
      setIsUserHaveLikedVideos(true);
    }
  }, []);
  return (
    <div className={styles.userAccount}>
      <div className={styles.userImageWithName}>
        <Image
          src={user?.image}
          height={60}
          width={60}
          alt={user?.userName}
          className={styles.img}
        />
        <div className={styles.name}>
          <div className={styles.nameWithIcon}>
            <span>{user?.userName.replace(" ", "")}</span>
            <span>
              <GoVerified />
            </span>
          </div>
          <small>{user?.userName}</small>
        </div>
      </div>
      <div className={styles.userVideosAndLikedVideos}>
        <div className={styles.options}>
          <span
            className={`${!show && styles.active}`}
            onClick={() => setShow(false)}
          >
            Videos
          </span>
          <span
            className={`${show && styles.active}`}
            onClick={() => setShow(true)}
          >
            Liked
          </span>
        </div>
        {!show && (
          <div className={styles.Videos}>
            {isUserHaveVideos ? (
              userVideos?.map((post, i: number) => (
                <UserVideo post={post} key={i} />
              ))
            ) : (
              <NoResults text="Oops ! User does not have videos !" />
            )}
          </div>
        )}
        {show && (
          <div className={styles.Videos}>
            {isUserHaveLinkedVideos ? (
              userLikedVideos?.map((post, i: number) => (
                <UserVideo post={post} key={i} />
              ))
            ) : (
              <NoResults text="Oops ! User Have not liked videos yet !" />
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export const getServerSideProps = async ({
  params: { id },
}: {
  params: { id: string };
}) => {
  const res = await fetch(`${server}/api/userAccount/${id}`);
  const data = await res.json();

  return {
    props: { userProfileInfo: data },
  };
};

export default UserAccountDetails;
