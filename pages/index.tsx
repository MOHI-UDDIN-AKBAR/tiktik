import React, { useState, useRef, useEffect } from "react";
import Link from "next/link";
import type { NextPage } from "next";
import Head from "next/head";
import styles from "../styles/indexPage/index.module.css";
import { topics } from "../utils/iconsAndFooterContent";
import { client } from "../utils/client";
import { FaVideo } from "react-icons/fa";
import VideoCard from "../components/VideoCard";
import { server } from "../config/index";
import { useRouter } from "next/router";
import { idText, isFunctionTypeNode } from "typescript";
import { useAuthStore } from "../store";
import NoResults from "../components/NoResults";

interface IProps {
  posts: {
    topic: string;
    caption: string;
    video: {
      asset: {
        _id: string;
        url: string;
      };
    };
    _id: string;
    postedBy: {
      _id: string;
      userName: string;
      image: string;
    };
    likes: {
      postedBy: {
        _id: string;
        userName: string;
        image: string;
      };
    }[];
    comments: {
      comment: string;
      _key: string;
      postedBy: {
        _ref: string;
      };
    }[];
    userId: string;
  }[];
}
const Home: NextPage<IProps> = ({ posts }) => {
  const router = useRouter();
  const { text } = useAuthStore();
  const [allPosts, setAllPosts] = useState<IProps["posts"]>(posts);
  const { asPath } = router;
  const { topic }: any = router.query;

  useEffect(() => {
    console.log(router);
    if (topic !== "/" || text) {
      let filterPost = posts?.filter(
        (post) =>
          post?.topic?.toLowerCase().includes(topic || text.toLowerCase()) ||
          post?.caption?.toLowerCase().includes(topic || text.toLowerCase())
      );
      // console.log(text);
      // let filterPostForText = posts?.filter(
      //   (post) =>
      //     post?.topic?.toLowerCase().includes(text.toLowerCase()) ||
      //     post?.caption?.toLowerCase().includes(text.toLowerCase())
      // );
      // console.log(filterPostForText);
      if (filterPost?.length > 0) {
        setAllPosts(filterPost);
      } else {
        setAllPosts(posts);
      }
    }
  }, [router, text]);
  return (
    <>
      {/* {console.log(allPosts)} */}
      <div className={styles.homePage}>
        <div className={styles.posts}>
          {allPosts.length < 1 && (
            <NoResults text="Oops ! No Video Found. Try again !" />
          )}
          {allPosts?.map((post, i) => (
            <VideoCard post={post} key={i} />
          ))}
        </div>
      </div>
    </>
  );
};

export const getServerSideProps = async () => {
  const response = await fetch(`${server}/api/post`);
  const posts = await response.json();
  console.log(posts);
  return {
    props: { posts },
  };
};
export default Home;
