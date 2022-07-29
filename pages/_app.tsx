import "../styles/globals.css";
import React, { useEffect, useState } from "react";
import type { AppProps } from "next/app";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import styles from "../styles/basicStyles.module.css";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { AiOutlineMenu } from "react-icons/ai";
import { MdOutlineCancel } from "react-icons/md";
import { spawn } from "child_process";
import { useRouter } from "next/router";
function MyApp({ Component, pageProps }: AppProps) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const router = useRouter();
  const { route } = router;
  useEffect(() => {
    console.log(route);
  }, [route]);
  return (
    <GoogleOAuthProvider clientId={`${process.env.NEXT_PUBLIC_GOOGLE_API_KEY}`}>
      <div className={styles.container}>
        <Navbar />
        <div className={styles.main}>
          {route === "/" && (
            <div className={isSidebarOpen ? styles.open : styles.close}>
              <div className={styles.icon}>
                {isSidebarOpen ? (
                  <span onClick={(e) => setIsSidebarOpen((prev) => !prev)}>
                    <MdOutlineCancel />
                  </span>
                ) : (
                  <span onClick={(e) => setIsSidebarOpen((prev) => !prev)}>
                    <AiOutlineMenu />
                  </span>
                )}
              </div>

              {isSidebarOpen && <Sidebar />}
            </div>
          )}
          <Component {...pageProps} />
        </div>
      </div>
    </GoogleOAuthProvider>
  );
}

export default MyApp;
