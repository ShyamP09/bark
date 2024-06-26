import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router";
import styles from "./main.module.css";
import { auth } from "../../firebase";
import NavBar from "../NavBar";
import {
  GoogleAuthProvider,
  signInWithRedirect,
  getRedirectResult,
} from "firebase/auth";

const HomeComponent = () => {
  const history = { useNavigate };
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      console.log("Auth object:", auth); // Log the auth object
      console.log("Current User:", user); // Log the currentUser
      if (user) {
        setUser(user);
        history.push("/room"); // Redirect to "/room" if user is logged in
      } else {
        setUser(null);
      }
    }, []);

    // Check if there is a redirect result
    getRedirectResult(auth)
      .then((result) => {
        if (result.user) {
          setUser(result.user);
          history.push("/room"); // Redirect to "/room" if user is logged in
        }
      })
      .catch((error) => {
        console.error(error);
      });

    return () => {
      unsubscribe();
    };
  }, [history]);

  const googleSignIn = () => {
    const provider = new GoogleAuthProvider();
    signInWithRedirect(auth, provider);
  };

  return (
    <>
      <NavBar />
      <div className={styles.home}>
        <h1>CoLive Coder</h1>
        <p className={styles.heading}>
          A Collaborative Code editor for pair programming, interviews, teaching
          and a lot more. The "a-Live Coder" is a code pair platform where users
          can share an interactive editor and write code together. It has
          language support for C++, Java, and Python. This application is based
          on the concept of operational transformation which forms the basis for
          a shared editor. Video calling is also provided within this
          application. It has some similar features as provided by HackerRank's
          CodePair platform.
        </p>

        {!user ? (
          <button onClick={googleSignIn} className={styles.btn}>
            Get Started
          </button>
        ) : (
          <Link to={"/room"}>
            <button className={styles.btn}>Start Coding</button>
          </Link>
        )}
        <a
          href=""
          className={styles.githubcorner}
          aria-label="View source on GitHub"
        >
          <svg
            width="80"
            height="80"
            viewBox="0 0 250 250"
            styles="fill:#000; color:#151513; position:absolute; right:0; transform: scale(-1, 1); z-index: 10;"
            aria-hidden="true"
          >
            <path d="M0,0 L115,115 L130,115 L142,142 L250,250 L250,0 Z"></path>
            <path
              d="M128.3,109.0 C113.8,99.7 119.0,89.6 119.0,89.6 C122.0,82.7 120.5,78.6 120.5,78.6 C119.2,72.0 123.4,76.3 123.4,76.3 C127.3,80.9 125.5,87.3 125.5,87.3 C122.9,97.6 130.6,101.9 134.4,103.2"
              fill="#B0EFEB"
              styles="transform-origin: 130px 106px;"
              class="octo-arm"
            ></path>
            <path
              d="M115.0,115.0 C114.9,115.1 118.7,116.5 119.8,115.4 L133.7,101.6 C136.9,99.2 139.9,98.4 142.2,98.6 C133.8,88.0 127.5,74.4 143.8,58.0 C148.5,53.4 154.0,51.2 159.7,51.0 C160.3,49.4 163.2,43.6 171.4,40.1 C171.4,40.1 176.1,42.5 178.8,56.2 C183.1,58.6 187.2,61.8 190.9,65.4 C194.5,69.0 197.7,73.2 200.1,77.6 C213.8,80.2 216.3,84.9 216.3,84.9 C212.7,93.1 206.9,96.0 205.4,96.6 C205.1,102.4 203.0,107.8 198.3,112.5 C181.9,128.9 168.3,122.5 157.7,114.1 C157.9,116.9 156.7,120.9 152.7,124.9 L141.0,136.5 C139.8,137.7 141.6,141.9 141.8,141.8 Z"
              fill="#B0EFEB"
              class="octo-body"
            ></path>
          </svg>
        </a>
      </div>
    </>
  );
};

export default HomeComponent;
