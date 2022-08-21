import React, { useEffect, useState } from "react";
import styles from "../styles/indexPage/index.module.css";
import { GoogleLogin, googleLogout } from "@react-oauth/google";
import Link from "next/link";
import jwt_decode from "jwt-decode";
import { useAuthStore } from "../store";
import { createOrGetUser } from "../utils/index";
import { AiOutlinePlus, AiOutlineLogout } from "react-icons/ai";
import { BsSearch } from "react-icons/bs";

import Image from "next/image";
import { profile } from "console";
interface IProps {
  user: {
    image: string;
    userName: string;
    _id: string;
    _type: string;
  } | null;
}

const Navbar = () => {
  const { setText, text } = useAuthStore();
  const { userProfile, addUser, removeUser } = useAuthStore();
  // console.log(userProfile);
  const [searchValue, setSearchValue] = useState<string>("");
  const [user, setUser] = useState<IProps["user"]>();
  useEffect(() => {
    setText("");
  }, []);
  useEffect(() => {
    // if (userProfile) {
    setUser(userProfile);

    // }
    // console.log(user);
  }, [userProfile, user]);
  return (
    <div className={styles.navbar}>
      <Link href="/" className={styles.link}>
        <h3
          className={styles.logo}
          onClick={() => {
            setText("");
          }}
        >
          W{` `}A{` `}T{` `}C{` `}H
        </h3>
      </Link>
      <div className={styles.searchSection}>
        <label htmlFor="search">
          <input
            type="text"
            id="search"
            title="search"
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
            placeholder="Search accounts and videos"
          />
          <span
            onClick={() => {
              setText(searchValue);
              setSearchValue("");
            }}
          >
            {<BsSearch />}
          </span>
        </label>
      </div>
      <div className={styles.loginSection}>
        {user ? (
          <div className={styles.userInfo}>
            <div className={styles.uploadButton}>
              <Link href={"/upload"}>
                <span>
                  <AiOutlinePlus />
                  <span>Upload</span>
                </span>
              </Link>
            </div>
            <div className={styles.userPicture}>
              <Image
                src={user.image}
                alt={user.userName}
                width={35}
                height={35}
                loading="lazy"
                className={styles.picture}
              />
            </div>
            <span
              className={styles.logout}
              onClick={(e) => {
                googleLogout();
                removeUser();
              }}
            >
              <AiOutlineLogout />
            </span>
          </div>
        ) : (
          <div className={styles.googleLogin}>
            <GoogleLogin
              onSuccess={(credentialResponse) => {
                // const decode: string = jwt_decode(credentialResponse);
                createOrGetUser(credentialResponse, addUser);
              }}
              onError={() => {
                console.log("Login Failed");
              }}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;
