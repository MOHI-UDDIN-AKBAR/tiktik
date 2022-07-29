import React, { useEffect, useState } from "react";
import styles from "../styles/indexPage/index.module.css";
import { GoogleLogin, googleLogout } from "@react-oauth/google";
import Link from "next/link";
import jwt_decode from "jwt-decode";
import { useAuthStore } from "../store";
import { createOrGetUser } from "../utils/index";
import { AiOutlinePlus, AiOutlineLogout } from "react-icons/ai";
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
  const { userProfile, addUser, removeUser } = useAuthStore();
  // console.log(userProfile);
  const [user, setUser] = useState<IProps["user"]>();
  useEffect(() => {
    // if (userProfile) {
    setUser(userProfile);
    // }
    console.log(user);
  }, [userProfile, user]);
  return (
    <div className={styles.navbar}>
      <Link href="/" className={styles.link}>
        <h3 className={styles.logo}>
          W{` `}A{` `}T{` `}C{` `}H
        </h3>
      </Link>
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
                width={38}
                height={38}
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
