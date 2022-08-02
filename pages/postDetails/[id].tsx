import React, { useState, useRef, useEffect } from "react";
import styles from "../../styles/postDetails/styles.module.css";
import LikeSection from "../../components/LikeSection";
import CommentSection from "../../components/CommentSection";
import Link from "next/link";
import Image from "next/image";
import { GoVerified } from "react-icons/go";

import { MdOutlineCancel } from "react-icons/md";
import {
  BsFillPlayFill,
  BsFillVolumeDownFill,
  BsFillVolumeMuteFill,
} from "react-icons/bs";
import { BiPause } from "react-icons/bi";
import { server } from "../../config";
import { IProps } from "../../types";
import { useAuthStore } from "../../store";

interface Details {
  postDetails: IProps["post"];
}

const Index = ({ postDetails }: Details) => {
  const [post, setPost] = useState(postDetails);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isUserIn, setIsUserIn] = useState(false);
  const { userProfile }: any = useAuthStore();
  const [comment, setComment] = useState("");
  const [processing, setProcessing] = useState(false);

  const playVideo = () => {
    console.log(videoRef?.current);
    if (isPlaying) {
      console.log(videoRef?.current);
      videoRef?.current?.pause();
      console.log("playing");
      setIsPlaying(false);
    } else {
      console.log(videoRef?.current);
      videoRef?.current?.play();
      console.log("not playing");
      setIsPlaying(true);
    }
  };

  const handleLike = async (like: boolean) => {
    if (userProfile) {
      const response = await fetch(`${server}/api/like`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userId: userProfile._id,
          postId: post._id,
          like,
        }),
      });

      const data = await response.json();
      //   if (data) {
      //   console.log(data);
      setPost({ ...post, likes: data.likes });
      //   }
    }
  };

  const addComments = async (e: React.FormEvent) => {
    e.preventDefault();
    if (comment) {
      setProcessing(true);
      const res = await fetch(`${server}/api/post/${post._id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userId: userProfile._id,
          comment,
        }),
      });
      const data = await res.json();
      console.log(data);
      // if (data) {
      setPost({ ...post, comments: data.comments });
      setProcessing(false);
      setComment("");
      // }
    }
  };
  useEffect(() => {
    if (userProfile) {
      setIsUserIn(true);
    }
    if (post && videoRef?.current) {
      videoRef.current.muted = isMuted;
    }
  }, [post, isMuted]);

  if (!post) {
    return null;
  }

  return (
    <>
      <div className={styles.postDetails}>
        <div className={styles.videoSection}>
          <Link href={"/"}>
            <button type="button" className={styles.cancelButton}>
              {<MdOutlineCancel />}
            </button>
          </Link>
          <div className={styles.video}>
            <video
              onClick={playVideo}
              ref={videoRef}
              src={post.video.asset.url}
              //   width={300}
              //   height={250}
              loop
            />
            <div className={styles.playButton}>
              {isPlaying ? (
                <button
                  type="button"
                  className={styles.playing}
                  onClick={playVideo}
                >
                  {<BiPause />}
                </button>
              ) : (
                <button
                  type="button"
                  className={styles.notPlaying}
                  onClick={playVideo}
                >
                  {<BsFillPlayFill />}
                </button>
              )}
            </div>
            <div className={styles.volumeButton}>
              {isMuted ? (
                <button
                  type="button"
                  className={styles.playing}
                  onClick={(e) => setIsMuted(false)}
                >
                  {<BsFillVolumeMuteFill />}
                </button>
              ) : (
                <button
                  type="button"
                  className={styles.notPlaying}
                  onClick={(e) => setIsMuted(true)}
                >
                  {<BsFillVolumeDownFill />}
                </button>
              )}
            </div>
          </div>
        </div>
        <div className={styles.videoInfo}>
          <div className={styles.userInfo}>
            <Image
              src={post.postedBy.image}
              width={70}
              height={70}
              loading="lazy"
              className={styles.img}
              alt={post.postedBy.userName}
            />
            <div className={styles.name}>
              <div className={styles.nameWithIcon}>
                <span>{post.postedBy.userName}</span>
                <span>{<GoVerified />}</span>
              </div>
              <small>{post.postedBy.userName}</small>
            </div>
          </div>
          <div className={styles.caption}>
            <span>{post.caption}</span>
          </div>

          {isUserIn && (
            <div>
              <LikeSection
                likes={post.likes}
                handleLiked={() => handleLike(true)}
                handleDislike={() => handleLike(false)}
              />
            </div>
          )}

          <CommentSection
            addComments={addComments}
            comment={comment}
            setComment={setComment}
            processing={processing}
            isUserIn={isUserIn}
            allComments={post.comments}
          />
        </div>
      </div>
    </>
  );
};

export const getServerSideProps = async ({
  params: { id },
}: {
  params: { id: string };
}) => {
  const res = await fetch(`${server}/api/post/${id}`);
  const data = await res.json();

  return {
    props: { postDetails: data },
  };
};
export default Index;
