import React, { useEffect, useState } from "react";
import styles from "../styles/uploadPage/stylesForUpload.module.css";
import { BsFillCloudPlusFill } from "react-icons/bs";
import { NextPage } from "next";
import { topics } from "../utils/iconsAndFooterContent";
import { SanityAssetDocument } from "@sanity/client";
import Sidebar from "../components/Sidebar";
import { client } from "../utils/client";
import { useAuthStore } from "../store";
import { useRouter } from "next/router";
import { server } from "../config/index";

const Upload: NextPage = () => {
  const router = useRouter();
  const { userProfile }: { userProfile: any } = useAuthStore();
  const [topic, setTopic] = useState<string | string[]>(topics[0].name);
  // const [videoFile, setVideoFile] = useState<
  //   SanityAssetDocument | undefined | null
  // >();
  const [videoAsset, setVideoAsset] = useState<
    SanityAssetDocument | undefined
  >();
  const [wrongFile, setWrongFile] = useState<boolean>(false);
  const [caption, setCaption] = useState<string>("");
  const addVideo = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files![0];
    const fileTypes = ["video/mp4", "video/webm", "video/ogg"];
    if (fileTypes.includes(selectedFile.type)) {
      console.log("it is ok");
      client.assets
        .upload("file", selectedFile, {
          filename: selectedFile.name,
          contentType: selectedFile.type,
        })
        .then((data) => {
          setVideoAsset(data);
          setWrongFile(false);
        });
    } else {
      setWrongFile(true);
    }
  };
  const addPost = async (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    if (caption && topic && videoAsset?._id) {
      const document = {
        _type: "post",
        topic,
        caption,
        video: {
          _type: "file",
          asset: {
            _type: "reference",
            _ref: videoAsset?._id,
          },
        },
        userId: userProfile?._id,
        postedBy: {
          _type: "postedBy",
          _ref: userProfile?._id,
        },
      };
      await fetch(`${server}/api/post`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(document),
      });
      router.push("/");
    }
  };
  useEffect(() => {
    // console.log(topic);
    // console.log(userProfile);
  }, [topic]);

  return (
    <div className={styles.uploadPage}>
      <div className={styles.heading}>
        <h1>Upload Video</h1>
        <span>Post a video to your account</span>
      </div>
      <div className={styles.uploadSection}>
        <div className={styles.videoFile}>
          {videoAsset ? (
            <div className={styles.videoAsset}>
              <video
                src={videoAsset?.url}
                loop
                controls
                className={styles.video}
              />
            </div>
          ) : (
            <label htmlFor="video">
              <span className={styles.cloudIcon}>
                {<BsFillCloudPlusFill />}
              </span>
              <h2>Select Video to Upload</h2>
              <div className={styles.requireInfo}>
                <span>MP4 or WebM or ogg</span>
                <span>720x1280 resolution or higher</span>
                <span>up to 1 minute</span>
                <span>Less than 1GB</span>
              </div>
              <p>Select file</p>
              <input
                type="file"
                name="video"
                id="video"
                onChange={(e) => addVideo(e)}
              />
            </label>
          )}
          {wrongFile && (
            <div className={styles.wrongFile}>Selected wrong file</div>
          )}
        </div>
        <div className={styles.additionalInfo}>
          <div className={styles.caption}>
            <label htmlFor="caption">Caption</label>
            <input
              type="text"
              id="caption"
              value={caption}
              onChange={(e) => setCaption(e.target.value)}
            />
          </div>
          <div className={styles.topics}>
            {/* <label htmlFor="topic"> */}
            <span>Choose a topic</span>
            <select
              name="topic"
              id="topic"
              title="topics"
              value={topic}
              onChange={(e) => setTopic(e.target.value)}
            >
              {topics?.map((eachTopic, i) => {
                return (
                  <option value={eachTopic.name} key={i}>
                    {eachTopic.name}
                  </option>
                );
              })}
            </select>
            {/* </label> */}
          </div>
          <div className={styles.decision}>
            <button type="button" className={styles.action}>
              Discard
            </button>
            <button type="button" className={styles.action} onClick={addPost}>
              Post
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Upload;
