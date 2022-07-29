import React, { useState, useRef, useEffect } from "react";
import Link from "next/link";
import type { NextPage } from "next";
import Head from "next/head";
import styles from "../styles/indexPage/index.module.css";
import { client } from "../utils/client";
import { FaVideo } from "react-icons/fa";
import VideoCard from "../components/VideoCard";
import { server } from "../config/index";

interface IProps {
  posts: {
    caption: string;
    comment: string;
    likes: {
      _key: string;
      _ref: string;
      _type: string;
    }[];
    postedBy: {
      image: string;
      userName: string;
      _id: string;
    };
    userId: string;
    video: {
      asset: {
        _id: string;
        url: string;
      };
      _id: string;
    };
  }[];
}
const Home: NextPage<IProps> = ({ posts }) => {
  return (
    <div className={styles.homePage}>
      <div className={styles.posts}>
        {posts?.map((post, i) => (
          <VideoCard post={post} key={i} />
        ))}
      </div>
    </div>
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
