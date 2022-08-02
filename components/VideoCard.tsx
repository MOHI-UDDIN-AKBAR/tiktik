import React, { useState, useRef, useEffect } from "react";
import styles from "../styles/indexPage/index.module.css";
import Link from "next/link";
import Image from "next/image";
import { GoVerified } from "react-icons/go";
import { client } from "../utils/client";
import { FaVideo } from "react-icons/fa";
import {
  BsFillPlayFill,
  BsFillVolumeDownFill,
  BsFillVolumeMuteFill,
} from "react-icons/bs";
import { BiPause } from "react-icons/bi";
import { IProps } from "../types";
interface videoPost {
  post: IProps["post"];
}
const VideoCard: React.FC<videoPost> = ({ post }) => {
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [isVolume, setIsVolume] = useState<boolean>(false);
  const [isHover, setIsHover] = useState<boolean>(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  const playVideo = () => {
    // console.log(videoRef.current);
    if (isPlaying) {
      videoRef?.current?.pause();
      setIsPlaying(false);
    } else {
      videoRef?.current?.play();
      setIsPlaying(true);
    }
  };

  useEffect(() => {
    if (videoRef?.current) {
      videoRef.current.muted = isVolume;
    }
  }, [isVolume]);

  return (
    <div
      className={styles.post}
      // key={post.userId}
      onClick={(e) => console.log(post)}
    >
      <div className={styles.userInfo}>
        <Image
          src={post.postedBy.image}
          alt={post.postedBy.userName}
          loading="lazy"
          width={60}
          height={60}
          className={styles.profilePicture}
        />
        <div className={styles.info}>
          <span className={styles.userName}>{post.postedBy.userName}</span>
          <span>
            {post.caption.length > 20
              ? post.caption.substring(0, 20)
              : post.caption}
            {post.caption.length > 20 && "..."}
          </span>
        </div>
        <span className={styles.verified}>
          <GoVerified />
        </span>
        <small>{post.postedBy.userName}</small>
      </div>
      <Link href={`/postDetails/${post._id}`}>
        <div
          className={styles.videoInfo}
          onMouseEnter={() => setIsHover(true)}
          onMouseLeave={() => setIsHover(false)}
        >
          <video
            loop
            ref={videoRef}
            src={post.video.asset.url}
            className={styles.video}
            onClick={(e) => {
              console.log(videoRef.current);
            }}
            //   controls
          />
          {isHover && (
            <div className={styles.functions}>
              <span>
                {isPlaying ? (
                  <span
                    onClick={(e) => {
                      playVideo();
                    }}
                  >
                    <BiPause />
                  </span>
                ) : (
                  <span
                    onClick={(e) => {
                      playVideo();
                    }}
                  >
                    <BsFillPlayFill />
                  </span>
                )}
              </span>
              <span>{` `}</span>

              {isVolume ? (
                <span onClick={(e) => setIsVolume(false)}>
                  {" "}
                  <BsFillVolumeMuteFill />
                </span>
              ) : (
                <span onClick={(e) => setIsVolume(true)}>
                  <BsFillVolumeDownFill />
                </span>
              )}
            </div>
          )}
        </div>
      </Link>
    </div>
  );
};

export default VideoCard;
