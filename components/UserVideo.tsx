import React, { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { IProps } from "../types";
import styles from "../styles/userAccount/styles.module.css";
import { BiPause } from "react-icons/bi";
import {
  BsPlay,
  BsFillVolumeDownFill,
  BsFillVolumeMuteFill,
} from "react-icons/bs";

const UserVideo = ({ post }: { post: IProps["post"] }) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlay, setIsPlaying] = useState(false);
  //   useEffect(() => {
  //     console.log(videoRef?.current);
  //   });
  const handleVideo = () => {
    if (isPlay) {
      videoRef?.current?.pause();
      setIsPlaying(false);
    } else {
      videoRef?.current?.play();
      setIsPlaying(true);
    }
  };
  return (
    <div className={styles.post}>
      <Link href={`/postDetails/${post._id}`}>
        <video
          ref={videoRef}
          src={post?.video?.asset?.url}
          className={styles.video}
        />
      </Link>
      <div className={styles.userFriendly}>
        {isPlay ? (
          <span onClick={handleVideo}>{<BiPause />}</span>
        ) : (
          <span onClick={handleVideo}>{<BsPlay />}</span>
        )}

        <span>{post?.likes?.length || 0}</span>
      </div>
      <span className={styles.caption}>{post?.caption}</span>
    </div>
  );
};

export default UserVideo;
