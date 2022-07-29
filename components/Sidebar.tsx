import React, { useState } from "react";
import styles from "../styles/indexPage/index.module.css";
import { AiFillHome } from "react-icons/ai";
import { topics } from "../utils/iconsAndFooterContent";
import Footer from "./Footer";
import Link from "next/link";
import { useRouter } from "next/router";
import Suggested from "./Suggested";

const Sidebar = () => {
  const router = useRouter();
  const { topic } = router.query;
  console.log(topic);
  return (
    <div className={styles.sidebar}>
      <div className={styles.home}>
        <span className={styles.icon}>
          <AiFillHome />
        </span>

        <span className={styles.text}>For You</span>
      </div>
      <div className={styles.topics}>
        <span className={styles.popularText}>Popular Topics</span>
        <div className={styles.allTopics}>
          {topics?.map((item) => {
            // if (topic === topic.name) {
            //   console.log("ok");
            // }
            return (
              <Link href={`/?topic=${item.name}`} key={item.name}>
                <div
                  className={
                    topic === item.name ? styles.activeTopic : styles.topic
                  }
                >
                  <span>{item.icon}</span>
                  <span>{item.name}</span>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
      <Suggested />
      <Footer />
    </div>
  );
};

export default Sidebar;
